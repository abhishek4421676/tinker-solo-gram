import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const users = ["Brenda343", "FitnessGuru88", "CoderKid", "TravelBug"];
    const actions = ["liked your photo", "started following you", "commented: 'Nice!'"];
    const icons = ["❤️", "👥", "💬"];

    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      
      const newNotif = {
        id: Date.now(),
        user: randomUser,
        action: randomAction,
        icon: randomIcon,
        time: "now"
      };
      
      setNotifs((prev) => [newNotif, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications-container">
      <div className="feed-header">
        <h2 className="feed-title">Notifications</h2>
      </div>
      
      {notifs.map((notif) => (
        <div key={notif.id} className="notification-item">
          <div className="notification-content">
            <div className="notification-icon">
              {notif.icon}
            </div>
            <div className="notification-text">
              <strong>{notif.user}</strong> {notif.action}
            </div>
            <div className="notification-time">{notif.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
