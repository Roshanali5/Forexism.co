const fs = require('fs');
const serverContent = fs.readFileSync('server.js', 'utf8');

console.log('🔍 Checking server.js MongoDB connection...');

// Check if mongoose.connect is using process.env.MONGODB_URI
if (serverContent.includes('mongoose.connect') && serverContent.includes('process.env.MONGODB_URI')) {
  console.log('✅ mongoose.connect is using process.env.MONGODB_URI');
} else if (serverContent.includes('mongoose.connect') && !serverContent.includes('process.env.MONGODB_URI')) {
  console.log('❌ mongoose.connect is NOT using process.env.MONGODB_URI');
  console.log('This is the problem!');
} else {
  console.log('❌ mongoose.connect not found in server.js');
}

// Check the exact mongoose.connect line
const mongooseConnectLine = serverContent.split('\n').find(line => line.includes('mongoose.connect'));
if (mongooseConnectLine) {
  console.log('Current mongoose.connect line:');
  console.log('  ', mongooseConnectLine.trim());
}
