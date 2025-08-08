import React, { useState, useEffect } from 'react';
import { fakeData } from '../fakeData';

const Feed = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const formatCountShort = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
    if (n >= 1_000) return `${Math.floor(n / 1_000)}k+`;
    return `${n}+`;
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      // Load user's posts from localStorage
      const savedPosts = localStorage.getItem(`posts_${user?.username}`) || '[]';
      const rawPosts = JSON.parse(savedPosts);

      // Attach random comments (1–3) and random like/comment counts
      const pool = fakeData.comments || [];
      const enhancedPosts = rawPosts.map((post) => {
        const howMany = getRandomInt(1, Math.min(3, pool.length || 1));
        const used = new Set();
        const selection = [];
        while (selection.length < howMany && used.size < pool.length) {
          const idx = Math.floor(Math.random() * pool.length);
          if (!used.has(idx)) {
            used.add(idx);
            selection.push(pool[idx]);
          }
        }
        const randomCommentsTotal = getRandomInt(1200, 250000);
        const randomLikesTotal = getRandomInt(500, 1200000);
        return {
          ...post,
          displayComments: selection,
          commentsCountLabel: formatCountShort(randomCommentsTotal),
          likesCountLabel: formatCountShort(randomLikesTotal)
        };
      });

      setUserPosts(enhancedPosts);
    }, 2000);

    return () => clearTimeout(timer);
  }, [user?.username]);

  // Use only messages provided by fakeData
  const messages = fakeData.messages || [];

  if (loading) {
    return (
      <div className="home-layout">
        <div className="feed-section">
          <div className="feed-container">
            <div className="loading-container">
              <div className="loading">
                <div className="loading-spinner"></div>
                Syncing with your massive fanbase…
              </div>
            </div>
          </div>
        </div>
        <div className="messages-section">
          <div className="messages-panel">
            <div className="messages-header">
              <h2 className="messages-title">Messages</h2>
              <p className="messages-subtitle">Connect with your fans</p>
            </div>
            <div className="messages-list">
              {messages.map(message => (
                <div key={message.id} className="message-item">
                  <div className="message-avatar">
                    {message.sender.charAt(0)}
                  </div>
                  <div className="message-content">
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-preview">{message.preview}</div>
                  </div>
                  <div className="message-time">{message.time}</div>
                  <div className={`message-status ${message.online ? '' : 'offline'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-layout">
      <div className="feed-section">
        <div className="feed-container">
          <div className="feed-header">
            {/* Welcome message removed for cleaner layout */}
          </div>
          
          <div className="posts-container">
            {userPosts.length === 0 ? (
              <div className="empty-feed">
                <div className="empty-feed-icon">📸</div>
                <h3 className="empty-feed-title">No posts yet!</h3>
                <p className="empty-feed-subtitle">Create your first post using the Create button in the navbar</p>
              </div>
            ) : (
              userPosts.map(post => (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <div className="post-user">
                      <div className="post-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
                      <div className="post-user-info">
                        <div className="post-username">
                          {user?.username}
                          <span className="verification-icon">✓</span>
                        </div>
                        <div className="post-time">{post.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-image">
                    <img src={post.image} alt={post.caption} />
                  </div>
                  
                  <div className="post-content">
                    <div className="post-caption">
                      <strong>{user?.username}</strong> {post.caption}
                    </div>
                    
                    <div className="post-actions">
                      <button className="action-btn like-btn">❤️</button>
                      <button className="action-btn">💬</button>
                      <button className="action-btn">📤</button>
                      <button className="action-btn">🔖</button>
                    </div>
                    
                    <div className="post-stats">
                      <div className="likes-count">{post.likesCountLabel || (() => {
                        const n = Math.floor(Math.random() * (1200000 - 500 + 1)) + 500;
                        return (n >= 1000000) ? `${(n/1000000).toFixed(1)}M+` : (n >= 1000 ? `${Math.floor(n/1000)}k+` : `${n}+`);
                      })()} likes</div>
                      <div className="comments-count">{post.commentsCountLabel || (() => {
                        // If we have visible comments but no label, ensure at least a non-zero label
                        const base = (post.displayComments?.length || 0) > 0 ? 5 : 1200;
                        const n = Math.floor(Math.random() * (250000 - base + 1)) + base;
                        return (n >= 1000000) ? `${(n/1000000).toFixed(1)}M+` : (n >= 1000 ? `${Math.floor(n/1000)}k+` : `${n}+`);
                      })()} comments</div>
                    </div>

                    {post.displayComments?.length > 0 && (
                      <div className="post-comments">
                        {post.displayComments.map((c) => (
                          <div key={c.id} className="comment">
                            <span className="comment-author">{c.username}</span>&nbsp;{c.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="messages-section">
        <div className="messages-panel">
          <div className="messages-header">
            <h2 className="messages-title">Messages</h2>
            <p className="messages-subtitle">Connect with your fans</p>
          </div>
          
          <div className="messages-list">
            {messages.map(message => (
              <div key={message.id} className="message-item">
                <div className="message-avatar">
                  {message.sender.charAt(0)}
                </div>
                <div className="message-content">
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-preview">{message.preview}</div>
                </div>
                <div className="message-time">{message.time}</div>
                <div className={`message-status ${message.online ? '' : 'offline'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
