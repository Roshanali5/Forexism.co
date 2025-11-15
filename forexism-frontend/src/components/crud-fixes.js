// CRUD FIXES FOR ADMIN DASHBOARD
// Add these functions to your existing AdminDashboard component

// FIXED DELETE BLOG FUNCTION
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
    // Refresh your blogs list here
    loadBlogs(); 
  } catch (error) {
    console.error('Delete blog error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete blog';
    setError('Delete failed: ' + errorMessage);
  } finally {
    setLoading(false);
  }
};

// FIXED DELETE COURSE FUNCTION  
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
    // Refresh your courses list here
    loadCourses();
  } catch (error) {
    console.error('Delete course error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete course';
    setError('Delete failed: ' + errorMessage);
  } finally {
    setLoading(false);
  }
};

// FIXED UPDATE BLOG FUNCTION
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

// FIXED UPDATE COURSE FUNCTION
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
