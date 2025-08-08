import { useState } from "react";
import { postsAPI } from "../services/api";

export default function Post({ id, image, likes, comments, likes_count, comments_count, is_liked, caption }) {
  const [likeCount, setLikeCount] = useState(likes_count || likes || 0);
  const [isLiked, setIsLiked] = useState(is_liked || false);
  const [postComments, setPostComments] = useState(comments || []);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      setLoading(true);
      await postsAPI.like(id);
      
      if (isLiked) {
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
      // Fallback to local like
      if (isLiked) {
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (content) => {
    try {
      setLoading(true);
      const newComment = await postsAPI.comment(id, content);
      setPostComments(prev => [...prev, newComment]);
    } catch (error) {
      console.error('Failed to comment:', error);
      // Fallback to local comment
      const fallbackComment = {
        id: Date.now(),
        content,
        author: { username: 'user' },
        created_at: new Date().toISOString()
      };
      setPostComments(prev => [...prev, fallbackComment]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post">
      <img src={image} alt="Post" className="post-image" />
      <div className="post-content">
        {caption && (
          <div className="post-caption">
            <strong>Caption:</strong> {caption}
          </div>
        )}
        <div className="post-actions">
          <button 
            onClick={handleLike} 
            disabled={loading}
            className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button className="action-btn">💬</button>
          <button className="action-btn">📤</button>
          <button className="action-btn">🔖</button>
        </div>
        <div className="post-stats">{likeCount} likes</div>
        <div className="post-comments">
          {postComments.map((comment, i) => (
            <div key={comment.id || i} className="comment">
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                {comment.author?.username || `user${i+1}`}
              </span> {comment.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
