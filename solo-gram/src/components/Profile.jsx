import React, { useState, useEffect } from 'react';

const Profile = ({ user, setPage }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.username || '',
    bio: 'Living my best life, one selfie at a time 📸',
    avatar: null
  });
  const [postsCount, setPostsCount] = useState(0);
  const [followers, setFollowers] = useState(1200);

  useEffect(() => {
    const saved = localStorage.getItem(`posts_${user?.username}`) || '[]';
    try {
      const arr = JSON.parse(saved);
      setPostsCount(Array.isArray(arr) ? arr.length : 0);
    } catch {
      setPostsCount(0);
    }

    const followersKey = `followers_${user?.username}`;
    const currentFollowers = parseInt(localStorage.getItem(followersKey) || '1200', 10);
    setFollowers(currentFollowers);
  }, [user?.username]);

  const handleSave = () => {
    setShowEditModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileData.avatar ? (
            <img src={profileData.avatar} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">
            {profileData.name}
            <span className="verification-icon">✓</span>
          </h1>
          <p className="profile-bio">{profileData.bio}</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number">{postsCount.toLocaleString()}</div>
              <div className="stat-label">posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{followers.toLocaleString()}</div>
              <div className="stat-label">fans</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">following</div>
            </div>
          </div>
          
          <button 
            className="edit-profile-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Edit Profile</h2>
            
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-input"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Bio</label>
              <textarea
                className="form-input"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfileData({...profileData, avatar: URL.createObjectURL(file)});
                  }
                }}
              />
            </div>
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
