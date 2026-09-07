import type { Accent, Tone } from '../types/portfolio';

export const accentText: Record<Accent, string> = {
  cyan: 'text-navy',
  purple: 'text-navy',
  green: 'text-navy',
  pink: 'text-navy',
  yellow: 'text-navy',
};

export const accentBorder: Record<Accent, string> = {
  cyan: 'border-black',
  purple: 'border-black',
  green: 'border-black',
  pink: 'border-black',
  yellow: 'border-black',
};

export const accentBg: Record<Accent, string> = {
  cyan: 'bg-sky',
  purple: 'bg-navy',
  green: 'bg-navy',
  pink: 'bg-sky',
  yellow: 'bg-navy',
};

export const accentShadow: Record<Accent, string> = {
  cyan: 'shadow-plate',
  purple: 'shadow-plate',
  green: 'shadow-plate',
  pink: 'shadow-plate',
  yellow: 'shadow-plate',
};

export const accentFillHover: Record<Accent, string> = {
  cyan: 'hover:border-black hover:bg-sky hover:text-on-light',
  purple: 'hover:border-black hover:bg-navy hover:text-on-dark',
  green: 'hover:border-black hover:bg-navy hover:text-on-dark',
  pink: 'hover:border-black hover:bg-sky hover:text-on-light',
  yellow: 'hover:border-black hover:bg-navy hover:text-on-dark',
};

export const toneFill: Record<Tone, string> = {
  ...accentBg,
  neutral: 'bg-foreground',
};

export const toneOn: Record<Tone, string> = {
  cyan: 'text-on-light',
  purple: 'text-on-dark',
  green: 'text-on-dark',
  pink: 'text-on-light',
  yellow: 'text-on-dark',
  neutral: 'text-on-dark',
};

export const toneHoverText: Record<Tone, string> = {
  cyan: 'hover:bg-navy hover:text-on-dark',
  purple: 'hover:bg-sky hover:text-on-light',
  green: 'hover:bg-sky hover:text-on-light',
  pink: 'hover:bg-navy hover:text-on-dark',
  yellow: 'hover:bg-sky hover:text-on-light',
  neutral: 'hover:bg-sky hover:text-on-light',
};
