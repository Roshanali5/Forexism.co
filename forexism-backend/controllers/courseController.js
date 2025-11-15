const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: courses,
      message: 'Courses fetched successfully',
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching courses',
      data: [],
      count: 0
    });
  }
};

// @desc    Get single course with full details
// @route   GET /api/courses/:id
// @access  Public (but check enrollment for premium content)
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found',
        data: null
      });
    }
    
    // If user is authenticated, check if they're enrolled
    let hasAccess = false;
    if (req.user) {
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      hasAccess = user.enrolledCourses.includes(req.params.id);
    }
    
    // For free courses or if user has access, return full data
    if (course.isFree || hasAccess) {
      return res.json({
        success: true,
        data: course,
        hasAccess: true
      });
    }
    
    // For paid courses without access, return limited data
    const limitedCourse = {
      _id: course._id,
      title: course.title,
      description: course.description,
      image: course.image,
      price: course.price,
      duration: course.duration,
      level: course.level,
      isPaid: course.isPaid,
      isFree: course.isFree,
      isOneToOne: course.isOneToOne,
      category: course.category,
      instructor: course.instructor,
      totalLessons: course.totalLessons,
      totalVideos: course.totalVideos,
      learningOutcomes: course.learningOutcomes,
      requirements: course.requirements,
      targetAudience: course.targetAudience,
      // Don't send modules and videos for non-enrolled users
      modules: [],
      curriculum: course.curriculum, // Show curriculum but not actual content
      hasAccess: false
    };
    
    res.json({
      success: true,
      data: limitedCourse,
      hasAccess: false
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message,
      data: null
    });
  }
};

// @desc    Create a course with modules
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    console.log('Creating course with data:', req.body);
    
    // Auto-set isFree based on isPaid and isOneToOne
    const courseData = {
      ...req.body,
      isFree: !(req.body.isPaid || req.body.isOneToOne)
    };
    
    // Ensure free courses have price 0
    if (courseData.isFree) {
      courseData.price = 0;
      courseData.isPaid = false;
    }
    
    const course = new Course(courseData);
    const savedCourse = await course.save();
    
    console.log('Course created successfully:', savedCourse._id);
    res.status(201).json({
      success: true,
      data: savedCourse,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ 
      success: false,
      message: error.message,
      error: error.name 
    });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  try {
    // Auto-set isFree based on isPaid and isOneToOne
    const updateData = {
      ...req.body,
      isFree: !(req.body.isPaid || req.body.isOneToOne)
    };
    
    // Ensure free courses have price 0
    if (updateData.isFree) {
      updateData.price = 0;
      updateData.isPaid = false;
    }
    
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found',
        data: null
      });
    }
    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      data: null
    });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found'
      });
    }
    res.json({ 
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/enroll
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get user with enrolled courses
    const User = require('../models/User');
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // For FREE courses: Direct enrollment
    if (course.isFree) {
      // Enroll user in course
      user.enrolledCourses.push(courseId);
      await user.save();

      // Add user to course's enrolled students if not already added
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.json({
        success: true,
        message: 'Successfully enrolled in free course',
        course: {
          id: course._id,
          title: course.title,
          isFree: true
        }
      });
    }

    // For PAID courses: Check payment verification
    if (course.isPaid && !course.isOneToOne) {
      const Payment = require('../models/Payment');
      const approvedPayment = await Payment.findOne({
        user: userId,
        course: courseId,
        status: 'approved'
      });

      if (!approvedPayment) {
        return res.status(403).json({
          success: false,
          message: 'Payment verification required. Please submit payment and wait for admin approval.'
        });
      }
    }

    // For ONE-TO-ONE courses: Check payment verification
    if (course.isOneToOne) {
      const Payment = require('../models/Payment');
      const approvedPayment = await Payment.findOne({
        user: userId,
        course: courseId,
        status: 'approved'
      });

      if (!approvedPayment) {
        return res.status(403).json({
          success: false,
          message: 'Payment verification required for one-to-one session. Please submit payment and wait for admin approval.'
        });
      }
    }

    // Enroll user in paid course (payment verified)
    user.enrolledCourses.push(courseId);
    await user.save();

    // Add user to course's enrolled students if not already added
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      course: {
        id: course._id,
        title: course.title,
        hasAccess: true
      }
    });
  } catch (error) {
    console.error('Enrollment Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error enrolling in course'
    });
  }
};

// @desc    Get course content (videos, modules) - for enrolled users only
// @route   GET /api/courses/:id/content
// @access  Private
const getCourseContent = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Check if user is enrolled
    const User = require('../models/User');
    const user = await User.findById(userId);
    
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: 'You are not enrolled in this course'
      });
    }

    // Get full course content
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: {
        modules: course.modules,
        curriculum: course.curriculum,
        totalLessons: course.totalLessons,
        totalVideos: course.totalVideos
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getCourseContent
};