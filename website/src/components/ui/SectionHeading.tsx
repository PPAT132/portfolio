import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type SectionHeadingVariant = 'default' | 'boxed' | 'gradient';
export type SectionHeadingLevel = 'h2' | 'h3';

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: SectionHeadingLevel;
  variant?: SectionHeadingVariant;
}

const variantStyles: Record<SectionHeadingVariant, string> = {
  default: 'text-foreground',
  boxed: 'border-2 border-border bg-accent-cyan px-2 text-background shadow-neo-sm',
  gradient:
    'bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent',
};

export const SectionHeading = ({
  as: Heading = 'h2',
  variant = 'default',
  className,
  ...props
}: SectionHeadingProps) => (
  <Heading
    className={cn(
      'font-mono text-2xl font-bold uppercase tracking-tighter sm:text-3xl',
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
