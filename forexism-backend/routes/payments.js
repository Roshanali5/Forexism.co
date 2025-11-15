const express = require('express');
const router = express.Router();
const {
  submitPayment,
  getAllPayments,
  getMyPayments,
  verifyPayment
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ✅ ADD THIS MISSING LINE - SUBMIT PAYMENT ROUTE
router.post('/submit', protect, upload.single('screenshot'), submitPayment);

router.get('/', protect, admin, getAllPayments);
router.get('/my-payments', protect, getMyPayments);
router.put('/:id/verify', protect, admin, verifyPayment);

module.exports = router;
