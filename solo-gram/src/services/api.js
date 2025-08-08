const API_BASE_URL = 'http://127.0.0.1:8001/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // For now, we'll simulate authentication since Django auth needs more setup
  login: async (username, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { username, email: `${username}@example.com` },
          token: 'fake-token-' + Date.now()
        });
      }, 1000);
    });
  },

  register: async (username, email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { username, email },
          token: 'fake-token-' + Date.now()
        });
      }, 1000);
    });
  }
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    return apiRequest('/posts/');
  },

  create: async (postData) => {
    const formData = new FormData();
    formData.append('image', postData.image);
    formData.append('caption', postData.caption || '');

    const response = await fetch(`${API_BASE_URL}/posts/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  like: async (postId) => {
    return apiRequest(`/posts/${postId}/like/`, {
      method: 'POST',
    });
  },

  comment: async (postId, content) => {
    return apiRequest(`/posts/${postId}/comment/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
};

// Profiles API
export const profilesAPI = {
  getProfile: async (username) => {
    return apiRequest(`/profile/${username}/`);
  },

  updateProfile: async (profileId, data) => {
    const formData = new FormData();
    if (data.bio) formData.append('bio', data.bio);
    if (data.avatar) formData.append('avatar', data.avatar);

    const response = await fetch(`${API_BASE_URL}/profiles/${profileId}/`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  follow: async (profileId) => {
    return apiRequest(`/profiles/${profileId}/follow/`, {
      method: 'POST',
    });
  }
};

// Feed API
export const feedAPI = {
  getFeed: async () => {
    return apiRequest('/feed/');
  }
};

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return apiRequest('/notifications/');
  },

  markRead: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}/mark_read/`, {
      method: 'POST',
    });
  },

  markAllRead: async () => {
    return apiRequest('/notifications/mark_all_read/', {
      method: 'POST',
    });
  }
};

// Messages API
export const messagesAPI = {
  getAll: async () => {
    return apiRequest('/messages/');
  },

  send: async (recipientId, content) => {
    return apiRequest('/messages/', {
      method: 'POST',
      body: JSON.stringify({
        recipient: recipientId,
        content,
      }),
    });
  },

  markRead: async (messageId) => {
    return apiRequest(`/messages/${messageId}/mark_read/`, {
      method: 'POST',
    });
  }
}; 