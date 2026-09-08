import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export type RevealDirection = 'up' | 'left' | 'right' | 'none';

interface RevealState {
  delay: number;
  direction: RevealDirection;
}

export interface RevealProps
  extends Omit<
    HTMLMotionProps<'div'>,
    'children' | 'custom' | 'initial' | 'variants' | 'viewport' | 'whileInView'
  > {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
}

const offsets: Record<
  RevealDirection,
  { x: number; y: number; rotate: number }
> = {
  up: { x: 0, y: 32, rotate: 0 },
  left: { x: -28, y: 16, rotate: -0.6 },
  right: { x: 28, y: 16, rotate: 0.6 },
  none: { x: 0, y: 0, rotate: 0 },
};

const revealVariants: Variants = {
  hidden: ({ direction }: RevealState) => ({
    ...offsets[direction],
    clipPath: 'inset(0 0 16% 0)',
    opacity: 0,
  }),
  visible: ({ delay }: RevealState) => ({
    x: 0,
    y: 0,
    rotate: 0,
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: {
      delay,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  amount = 0.18,
  ...props
}: RevealProps) => (
  <motion.div
    custom={{ delay, direction } satisfies RevealState}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={revealVariants}
    {...props}
  >
    {children}
  </motion.div>
);
