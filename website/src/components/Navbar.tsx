import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Navbar = ({ currentSection, setCurrentSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Experience', section: 'experience' },
    { name: 'Projects', section: 'projects' },
    { name: 'Contact', section: 'contact' },
    { name: 'Skills', section: 'skills' },
  ];

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    setIsOpen(false);
    
    // If we're on the email page, navigate to home first
    if (window.location.pathname === '/email') {
      window.location.href = `/#${section}`;
      return;
    }
    
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => handleNavClick('home')}
          >
            Patrick Ma
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentSection === item.section
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                  }`}
                  onClick={() => handleNavClick(item.section)}
                >
                  {item.name}
                </button>
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
              <button
                key={item.name}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  currentSection === item.section
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                }`}
                onClick={() => handleNavClick(item.section)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
