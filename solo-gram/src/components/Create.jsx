import { useState } from "react";

export default function Create({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('caption', caption || `New post by ${user?.username || 'user'}`);
      formData.append('author', user?.username || 'user');

      // For now, we'll simulate the upload
      setTimeout(() => {
        alert("Post created successfully!");
        setSelectedFile(null);
        setCaption("");
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Error uploading post:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-header">
        <h2 className="create-title">Create New Post</h2>
        <p className="create-subtitle">Share your moments with the world</p>
      </div>

      <div className="create-content">
        <div className="upload-section">
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              {selectedFile ? (
                <div className="selected-file">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="file-preview"
                  />
                  <span className="file-name">{selectedFile.name}</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">Choose Photo</span>
                </div>
              )}
            </label>
          </div>

          <div className="caption-section">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
              rows="4"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="upload-btn"
          >
            {isUploading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
} 