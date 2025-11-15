import React, { useState, useEffect } from 'react';
import { blogsAPI, coursesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'blogs') {
      loadBlogs();
    } else if (activeTab === 'courses') {
      loadCourses();
    }
  }, [activeTab]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogsAPI.getBlogs();
      setBlogs(response.data || response);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getCourses();
      setCourses(response.data || response);
    } catch (error) {
      console.error('Error loading courses:', error);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  // DELETE Blog
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Deleting blog:', blogId);
      
      const response = await blogsAPI.deleteBlog(blogId);
      console.log('Delete response:', response);
      
      setSuccess('Blog deleted successfully!');
      loadBlogs();
    } catch (error) {
      console.error('Delete blog error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete blog';
      setError('Delete failed: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // DELETE Course
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Deleting course:', courseId);
      
      const response = await coursesAPI.deleteCourse(courseId);
      console.log('Delete response:', response);
      
      setSuccess('Course deleted successfully!');
      loadCourses();
    } catch (error) {
      console.error('Delete course error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete course';
      setError('Delete failed: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Blog
  const handleUpdateBlog = async (blogId, updatedData) => {
    try {
      setLoading(true);
      setError('');
      console.log('Updating blog:', blogId, updatedData);
      
      const response = await blogsAPI.updateBlog(blogId, updatedData);
      console.log('Update response:', response);
      
      setSuccess('Blog updated successfully!');
      loadBlogs();
    } catch (error) {
      console.error('Update blog error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update blog';
      setError('Update failed: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Course
  const handleUpdateCourse = async (courseId, updatedData) => {
    try {
      setLoading(true);
      setError('');
      console.log('Updating course:', courseId, updatedData);
      
      const response = await coursesAPI.updateCourse(courseId, updatedData);
      console.log('Update response:', response);
      
      setSuccess('Course updated successfully!');
      loadCourses();
    } catch (error) {
      console.error('Update course error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update course';
      setError('Update failed: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please login to access admin dashboard
        </div>
      </div>
    );
  }

  if (user && !user.isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Access denied. Admin privileges required.
        </div>
      </div>
    );
  }

  const getBlogTabClass = activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700';
  const getCourseTabClass = activeTab === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('blogs')}
          className={'px-4 py-2 rounded ' + getBlogTabClass}
        >
          Manage Blogs ({blogs.length})
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={'px-4 py-2 rounded ' + getCourseTabClass}
        >
          Manage Courses ({courses.length})
        </button>
      </div>

      {activeTab === 'blogs' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>
          
          {loading && <div className="text-center py-4">Loading...</div>}
          
          {blogs.length === 0 && !loading ? (
            <div className="text-center py-4 text-gray-500">No blogs found</div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      <p className="text-gray-600 text-sm">{blog.category} • {blog.readTime}</p>
                      <p className="text-gray-700 mt-2">{blog.excerpt}</p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleUpdateBlog(blog._id, { title: blog.title + ' (Updated)' })}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Quick Update'}
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        disabled={loading}
                      >
                        {loading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'courses' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
          
          {loading && <div className="text-center py-4">Loading...</div>}
          
          {courses.length === 0 && !loading ? (
            <div className="text-center py-4 text-gray-500">No courses found</div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-gray-600 text-sm">{course.level} • {course.duration}</p>
                      <p className="text-gray-700 mt-2">{course.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Price:  • {course.isPaid ? 'Paid' : 'Free'}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleUpdateCourse(course._id, { title: course.title + ' (Updated)' })}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Quick Update'}
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        disabled={loading}
                      >
                        {loading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
