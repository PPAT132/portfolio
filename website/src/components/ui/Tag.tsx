import type { HTMLAttributes } from 'react';

import { accentBg, accentFillHover } from '../../lib/accent';
import { cn } from '../../lib/cn';
import type { Accent } from '../../types/portfolio';

export type TagAccent = Accent | 'error';
export type TagVariant = 'color' | 'muted' | 'fillable';

const lightAccents: Accent[] = ['cyan', 'pink'];

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
  const onLight = lightAccents.includes(tone);

  return (
    <span
      className={cn(
        'inline-flex items-center border-[3px] border-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider',
        variant === 'color' &&
          (isError
            ? 'bg-error text-on-dark'
            : cn(accentBg[tone], onLight ? 'text-on-light' : 'text-on-dark')),
        variant === 'muted' && 'bg-panel text-foreground',
        variant === 'fillable' &&
          cn(
            'cursor-default bg-surface normal-case tracking-normal text-foreground transition-colors',
            isError
              ? 'hover:bg-error hover:text-on-dark'
              : accentFillHover[tone],
          ),
        className,
      )}
      {...props}
    />
  );
};
