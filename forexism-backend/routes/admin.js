const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    // Return in consistent format with courses
    res.json({
      success: true,
      data: blogs,
      message: 'Blogs fetched successfully',
      count: blogs.length
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching blogs',
      data: [],
      count: 0
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: 'Blog not found',
        data: null
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message,
      data: null
    });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    // Calculate read time
    const wordCount = req.body.content ? req.body.content.split(' ').length : 0;
    req.body.readTime = Math.ceil(wordCount / 200) + ' min read';

    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    
    res.status(201).json({
      success: true,
      data: savedBlog,
      message: 'Blog created successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      error: error.name 
    });
  }
};

// @desc    Update blog (Admin only)
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res) => {
  try {
    // Recalculate read time if content updated
    if (req.body.content) {
      const wordCount = req.body.content.split(' ').length;
      req.body.readTime = Math.ceil(wordCount / 200) + ' min read';
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    res.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      data: null
    });
  }
};

// @desc    Delete blog (Admin only)
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({ 
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};