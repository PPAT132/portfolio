import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  surface?: boolean;
}

export const Card = ({
  className,
  elevated = true,
  surface = true,
  ...props
}: CardProps) => (
  <div
    className={cn(
      'border-2 border-border',
      surface && 'bg-surface',
      elevated && 'shadow-neo',
      className,
    )}
    {...props}
  />
);
