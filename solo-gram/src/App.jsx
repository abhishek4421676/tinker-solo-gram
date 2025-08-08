import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Insights from "./components/Insights";
import Create from "./components/Create";
import Auth from "./components/Auth";
import "./styles.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Feed user={user} />;
      case "Create":
        return <Create user={user} />;
      case "Profile":
        return <Profile user={user} setPage={setCurrentPage} />;
      case "Notifications":
        return <Notifications user={user} />;
      case "Messages":
        return <Messages user={user} />;
      case "Insights":
        return <Insights user={user} />;
      default:
        return <Feed user={user} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar setPage={setCurrentPage} currentPage={currentPage} onLogout={handleLogout} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}