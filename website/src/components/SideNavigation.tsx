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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div 
        className="bg-transparent border border-transparent"
        style={{ 
          width: '200px', 
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '48px'
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseY = e.clientY - rect.top;
          const itemHeight = rect.height / sections.length;
          const hoveredIndex = mouseY / itemHeight; // Keep as float for more precision
          
          // Calculate distance from mouse to each section with more granular levels
          const distances = sections.map((_, i) => {
            const distance = Math.abs(i - hoveredIndex);
            
            // Clamp the distance to reasonable ranges
            const clampedDistance = Math.min(distance, 3);
            
            // Add intermediate levels for smoother transitions
            if (clampedDistance === 0) return 0; // On button
            if (clampedDistance < 0.5) return 0.3; // Very close to button
            if (clampedDistance < 1) return 0.7; // Between buttons
            if (clampedDistance < 1.5) return 1.2; // Close to adjacent
            if (clampedDistance < 2) return 1.8; // Two buttons away
            if (clampedDistance < 2.5) return 2.2; // Three buttons away
            return 2.5; // Far away - capped
          });
          
          // Update all sections based on distance
          sections.forEach((s, i) => {
            const distance = distances[i];
            const dotElement = document.getElementById(`nav-dot-${s.id}`);
            const labelElement = document.getElementById(`nav-label-${s.id}`);
            if (dotElement && labelElement) {
              // More granular scale calculation
              let scale, opacity;
              if (distance === 0) {
                scale = 1.3; opacity = 1; // On button - largest
              } else if (distance === 0.3) {
                scale = 1.2; opacity = 0.9; // Very close - large
              } else if (distance === 0.7) {
                scale = 1.1; opacity = 0.8; // Between buttons - medium-large
              } else if (distance === 1.2) {
                scale = 1.0; opacity = 0.7; // Close to adjacent - normal
              } else if (distance === 1.8) {
                scale = 0.9; opacity = 0.6; // Two away - smaller
              } else if (distance === 2.2) {
                scale = 0.8; opacity = 0.5; // Three away - smaller
              } else {
                scale = 0.7; opacity = 0.3; // Far away - smallest
              }
              
              dotElement.style.transform = `scale(${scale})`;
              dotElement.style.opacity = opacity.toString();
              labelElement.style.transform = `translateY(-50%) scale(${scale})`;
              labelElement.style.opacity = opacity.toString();
            }
          });
        }}
        onMouseLeave={() => {
          // Reset to default state - current section is largest
          sections.forEach((s) => {
            const dotElement = document.getElementById(`nav-dot-${s.id}`);
            const labelElement = document.getElementById(`nav-label-${s.id}`);
            if (dotElement && labelElement) {
              const isCurrent = s.id === currentSection;
              const scale = isCurrent ? 1.3 : 1;
              const opacity = isCurrent ? 1 : 0.7;
              dotElement.style.transform = `scale(${scale})`;
              dotElement.style.opacity = opacity.toString();
              labelElement.style.transform = `translateY(-50%) scale(${scale})`;
              labelElement.style.opacity = opacity.toString();
            }
          });
        }}
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group"
            whileTap={{ scale: 0.9 }}
          >
            {/* Dot with dynamic size */}
            <motion.div
              id={`nav-dot-${section.id}`}
              className={`rounded-full transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-400/50'
                  : 'bg-gray-500'
              }`}
              style={{
                width: '12px',
                height: '12px',
                transform: currentSection === section.id ? 'scale(1.3)' : 'scale(1)',
                opacity: currentSection === section.id ? 1 : 0.7
              }}
            />
            
            {/* Label with dynamic styling */}
            <motion.div
              id={`nav-label-${section.id}`}
              className={`absolute right-8 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white rounded-lg whitespace-nowrap transition-all duration-300 ${
                currentSection === section.id
                  ? 'font-semibold'
                  : ''
              }`}
              style={{
                fontSize: '12px',
                opacity: currentSection === section.id ? 1 : 0.7,
                transform: `translateY(-50%) scale(${currentSection === section.id ? 1.3 : 1})`
              }}
            >
              {section.label}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SideNavigation;
