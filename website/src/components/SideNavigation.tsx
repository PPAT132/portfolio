import { useState } from 'react';
import { motion } from 'framer-motion';

import { sections, type SectionId } from '../config/sections';

interface SideNavigationProps {
  currentSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const getItemAnimation = (
  index: number,
  hoveredIndex: number | null,
  isCurrent: boolean,
) => {
  if (hoveredIndex === null) {
    return isCurrent
      ? { scale: 0.9, opacity: 1 }
      : { scale: 0.6, opacity: 1 };
  }

  const distance = Math.abs(hoveredIndex - index);

  if (distance === 0) {
    return { scale: 1.1, opacity: 1 };
  }

  if (distance === 1) {
    return { scale: 0.9, opacity: 1 };
  }

  if (distance === 2) {
    return { scale: 0.75, opacity: 1 };
  }

  return { scale: 0.6, opacity: 1 };
};

const SideNavigation = ({
  currentSection,
  onNavigate,
}: SideNavigationProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-8 z-50 hidden -translate-y-1/2 lg:block navigator-responsive"
    >
      <div
        className="flex h-[400px] w-40 flex-col items-end justify-center gap-10 border border-transparent bg-transparent pr-3"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {sections.map((section, index) => {
          const isCurrent = currentSection === section.id;
          const animation = getItemAnimation(
            index,
            hoveredIndex,
            isCurrent,
          );

          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              aria-label={`Navigate to ${section.label}`}
              aria-current={isCurrent ? 'page' : undefined}
              className="relative flex w-full items-center justify-end"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                aria-hidden="true"
                className={`mr-0.5 border-2 ${
                  isCurrent
                    ? 'h-4 w-4 border-black bg-navy'
                    : 'h-3 w-3 border-black bg-surface'
                }`}
                animate={{
                  rotate: isCurrent ? 45 : 0,
                  scale: animation.scale,
                  opacity: animation.opacity,
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />

              <div
                aria-hidden="true"
                className={`absolute right-[18px] h-1 bg-navy transition-all duration-300 ${
                  isCurrent ? 'w-12 opacity-100' : 'w-0 opacity-0'
                }`}
              />

              <div className="absolute right-[34px] top-1/2 -translate-y-1/2">
                <motion.div
                  className={`whitespace-nowrap border border-border bg-background px-3 py-1 text-foreground shadow-neo-sm ${
                    isCurrent ? 'z-10' : 'z-0'
                  }`}
                  animate={animation}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    {section.label}
                  </span>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNavigation;
