// Simple database connection fix
require('dotenv').config();
const mongoose = require('mongoose');

console.log('Adding MongoDB connection to server.js...');

// Read current server.js
const fs = require('fs');
let content = fs.readFileSync('server.js', 'utf8');

// Add mongoose require and connection after dotenv
if (!content.includes('const mongoose = require')) {
  content = content.replace(
    "require('dotenv').config();",
    "require('dotenv').config();\\nconst mongoose = require('mongoose');"
  );
}

// Add connection before any routes
if (!content.includes('mongoose.connect')) {
  const routesIndex = content.indexOf('app.use');
  if (routesIndex > -1) {
    const dbConnection = '\\n// Database Connection\\nmongoose.connect(process.env.MONGODB_URI)\\n  .then(() => console.log(\\'✅ MongoDB Connected successfully\\'))\\n  .catch(err => console.log(\\'❌ MongoDB Connection Error:\\', err.message));\\n';
    content = content.slice(0, routesIndex) + dbConnection + content.slice(routesIndex);
  }
}

// Write back
fs.writeFileSync('server.js', content);
console.log('✅ Database connection added to server.js');
