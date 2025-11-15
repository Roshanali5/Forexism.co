const mongoose = require('mongoose');
require('dotenv').config();

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const User = require('./models/User');
    const user = await User.findOne({ email: 'admin@forexism.com' });
    
    if (user) {
      console.log('User found:', user.email, '- isAdmin:', user.isAdmin);
      
      // Update to admin if not already
      if (!user.isAdmin) {
        user.isAdmin = true;
        await user.save();
        console.log('User updated to admin');
      }
    } else {
      console.log('User not found');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

checkUser();
