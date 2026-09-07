import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type TagAccent = 'cyan' | 'purple' | 'green' | 'pink' | 'yellow' | 'error';
export type TagVariant = 'accent' | 'skill' | 'chip';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: TagAccent;
  variant?: TagVariant;
}

const accentStyles: Record<TagAccent, string> = {
  cyan: 'border-accent-cyan text-accent-cyan',
  purple: 'border-accent-purple text-accent-purple',
  green: 'border-accent-green text-accent-green',
  pink: 'border-accent-pink text-accent-pink',
  yellow: 'border-accent-yellow text-accent-yellow',
  error: 'border-error text-error',
};

const skillHoverStyles: Record<TagAccent, string> = {
  cyan: 'hover:border-accent-cyan hover:bg-accent-cyan hover:text-background',
  purple: 'hover:border-accent-purple hover:bg-accent-purple hover:text-background',
  green: 'hover:border-accent-green hover:bg-accent-green hover:text-background',
  pink: 'hover:border-accent-pink hover:bg-accent-pink hover:text-background',
  yellow: 'hover:border-accent-yellow hover:bg-accent-yellow hover:text-background',
  error: 'hover:border-error hover:bg-error hover:text-background',
};

const variantStyles: Record<TagVariant, string> = {
  accent: 'border px-2 py-1 font-bold uppercase tracking-wider',
  skill:
    'cursor-default border border-line-soft bg-transparent px-3 py-1 font-normal normal-case tracking-normal text-body transition-colors',
  chip:
    'border border-line bg-panel px-2 py-0.5 text-[10px] font-normal uppercase text-muted',
};

export const Tag = ({
  accent = 'cyan',
  variant = 'accent',
  className,
  ...props
}: TagProps) => (
  <span
    className={cn(
      'inline-flex items-center font-mono text-xs',
      variantStyles[variant],
      variant === 'accent' && accentStyles[accent],
      variant === 'skill' && skillHoverStyles[accent],
      className,
    )}
    {...props}
  />
);
