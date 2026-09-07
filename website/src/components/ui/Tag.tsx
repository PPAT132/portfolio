import type { HTMLAttributes } from 'react';

import {
  accentBorder,
  accentFillHover,
  accentText,
} from '../../lib/accent';
import { cn } from '../../lib/cn';
import type { Accent } from '../../types/portfolio';

export type TagAccent = Accent | 'error';
export type TagVariant = 'color' | 'muted' | 'fillable';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: TagAccent;
  variant?: TagVariant;
}

export const Tag = ({
  accent = 'cyan',
  variant = 'color',
  className,
  ...props
}: TagProps) => {
  const isError = accent === 'error';
  const tone = isError ? 'cyan' : accent;

  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider',
        variant === 'color' &&
          (isError
            ? 'border-error text-error'
            : cn(accentBorder[tone], accentText[tone])),
        variant === 'muted' &&
          'border-line bg-panel font-normal text-faint',
        variant === 'fillable' &&
          cn(
            'cursor-default border-line bg-transparent font-normal normal-case tracking-normal text-body transition-colors',
            isError
              ? 'hover:border-error hover:bg-error hover:text-background'
              : accentFillHover[tone],
          ),
        className,
      )}
      {...props}
    />
  );
};
