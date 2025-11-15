const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // Return in consistent format
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while fetching blogs',
      data: []
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
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    // Calculate read time
    const wordCount = req.body.content.split(' ').length;
    req.body.readTime = Math.ceil(wordCount / 200) + ' min read';

    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete blog (Admin only)
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};