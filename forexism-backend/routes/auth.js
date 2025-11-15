const express = require('express');
const router = express.Router();
const { register, login, verifyToken, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

// @desc    Verify JWT token
// @route   GET /api/auth/verify
// @access  Private
router.get('/verify', protect, verifyToken);

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;