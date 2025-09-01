import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Navbar = ({ currentSection, setCurrentSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/about', section: 'about' },
    { name: 'Experience', path: '/experience', section: 'experience' },
    { name: 'Projects', path: '/projects', section: 'projects' },
    { name: 'Skills', path: '/skills', section: 'skills' },
    { name: 'Contact', path: '/contact', section: 'contact' },
  ];

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => handleNavClick('home')}
            >
              Patrick Ma
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    }`}
                    onClick={() => handleNavClick(item.section)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-400 bg-gray-800'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
                onClick={() => handleNavClick(item.section)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
