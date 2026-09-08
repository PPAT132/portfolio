import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { panelVariants } from '../../lib/motion';
import { Card, type CardVariant } from './Card';

export interface ExpandablePanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  preview?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsedLabel?: string;
  expandedLabel?: string;
  variant?: CardVariant;
  headerTone?: 'surface' | 'background';
  contentTone?: 'default' | 'inset';
  buttonClassName?: string;
  previewClassName?: string;
  contentClassName?: string;
}

export const ExpandablePanel = ({
  title,
  preview,
  open,
  defaultOpen = false,
  onOpenChange,
  collapsedLabel,
  expandedLabel,
  variant = 'flat',
  headerTone = 'surface',
  contentTone = 'default',
  buttonClassName,
  previewClassName,
  className,
  contentClassName,
  ...props
}: ExpandablePanelProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const contentId = useId();
  const isOpen = open ?? internalOpen;

  const togglePanel = () => {
    const nextOpen = !isOpen;

    if (open === undefined) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return (
    <Card variant={variant} className={cn('overflow-hidden', className)} {...props}>
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-display font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-navy',
          headerTone === 'surface' ? 'bg-surface' : 'bg-background',
          buttonClassName,
        )}
        onClick={togglePanel}
      >
        <span>{title}</span>
        <span className="flex shrink-0 items-center gap-2">
          {(collapsedLabel || expandedLabel) && (
            <span className="text-xs">
              {isOpen ? expandedLabel : collapsedLabel}
            </span>
          )}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
            size={20}
          />
        </span>
      </button>

      {preview && (
        <div className={cn('border-t-2 border-border', previewClassName)}>
          {preview}
        </div>
      )}

      <motion.div
        id={contentId}
        initial={false}
        animate={isOpen ? 'expanded' : 'collapsed'}
        variants={panelVariants}
        className="grid overflow-hidden"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              'border-t-2 p-4',
              contentTone === 'inset'
                ? 'border-line bg-panel text-body'
                : 'border-border text-muted',
              contentClassName,
            )}
          >
            {props.children}
          </div>
        </div>
      </motion.div>
    </Card>
  );
};
