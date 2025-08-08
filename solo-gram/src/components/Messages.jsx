import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const users = ["TravelBug", "FoodieQueen", "LaughMaster"];
    const texts = [
      "OMG this is epic 😂",
      "Let's collab!",
      "You're Insta famous now 😎",
      "🔥🔥🔥"
    ];

    const interval = setInterval(() => {
      const msg = {
        id: Date.now(),
        user: users[Math.floor(Math.random() * users.length)],
        text: texts[Math.floor(Math.random() * texts.length)],
        time: "now"
      };
      setMessages((prev) => [msg, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="messages-container">
      <div className="feed-header">
        <h2 className="feed-title">Messages</h2>
      </div>
      
      {messages.map((message) => (
        <div key={message.id} className="message-item">
          <div className="message-header">
            <div className="message-avatar">
              {message.user.charAt(0)}
            </div>
            <div className="message-sender">{message.user}</div>
            <div className="message-time">{message.time}</div>
          </div>
          <div className="message-content">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
