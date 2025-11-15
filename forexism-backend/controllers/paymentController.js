const Payment = require('../models/Payment');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Submit payment for course
// @route   POST /api/payments/submit
// @access  Private
exports.submitPayment = async (req, res) => {
  try {
    const { courseId, amount, transactionId, paymentMethod } = req.body;
    
    // Check if file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload payment screenshot'
      });
    }
    
    const payment = await Payment.create({
      user: req.user.id,
      course: courseId,
      amount,
      transactionId,
      paymentMethod,
      screenshot: req.file.path
    });
    
    res.status(201).json({
      success: true,
      message: 'Payment submitted successfully. Admin will verify within 24 hours.',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting payment',
      error: error.message
    });
  }
};

// @desc    Get all payments (Admin only)
// @route   GET /api/payments
// @access  Private/Admin
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('course', 'title price')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
};

// @desc    Get user payments
// @route   GET /api/payments/my-payments
// @access  Private
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('course', 'title price')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
};

// @desc    Verify payment (Admin only)
// @route   PUT /api/payments/:id/verify
// @access  Private/Admin
exports.verifyPayment = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    payment.status = status;
    payment.adminNotes = adminNotes;
    payment.verifiedBy = req.user.id;
    payment.verifiedAt = Date.now();
    await payment.save();
    
    // If approved, enroll user in course
    if (status === 'approved') {
      const user = await User.findById(payment.user);
      const course = await Course.findById(payment.course);
      
      // Add course to user's enrolled courses
      if (!user.enrolledCourses.includes(payment.course)) {
        user.enrolledCourses.push(payment.course);
        user.hasPaidCourses = true;
        await user.save();
      }
      
      // Add user to course's enrolled students
      if (!course.enrolledStudents.includes(payment.user)) {
        course.enrolledStudents.push(payment.user);
        await course.save();
      }
    }
    
    res.json({
      success: true,
      message: `Payment ${status} successfully`,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};