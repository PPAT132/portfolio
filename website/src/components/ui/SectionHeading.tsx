import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type SectionHeadingVariant = 'default' | 'boxed' | 'filled' | 'gradient';
export type SectionHeadingLevel = 'h2' | 'h3';
export type SectionHeadingSize = 'display' | 'title';

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: SectionHeadingLevel;
  variant?: SectionHeadingVariant;
  size?: SectionHeadingSize;
}

const variantStyles: Record<SectionHeadingVariant, string> = {
  default: 'text-foreground',
  boxed:
    'inline-block border-2 border-accent-cyan bg-background px-4 text-foreground shadow-neo-blue',
  filled:
    'inline-block border-2 border-border bg-accent-cyan px-2 text-background shadow-neo-sm',
  gradient:
    'bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent',
};

const sizeStyles: Record<SectionHeadingSize, string> = {
  display: 'text-4xl md:text-6xl',
  title: 'text-2xl tracking-normal',
};

export const SectionHeading = ({
  as: Heading = 'h2',
  variant = 'default',
  size = 'display',
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
