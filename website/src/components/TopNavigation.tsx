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
      className="fixed left-0 right-0 top-0 z-50 border-b-2 border-border bg-background lg:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="ink bg-navy px-2 py-1 font-display text-xl font-bold uppercase tracking-tight text-on-dark shadow-neo-sm -rotate-1">
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
                    ? 'border-black bg-navy text-on-dark shadow-neo-sm'
                    : 'border-transparent text-body hover:border-black hover:bg-sky hover:text-on-light'
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
              className="border-2 border-transparent p-2 text-foreground transition-colors hover:border-black hover:bg-sky"
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
              className="mt-3 overflow-hidden border-t-2 border-panel-strong bg-background md:hidden"
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
                        ? 'border-black bg-navy text-on-dark'
                        : 'border-transparent text-body hover:border-black hover:bg-sky hover:text-on-light'
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
