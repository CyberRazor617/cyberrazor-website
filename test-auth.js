#!/usr/bin/env node

/**
 * Simple test script to verify authentication endpoints
 * Run this after starting the backend server
 */

const BACKEND_URL = 'https://cyberrazorbackend.vercel.app';

async function testSignup() {
  console.log('🧪 Testing signup endpoint...');
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test_user_' + Date.now(),
        email: `test${Date.now()}@example.com`,
        password: 'TestPassword123!'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Signup test passed:', data.message);
      return data.user;
    } else {
      console.log('❌ Signup test failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Signup test error:', error.message);
    return null;
  }
}

async function testLogin(email, password) {
  console.log('🧪 Testing login endpoint...');
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login test passed:', data.message);
      return data.access_token;
    } else {
      console.log('❌ Login test failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Login test error:', error.message);
    return null;
  }
}

async function testAuthStatus(email) {
  console.log('🧪 Testing auth status endpoint...');
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/status?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Auth status test passed:', data.message);
      return data;
    } else {
      console.log('❌ Auth status test failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Auth status test error:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Starting authentication tests...\n');
  
  // Test signup
  const user = await testSignup();
  if (!user) {
    console.log('❌ Tests failed at signup step');
    return;
  }
  
  console.log('');
  
  // Test auth status
  await testAuthStatus(user.email);
  
  console.log('');
  
  // Note: Login will fail because account is pending
  console.log('ℹ️  Note: Login test will fail because account is pending approval');
  await testLogin(user.email, 'TestPassword123!');
  
  console.log('\n✅ All tests completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Start the backend server: cd backend && npm start');
  console.log('2. Start the website: cd website && npm run dev');
  console.log('3. Start the user portal: cd user && npm run dev');
  console.log('4. Test the flow at http://localhost:3000/signup');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testSignup, testLogin, testAuthStatus };
