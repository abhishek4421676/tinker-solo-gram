import { useState } from "react";

export default function Navbar({ setPage, currentPage, onLogout }) {
  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Create", icon: "➕" },
    { name: "Profile", icon: "👤" },
    { name: "Notifications", icon: "🔔" },
    { name: "Messages", icon: "💬" }
  ];

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-top">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setPage(item.name)}
              className={`nav-item ${currentPage === item.name ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </div>
        
        <div
          onClick={onLogout}
          className="nav-item logout-item"
        >
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </div>
  );
}
