import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SideNavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const SideNavigation = ({ currentSection, setCurrentSection }: SideNavigationProps) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Update current section based on scroll position
      const sectionElements = sections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      }));

      // Find the current section
      let currentSectionId = 'home';
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i].element;
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if the section is in view with a more generous offset
          if (scrollY + 150 >= sectionTop && scrollY + 150 < sectionBottom) {
            currentSectionId = sectionElements[i].id;
            break;
          }
        }
      }
      
      // Special handling for the last section (contact)
      const lastSection = sectionElements[sectionElements.length - 1];
      if (lastSection.element) {
        const lastRect = lastSection.element.getBoundingClientRect();
        const lastSectionTop = lastRect.top + scrollY;
        
        // If we're near the bottom of the page or in the last section, set to contact
        if (scrollY + windowHeight >= documentHeight - 200 || 
            scrollY + 150 >= lastSectionTop) {
          currentSectionId = 'contact';
        }
      }
      
      setCurrentSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, setCurrentSection]);

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId); // Update current section state
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 z-50 hidden lg:block navigator-responsive">
      <div 
        className="bg-transparent border border-transparent"
        style={{ 
          width: '100px', 
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px'
        }}
      >
        {sections.map((section) => {
          const isCurrent = currentSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative group flex items-center justify-center w-full"
              whileTap={{ scale: 0.9 }}
            >
              {/* Square with dynamic style */}
              <div
                id={`nav-dot-${section.id}`}
                className={`transition-all duration-200 border-2 ${
                  isCurrent
                    ? 'bg-cyber-blue border-cyber-blue w-4 h-4 shadow-[0_0_10px_rgba(0,243,255,0.5)]'
                    : 'bg-transparent border-gray-600 w-3 h-3 hover:border-white hover:bg-white'
                }`}
                style={{
                  transform: isCurrent ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              />
              
              {/* Connecting Line (decoration) */}
              <div className={`absolute right-[calc(50%+10px)] h-[2px] bg-cyber-blue transition-all duration-300 ${isCurrent ? 'w-8 opacity-100' : 'w-0 opacity-0'}`}></div>
              
              {/* Label with dynamic styling */}
              <div
                id={`nav-label-${section.id}`}
                className={`absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black border border-white text-white whitespace-nowrap transition-all duration-200 shadow-neo-sm ${
                  isCurrent
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  {section.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigation;
