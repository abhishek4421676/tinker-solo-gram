import React, { useState } from 'react';

const Create = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Read file as Data URL so it persists across refresh
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewUrl(dataUrl);
      setImageDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !imageDataUrl) {
      alert('Please select an image first!');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        image: imageDataUrl, // Persisted base64 data URL
        caption: caption,
        time: 'Just now',
        likes: 0,
        comments: 0
      };

      // Save to localStorage
      const existingPosts = JSON.parse(localStorage.getItem(`posts_${user?.username}`) || '[]');
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem(`posts_${user?.username}`, JSON.stringify(updatedPosts));

      // Increase followers with accelerating growth
      const followersKey = `followers_${user?.username}`;
      const currentFollowers = parseInt(localStorage.getItem(followersKey) || '1200', 10);
      // Growth between ~0.5% and 2.0% of current followers, at least +5
      const increment = Math.max(5, Math.floor(currentFollowers * (0.005 + Math.random() * 0.015)));
      const updatedFollowers = currentFollowers + increment;
      localStorage.setItem(followersKey, String(updatedFollowers));

      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setImageDataUrl('');
      setCaption('');
      setIsUploading(false);

      alert('Post created successfully! Check your feed.');
    }, 800);
  };

  return (
    <div className="create-container">
      <div className="create-header">
        <h1 className="create-title">Create New Post</h1>
        <p className="create-subtitle">Share your amazing content with your fans</p>
      </div>
      
      <div className="create-content">
        <div className="file-input-container">
          <input
            type="file"
            id="file-input"
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-input-label">
            {previewUrl ? (
              <div className="selected-file">
                <img src={previewUrl} alt="Preview" className="file-preview" />
                <div className="file-name">{selectedFile?.name}</div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📸</div>
                <div className="upload-text">Click to select an image</div>
              </div>
            )}
          </label>
        </div>
        
        <div className="caption-section">
          <textarea
            className="caption-input"
            placeholder="Write a caption for your post..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="4"
          />
        </div>
        
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Creating Post...' : 'Create Post'}
        </button>
      </div>
    </div>
  );
};

export default Create; 