const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:5001/api';

async function testAuthFlow() {
  console.log('🔐 Testing Authentication Flow...\n');
  
  // 1. Test server connectivity
  try {
    const ping = await axios.get(\\/auth/verify\, { timeout: 5000 });
    console.log('✅ Server is responding');
  } catch (error) {
    console.log('❌ Server not reachable:', error.message);
    return;
  }

console.log('\n2. Testing login endpoint...');
  try {
    const loginResponse = await axios.post(\\/auth/login\, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Login endpoint working');
      console.log('Token received:', !!loginResponse.data.token);
      console.log('User data received:', !!loginResponse.data.user);
      
      // 3. Test token verification
      console.log('\n3. Testing token verification...');
      const verifyResponse = await axios.get(\\/auth/verify\, {
        headers: {
          Authorization: \Bearer \\
        }
      });
      
      if (verifyResponse.data.success) {
        console.log('✅ Token verification working');
        console.log('User from verify:', verifyResponse.data.user.email);
      }
      
    } else {
      console.log('❌ Login failed:', loginResponse.data.message);
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.response?.data?.message || error.message);
  }
}

testAuthFlow();
