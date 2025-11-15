const mongoose = require('mongoose');
require('dotenv').config();

const updateUserToAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const User = require('./models/User');
    const user = await User.findOneAndUpdate(
      { email: 'admin@forexism.com' },
      { isAdmin: true },
      { new: true }
    );
    
    if (user) {
      console.log('✅ User updated to admin:', user.email, '- isAdmin:', user.isAdmin);
    } else {
      console.log('❌ User not found');
    }
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
};

updateUserToAdmin();
