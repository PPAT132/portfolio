import { motion } from 'framer-motion';
import { Mail, Send, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { cn } from '../lib/cn';
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
    <div className="min-h-screen bg-background bg-grid font-mono text-foreground">
      <div className="border-b-2 border-border bg-background px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className={buttonStyles({
              variant: 'outline',
              size: 'sm',
              className: 'shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-none',
            })}
          >
            <ArrowLeft aria-hidden="true" size={20} />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <Mail className="text-accent-cyan" size={24} />
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
          <SectionHeading variant="boxed" className="mb-4 inline-block">
            INITIALIZE_COMMS
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-body sm:text-lg">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, 
            or just want to say hello, feel free to send me a message.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card variant="flat" className="p-4 sm:p-6 lg:p-8">
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
              <label htmlFor="name" className="form-label text-accent-cyan">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input focus:border-accent-cyan focus-visible:outline-accent-cyan"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label text-accent-green">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input focus:border-accent-green focus-visible:outline-accent-green"
                placeholder="Enter your email address"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="form-label text-accent-purple">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="form-input focus:border-accent-purple focus-visible:outline-accent-purple"
                placeholder="What's this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="form-label text-accent-yellow">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="form-input resize-none focus:border-accent-yellow focus-visible:outline-accent-yellow"
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
                className: cn(
                  'w-full gap-3 tracking-widest duration-300',
                  'disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none',
                ),
              })}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
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
              className="mt-6 flex items-center gap-3 border-2 border-accent-green bg-panel p-4"
            >
              <CheckCircle aria-hidden="true" className="text-accent-green" size={24} />
              <span className="font-mono font-bold text-accent-green">
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
              className="mt-6 flex items-center gap-3 border-2 border-error bg-panel p-4"
            >
              <XCircle aria-hidden="true" className="text-error" size={24} />
              <span className="font-mono font-bold text-error">
                ERROR: {errorMessage || 'TRANSMISSION FAILED.'}
              </span>
            </motion.div>
          )}

          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="inline-block border-2 border-line bg-background p-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">Quick Response Protocol</h3>
            <p className="font-sans text-sm text-muted">
              I typically respond within 24 hours. Urgent? Contact direct:
              <br/>
              <a 
                href="mailto:maxiaoma833@gmail.com" 
                className="mt-2 inline-block border-b-2 border-navy font-mono text-navy transition-colors hover:bg-navy hover:text-on-dark"
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
