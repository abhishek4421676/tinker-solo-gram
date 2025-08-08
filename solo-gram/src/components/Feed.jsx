import { useState, useEffect } from "react";
import Post from "./Post";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: "solo_user",
          image: "https://picsum.photos/400/400?random=1",
          caption: "Beautiful sunset! 🌅",
          likes: 42,
          comments: [
            { id: 1, author: "user1", text: "Amazing shot!" },
            { id: 2, author: "user2", text: "Love this!" }
          ]
        },
        {
          id: 2,
          author: "solo_user",
          image: "https://picsum.photos/400/400?random=2",
          caption: "Coffee time ☕",
          likes: 28,
          comments: [
            { id: 3, author: "user3", text: "Looks delicious!" }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="feed-container">
        <div className="loading-container">
          <div className="loading">Loading posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h2 className="feed-title">Welcome back, {user?.username || 'solo_user'}!</h2>
      </div>
      
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
