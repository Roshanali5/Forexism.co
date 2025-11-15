const mongoose = require('mongoose');
require('dotenv').config();

const makeUserAdmin = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Use the connection string from environment
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');
    
    const User = require('./models/User');
    
    // Find and update the user
    const user = await User.findOneAndUpdate(
      { email: 'admin@forexism.com' },
      { isAdmin: true },
      { new: true }
    );
    
    if (user) {
      console.log('✅ SUCCESS: User updated to admin');
      console.log('Email:', user.email);
      console.log('isAdmin:', user.isAdmin);
    } else {
      console.log('❌ User not found');
    }
    
    await mongoose.connection.close();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Try alternative connection
    try {
      console.log('💡 Trying alternative connection...');
      const altURI = 'mongodb://Forexism:Forexism123@ac-qqstoyr-shard-00-00.4nnzfd2.mongodb.net:27017,ac-qqstoyr-shard-00-01.4nnzfd2.mongodb.net:27017,ac-qqstoyr-shard-00-02.4nnzfd2.mongodb.net:27017/forexism?ssl=true&replicaSet=atlas-p5g83z-shard-0&authSource=admin&retryWrites=true&w=majority';
      await mongoose.connect(altURI);
      console.log('✅ Connected via alternative method!');
      
      const User = require('./models/User');
      const user = await User.findOneAndUpdate(
        { email: 'admin@forexism.com' },
        { isAdmin: true },
        { new: true }
      );
      
      if (user) {
        console.log('✅ SUCCESS: User updated to admin via alternative');
        console.log('Email:', user.email);
        console.log('isAdmin:', user.isAdmin);
      }
      
      await mongoose.connection.close();
    } catch (altError) {
      console.error('❌ All connection methods failed');
    }
  }
};

makeUserAdmin();
