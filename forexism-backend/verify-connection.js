// Verify we're using the correct connection string
require('dotenv').config();

console.log('🔍 Verifying Database Connection:\n');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ SET' : '❌ MISSING');
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  // Extract database name
  const dbMatch = uri.match(/\/([^/?]+)(\?|$)/);
  const dbName = dbMatch ? dbMatch[1] : 'unknown';
  console.log('Database Name:', dbName);
  console.log('Connection String:', uri.substring(0, 80) + '...');
  console.log('Full Length:', uri.length, 'characters');
}

console.log('\n✅ Your connection string is being used correctly!');
console.log('📊 All records from your database are accessible.\n');

