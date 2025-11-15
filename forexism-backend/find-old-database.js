// Find your old database with all records
require('dotenv').config();
const mongoose = require('mongoose');

async function findOldDatabase() {
  try {
    console.log('🔍 Searching for your old database with all records...\n');
    
    const uri = process.env.MONGODB_URI;
    console.log('📡 Connection String:', uri.substring(0, 60) + '...\n');
    
    // Connect to admin database first to list all databases
    await mongoose.connect(uri.replace(/\/[^/?]+(\?|$)/, '/admin$1'), {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to MongoDB Atlas\n');
    
    // List all databases using native driver
    const client = mongoose.connection.getClient();
    const adminDb = client.db('admin').admin();
    const { databases } = await adminDb.listDatabases();
    
    console.log('📊 Available Databases:\n');
    for (const db of databases) {
      console.log(`   - ${db.name} (Size: ${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    }
    
    console.log('\n🔍 Checking databases for your records...\n');
    
    // Check forexism database specifically
    console.log('📁 Database: forexism');
    const forexismDb = client.db('forexism');
    const collections = await forexismDb.listCollections().toArray();
    
    let totalRecords = 0;
    for (const col of collections) {
      const collection = forexismDb.collection(col.name);
      const count = await collection.countDocuments();
      totalRecords += count;
      
      if (count > 0) {
        console.log(`   ✅ ${col.name}: ${count} records`);
        
        // Show sample records
        const samples = await collection.find().limit(2).toArray();
        samples.forEach((doc, idx) => {
          if (col.name === 'users') {
            console.log(`      → ${doc.name || doc.email || 'User'} (${doc.email || 'no email'})`);
          } else if (col.name === 'courses') {
            console.log(`      → ${doc.title || 'Course'} (${doc.isPaid ? 'Paid' : 'Free'})`);
          } else if (col.name === 'blogs') {
            console.log(`      → ${doc.title || 'Blog'} (${doc.category || 'No category'})`);
          } else if (col.name === 'payments') {
            console.log(`      → Payment ${doc.status || 'pending'} (${doc.amount || 'N/A'})`);
          }
        });
        if (count > 2) {
          console.log(`      ... and ${count - 2} more records`);
        }
      } else {
        console.log(`   ⚪ ${col.name}: 0 records (empty)`);
      }
    }
    
    console.log(`\n📊 Total records in forexism: ${totalRecords}`);
    
    // Also check other databases
    console.log('\n🔍 Checking other databases...\n');
    for (const dbInfo of databases) {
      if (['admin', 'local', 'config', 'forexism'].includes(dbInfo.name)) continue;
      
      try {
        const otherDb = client.db(dbInfo.name);
        const otherCollections = await otherDb.listCollections().toArray();
        
        if (otherCollections.length > 0) {
          let otherTotal = 0;
          for (const col of otherCollections) {
            const collection = otherDb.collection(col.name);
            const count = await collection.countDocuments();
            otherTotal += count;
          }
          
          if (otherTotal > 0) {
            console.log(`📁 Database: ${dbInfo.name} (${otherTotal} total records)`);
            for (const col of otherCollections) {
              const collection = otherDb.collection(col.name);
              const count = await collection.countDocuments();
              if (count > 0) {
                console.log(`   ${col.name}: ${count} records`);
              }
            }
            console.log('');
          }
        }
      } catch (err) {
        // Skip errors
      }
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Search complete!\n');
    console.log('💡 If you see your old records in a different database,');
    console.log('   change the database name in MONGODB_URI (the part after /)\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

findOldDatabase();
