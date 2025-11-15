const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  image: {
    type: String,
    default: '/api/placeholder/800/400',
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Education', 'Strategy', 'Technical Analysis', 'Risk Management', 'Tips', 'Market News'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  metaKeywords: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: String,
    default: '1 min read'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
