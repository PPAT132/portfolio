const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailConfig() {
  console.log('🧪 Testing Email Configuration...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ Missing'}`);
  console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing'}`);
  console.log(`PORT: ${process.env.PORT || '3001 (default)'}\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Missing required environment variables!');
    console.log('Please check your .env file.\n');
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    // Test connection
    console.log('🔗 Testing Gmail connection...');
    await transporter.verify();
    console.log('✅ Gmail connection successful!\n');

    // Send test email
    console.log('📧 Sending test email...');
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'maxiaoma833@gmail.com',
      subject: 'Portfolio Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🧪 Email Configuration Test</h2>
          <p>This is a test email from your portfolio backend server.</p>
          <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>Server:</strong> Portfolio Backend</p>
            <p><strong>Status:</strong> ✅ Working correctly</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you received this email, your email configuration is working properly!
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📬 Sent to: ${testMailOptions.to}\n`);

    console.log('🎉 Email configuration test completed successfully!');
    console.log('Your portfolio email system is ready to use.\n');

  } catch (error) {
    console.log('❌ Email test failed:');
    console.log(`Error: ${error.message}\n`);
    
    if (error.message.includes('Invalid login')) {
      console.log('💡 Troubleshooting tips:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. Enable 2-Step Verification in your Google Account');
      console.log('3. Generate a new App Password specifically for this application');
      console.log('4. Check that EMAIL_USER matches your Gmail address exactly\n');
    }
  }
}

// Run the test
testEmailConfig();
