const fs = require('fs');
require('dotenv').config();

console.log('🔧 FIXING MONGODB CONNECTION ISSUE...\\n');

// 1. Check current environment
console.log('1. Checking current environment:');
console.log('   MONGODB_URI:', process.env.MONGODB_URI || '❌ NOT SET');
console.log('   Current directory:', process.cwd());

// 2. Create proper .env file
console.log('\\n2. Creating proper .env file...');
const envContent = \
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/forexism
JWT_SECRET=mySuper_Secret_Key_Forexism_2024_Change_This_In_Production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
\;

fs.writeFileSync('.env', envContent);
console.log('   ✅ .env file updated');

// 3. Reload environment and test
console.log('\\n3. Testing environment after fix...');
delete require.cache[require.resolve('dotenv')];
require('dotenv').config();

console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ NOW SET' : '❌ STILL MISSING');

// 4. Test database connection
console.log('\\n4. Testing database connection...');
const mongoose = require('mongoose');

async function testDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('   ✅ Database connection successful!');
    
    const User = mongoose.model('User', new mongoose.Schema({ email: String }));
    const userCount = await User.countDocuments();
    console.log('   📊 Users in database:', userCount);
    
    await mongoose.connection.close();
    console.log('\\n🎯 MONGODB FIX COMPLETED!');
    console.log('You can now restart your backend server.');
  } catch (error) {
    console.log('   ❌ Database connection failed:', error.message);
    console.log('\\n⚠️  Make sure MongoDB is running on your system.');
    console.log('   You can start MongoDB with: mongod');
  }
}

testDB();
