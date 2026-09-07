import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';

interface InsetTileProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export const MetaChip = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'flex items-center gap-2 border border-line bg-panel px-2 py-1',
      className,
    )}
  >
    {children}
  </div>
);

export const InsetTile = ({ title, children, className }: InsetTileProps) => (
  <div className={cn('border border-line bg-panel/50 p-3', className)}>
    <p className="mb-1 font-bold text-foreground">{title}</p>
    <p className="text-sm text-muted">{children}</p>
  </div>
);
