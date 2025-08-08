from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Profile, Post, Comment, Notification, Message
from .serializers import (
    UserSerializer, ProfileSerializer, PostSerializer, CommentSerializer,
    NotificationSerializer, MessageSerializer, PostCreateSerializer, ProfileUpdateSerializer
)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return ProfileUpdateSerializer
        return ProfileSerializer

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        profile = self.get_object()
        user = request.user
        
        if user.is_authenticated and user != profile.user:
            if user in profile.followers.all():
                profile.followers.remove(user)
                return Response({'status': 'unfollowed'})
            else:
                profile.followers.add(user)
                # Create notification
                Notification.objects.create(
                    recipient=profile.user,
                    sender=user,
                    notification_type='follow'
                )
                return Response({'status': 'followed'})
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':
            return PostCreateSerializer
        return PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        
        if user.is_authenticated:
            if user in post.likes.all():
                post.likes.remove(user)
                return Response({'status': 'unliked'})
            else:
                post.likes.add(user)
                # Create notification
                if user != post.author:
                    Notification.objects.create(
                        recipient=post.author,
                        sender=user,
                        notification_type='like',
                        post=post
                    )
                return Response({'status': 'liked'})
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        post = self.get_object()
        user = request.user
        content = request.data.get('content')
        
        if user.is_authenticated and content:
            comment = Comment.objects.create(
                post=post,
                author=user,
                content=content
            )
            # Create notification
            if user != post.author:
                Notification.objects.create(
                    recipient=post.author,
                    sender=user,
                    notification_type='comment',
                    post=post,
                    comment=comment
                )
            return Response(CommentSerializer(comment).data)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'status': 'marked as read'})

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        Notification.objects.filter(recipient=request.user, is_read=False).update(is_read=True)
        return Response({'status': 'all marked as read'})

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(sender=user) | Message.objects.filter(recipient=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        message = self.get_object()
        if message.recipient == request.user:
            message.is_read = True
            message.save()
            return Response({'status': 'marked as read'})
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

# Additional views for specific functionality
from rest_framework.views import APIView

class FeedView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

class UserProfileView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = get_object_or_404(Profile, user=user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

class UserPostsView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        posts = Post.objects.filter(author=user).order_by('-created_at')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
