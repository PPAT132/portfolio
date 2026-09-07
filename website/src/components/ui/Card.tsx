import type { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '../../lib/cn';
import { SectionHeading } from './SectionHeading';

export type CardVariant =
  | 'default'
  | 'panel'
  | 'muted'
  | 'experience'
  | 'experienceActive'
  | 'project'
  | 'projectActive';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    'border-border bg-background shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
  panel: 'border-border bg-background',
  muted: 'border-line bg-panel',
  experience:
    'bg-background border-line-soft hover:border-foreground hover:shadow-neo transition-all duration-300',
  experienceActive: 'bg-background border-accent-cyan shadow-neo-blue',
  project:
    'h-full bg-panel border-line hover:border-accent-purple hover:-translate-y-1 hover:shadow-neo-sm transition-all duration-300 group',
  projectActive: 'h-full bg-panel border-accent-purple shadow-neo-purple',
};

export const Card = ({
  className,
  variant = 'default',
  ...props
}: CardProps) => (
  <div
    className={cn('border-2', variantStyles[variant], className)}
    {...props}
  />
);

interface CardHeaderProps {
  icon: LucideIcon;
  title: ReactNode;
  iconClassName?: string;
  className?: string;
}

export const CardHeader = ({
  icon: Icon,
  title,
  iconClassName,
  className,
}: CardHeaderProps) => (
  <div
    className={cn(
      'mb-6 flex items-center gap-3 border-b-2 border-dashed border-line pb-4',
      className,
    )}
  >
    <Icon aria-hidden="true" className={iconClassName} size={28} />
    <SectionHeading as="h3" size="title">
      {title}
    </SectionHeading>
  </div>
);
