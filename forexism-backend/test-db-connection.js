const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing Database Connection...');
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);

async function testConnection() {
  try {
    // Use the exact connection string from your backend
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected successfully!');
    
    // Check if our test user exists
    const User = mongoose.model('User', new mongoose.Schema({
      name: String, email: String, password: String
    }));
    
    const user = await User.findOne({ email: 'test@example.com' });
    if (user) {
      console.log('✅ Test user found:', user.email);
    } else {
      console.log('❌ Test user not found');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
}

testConnection();
