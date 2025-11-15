const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  videoUrl: {
    type: String,
    required: true
  },
  duration: String,
  order: {
    type: Number,
    default: 1
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  thumbnail: String
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  order: {
    type: Number,
    default: 1
  },
  videos: [videoSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  image: {
    type: String,
    required: [true, 'Course image is required'],
    default: '/api/placeholder/400/225'
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: String,
    default: '4 weeks'
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  totalVideos: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: true
  },
  isOneToOne: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    default: 'Trading'
  },
  instructor: {
    type: String,
    required: true,
    default: 'Expert Trader'
  },
  // NEW: Course modules with videos
  modules: [moduleSchema],
  // Course curriculum/syllabus
  curriculum: [{
    week: Number,
    title: String,
    topics: [String],
    objectives: [String]
  }],
  // What students will learn
  learningOutcomes: [String],
  // Requirements
  requirements: [String],
  // Who this course is for
  targetAudience: [String],
  
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field and calculate totals before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Auto-set isFree based on isPaid and isOneToOne
  if (this.isPaid || this.isOneToOne) {
    this.isFree = false;
  } else {
    this.isFree = true;
    this.price = 0; // Free courses should have price 0
  }
  
  // Calculate total lessons and videos
  this.totalLessons = this.modules.reduce((total, module) => total + module.videos.length, 0);
  this.totalVideos = this.totalLessons;
  
  next();
});

module.exports = mongoose.model('Course', courseSchema);