require('dotenv').config();

console.log('🔍 CHECKING ENVIRONMENT VARIABLES:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ SET' : '❌ MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ MISSING');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

if (!process.env.MONGODB_URI) {
  console.log('\\n❌ CRITICAL: MONGODB_URI is missing!');
  console.log('Make sure your .env file is in the correct directory and has MONGODB_URI defined.');
} else {
  console.log('\\n✅ All environment variables are set correctly!');
}
