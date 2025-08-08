import React from 'react';

const Navbar = ({ currentPage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'create', label: 'Create', icon: '➕' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'reels', label: 'Reels', icon: '🎞️' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-top">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="nav-bottom">
          <button className="nav-item logout-item" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
