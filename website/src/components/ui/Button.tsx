import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border-white bg-accent-cyan text-background shadow-neo-sm hover:bg-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
  secondary:
    'border-accent-purple bg-background text-accent-purple hover:-translate-y-1 hover:bg-accent-purple hover:text-foreground hover:shadow-neo-purple',
  outline:
    'border-border bg-background text-foreground hover:-translate-y-1 hover:bg-foreground hover:text-background hover:shadow-neo',
  ghost:
    'border-transparent bg-transparent text-foreground hover:border-border hover:bg-surface',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 py-1.5 text-xs',
  md: 'min-h-11 px-4 py-2 text-sm',
  lg: 'min-h-14 px-6 py-4 text-base',
};

// The style helper is intentionally colocated with the component's public API.
// eslint-disable-next-line react-refresh/only-export-components
export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonStyleOptions = {}): string =>
  cn(
    'inline-flex items-center justify-center gap-2 border-2 font-mono font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={buttonStyles({ variant, size, className })}
    {...props}
  />
);
