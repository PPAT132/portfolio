import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { sections, type SectionId } from '../config/sections';
import { cn } from '../lib/cn';

interface TopNavigationProps {
  currentSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const TopNavigation = ({
  currentSection,
  onNavigate,
}: TopNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (sectionId: SectionId) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-background lg:hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="ink min-w-0 shrink bg-navy px-2 py-1 font-display text-base font-bold uppercase tracking-tight text-on-dark shadow-neo-sm -rotate-1 sm:text-xl">
            Patrick_Ma
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => handleNavigate(section.id)}
                aria-current={
                  currentSection === section.id ? 'page' : undefined
                }
                className={cn(
                  'border-2 px-3 py-1 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200',
                  currentSection === section.id
                    ? 'border-black bg-navy text-on-dark shadow-neo-sm'
                    : 'border-transparent text-body hover:border-black hover:bg-sky hover:text-on-light',
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
              </motion.button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-controls="mobile-navigation-menu"
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="relative z-10 shrink-0 border-2 border-black bg-surface p-2 text-foreground shadow-neo-sm md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          id="mobile-navigation-menu"
          className={cn(
            'grid md:hidden',
            isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
          aria-hidden={!isMenuOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-3 space-y-2 border-t-2 border-panel-strong bg-background py-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavigate(section.id)}
                  aria-current={
                    currentSection === section.id ? 'page' : undefined
                  }
                  tabIndex={isMenuOpen ? 0 : -1}
                  className={cn(
                    'block w-full border-l-4 px-4 py-3 text-left font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200',
                    currentSection === section.id
                      ? 'border-black bg-navy text-on-dark'
                      : 'border-transparent text-body hover:border-black hover:bg-sky hover:text-on-light',
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
