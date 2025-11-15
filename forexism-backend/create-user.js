const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/forexism');
    console.log('Connected to database');
    
    // User schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String
    }, { timestamps: true });
    
    const User = mongoose.model('User', userSchema);
    
    // Check if user exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash('password123', 12);
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      });
      
      await user.save();
      console.log('✅ USER CREATED: test@example.com / password123');
    }
    
    await mongoose.connection.close();
    console.log('User setup complete!');
  } catch (error) {
    console.log('Error:', error.message);
  }
}

createUser();
