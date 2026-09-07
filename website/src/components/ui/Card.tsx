import type { HTMLAttributes } from 'react';

import { accentShadow } from '../../lib/accent';
import { cn } from '../../lib/cn';
import type { Accent } from '../../types/portfolio';

export type CardVariant = 'raised' | 'flat' | 'inset' | 'accent';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accent?: Accent;
}

const variantStyles: Record<CardVariant, string> = {
  raised: 'ink bg-surface shadow-plate',
  flat: 'ink bg-surface shadow-plate',
  inset: 'ink bg-panel shadow-neo',
  accent: 'ink bg-surface',
};

export const Card = ({
  className,
  variant = 'raised',
  accent = 'cyan',
  ...props
}: CardProps) => (
  <div
    className={cn(
      variantStyles[variant],
      variant === 'accent' && accentShadow[accent],
      className,
    )}
    {...props}
  />
);
