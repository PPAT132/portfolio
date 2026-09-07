import type { Accent, Tone } from '../types/portfolio';

export const accentText: Record<Accent, string> = {
  cyan: 'text-accent-cyan',
  purple: 'text-accent-purple',
  green: 'text-accent-green',
  pink: 'text-accent-pink',
  yellow: 'text-accent-yellow',
};

export const accentBorder: Record<Accent, string> = {
  cyan: 'border-accent-cyan',
  purple: 'border-accent-purple',
  green: 'border-accent-green',
  pink: 'border-accent-pink',
  yellow: 'border-accent-yellow',
};

export const accentBg: Record<Accent, string> = {
  cyan: 'bg-accent-cyan',
  purple: 'bg-accent-purple',
  green: 'bg-accent-green',
  pink: 'bg-accent-pink',
  yellow: 'bg-accent-yellow',
};

export const accentShadow: Record<Accent, string> = {
  cyan: 'shadow-neo-cyan',
  purple: 'shadow-neo-purple',
  green: 'shadow-neo-green',
  pink: 'shadow-neo-pink',
  yellow: 'shadow-neo-yellow',
};

export const accentFillHover: Record<Accent, string> = {
  cyan: 'hover:border-accent-cyan hover:bg-accent-cyan hover:text-background',
  purple:
    'hover:border-accent-purple hover:bg-accent-purple hover:text-background',
  green: 'hover:border-accent-green hover:bg-accent-green hover:text-background',
  pink: 'hover:border-accent-pink hover:bg-accent-pink hover:text-background',
  yellow:
    'hover:border-accent-yellow hover:bg-accent-yellow hover:text-background',
};

export const toneFill: Record<Tone, string> = {
  ...accentBg,
  neutral: 'bg-inset',
};

export const toneHoverText: Record<Tone, string> = {
  cyan: 'hover:text-accent-cyan',
  purple: 'hover:text-accent-purple',
  green: 'hover:text-accent-green',
  pink: 'hover:text-accent-pink',
  yellow: 'hover:text-accent-yellow',
  neutral: 'hover:text-inset',
};
