import { Link, useLocation } from 'react-router-dom';
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
    <nav className="fixed top-0 left-0 right-0 w-full bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => handleNavClick('home')}
          >
            Patrick Ma
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                  }`}
                  onClick={() => handleNavClick(item.section)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                }`}
                onClick={() => handleNavClick(item.section)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
