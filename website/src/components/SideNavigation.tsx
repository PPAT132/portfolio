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
          gap: '48px'
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseY = e.clientY - rect.top;
          
          // Distance to scale mapping table - Wider middle ranges
          const distanceToScale = [
            { maxDistance: 0, scale: 1.3, opacity: 1.0 },      // On button - Maximum
            { maxDistance: 20, scale: 1.2, opacity: 0.95 },     // Very close - Large
            { maxDistance: 40, scale: 1.1, opacity: 0.9 },       // Close - Slightly large
            { maxDistance: 70, scale: 1.0, opacity: 0.8 },      // Medium close - Normal
            { maxDistance: 100, scale: 0.9, opacity: 0.7 },      // Normal - Slightly small
            { maxDistance: 140, scale: 0.8, opacity: 0.6 },      // Medium far - Small
            { maxDistance: 180, scale: 0.7, opacity: 0.5 },      // Far - Smaller
            { maxDistance: Infinity, scale: 0.6, opacity: 0.3 } // Very far - Small
          ];
          
          // Function to get scale and opacity based on distance
          const getScaleAndOpacity = (distance: number) => {
            for (const mapping of distanceToScale) {
              if (distance <= mapping.maxDistance) {
                return { scale: mapping.scale, opacity: mapping.opacity };
              }
            }
            return { scale: 0.7, opacity: 0.3 }; // Fallback
          };
          
          // Calculate distance from mouse to each button's closest edge
          sections.forEach((section) => {
            const buttonElement = document.getElementById(`nav-dot-${section.id}`);
            if (buttonElement) {
              const buttonRect = buttonElement.getBoundingClientRect();
              const containerRect = e.currentTarget.getBoundingClientRect();
              
              // Calculate button position relative to container
              const buttonTop = buttonRect.top - containerRect.top;
              const buttonBottom = buttonRect.bottom - containerRect.top;
              
              // Calculate distance to closest edge
              let distance;
              let scale, opacity;
              
              if (mouseY < buttonTop) {
                // Mouse is above button
                distance = buttonTop - mouseY;
                const result = getScaleAndOpacity(distance);
                scale = result.scale;
                opacity = result.opacity;
              } else if (mouseY > buttonBottom) {
                // Mouse is below button
                distance = mouseY - buttonBottom;
                const result = getScaleAndOpacity(distance);
                scale = result.scale;
                opacity = result.opacity;
              } else {
                // Mouse is inside button - Special case: Maximum scale (bigger than table max)
                scale = 1.3;
                opacity = 1.0;
              }
              
              // Apply styles with smooth transitions
              buttonElement.style.transition = 'transform 0.15s ease-out, opacity 0.15s ease-out';
              buttonElement.style.transform = `scale(${scale})`;
              buttonElement.style.opacity = opacity.toString();
              
              // Also update the label
              const labelElement = document.getElementById(`nav-label-${section.id}`);
              if (labelElement) {
                labelElement.style.transition = 'transform 0.15s ease-out, opacity 0.15s ease-out';
                labelElement.style.transform = `translateY(-50%) scale(${scale})`;
                labelElement.style.opacity = opacity.toString();
              }
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
              const scale = isCurrent ? 1.2 : 0.9;
              const opacity = isCurrent ? 1 : 0.6;
              
              // Add smooth transitions for reset
              dotElement.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
              labelElement.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
              
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
