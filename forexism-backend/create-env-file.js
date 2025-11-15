// Script to create .env file automatically
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('📝 If you want to recreate it, delete the existing .env file first');
  process.exit(0);
}

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Default MongoDB connection (local)
const mongoURI = 'mongodb://localhost:27017/forexism';

// MongoDB Atlas connection (from testMongo.js)
const atlasURI = 'mongodb+srv://Forexism:Pakistan%40403@cluster0.4nnzfd2.mongodb.net/forexism?retryWrites=true&w=majority&appName=Cluster0';

// Create .env content
const envContent = `# Forexism Backend Environment Variables
# Generated automatically - ${new Date().toISOString()}

# Server Configuration
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Database Connection
# Option 1: Local MongoDB (default)
MONGODB_URI=${mongoURI}

# Option 2: MongoDB Atlas (cloud) - uncomment to use instead
# MONGODB_URI=${atlasURI}

# JWT Authentication Secret (auto-generated)
# Keep this secret and never share it!
JWT_SECRET=${jwtSecret}
JWT_EXPIRE=7d
`;

// Write .env file
try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log(`📁 Location: ${envPath}`);
  console.log('\n📋 Configuration:');
  console.log(`   PORT: 5001`);
  console.log(`   MongoDB: ${mongoURI}`);
  console.log(`   JWT Secret: Generated (${jwtSecret.substring(0, 20)}...)`);
  console.log('\n💡 Next Steps:');
  console.log('   1. If using MongoDB Atlas, update MONGODB_URI in .env');
  console.log('   2. If using local MongoDB, make sure it\'s running');
  console.log('   3. Start your server: npm start');
  console.log('\n✅ Ready to go!');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.error('\n💡 Create the file manually with the content above');
  process.exit(1);
}

