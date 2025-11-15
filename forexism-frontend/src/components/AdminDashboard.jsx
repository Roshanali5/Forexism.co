import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Video, 
  Book, 
  BarChart3, 
  LogOut, 
  Search, 
  X, 
  Save, 
  Upload, 
  ChevronDown, 
  RefreshCw,
  Users,
  DollarSign,
  Eye,
  Unlock,
  Lock,
  Award
} from 'lucide-react';

const AdminDashboard = ({ setCurrentPage, setIsAdminAuthenticated, userProfile }) => {
  // State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState(null);
  
  // Modal States
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form States
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    author: '',
    category: '',
    tags: [],
    readTime: '5 min read',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    image: '',
    videoUrl: '',
    price: 0,
    duration: '',
    lessons: 0,
    level: 'Beginner',
    isPaid: false,
    isFree: true,
    isOneToOne: false,
    category: 'Trading',
    instructor: 'Admin',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  // API Base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

  // Check if user is admin
  const isAdmin = userProfile?.role === 'admin' || userProfile?.isAdmin === true;

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      setCurrentPage('home');
    }
  }, [isAdmin, setCurrentPage]);

  // Categories and Levels
  const blogCategories = [
    { name: 'Education', color: 'bg-blue-500' },
    { name: 'Strategy', color: 'bg-purple-500' },
    { name: 'Tips', color: 'bg-green-500' },
    { name: 'Psychology', color: 'bg-pink-500' },
    { name: 'Risk Management', color: 'bg-red-500' },
    { name: 'Technical Analysis', color: 'bg-yellow-500' },
    { name: 'Market Analysis', color: 'bg-cyan-500' }
  ];

  const courseLevels = [
    { name: 'Beginner', color: 'bg-green-500' },
    { name: 'Intermediate', color: 'bg-yellow-500' },
    { name: 'Advanced', color: 'bg-red-500' }
  ];

  // Helper functions
  const getCategoryColor = (categoryName) => {
    const category = blogCategories.find(c => c.name === categoryName);
    return category ? category.color : 'bg-gray-500';
  };

  const getLevelColor = (levelName) => {
    const level = courseLevels.find(l => l.name === levelName);
    return level ? level.color : 'bg-gray-500';
  };

  const getCourseTypeColor = (course) => {
    if (course.isOneToOne) return 'bg-purple-500';
    if (course.isPaid) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getCourseTypeText = (course) => {
    if (course.isOneToOne) return '1-on-1';
    if (course.isPaid) return 'Premium';
    return 'Free';
  };

  // Statistics - UPDATED for free/paid system
  const stats = {
    totalCourses: Array.isArray(courses) ? courses.length : 0,
    totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
    freeCourses: Array.isArray(courses) ? courses.filter(c => c.isFree && !c.isOneToOne).length : 0,
    paidCourses: Array.isArray(courses) ? courses.filter(c => c.isPaid && !c.isOneToOne).length : 0,
    oneToOneCourses: Array.isArray(courses) ? courses.filter(c => c.isOneToOne).length : 0,
    totalRevenue: Array.isArray(courses) ? 
      courses.filter(c => c.isPaid || c.isOneToOne).reduce((sum, course) => sum + (course.price || 0), 0) : 0
  };

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch data functions
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      let coursesArray = [];
      
      if (Array.isArray(data)) {
        coursesArray = data;
      } else if (data && data.courses && Array.isArray(data.courses)) {
        coursesArray = data.courses;
      } else if (data && data.data && Array.isArray(data.data)) {
        coursesArray = data.data;
      }
      
      setCourses(coursesArray);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(`Failed to fetch courses: ${error.message}`);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      let blogsArray = [];
      
      if (Array.isArray(data)) {
        blogsArray = data;
      } else if (data && data.blogs && Array.isArray(data.blogs)) {
        blogsArray = data.blogs;
      } else if (data && data.data && Array.isArray(data.data)) {
        blogsArray = data.data;
      }
      
      setBlogs(blogsArray);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(`Failed to fetch blogs: ${error.message}`);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Load data on mount
  useEffect(() => {
    if (isAdmin) {
      fetchCourses();
      fetchBlogs();
    }
  }, [isAdmin, fetchCourses, fetchBlogs]);

  // Manual refresh
  const handleRefresh = () => {
    fetchCourses();
    fetchBlogs();
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle image upload
  const handleImageUpload = (e, type = 'blog') => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'blog') {
          setBlogForm({ ...blogForm, image: reader.result });
        } else {
          setCourseForm({ ...courseForm, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('Video size should not exceed 50MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseForm({ ...courseForm, videoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // FIXED: Handle form submissions with token authentication
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // GET TOKEN
      const token = getToken();
      
      if (!token) {
        alert('Please login as admin first!');
        setLoading(false);
        return;
      }

      const blogData = {
        title: blogForm.title,
        content: blogForm.content,
        excerpt: blogForm.excerpt,
        image: blogForm.image,
        author: blogForm.author,
        category: blogForm.category,
        tags: Array.isArray(blogForm.tags) ? blogForm.tags : [],
        readTime: blogForm.readTime || '5 min read',
        metaTitle: blogForm.metaTitle || blogForm.title,
        metaDescription: blogForm.metaDescription || blogForm.excerpt,
        metaKeywords: blogForm.metaKeywords || '',
        publishedAt: new Date().toISOString()
      };

      const url = editingBlog 
        ? `${API_BASE_URL}/blogs/${editingBlog._id}`
        : `${API_BASE_URL}/blogs`;
      
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ ADDED TOKEN
        },
        body: JSON.stringify(blogData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save blog');
      }

      alert(editingBlog ? 'Blog updated successfully!' : 'Blog published successfully!');
      resetBlogForm();
      setShowBlogModal(false);
      await fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Course submission with token authentication
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    
    if (courseForm.lessons < 0) {
      alert('Lesson count cannot be negative!');
      return;
    }

    setLoading(true);

    try {
      // GET TOKEN
      const token = getToken();
      
      if (!token) {
        alert('Please login as admin first!');
        setLoading(false);
        return;
      }

      const isFree = !(courseForm.isPaid || courseForm.isOneToOne);
      
      const courseData = {
        title: courseForm.title,
        description: courseForm.description,
        image: courseForm.image,
        videoUrl: courseForm.videoUrl,
        price: courseForm.isPaid || courseForm.isOneToOne ? Number(courseForm.price) : 0,
        duration: courseForm.duration,
        lessons: Math.max(0, Number(courseForm.lessons)),
        level: courseForm.level,
        isPaid: courseForm.isPaid,
        isFree: isFree,
        isOneToOne: courseForm.isOneToOne,
        category: courseForm.category,
        instructor: courseForm.instructor,
        metaTitle: courseForm.metaTitle || courseForm.title,
        metaDescription: courseForm.metaDescription || courseForm.description,
        metaKeywords: courseForm.metaKeywords || '',
        createdAt: new Date().toISOString()
      };

      const url = editingCourse 
        ? `${API_BASE_URL}/courses/${editingCourse._id}`
        : `${API_BASE_URL}/courses`;
      
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ ADDED TOKEN
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save course');
      }

      alert(editingCourse ? 'Course updated successfully!' : 'Course created successfully!');
      resetCourseForm();
      setShowCourseModal(false);
      await fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Delete blog with token authentication
  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      setLoading(true);
      
      // GET TOKEN
      const token = getToken();
      
      if (!token) {
        alert('Please login as admin first!');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // ✅ ADDED TOKEN
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete blog');
      
      alert('Blog deleted successfully!');
      await fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Delete course with token authentication
  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      setLoading(true);
      
      // GET TOKEN
      const token = getToken();
      
      if (!token) {
        alert('Please login as admin first!');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/courses/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // ✅ ADDED TOKEN
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete course');
      
      alert('Course deleted successfully!');
      await fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit handlers
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      image: blog.image || '',
      author: blog.author || '',
      category: blog.category || '',
      tags: blog.tags || [],
      readTime: blog.readTime || '5 min read',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });
    setShowBlogModal(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || '',
      description: course.description || '',
      image: course.image || '',
      videoUrl: course.videoUrl || '',
      price: course.price || 0,
      duration: course.duration || '',
      lessons: Math.max(0, course.lessons || 0),
      level: course.level || 'Beginner',
      isPaid: course.isPaid || false,
      isFree: course.isFree !== undefined ? course.isFree : true,
      isOneToOne: course.isOneToOne || false,
      category: course.category || 'Trading',
      instructor: course.instructor || 'Admin',
      metaTitle: course.metaTitle || '',
      metaDescription: course.metaDescription || '',
      metaKeywords: course.metaKeywords || ''
    });
    setShowCourseModal(true);
  };

  // Reset forms
  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      image: '',
      author: '',
      category: '',
      tags: [],
      readTime: '5 min read',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ''
    });
    setEditingBlog(null);
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      image: '',
      videoUrl: '',
      price: 0,
      duration: '',
      lessons: 0,
      level: 'Beginner',
      isPaid: false,
      isFree: true,
      isOneToOne: false,
      category: 'Trading',
      instructor: 'Admin',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ''
    });
    setEditingCourse(null);
  };

  // Logout handlers
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear token and user data on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    setShowLogoutModal(false);
  };

  // View course on main site
  const handleViewCourse = (courseId) => {
    setCurrentPage('courses');
    // You might want to scroll to the specific course or highlight it
    setTimeout(() => {
      const courseElement = document.getElementById(`course-${courseId}`);
      if (courseElement) {
        courseElement.scrollIntoView({ behavior: 'smooth' });
        courseElement.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => {
          courseElement.classList.remove('ring-2', 'ring-blue-500');
        }, 3000);
      }
    }, 500);
  };

  // Don't render if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-600/20 border border-red-500/50 rounded-2xl p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-300 mb-6">You don't have permission to access the admin dashboard.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {userProfile?.name || 'Admin'}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-6 py-3 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl transition-all font-semibold flex items-center space-x-2 border border-green-500/30 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl transition-all font-semibold flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 text-red-200">
            <div className="flex justify-between items-center">
              <div>
                <strong>Error:</strong> {error}
              </div>
              <button onClick={handleRefresh} className="ml-4 underline text-sm">Try Again</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid md:grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Video className="h-8 w-8" />
              <span className="text-3xl font-bold">{stats.totalCourses}</span>
            </div>
            <p className="text-blue-100 font-semibold">Total Courses</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Unlock className="h-8 w-8" />
              <span className="text-3xl font-bold">{stats.freeCourses}</span>
            </div>
            <p className="text-green-100 font-semibold">Free Courses</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Lock className="h-8 w-8" />
              <span className="text-3xl font-bold">{stats.paidCourses}</span>
            </div>
            <p className="text-blue-100 font-semibold">Premium Courses</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8" />
              <span className="text-3xl font-bold">{stats.oneToOneCourses}</span>
            </div>
            <p className="text-purple-100 font-semibold">1-on-1 Sessions</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Book className="h-8 w-8" />
              <span className="text-3xl font-bold">{stats.totalBlogs}</span>
            </div>
            <p className="text-cyan-100 font-semibold">Total Blogs</p>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="mt-6 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-2xl font-bold">${stats.totalRevenue}</span>
              </div>
              <p className="text-indigo-100 font-semibold">Total Potential Revenue</p>
            </div>
            <Users className="h-12 w-12 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <BarChart3 className="h-5 w-5 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Video className="h-5 w-5 inline mr-2" />
            Courses ({stats.totalCourses})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'blogs'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Book className="h-5 w-5 inline mr-2" />
            Blogs ({stats.totalBlogs})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    resetCourseForm();
                    setShowCourseModal(true);
                  }}
                  className="p-8 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border-2 border-blue-500/50 rounded-2xl hover:border-blue-400 transition-all group text-left"
                >
                  <Plus className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Create New Course</h3>
                  <p className="text-gray-400">Add a new course to your platform</p>
                </button>
                
                <button
                  onClick={() => {
                    resetBlogForm();
                    setShowBlogModal(true);
                  }}
                  className="p-8 bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border-2 border-cyan-500/50 rounded-2xl hover:border-cyan-400 transition-all group text-left"
                >
                  <Plus className="h-12 w-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Write New Blog</h3>
                  <p className="text-gray-400">Share your insights and knowledge</p>
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Video className="h-8 w-8 text-blue-400" />
                    <div>
                      <h4 className="text-white font-semibold">Course Management</h4>
                      <p className="text-gray-400 text-sm">
                        {stats.totalCourses} courses • {stats.freeCourses} free • {stats.paidCourses} premium
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all"
                  >
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Book className="h-8 w-8 text-cyan-400" />
                    <div>
                      <h4 className="text-white font-semibold">Blog Management</h4>
                      <p className="text-gray-400 text-sm">
                        {stats.totalBlogs} blog posts published
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-all"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Courses</h2>
              <button
                onClick={() => {
                  resetCourseForm();
                  setShowCourseModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl transition-all font-semibold flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid gap-6">
              {loading ? (
                <div className="text-center text-gray-400 py-12">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                  Loading courses...
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                  <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No courses yet</p>
                  <p className="text-gray-500 mb-4">Create your first course to get started!</p>
                  <button
                    onClick={() => {
                      resetCourseForm();
                      setShowCourseModal(true);
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-semibold"
                  >
                    Create First Course
                  </button>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course._id || course.id}
                    className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-6 flex-1">
                        <img
                          src={course.image || 'https://via.placeholder.com/150'}
                          alt={course.title}
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                          <p className="text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`${getCourseTypeColor(course)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                              {getCourseTypeText(course)}
                            </span>
                            <span className={`${getLevelColor(course.level)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                              {course.level}
                            </span>
                            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {course.duration}
                            </span>
                            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {Math.max(0, course.lessons)} lessons
                            </span>
                            {(course.isPaid || course.isOneToOne) && (
                              <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                ${course.price}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">Instructor: {course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleViewCourse(course._id || course.id)}
                          className="p-3 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl transition-all"
                          title="View on Site"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all"
                          title="Edit Course"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id || course.id)}
                          className="p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all"
                          title="Delete Course"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Blogs</h2>
              <button
                onClick={() => {
                  resetBlogForm();
                  setShowBlogModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white rounded-xl transition-all font-semibold flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Write New Blog</span>
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {blogCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {loading ? (
                <div className="text-center text-gray-400 py-12">Loading blogs...</div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No blogs match your search criteria.' 
                    : 'No blogs yet. Write your first blog!'}
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <div
                    key={blog._id || blog.id}
                    className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-6 flex-1">
                        <img
                          src={blog.image || 'https://via.placeholder.com/150'}
                          alt={blog.title}
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                          <p className="text-gray-400 mb-3 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`${getCategoryColor(blog.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                              {blog.category}
                            </span>
                            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {blog.readTime}
                            </span>
                            <span className="text-gray-500 text-sm">By {blog.author}</span>
                          </div>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                  +{blog.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="p-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all"
                          title="Edit Blog"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id || blog.id)}
                          className="p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all"
                          title="Delete Blog"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-500/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 z-10 flex justify-between items-center p-6 border-b border-cyan-500/30">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <button
                onClick={() => {
                  setShowBlogModal(false);
                  resetBlogForm();
                }}
                className="p-2 hover:bg-gray-800 rounded-xl transition-all"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Enter blog title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Image *</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Image URL or upload below"
                  />
                  <label className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg cursor-pointer transition-all flex items-center space-x-2 w-fit">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'blog')}
                      className="hidden"
                    />
                  </label>
                  {blogForm.image && (
                    <img src={blogForm.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt *</label>
                <textarea
                  required
                  rows="2"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Content *</label>
                <textarea
                  required
                  rows="10"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Write your content..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Author *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                  <div className="relative">
                    <select
                      required
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="appearance-none w-full px-4 py-3 pr-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select...</option>
                      {blogCategories.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(blogForm.tags) ? blogForm.tags.join(', ') : ''}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  placeholder="trading, forex, analysis"
                />
              </div>

              <div className="border-t border-cyan-500/30 pt-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                      maxLength="60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Description</label>
                    <textarea
                      rows="2"
                      value={blogForm.metaDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                      maxLength="160"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={blogForm.metaKeywords}
                      onChange={(e) => setBlogForm({ ...blogForm, metaKeywords: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-cyan-500/30">
                <button
                  type="button"
                  onClick={() => {
                    setShowBlogModal(false);
                    resetBlogForm();
                  }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white rounded-xl transition-all font-semibold flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  <span>{loading ? 'Saving...' : (editingBlog ? 'Update' : 'Publish')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-blue-500/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 z-10 flex justify-between items-center p-6 border-b border-blue-500/30">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button
                onClick={() => {
                  setShowCourseModal(false);
                  resetCourseForm();
                }}
                className="p-2 hover:bg-gray-800 rounded-xl transition-all"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Instructor *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Course Image *</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                  <label className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg cursor-pointer transition-all flex items-center space-x-2 w-fit">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'course')}
                      className="hidden"
                    />
                  </label>
                  {courseForm.image && (
                    <img src={courseForm.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Course Video (Optional)</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={courseForm.videoUrl}
                    onChange={(e) => setCourseForm({ ...courseForm, videoUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                  <label className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg cursor-pointer transition-all flex items-center space-x-2 w-fit">
                    <Video className="h-4 w-4" />
                    <span>Upload Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
                <textarea
                  required
                  rows="4"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Duration *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Total Lessons *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={courseForm.lessons}
                    onChange={(e) => setCourseForm({ ...courseForm, lessons: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Level *</label>
                  <div className="relative">
                    <select
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="appearance-none w-full px-4 py-3 pr-10 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      {courseLevels.map(level => (
                        <option key={level.name} value={level.name}>{level.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Course Type *</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 bg-gray-800/30 border border-green-500/20 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-all">
                      <input
                        type="radio"
                        name="courseType"
                        checked={!courseForm.isPaid && !courseForm.isOneToOne}
                        onChange={() => setCourseForm({ 
                          ...courseForm, 
                          isPaid: false, 
                          isOneToOne: false, 
                          isFree: true,
                          price: 0 
                        })}
                        className="text-green-500"
                      />
                      <Unlock className="h-4 w-4 text-green-400" />
                      <span className="text-white">Free Course</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 bg-gray-800/30 border border-blue-500/20 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-all">
                      <input
                        type="radio"
                        name="courseType"
                        checked={courseForm.isPaid && !courseForm.isOneToOne}
                        onChange={() => setCourseForm({ 
                          ...courseForm, 
                          isPaid: true, 
                          isOneToOne: false, 
                          isFree: false 
                        })}
                        className="text-blue-500"
                      />
                      <Lock className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Premium Course</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 bg-gray-800/30 border border-purple-500/20 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-all">
                      <input
                        type="radio"
                        name="courseType"
                        checked={courseForm.isOneToOne}
                        onChange={() => setCourseForm({ 
                          ...courseForm, 
                          isPaid: true, 
                          isOneToOne: true, 
                          isFree: false 
                        })}
                        className="text-purple-500"
                      />
                      <Award className="h-4 w-4 text-purple-400" />
                      <span className="text-white">One-to-One</span>
                    </label>
                  </div>
                </div>

                {(courseForm.isPaid || courseForm.isOneToOne) && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Price (USD) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      placeholder="Enter course price"
                    />
                    <p className="text-gray-400 text-xs mt-2">
                      {courseForm.isOneToOne 
                        ? 'Set the price for your one-to-one coaching session' 
                        : 'Set the price for your premium course'}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-blue-500/30 pt-6">
                <h3 className="text-lg font-bold text-blue-400 mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={courseForm.metaTitle}
                      onChange={(e) => setCourseForm({ ...courseForm, metaTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      maxLength="60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Description</label>
                    <textarea
                      rows="2"
                      value={courseForm.metaDescription}
                      onChange={(e) => setCourseForm({ ...courseForm, metaDescription: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      maxLength="160"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={courseForm.metaKeywords}
                      onChange={(e) => setCourseForm({ ...courseForm, metaKeywords: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-blue-500/30">
                <button
                  type="button"
                  onClick={() => {
                    setShowCourseModal(false);
                    resetCourseForm();
                  }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl transition-all font-semibold flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  <span>{loading ? 'Saving...' : (editingCourse ? 'Update' : 'Create')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-red-500/50 rounded-3xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-600/20 mb-6">
                <LogOut className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Confirm Logout</h3>
              <p className="text-gray-400 mb-8">
                Are you sure you want to logout from the admin dashboard?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl transition-all font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;