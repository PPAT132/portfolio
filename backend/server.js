const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'http://192.168.0.18:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'https://patrickmxma.com',
    'https://www.patrickmxma.com',
    'https://golden-unicorn-7ecff5.netlify.app'
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per 15 minutes
  message: {
    error: 'Too many requests',
    message: 'Too many email attempts, please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/send-email', limiter);

// Email configuration - using Resend for better Railway compatibility
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  secure: false,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

// Simple input validation
const emailValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
];

// Email sending endpoint
app.post('/api/send-email', emailValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please check your input and try again',
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'maxiaoma833@gmail.com', // Your email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #FFFFFF; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
            <h3 style="color: #4F46E5; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
            <p style="margin: 0; color: #92400E; font-size: 14px;">
              <strong>Note:</strong> This message was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Log successful email (without sensitive data)
    console.log(`Email sent successfully to ${email} from ${name} at ${new Date().toISOString()}`);
    console.log(`Message ID: ${info.messageId}`);

    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    // Log error details
    console.error('Email sending failed:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // Don't expose internal error details to client
    res.status(500).json({ 
      error: 'Failed to send email',
      message: 'There was an error sending your message. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Email service is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint for Railway health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend service is running',
    timestamp: new Date().toISOString()
  });
});

// Test email configuration endpoint
app.get('/api/test-email-config', async (req, res) => {
  try {
    // Test transporter configuration
    await transporter.verify();
    res.json({
      success: true,
      message: 'Email configuration is valid',
      service: 'Gmail',
      user: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email configuration error',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log('Server started successfully, keeping process alive...');
  console.log('Environment check:', {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
    PORT: process.env.PORT || 'Default 3001'
  });
});

// Keep process alive
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
