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
  boxed: 'ink bg-navy px-3 py-1 text-on-dark shadow-neo-sm -rotate-1',
  framed: 'ink bg-sky px-4 py-1 text-on-light shadow-plate rotate-1',
  gradient: 'text-navy',
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
      'font-display font-bold uppercase tracking-tight',
      sizeStyles[size],
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
