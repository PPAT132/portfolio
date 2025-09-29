import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface TopNavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const TopNavigation = ({ currentSection, setCurrentSection }: TopNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId); // Update current section state
    setIsMenuOpen(false); // Close menu after navigation
    
    // If we're on the email page, navigate to home first
    if (window.location.pathname === '/email') {
      window.location.href = '/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return;
    }
    
    // On home page, scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Patrick Ma
          </div>
          
          {/* Desktop Navigation Links (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors duration-300 px-2 py-1 rounded ${
                  currentSection === section.id
                    ? 'text-blue-400 bg-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-700 mt-3"
            >
              <div className="py-3 space-y-1">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                      currentSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default TopNavigation;
