import type { HTMLAttributes } from 'react';

import { accentBorder, accentShadow } from '../../lib/accent';
import { cn } from '../../lib/cn';
import type { Accent } from '../../types/portfolio';

export type CardVariant = 'raised' | 'flat' | 'inset' | 'accent';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accent?: Accent;
}

const variantStyles: Record<CardVariant, string> = {
  raised: 'border-border bg-surface shadow-neo',
  flat: 'border-border bg-background',
  inset: 'border-line-soft bg-panel',
  accent: 'bg-background',
};

export const Card = ({
  className,
  variant = 'raised',
  accent = 'cyan',
  ...props
}: CardProps) => (
  <div
    className={cn(
      'border-2',
      variantStyles[variant],
      variant === 'accent' && accentBorder[accent],
      variant === 'accent' && accentShadow[accent],
      className,
    )}
    {...props}
  />
);
