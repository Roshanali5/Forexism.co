const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Direct connection to your MongoDB Atlas - NO FALLBACKS
    const mongoURI = 'mongodb+srv://Forexism:Forexism123@cluster0.4nnzfd2.mongodb.net/forexism?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.log('💡 Please check:');
    console.log('   1. Internet connection');
    console.log('   2. MongoDB Atlas cluster is running');
    console.log('   3. Password is correct: Forexism123');
    console.log('   4. IP is whitelisted in MongoDB Atlas');
    process.exit(1);
  }
};

module.exports = connectDB;