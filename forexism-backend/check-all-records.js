// Check ALL records in detail
require('dotenv').config();
const mongoose = require('mongoose');

async function checkAllRecords() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database\n');
    
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(`📊 Database: ${dbName}\n`);
    
    // Get ALL collections
    const collections = await db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections:\n`);
    
    for (const colInfo of collections) {
      const collection = db.collection(colInfo.name);
      const count = await collection.countDocuments();
      
      console.log(`📋 Collection: ${colInfo.name}`);
      console.log(`   Total Records: ${count}`);
      
      if (count > 0) {
        // Get ALL records (not just samples)
        const allRecords = await collection.find({}).toArray();
        console.log(`   ✅ All ${count} records found`);
        
        // Show first few records
        allRecords.slice(0, 5).forEach((doc, idx) => {
          console.log(`\n   Record ${idx + 1}:`);
          if (colInfo.name === 'users') {
            console.log(`      Name: ${doc.name || 'N/A'}`);
            console.log(`      Email: ${doc.email || 'N/A'}`);
            console.log(`      Admin: ${doc.isAdmin || false}`);
            console.log(`      Enrolled: ${doc.enrolledCourses?.length || 0} courses`);
            console.log(`      Created: ${doc.createdAt || 'N/A'}`);
          } else if (colInfo.name === 'courses') {
            console.log(`      Title: ${doc.title || 'N/A'}`);
            console.log(`      Price: $${doc.price || 0}`);
            console.log(`      Paid: ${doc.isPaid || false}`);
            console.log(`      Level: ${doc.level || 'N/A'}`);
            console.log(`      Enrolled: ${doc.enrolledStudents?.length || 0} students`);
            console.log(`      Created: ${doc.createdAt || 'N/A'}`);
          } else if (colInfo.name === 'blogs') {
            console.log(`      Title: ${doc.title || 'N/A'}`);
            console.log(`      Category: ${doc.category || 'N/A'}`);
            console.log(`      Author: ${doc.author || 'N/A'}`);
            console.log(`      Created: ${doc.createdAt || 'N/A'}`);
          } else if (colInfo.name === 'payments') {
            console.log(`      Status: ${doc.status || 'N/A'}`);
            console.log(`      Amount: $${doc.amount || 0}`);
            console.log(`      Method: ${doc.paymentMethod || 'N/A'}`);
            console.log(`      Created: ${doc.createdAt || 'N/A'}`);
          }
        });
        
        if (count > 5) {
          console.log(`\n   ... and ${count - 5} more records`);
        }
      }
      console.log('\n' + '='.repeat(60) + '\n');
    }
    
    // Check database stats
    const stats = await db.stats();
    console.log('📊 Database Statistics:');
    console.log(`   Collections: ${stats.collections}`);
    console.log(`   Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    console.log(`   Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    console.log(`   Indexes: ${stats.indexes}`);
    console.log(`   Index Size: ${(stats.indexSize / 1024).toFixed(2)} KB`);
    
    await mongoose.connection.close();
    console.log('\n✅ Complete check finished!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAllRecords();

