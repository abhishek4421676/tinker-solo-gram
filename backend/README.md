# SoloGram Backend

A Django REST API backend for the SoloGram social media application.

## Features

- **User Management**: User registration, authentication, and profiles
- **Posts**: Create, like, comment on posts with image uploads
- **Profiles**: User profiles with avatars, bio, followers/following
- **Notifications**: Real-time notifications for likes, comments, follows
- **Messages**: Direct messaging between users
- **Feed**: Get all posts in chronological order

## Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create Superuser** (optional)
   ```bash
   python manage.py createsuperuser
   ```

4. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details

### Profiles
- `GET /api/profiles/` - List all profiles
- `GET /api/profiles/{id}/` - Get profile details
- `PUT /api/profiles/{id}/` - Update profile
- `POST /api/profiles/{id}/follow/` - Follow/unfollow user

### Posts
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `POST /api/posts/{id}/like/` - Like/unlike post
- `POST /api/posts/{id}/comment/` - Comment on post

### Feed
- `GET /api/feed/` - Get all posts for feed

### Notifications
- `GET /api/notifications/` - Get user notifications
- `POST /api/notifications/{id}/mark_read/` - Mark notification as read
- `POST /api/notifications/mark_all_read/` - Mark all notifications as read

### Messages
- `GET /api/messages/` - Get user messages
- `POST /api/messages/` - Send message
- `POST /api/messages/{id}/mark_read/` - Mark message as read

## Models

### User
- Django's built-in User model
- Extended with Profile model

### Profile
- `user`: OneToOneField to User
- `bio`: Text field for user bio
- `avatar`: ImageField for profile picture
- `followers`: ManyToManyField to User
- `created_at`, `updated_at`: Timestamps

### Post
- `author`: ForeignKey to User
- `image`: ImageField for post image
- `caption`: Text field for post caption
- `likes`: ManyToManyField to User
- `created_at`, `updated_at`: Timestamps

### Comment
- `post`: ForeignKey to Post
- `author`: ForeignKey to User
- `content`: Text field for comment
- `created_at`: Timestamp

### Notification
- `recipient`: ForeignKey to User
- `sender`: ForeignKey to User
- `notification_type`: Choices (like, comment, follow)
- `post`: ForeignKey to Post (optional)
- `comment`: ForeignKey to Comment (optional)
- `is_read`: Boolean field
- `created_at`: Timestamp

### Message
- `sender`: ForeignKey to User
- `recipient`: ForeignKey to User
- `content`: Text field for message
- `is_read`: Boolean field
- `created_at`: Timestamp

## Development

The backend is configured with:
- Django REST Framework for API
- CORS headers for frontend integration
- SQLite database (can be changed to PostgreSQL/MySQL)
- Media file handling for images
- Automatic profile creation for new users

## Frontend Integration

The API is designed to work with the React frontend. CORS is configured to allow requests from the frontend development server. 