import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  setCurrentSection: (section: string) => void;
}

const Home = ({ setCurrentSection }: HomeProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const links = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/PPAT132', color: 'hover:text-gray-300' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/maxiao-ma-2162752b3/', color: 'hover:text-blue-400' },
    { icon: FileText, label: 'Résumé', url: '#', color: 'hover:text-green-400' },
    { icon: Mail, label: 'Email', url: 'mailto:maxiaoma833@gmail.com', color: 'hover:text-red-400' },
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Patrick Maxiao Ma
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-6"
            variants={itemVariants}
          >
            Full-Stack Developer • AI Enthusiast • Waterloo CS (Co-op)
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            I build clean, responsive web apps and practical AI tools. Recently: Razor/ASP.NET frontends + C# workflows for an auto marketplace, 
            and an AI-assisted SEO optimizer with FastAPI + a VS Code extension. I like turning messy problems into simple, shippable products.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-gray-500 mb-6">Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 ${link.color}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => setCurrentSection('projects')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/projects">View My Work</Link>
          </motion.button>
          <motion.button
            onClick={() => setCurrentSection('contact')}
            className="px-8 py-4 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">Get In Touch</Link>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
