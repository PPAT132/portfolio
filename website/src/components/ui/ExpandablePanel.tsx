import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { panelVariants } from '../../lib/motion';
import { Card } from './Card';

export interface ExpandablePanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  preview?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsedLabel?: string;
  expandedLabel?: string;
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
    <Card variant="panel" className={cn('overflow-hidden shadow-neo', className)} {...props}>
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-4 bg-background p-6 text-left font-mono font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-cyan',
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
        <div className={cn('border-t-2 border-border bg-background', previewClassName)}>
          {preview}
        </div>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={panelVariants}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'space-y-6 border-t-2 border-line bg-panel p-6 text-body',
                contentClassName,
              )}
            >
              {props.children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
