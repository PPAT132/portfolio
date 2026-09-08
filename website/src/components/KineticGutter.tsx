import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

interface KineticGutterProps {
  content?: 'copy' | 'wide';
  left?: ReactNode;
  right?: ReactNode;
}

export const KineticGutter = ({
  content = 'copy',
  left,
  right,
}: KineticGutterProps) => (
  <div
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-0 z-0 hidden lg:grid',
      content === 'wide'
        ? 'grid-cols-[minmax(0,1fr)_minmax(0,1100px)_minmax(0,1fr)]'
        : 'grid-cols-[minmax(0,1fr)_minmax(0,56rem)_minmax(0,1fr)]',
    )}
  >
    <div className="kinetic-gutter-cell relative min-w-0">
      {left}
    </div>
    <div />
    <div className="kinetic-gutter-cell relative min-w-0">
      {right}
    </div>
  </div>
);
