import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';

interface ContactProps {
  setCurrentSection: (section: string) => void;
}

const Contact = ({ setCurrentSection }: ContactProps) => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'maxiaoma833@gmail.com',
      url: 'mailto:maxiaoma833@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/maxiao-ma-2162752b3',
      url: 'https://www.linkedin.com/in/maxiao-ma-2162752b3/',
      color: 'hover:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/PPAT132',
      url: 'https://github.com/PPAT132',
      color: 'hover:text-gray-300'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Waterloo, ON, Canada',
      url: '#',
      color: 'hover:text-green-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (437) 818-0920',
      url: 'tel:+14378180920',
      color: 'hover:text-purple-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Contact
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.url}
              target={contact.url.startsWith('http') ? '_blank' : '_self'}
              rel={contact.url.startsWith('http') ? 'noopener noreferrer' : ''}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-600 transition-colors`}>
                  <contact.icon className={`text-gray-300 ${contact.color} transition-colors`} size={24} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm font-medium">{contact.label}</h3>
                  <p className="text-gray-100 font-semibold">{contact.value}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Message Section */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Let's Work Together</h2>
          <p className="text-gray-300 text-center mb-8 leading-relaxed">
            I'm currently looking for new opportunities, particularly co-op positions starting Fall 2025. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">What I'm Looking For</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Full-stack development opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>AI/ML integration projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Product-focused engineering roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Co-op positions starting Fall 2025</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Available for remote and on-site work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Quick response time (usually within 24 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Open to relocation for the right opportunity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Always excited to learn new technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to start a conversation?</p>
          <motion.a
            href="mailto:maxiaoma833@gmail.com"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Me an Email
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
