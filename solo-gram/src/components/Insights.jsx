import { useEffect, useState } from "react";

export default function Insights() {
  const [stats, setStats] = useState({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        views: Math.floor(Math.random() * 1000) + 500,
        likes: Math.floor(Math.random() * 200) + 50,
        comments: Math.floor(Math.random() * 50) + 10,
        shares: Math.floor(Math.random() * 30) + 5
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="insights-container">
      <div className="feed-header">
        <h2 className="feed-title">Insights</h2>
      </div>
      
      <div className="insight-card">
        <div className="insight-title">Profile Views</div>
        <div className="insight-value">{stats.views}</div>
        <div className="insight-description">People viewed your profile this week</div>
      </div>
      
      <div className="insight-card">
        <div className="insight-title">Total Likes</div>
        <div className="insight-value">{stats.likes}</div>
        <div className="insight-description">Likes on your recent posts</div>
      </div>
      
      <div className="insight-card">
        <div className="insight-title">Comments</div>
        <div className="insight-value">{stats.comments}</div>
        <div className="insight-description">Comments on your posts</div>
      </div>
      
      <div className="insight-card">
        <div className="insight-title">Shares</div>
        <div className="insight-value">{stats.shares}</div>
        <div className="insight-description">Times your posts were shared</div>
      </div>
    </div>
  );
}
