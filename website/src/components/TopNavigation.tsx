import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { sections, type SectionId } from '../config/sections';

interface TopNavigationProps {
  currentSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const TopNavigation = ({
  currentSection,
  onNavigate,
}: TopNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (sectionId: SectionId) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-black border-b-2 border-white lg:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="text-xl font-bold text-white font-mono tracking-tighter uppercase border-2 border-white px-2 py-1 bg-black shadow-neo-sm">
            Patrick_Ma
          </div>
          
          {/* Desktop Navigation Links (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => handleNavigate(section.id)}
                aria-current={
                  currentSection === section.id ? 'page' : undefined
                }
                className={`text-sm font-bold font-mono uppercase tracking-wider px-3 py-1 border-2 transition-all duration-200 ${
                  currentSection === section.id
                    ? 'text-black bg-cyber-blue border-cyber-blue shadow-neo-sm'
                    : 'text-gray-300 border-transparent hover:border-white hover:text-white'
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
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-navigation-menu"
              aria-expanded={isMenuOpen}
              aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="text-white hover:text-cyber-blue p-2 border-2 border-transparent hover:border-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t-2 border-gray-800 mt-3 bg-black"
            >
              <div className="py-3 space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    type="button"
                    onClick={() => handleNavigate(section.id)}
                    aria-current={
                      currentSection === section.id ? 'page' : undefined
                    }
                    className={`block w-full text-left px-4 py-3 text-sm font-bold font-mono uppercase tracking-wider border-l-4 transition-all duration-200 ${
                      currentSection === section.id
                        ? 'bg-cyber-blue text-black border-white'
                        : 'text-gray-300 border-transparent hover:bg-gray-900 hover:text-cyber-blue hover:border-cyber-blue'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
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
