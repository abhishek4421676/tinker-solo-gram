import { useState } from "react";

export default function Profile({ posts, setPage, user }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.username || "solo_user",
    bio: "Just me, myself & fake fame ✨",
    followers: "1.2K",
    following: "847",
    avatar: null
  });

  const handleSaveProfile = (newData) => {
    setProfileData({...profileData, ...newData});
    setShowEditModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileData.avatar ? (
            <img 
              src={profileData.avatar} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '2.5rem' }}>👤</span>
          )}
        </div>
        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-bio">{profileData.bio}</p>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">{posts.length}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{profileData.followers}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{profileData.following}</div>
            <div className="stat-label">Following</div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button className="upload-btn" onClick={() => setPage("Insights")}>
            View Insights
          </button>
          <button 
            className="upload-btn" 
            style={{ background: 'var(--secondary-gradient)' }}
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '0.5rem',
        padding: '0 1rem'
      }}>
        {posts.map((post) => (
          <div key={post.id} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '8px' }}>
            <img 
              src={post.image} 
              alt="Post" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>

      {showEditModal && (
        <EditProfileModal 
          profileData={profileData}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

function EditProfileModal({ profileData, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: profileData.name,
    bio: profileData.bio,
    avatar: profileData.avatar
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData({...formData, avatar: imageUrl});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="avatar-selection">
              <div className="current-avatar">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Profile Preview" 
                    className="avatar-preview"
                  />
                ) : (
                  <div className="avatar-preview-placeholder">
                    <span>👤</span>
                  </div>
                )}
              </div>
              <div className="avatar-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="avatar-file-input"
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="avatar-upload-btn">
                  Choose Photo
                </label>
                {formData.avatar && (
                  <button
                    type="button"
                    className="avatar-remove-btn"
                    onClick={() => {
                      setFormData({...formData, avatar: null});
                      setSelectedFile(null);
                    }}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="form-input"
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
