const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourse);

// Protected routes - Admin only
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

// Protected routes - Authenticated users
router.post('/enroll', protect, enrollCourse);

module.exports = router;