import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type TagAccent = 'cyan' | 'purple' | 'green' | 'pink' | 'yellow' | 'error';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: TagAccent;
}

const accentStyles: Record<TagAccent, string> = {
  cyan: 'border-accent-cyan text-accent-cyan',
  purple: 'border-accent-purple text-accent-purple',
  green: 'border-accent-green text-accent-green',
  pink: 'border-accent-pink text-accent-pink',
  yellow: 'border-accent-yellow text-accent-yellow',
  error: 'border-error text-error',
};

export const Tag = ({
  accent = 'cyan',
  className,
  ...props
}: TagProps) => (
  <span
    className={cn(
      'inline-flex items-center border px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider',
      accentStyles[accent],
      className,
    )}
    {...props}
  />
);
