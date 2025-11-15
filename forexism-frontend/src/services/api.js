import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Enhanced request interceptor with better error handling
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request Interceptor - Token exists:', !!token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
      console.log('Token added to request headers');
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.config.method?.toUpperCase(), response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    if (error.response?.status === 401) {
      console.log('Token expired or invalid - redirecting to login');
      localStorage.removeItem('token');
      // Use setTimeout to avoid React state updates during render
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }, 100);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => {
    console.log('Login attempt:', credentials.email);
    return api.post('/auth/login', credentials);
  },
  register: (userData) => api.post('/auth/register', userData),
  verify: () => api.get('/auth/verify'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Blogs API with enhanced logging
export const blogsAPI = {
  getBlogs: () => api.get('/blogs'),
  getBlog: (id) => api.get('/blogs/' + id),
  createBlog: (data) => {
    console.log('Creating blog:', data.title);
    return api.post('/blogs', data);
  },
  updateBlog: (id, data) => {
    console.log('Updating blog:', id, data.title);
    return api.put('/blogs/' + id, data);
  },
  deleteBlog: (id) => {
    console.log('Deleting blog:', id);
    return api.delete('/blogs/' + id);
  },
  getMyBlogs: () => api.get('/blogs/my-blogs'),
  likeBlog: (id) => api.post('/blogs/' + id + '/like'),
  commentBlog: (id, comment) => api.post('/blogs/' + id + '/comment', { comment }),
};

// Courses API with enhanced logging
export const coursesAPI = {
  getCourses: () => api.get('/courses'),
  getCourse: (id) => api.get('/courses/' + id),
  createCourse: (data) => {
    console.log('Creating course:', data.title);
    return api.post('/courses', data);
  },
  updateCourse: (id, data) => {
    console.log('Updating course:', id, data.title);
    return api.put('/courses/' + id, data);
  },
  deleteCourse: (id) => {
    console.log('Deleting course:', id);
    return api.delete('/courses/' + id);
  },
  enrollCourse: (courseId) => api.post('/courses/enroll', { courseId }),
  getMyCourses: () => api.get('/courses/my-courses'),
  getEnrolledCourses: () => api.get('/courses/enrolled'),
  addLesson: (courseId, lessonData) => api.post('/courses/' + courseId + '/lessons', lessonData),
  updateLesson: (courseId, lessonId, lessonData) => api.put('/courses/' + courseId + '/lessons/' + lessonId, lessonData),
  deleteLesson: (courseId, lessonId) => api.delete('/courses/' + courseId + '/lessons/' + lessonId),
  completeLesson: (courseId, lessonId) => api.post('/courses/' + courseId + '/lessons/' + lessonId + '/complete'),
};

// Payments API
export const paymentsAPI = {
  getPayments: () => api.get('/payments'),
  createPayment: (data) => api.post('/payments', data),
  getMyPayments: () => api.get('/payments/my-payments'),
  getPayment: (id) => api.get('/payments/' + id),
  verifyPayment: (paymentId) => api.post('/payments/' + paymentId + '/verify'),
};

// Users API
export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get('/users/' + id),
  updateUser: (id, data) => api.put('/users/' + id, data),
  deleteUser: (id) => api.delete('/users/' + id),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAdminCourses: () => api.get('/admin/courses'),
  createAdminCourse: (data) => api.post('/admin/courses', data),
  updateAdminCourse: (id, data) => api.put('/admin/courses/' + id, data),
  deleteAdminCourse: (id) => api.delete('/admin/courses/' + id),
  getAdminCourse: (id) => api.get('/admin/courses/' + id),
  getAdminBlogs: () => api.get('/admin/blogs'),
  createAdminBlog: (data) => api.post('/admin/blogs', data),
  updateAdminBlog: (id, data) => api.put('/admin/blogs/' + id, data),
  deleteAdminBlog: (id) => api.delete('/admin/blogs/' + id),
  getAdminBlog: (id) => api.get('/admin/blogs/' + id),
  getAdminUsers: () => api.get('/admin/users'),
  getAdminUser: (id) => api.get('/admin/users/' + id),
  createAdminUser: (data) => api.post('/admin/users', data),
  updateAdminUser: (id, data) => api.put('/admin/users/' + id, data),
  updateUserRole: (id, role) => api.put('/admin/users/' + id + '/role', { role }),
  deleteAdminUser: (id) => api.delete('/admin/users/' + id),
  getAdminPayments: () => api.get('/admin/payments'),
  getAdminPayment: (id) => api.get('/admin/payments/' + id),
  updateAdminPayment: (id, data) => api.put('/admin/payments/' + id, data),
  getAnalytics: () => api.get('/admin/analytics'),
  getRevenueStats: (period = 'monthly') => api.get('/admin/analytics/revenue?period=' + period),
  getUserStats: (period = 'monthly') => api.get('/admin/analytics/users?period=' + period),
};

// Utility functions
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const authenticated = !!token;
  console.log('Authentication check:', authenticated);
  return authenticated;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
  console.log('Token saved to localStorage');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  console.log('Token removed from localStorage');
};

export default api;
