import { motion } from 'framer-motion';
import { Mail, Send, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  containerVariants,
  itemVariants,
  statusMessageVariants,
} from '../lib/motion';

const EmailMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Contact from Portfolio Website',
    message: ''
  });
  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'form-name': 'contact',
          'bot-field': botField,
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'Contact from Portfolio Website',
          message: ''
        });
        setBotField('');
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send message, please try again');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage('Network connection error, please check your connection and try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-mono bg-grid">
      {/* Header */}
      <div className="bg-black border-b-2 border-white px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className="flex items-center gap-2 px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors uppercase font-bold text-sm tracking-wide"
          >
            <ArrowLeft aria-hidden="true" size={20} />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <Mail className="text-cyber-blue" size={24} />
            <h1 className="text-2xl font-bold uppercase tracking-tighter">
              Email_Me
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-cyber-blue text-black inline-block px-2 border-2 border-white shadow-neo-sm">
            INITIALIZE_COMMS
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans mt-4">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, 
            or just want to say hello, feel free to send me a message.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card surface={false} className="bg-black p-4 sm:p-6 lg:p-8">
            <form
            name="contact"
            method="POST"
            action="/__forms.html"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don't fill this out if you're human:
                <input
                  name="bot-field"
                  value={botField}
                  onChange={(event) => setBotField(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </p>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-cyber-blue mb-2 uppercase tracking-wider">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-blue transition-colors font-sans"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-cyber-green mb-2 uppercase tracking-wider">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-green transition-colors font-sans"
                placeholder="Enter your email address"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-cyber-purple mb-2 uppercase tracking-wider">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-purple focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-purple transition-colors font-sans"
                placeholder="What's this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-cyber-yellow mb-2 uppercase tracking-wider">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-yellow focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-yellow transition-colors resize-none font-sans"
                placeholder="Tell me about your project, idea, or just say hello..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={buttonStyles({
                variant: 'primary',
                size: 'lg',
                className:
                  'w-full gap-3 tracking-widest duration-300 disabled:border-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:opacity-100 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none',
              })}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <Send size={20} />
                  SEND MESSAGE
                </>
              )}
            </motion.button>
            </form>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              role="status"
              aria-live="polite"
              initial="hidden"
              animate="visible"
              variants={statusMessageVariants}
              className="mt-6 p-4 bg-gray-900 border-2 border-cyber-green flex items-center gap-3"
            >
              <CheckCircle aria-hidden="true" className="text-cyber-green" size={24} />
              <span className="text-cyber-green font-bold font-mono">
                SUCCESS: MESSAGE TRANSMITTED.
              </span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              role="alert"
              aria-live="assertive"
              initial="hidden"
              animate="visible"
              variants={statusMessageVariants}
              className="mt-6 p-4 bg-gray-900 border-2 border-red-500 flex items-center gap-3"
            >
              <XCircle aria-hidden="true" className="text-red-500" size={24} />
              <span className="text-red-500 font-bold font-mono">
                ERROR: {errorMessage || 'TRANSMISSION FAILED.'}
              </span>
            </motion.div>
          )}

          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="bg-black border-2 border-gray-700 p-6 inline-block">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Quick Response Protocol</h3>
            <p className="text-gray-400 font-sans text-sm">
              I typically respond within 24 hours. Urgent? Contact direct:
              <br/>
              <a 
                href="mailto:maxiaoma833@gmail.com" 
                className="text-cyber-blue hover:bg-cyber-blue hover:text-black transition-colors inline-block mt-2 font-mono border-b border-cyber-blue"
              >
                maxiaoma833@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailMe;
