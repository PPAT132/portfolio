import { motion } from 'framer-motion';

interface TopNavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const TopNavigation = ({ currentSection, setCurrentSection }: TopNavigationProps) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Patrick Ma
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
