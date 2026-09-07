import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field } from '../components/ui/Field';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StatusBanner } from '../components/ui/StatusBanner';
import { containerVariants, itemVariants } from '../lib/motion';

const EmailMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Contact from Portfolio Website',
    message: '',
  });
  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
          message: '',
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
            className={buttonStyles({ variant: 'outline', size: 'sm' })}
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

      <motion.div
        className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center sm:mb-12">
          <SectionHeading variant="filled" size="title" className="mb-4">
            INITIALIZE_COMMS
          </SectionHeading>
          <p className="mt-4 font-sans text-base leading-relaxed text-body sm:text-lg">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate,
            or just want to say hello, feel free to send me a message.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="panel" className="p-4 sm:p-6 lg:p-8">
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
              <Field
                id="name"
                name="name"
                label="Your Name *"
                accent="cyan"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
              <Field
                id="email"
                name="email"
                label="Your Email *"
                type="email"
                accent="green"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
              <Field
                id="subject"
                name="subject"
                label="Subject *"
                accent="purple"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="What's this about?"
              />
              <Field
                id="message"
                name="message"
                label="Message *"
                accent="yellow"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Tell me about your project, idea, or just say hello..."
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={buttonStyles({
                  variant: 'primary',
                  size: 'lg',
                  className: 'w-full gap-3 tracking-widest',
                })}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
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

            {submitStatus === 'success' && (
              <StatusBanner tone="success">SUCCESS: MESSAGE TRANSMITTED.</StatusBanner>
            )}
            {submitStatus === 'error' && (
              <StatusBanner tone="error">
                {`ERROR: ${errorMessage || 'TRANSMISSION FAILED.'}`}
              </StatusBanner>
            )}
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="inline-block border-2 border-line bg-background p-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">
              Quick Response Protocol
            </h3>
            <p className="font-sans text-sm text-muted">
              I typically respond within 24 hours. Urgent? Contact direct:
              <br />
              <a
                href="mailto:maxiaoma833@gmail.com"
                className="mt-2 inline-block border-b border-accent-cyan font-mono text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-background"
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
