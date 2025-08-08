import React from 'react';

const Notifications = ({ user }) => {
  const notifications = [
    {
      id: 1,
      type: 'like',
      message: 'Sarah liked your post',
      time: '2m ago',
      icon: '❤️'
    },
    {
      id: 2,
      type: 'follow',
      message: 'Mike started following you',
      time: '15m ago',
      icon: '👥'
    },
    {
      id: 3,
      type: 'comment',
      message: 'Emma commented on your post',
      time: '1h ago',
      icon: '💬'
    },
    {
      id: 4,
      type: 'like',
      message: 'Alex liked your post',
      time: '2h ago',
      icon: '❤️'
    },
    {
      id: 5,
      type: 'follow',
      message: 'Lisa started following you',
      time: '3h ago',
      icon: '👥'
    }
  ];

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-title">Notifications</h2>
        <p className="notifications-subtitle">Stay updated with your activity</p>
      </div>
      
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon">
              {notification.icon}
            </div>
            <div className="notification-content">
              <div className="notification-text">{notification.message}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
