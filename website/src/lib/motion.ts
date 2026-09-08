import type { Variants } from 'framer-motion';

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const panelVariants: Variants = {
  collapsed: {
    gridTemplateRows: '0fr',
    transition: {
      duration: 0.28,
      ease: 'easeOut',
    },
  },
  expanded: {
    gridTemplateRows: '1fr',
    transition: {
      duration: 0.28,
      ease: 'easeOut',
    },
  },
};

export const statusMessageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
