import { useCallback, useEffect, useRef, useState } from 'react';

import { sections, type SectionId } from '../config/sections';

const getPreferredScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

const getSectionAtScrollPosition = (): SectionId => {
  const scrollTop = window.scrollY;
  const viewportBottom = scrollTop + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight;

  if (viewportBottom >= pageBottom - 2) {
    return 'contact';
  }

  const scrollMarker =
    scrollTop + Math.min(window.innerHeight * 0.35, 180);
  let nextSection: SectionId = 'home';

  for (const section of sections) {
    const element = document.getElementById(section.id);

    if (!element) {
      continue;
    }

    const sectionTop = element.getBoundingClientRect().top + scrollTop;

    if (sectionTop <= scrollMarker) {
      nextSection = section.id;
    } else {
      break;
    }
  }

  return nextSection;
};

export const useScrollSpy = () => {
  const [currentSection, setCurrentSection] = useState<SectionId>('home');
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateCurrentSection = () => {
      animationFrameId = null;

      if (isNavigatingRef.current) {
        return;
      }

      const nextSection = getSectionAtScrollPosition();

      setCurrentSection((previousSection) =>
        previousSection === nextSection ? previousSection : nextSection,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateCurrentSection);
      }
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const navigateToSection = useCallback((sectionId: SectionId) => {
    setCurrentSection(sectionId);
    isNavigatingRef.current = true;

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    const target = document.getElementById(sectionId);

    if (!target) {
      isNavigatingRef.current = false;
      return;
    }

    const behavior = getPreferredScrollBehavior();
    target.scrollIntoView({ behavior, block: 'start' });

    navigationTimeoutRef.current = window.setTimeout(
      () => {
        isNavigatingRef.current = false;
        navigationTimeoutRef.current = null;
        setCurrentSection(getSectionAtScrollPosition());
      },
      behavior === 'smooth' ? 1000 : 0,
    );
  }, []);

  return { currentSection, navigateToSection };
};
