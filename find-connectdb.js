const fs = require('fs');
const path = require('path');

console.log('🔍 FINDING connectDB FUNCTION...\\n');

// Search all JS files for connectDB
const files = fs.readdirSync('.');
files.forEach(file => {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('function connectDB') || content.includes('const connectDB') || content.includes('connectDB =')) {
      console.log('✅ connectDB found in:', file);
      const lines = content.split('\\n');
      lines.forEach((line, index) => {
        if (line.includes('connectDB')) {
          console.log('   Line', index + 1 + ':', line.trim());
        }
      });
    }
  }
});

// Also check config directory
try {
  const configFiles = fs.readdirSync('./config');
  console.log('\\n📁 Config files:', configFiles);
  configFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const content = fs.readFileSync(path.join('./config', file), 'utf8');
      if (content.includes('connectDB')) {
        console.log('✅ connectDB in config/', file);
      }
    }
  });
} catch (error) {
  console.log('\\n📁 No config directory');
}
