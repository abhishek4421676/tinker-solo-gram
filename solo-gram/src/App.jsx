import React, { useState, useEffect } from 'react';
import './styles.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Insights from './components/Insights';
import Create from './components/Create';
import Auth from './components/Auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is saved in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    console.log('App mounted, user:', user);
  }, []);

  const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    console.log('Logout');
    setUser(null);
    localStorage.removeItem('user');
  };

  const renderPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'home':
        return <Feed user={user} />;
      case 'profile':
        return <Profile user={user} setPage={setCurrentPage} />;
      case 'notifications':
        return <Notifications user={user} />;
      case 'reels':
        return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100vh - 0px)',
            color: 'var(--text-secondary)',
            fontSize: '2rem',
            fontWeight: 700,
            textAlign: 'center'
          }}>
            coming soon (never)
          </div>
        );
      case 'insights':
        return <Insights user={user} />;
      case 'create':
        return <Create user={user} />;
      default:
        return <Feed user={user} />;
    }
  };

  // Show auth page if user is not logged in
  if (!user) {
    console.log('No user, showing Auth component');
    return <Auth onLogin={handleLogin} />;
  }

  console.log('User logged in, showing main app');
  return (
    <div className="app-container">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className={`main-content ${currentPage}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;