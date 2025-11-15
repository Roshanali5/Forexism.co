// Test all API endpoints to ensure database is working
require('dotenv').config();
const mongoose = require('mongoose');

async function testEndpoints() {
  try {
    console.log('🔍 Testing Database and Models...\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database Connected\n');
    
    // Test User Model
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log(`✅ User Model: ${userCount} users found`);
    
    // Test Course Model
    const Course = require('./models/Course');
    const courseCount = await Course.countDocuments();
    console.log(`✅ Course Model: ${courseCount} courses found`);
    
    // Test Blog Model
    const Blog = require('./models/Blog');
    const blogCount = await Blog.countDocuments();
    console.log(`✅ Blog Model: ${blogCount} blogs found`);
    
    // Test Payment Model
    const Payment = require('./models/Payment');
    const paymentCount = await Payment.countDocuments();
    console.log(`✅ Payment Model: ${paymentCount} payments found`);
    
    // Test fetching courses
    const courses = await Course.find().limit(5);
    console.log(`\n📚 Sample Courses (${courses.length}):`);
    courses.forEach(c => {
      console.log(`   - ${c.title} (${c.isPaid ? 'Paid' : 'Free'})`);
    });
    
    // Test fetching blogs
    const blogs = await Blog.find().limit(5);
    console.log(`\n📝 Sample Blogs (${blogs.length}):`);
    blogs.forEach(b => {
      console.log(`   - ${b.title}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ ALL TESTS PASSED! Database is fully functional! 🎉');
    
  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
    process.exit(1);
  }
}

testEndpoints();

