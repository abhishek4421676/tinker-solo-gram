import React from 'react';

const Messages = ({ user }) => {
  const messages = [
    {
      id: 1,
      sender: 'Sarah Wilson',
      preview: 'Hey! Loved your latest post!',
      time: '2m ago',
      online: true
    },
    {
      id: 2,
      sender: 'Mike Johnson',
      preview: 'Thanks for the follow back!',
      time: '15m ago',
      online: false
    },
    {
      id: 3,
      sender: 'Emma Davis',
      preview: 'Your photography is amazing!',
      time: '1h ago',
      online: true
    },
    {
      id: 4,
      sender: 'Alex Chen',
      preview: 'Can you share your camera settings?',
      time: '2h ago',
      online: false
    },
    {
      id: 5,
      sender: 'Lisa Brown',
      preview: 'Great content as always!',
      time: '3h ago',
      online: true
    }
  ];

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2 className="messages-title">Messages</h2>
        <p className="messages-subtitle">Connect with your friends</p>
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
  );
};

export default Messages;
