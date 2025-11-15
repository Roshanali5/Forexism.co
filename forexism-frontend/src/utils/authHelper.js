// authHelper.js - Utility functions for authentication
export const authHelper = {
  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Set token after login
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  // Remove token on logout
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Check if user is admin (you might need to decode JWT or make API call)
  isAdmin: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const response = await fetch('http://localhost:5002/api/auth/me', {
        headers: {
          'Authorization': \Bearer \\
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.user.isAdmin === true;
      }
      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },
  
  // Get auth headers for API calls
  getAuthHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': \Bearer \\,
      'Content-Type': 'application/json'
    };
  }
};
