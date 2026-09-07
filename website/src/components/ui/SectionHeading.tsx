import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type SectionHeadingVariant = 'plain' | 'boxed' | 'framed' | 'gradient';
export type SectionHeadingLevel = 'h2' | 'h3';
export type SectionHeadingSize = 'md' | 'xl';

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: SectionHeadingLevel;
  variant?: SectionHeadingVariant;
  size?: SectionHeadingSize;
}

const variantStyles: Record<SectionHeadingVariant, string> = {
  plain: 'text-foreground',
  boxed: 'border-2 border-border bg-accent-cyan px-2 text-background shadow-neo-sm',
  framed:
    'border-2 border-accent-cyan bg-background px-4 text-foreground shadow-neo-cyan',
  gradient:
    'bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent',
};

const sizeStyles: Record<SectionHeadingSize, string> = {
  md: 'text-2xl sm:text-3xl',
  xl: 'text-4xl md:text-6xl',
};

export const SectionHeading = ({
  as: Heading = 'h2',
  variant = 'plain',
  size = 'md',
  className,
  ...props
}: SectionHeadingProps) => (
  <Heading
    className={cn(
      'font-mono font-bold uppercase tracking-tighter',
      sizeStyles[size],
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
