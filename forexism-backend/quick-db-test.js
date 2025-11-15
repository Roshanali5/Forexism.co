// Quick database connection test
require('dotenv').config();
const mongoose = require('mongoose');

async function testDB() {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  // Show what we're trying to connect to
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env file');
    return;
  }
  
  // Mask password for security
  const maskedURI = uri.replace(/:[^:@]+@/, ':****@');
  console.log(`📡 Connection String: ${maskedURI.substring(0, 80)}...`);
  console.log(`📏 Length: ${uri.length} characters\n`);
  
  try {
    console.log('⏳ Attempting connection...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ SUCCESS! MongoDB Connected!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState}`);
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`\n📊 Collections in database: ${collections.length}`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Connection Failed!');
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Authentication Error - Check your username/password in MONGODB_URI');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Network Error - Check your internet connection and MongoDB Atlas cluster status');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Timeout Error - MongoDB server might be down or unreachable');
    } else {
      console.error('\n💡 Check your connection string format');
      console.error('   Format: mongodb+srv://username:password@cluster.mongodb.net/database');
    }
    
    process.exit(1);
  }
}

testDB();

