const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log('\nTesting connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  } else {
    console.log('✅ Connection successful! Server is ready to send emails.');
  }
  process.exit(0);
});
