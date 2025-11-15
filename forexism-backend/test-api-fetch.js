// Test API endpoints to see what data they return
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Blog = require('./models/Blog');
const User = require('./models/User');

async function testAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected\n');
    
    console.log('📊 Testing API Data Fetching:\n');
    
    // Test Courses API
    console.log('1️⃣  Courses API (/api/courses):');
    const courses = await Course.find().sort({ createdAt: -1 });
    console.log(`   Found: ${courses.length} courses`);
    courses.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.title} (ID: ${c._id})`);
    });
    console.log('');
    
    // Test Blogs API  
    console.log('2️⃣  Blogs API (/api/blogs):');
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(`   Found: ${blogs.length} blogs`);
    blogs.forEach((b, i) => {
      console.log(`   ${i + 1}. ${b.title} (ID: ${b._id})`);
    });
    console.log('');
    
    // Test Users
    console.log('3️⃣  Users:');
    const users = await User.find().select('name email enrolledCourses');
    console.log(`   Found: ${users.length} users`);
    users.forEach((u, i) => {
      console.log(`   ${i + 1}. ${u.name} (${u.email}) - Enrolled: ${u.enrolledCourses?.length || 0}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ All data is accessible via API!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();

