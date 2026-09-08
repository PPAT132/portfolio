import { useEffect, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

import { sections, type SectionId } from '../config/sections';

interface SideNavigationProps {
  currentSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

interface LoopMarkProps {
  active: boolean;
  hot: boolean;
}

const morphPath = (amount: number, radius: number) => {
  const steps = 48;
  const t = Math.min(1, Math.max(0, amount));
  const points = Array.from({ length: steps + 1 }, (_, index) => {
    const theta = (index / steps) * Math.PI * 2;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const absCos = Math.abs(cos);
    const absSin = Math.abs(sin);
    const squareRadius = radius / Math.max(absCos, absSin);
    const diamondRadius = radius / (absCos + absSin);
    const currentRadius = squareRadius + (diamondRadius - squareRadius) * t;

    return `${currentRadius * cos} ${currentRadius * sin}`;
  });

  return `M ${points.join(' L ')} Z`;
};

const LoopMark = ({ active, hot }: LoopMarkProps) => {
  const reduceMotion = useReducedMotion();
  const morph = useSpring(0, {
    stiffness: 240,
    damping: 16,
    mass: 0.7,
  });
  const d = useTransform(morph, (value) => morphPath(value, 7));

  useEffect(() => {
    const next = active ? 1 : hot ? 0.35 : 0;

    if (reduceMotion) {
      morph.jump(next);
      return;
    }

    morph.set(next);
  }, [active, hot, morph, reduceMotion]);

  return (
    <svg
      aria-hidden="true"
      viewBox="-8 -8 16 16"
      className="relative z-10 -ml-[3px] block h-4 w-4 shrink-0 overflow-visible"
    >
      <motion.path
        d={d}
        className={active ? 'fill-navy stroke-black' : 'fill-surface stroke-black'}
        strokeWidth="2"
      />
    </svg>
  );
};

const getItemScale = (
  index: number,
  hoveredIndex: number | null,
  isCurrent: boolean,
) => {
  if (hoveredIndex === null) {
    return isCurrent ? 1 : 0.94;
  }

  const distance = Math.abs(hoveredIndex - index);

  if (distance === 0) {
    return 1.05;
  }

  if (distance === 1) {
    return 0.97;
  }

  return 0.92;
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
              <motion.span
                aria-hidden="true"
                className="relative z-0 h-1 origin-left"
                animate={{
                  backgroundColor: isHot ? 'rgb(16 42 98)' : '#000',
                  width: isCurrent ? 14 : 10,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              />
              <LoopMark active={isCurrent} hot={isHot} />
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNavigation;
