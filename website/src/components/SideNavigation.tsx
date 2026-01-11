import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SideNavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const SideNavigation = ({ currentSection, setCurrentSection }: SideNavigationProps) => {
  const isNavigatingRef = useRef(false);
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Skip updates if we are programmatically scrolling
      if (isNavigatingRef.current) return;

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
    // 1. Immediately update visual state to target
    setCurrentSection(sectionId); 
    
    // 2. Lock scroll listener updates
    isNavigatingRef.current = true;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 3. Unlock after scroll is likely finished (keep this generous to cover long scrolls)
    // Even if it unlocks "too late", it's fine because we are already at the target.
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 z-50 hidden lg:block navigator-responsive right-8">
      <div 
        className="bg-transparent border border-transparent"
        style={{ 
          width: '160px', // Reduced width to prevent overlap with project cards
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end', // Align buttons to the right
          paddingRight: '12px',   // Keep buttons visually positioned correctly
          gap: '40px'
        }}
        onMouseMove={(e) => {
          // Check if we found any buttons to animate, otherwise this function does nothing visible
          // Logic adapted from the reference branch implementation
          
          const containerRect = e.currentTarget.getBoundingClientRect();
          const mouseY = e.clientY - containerRect.top;
          
          // Distance to scale mapping table
          const distanceToScale = [
            { maxDistance: 0, scale: 1.1, opacity: 1.0 },
            { maxDistance: 20, scale: 1.05, opacity: 0.95 },
            { maxDistance: 40, scale: 1.0, opacity: 0.9 },
            { maxDistance: 70, scale: 0.9, opacity: 0.8 },
            { maxDistance: 100, scale: 0.8, opacity: 0.7 },
            { maxDistance: 140, scale: 0.7, opacity: 0.6 },
            { maxDistance: Infinity, scale: 0.6, opacity: 0.5 } 
          ];
          
          const getScaleAndOpacity = (distance: number) => {
            for (const mapping of distanceToScale) {
              if (distance <= mapping.maxDistance) {
                return { scale: mapping.scale, opacity: mapping.opacity };
              }
            }
            return { scale: 0.6, opacity: 0.5 };
          };
          
          sections.forEach((section) => {
            const buttonElement = document.getElementById(`nav-dot-${section.id}`);
            const labelElement = document.getElementById(`nav-label-${section.id}`);
            
            if (buttonElement && labelElement) {
              const buttonRect = buttonElement.getBoundingClientRect();
              const buttonTop = buttonRect.top - containerRect.top;
              const buttonBottom = buttonRect.bottom - containerRect.top;
              
              let distance;
              let scale, opacity;
              
              if (mouseY < buttonTop) {
                distance = buttonTop - mouseY;
                const result = getScaleAndOpacity(distance);
                scale = result.scale;
                opacity = result.opacity;
              } else if (mouseY > buttonBottom) {
                distance = mouseY - buttonBottom;
                const result = getScaleAndOpacity(distance);
                scale = result.scale;
                opacity = result.opacity;
              } else {
                scale = 1.1;
                opacity = 1.0;
              }
              
              // Apply styles
              const duration = '0.1s';
              buttonElement.style.transition = `transform ${duration} ease-out, opacity ${duration} ease-out, width ${duration} ease-out, height ${duration} ease-out`;
              labelElement.style.transition = `transform ${duration} ease-out, opacity ${duration} ease-out`;
              
              // Apply transform (maintain rotation if needed)
              const isCurrent = currentSection === section.id;
              const rotation = isCurrent ? 'rotate(45deg)' : 'rotate(0deg)';
              
              buttonElement.style.transform = `${rotation} scale(${scale})`;
              buttonElement.style.opacity = opacity.toString();
              
              labelElement.style.transform = `translateY(-50%) scale(${scale})`;
              labelElement.style.opacity = opacity.toString();
            }
          });
        }}
        onMouseLeave={() => {
          // Reset to default state
          sections.forEach((s) => {
            const dotElement = document.getElementById(`nav-dot-${s.id}`);
            const labelElement = document.getElementById(`nav-label-${s.id}`);
            
            if (dotElement && labelElement) {
              const isCurrent = currentSection === s.id;
              const scale = isCurrent ? 0.9 : 0.6; // Default scales - reduced
              const opacity = isCurrent ? 1.0 : 0.5;
              const rotation = isCurrent ? 'rotate(45deg)' : 'rotate(0deg)';
              
              dotElement.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
              labelElement.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
              
              dotElement.style.transform = `${rotation} scale(${scale})`;
              dotElement.style.opacity = opacity.toString();
              
              labelElement.style.transform = `translateY(-50%) scale(${scale})`;
              labelElement.style.opacity = opacity.toString();
            }
          });
        }}
      >
        {sections.map((section) => {
          const isCurrent = currentSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative group flex items-center justify-end w-full"
              whileTap={{ scale: 0.9 }}
            >
              {/* Square with dynamic style - Cyberpunk style maintained */}
              <div
                id={`nav-dot-${section.id}`}
                className={`transition-all duration-200 border-2 ${
                  isCurrent
                    ? 'bg-cyber-blue border-cyber-blue w-4 h-4 shadow-[0_0_10px_rgba(0,243,255,0.5)]'
                    : 'bg-transparent border-gray-600 w-3 h-3 hover:border-white hover:bg-white'
                }`}
                style={{
                  transform: isCurrent ? 'rotate(45deg) scale(0.9)' : 'rotate(0deg) scale(0.6)',
                  opacity: isCurrent ? 1 : 0.5,
                  marginRight: '2px' // Add slight margin from the absolute right edge
                }}
              />
              
              {/* Connecting Line (decoration) - Only visible for current */}
              {/* Positioned relative to the dot (which is approx 20px from right) */}
              <div className={`absolute right-[18px] h-[2px] bg-cyber-blue transition-all duration-300 ${isCurrent ? 'w-12 opacity-100' : 'w-0 opacity-0'}`}></div>
              
              {/* Label - Always visible now, scales with mouse */}
              {/* Positioned further left from the line */}
              <div
                id={`nav-label-${section.id}`}
                className={`absolute right-[34px] top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black border border-white text-white whitespace-nowrap transition-all duration-200 shadow-neo-sm ${
                  isCurrent ? 'z-10' : 'z-0'
                }`}
                style={{
                  opacity: isCurrent ? 1 : 0.5,
                  transform: `translateY(-50%) scale(${isCurrent ? 0.9 : 0.6})`
                }}
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
