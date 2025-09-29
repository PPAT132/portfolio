const axios = require('axios');

console.log('🧪 Testing Rate Limits...\n');

const API_URL = 'http://localhost:3001/api/send-email';

// Test data - 简单测试数据
const testEmails = [
  {
    name: 'Test 1',
    email: 'test1@example.com',
    subject: 'Test',
    message: 'Test message 1'
  },
  {
    name: 'Test 2', 
    email: 'test2@example.com',
    subject: 'Test',
    message: 'Test message 2'
  },
  {
    name: 'Test 3',
    email: 'test3@example.com',
    subject: 'Test', 
    message: 'Test message 3'
  },
  {
    name: 'Test 4',
    email: 'test4@example.com',
    subject: 'Test', 
    message: 'Test message 4'
  },
  {
    name: 'Test 5',
    email: 'test5@example.com',
    subject: 'Test', 
    message: 'Test message 5'
  },
  {
    name: 'Test 6',
    email: 'test6@example.com',
    subject: 'Test', 
    message: 'Test message 6 - should be blocked'
  }
];

async function sendTestEmail(emailData, testNumber) {
  try {
    console.log(`📧 Test ${testNumber}: Sending email from ${emailData.email}...`);
    
    const response = await axios.post(API_URL, emailData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`✅ Test ${testNumber}: Success!`);
    console.log(`   Response: ${response.data.message}\n`);
    
    return true;
  } catch (error) {
    if (error.response) {
      console.log(`🚫 Test ${testNumber}: Rate limited!`);
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${error.response.data.error}`);
      console.log(`   Message: ${error.response.data.message}\n`);
    } else {
      console.log(`❌ Test ${testNumber}: Network error:`, error.message, '\n');
    }
    return false;
  }
}

async function runTests() {
  console.log('🔍 Testing scenario: 15分钟内发送6封邮件（同一IP）\n');
  
  for (let i = 0; i < testEmails.length; i++) {
    await sendTestEmail(testEmails[i], i + 1);
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 0.5 seconds
  }
  
  console.log('📊 Rate limit testing completed!');
  console.log('💡 Expected results:');
  console.log('   - Tests 1-5: Should succeed');
  console.log('   - Test 6: Should be rate limited (IP exceeded 5 per 15 minutes)');
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Server is running!\n');
    return true;
  } catch (error) {
    console.log('❌ Server is not running! Please start the server first:');
    console.log('   cd /Users/patrick/Desktop/Personal_web/portfolio/backend');
    console.log('   node server.js\n');
    return false;
  }
}

// Main execution
checkServer().then(serverRunning => {
  if (serverRunning) {
    runTests();
  }
});
