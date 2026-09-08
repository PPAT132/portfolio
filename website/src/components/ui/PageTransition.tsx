import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial={{
      clipPath: 'inset(0 0 0 7%)',
      opacity: 0,
      x: 18,
    }}
    animate={{
      clipPath: 'inset(0 0 0 0%)',
      opacity: 1,
      x: 0,
    }}
    exit={{
      clipPath: 'inset(0 7% 0 0)',
      opacity: 0,
      x: -18,
    }}
    transition={{
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);
