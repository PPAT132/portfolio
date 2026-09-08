import { useState } from 'react';
import { motion } from 'framer-motion';

import { sections, type SectionId } from '../config/sections';

interface SideNavigationProps {
  currentSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const getItemScale = (
  index: number,
  hoveredIndex: number | null,
  isCurrent: boolean,
) => {
  if (hoveredIndex === null) {
    return isCurrent ? 1 : 0.92;
  }

  const distance = Math.abs(hoveredIndex - index);

  if (distance === 0) {
    return 1.06;
  }

  if (distance === 1) {
    return 0.96;
  }

  return 0.9;
};

const SideNavigation = ({
  currentSection,
  onNavigate,
}: SideNavigationProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      aria-label="Section navigation"
      className="navigator-responsive fixed top-1/2 right-8 z-50 hidden -translate-y-1/2 lg:block"
    >
      <div
        className="flex flex-col items-end justify-center gap-7 pr-3"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {sections.map((section, index) => {
          const isCurrent = currentSection === section.id;
          const isHot = hoveredIndex === index || isCurrent;

          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              aria-current={isCurrent ? 'page' : undefined}
              className="flex origin-right items-center"
              animate={{ scale: getItemScale(index, hoveredIndex, isCurrent) }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              whileTap={{ scale: 0.94 }}
            >
              <span
                className={`whitespace-nowrap border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                  isCurrent
                    ? 'bg-navy text-on-dark'
                    : 'bg-background text-foreground'
                }`}
              >
                {section.label}
              </span>
              <span
                aria-hidden="true"
                className={`h-1 w-3 ${isHot ? 'bg-navy' : 'bg-black'}`}
              />
              <span
                aria-hidden="true"
                className={`shrink-0 border-2 border-black ${
                  isCurrent
                    ? 'h-3.5 w-3.5 rotate-45 bg-navy'
                    : 'h-3 w-3 bg-surface'
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNavigation;
