const mongoose = require('mongoose');

async function checkUser() {
  await mongoose.connect('mongodb://localhost:27017/forexism');
  
  const User = mongoose.model('User', new mongoose.Schema({
    name: String, email: String, password: String, role: String
  }));
  
  const users = await User.find();
  console.log('Users in database:', users.length);
  users.forEach(user => {
    console.log('-', user.email, '(', user.name, ')');
  });
  
  await mongoose.connection.close();
}

checkUser();
