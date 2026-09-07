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
    'border-black bg-navy text-on-dark shadow-neo-sm hover:bg-sky hover:text-on-light hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
  secondary:
    'border-black bg-sky text-on-light shadow-neo-sm hover:bg-navy hover:text-on-dark hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
  outline:
    'border-black bg-surface text-foreground shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-navy hover:text-on-dark hover:shadow-none',
  ghost:
    'border-transparent bg-transparent text-foreground hover:border-black hover:bg-sky',
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
    'inline-flex items-center justify-center gap-2 border-[3px] font-mono font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy disabled:cursor-not-allowed disabled:border-black disabled:bg-panel disabled:text-muted disabled:opacity-100',
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
