import React, { useState, useEffect } from 'react';
import { blogsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogManagement = () => {
  const { user, isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Education',
    author: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Load blogs
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogsAPI.getBlogs();
      setBlogs(response.data || response); // Handle both response formats
    } catch (error) {
      console.error('Error loading blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  // CREATE Blog
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to create blogs');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const blogData = {
        ...formData,
        author: formData.author || user?.name || 'Admin'
      };

      console.log('Creating blog with data:', blogData);
      const response = await blogsAPI.createBlog(blogData);
      
      setSuccess('Blog created successfully!');
      setFormData({ title: '', content: '', excerpt: '', category: 'Education', author: '', image: '' });
      loadBlogs();
    } catch (error) {
      console.error('Create blog error:', error);
      setError(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !editingId) {
      setError('Please login to update blogs');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      console.log('Updating blog:', editingId, formData);
      const response = await blogsAPI.updateBlog(editingId, formData);
      
      setSuccess('Blog updated successfully!');
      setEditingId(null);
      setFormData({ title: '', content: '', excerpt: '', category: 'Education', author: '', image: '' });
      loadBlogs();
    } catch (error) {
      console.error('Update blog error:', error);
      setError(error.response?.data?.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  // DELETE Blog
  const handleDelete = async (blogId) => {
    if (!isAuthenticated) {
      setError('Please login to delete blogs');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      console.log('Deleting blog:', blogId);
      const response = await blogsAPI.deleteBlog(blogId);
      
      setSuccess('Blog deleted successfully!');
      loadBlogs();
    } catch (error) {
      console.error('Delete blog error:', error);
      setError(error.response?.data?.message || 'Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  // EDIT Blog - Load data into form
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author,
      image: blog.image || ''
    });
  };

  // CANCEL Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', excerpt: '', category: 'Education', author: '', image: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please login to manage blogs
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Management</h1>

      {/* Success/Error Messages */}
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

      {/* Blog Form */}
      <form onSubmit={editingId ? handleUpdate : handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Blog' : 'Create New Blog'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Education">Education</option>
              <option value="Strategy">Strategy</option>
              <option value="Technical Analysis">Technical Analysis</option>
              <option value="Risk Management">Risk Management</option>
              <option value="Tips">Tips</option>
              <option value="Market News">Market News</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows="2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows="6"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Blogs List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Blogs</h2>
        
        {loading && <div className="text-center py-4">Loading blogs...</div>}
        
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
                      onClick={() => handleEdit(blog)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
