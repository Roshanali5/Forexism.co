const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('JWT Configuration Test:');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 'MISSING');

if (process.env.JWT_SECRET) {
  try {
    const payload = { userId: 'test123', email: 'test@example.com' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Token generated successfully');
    console.log('Token sample:', token.substring(0, 50) + '...');
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verification successful');
    console.log('Decoded payload:', decoded);
  } catch (error) {
    console.log('❌ JWT Error:', error.message);
  }
} else {
  console.log('❌ JWT_SECRET is not configured');
}
