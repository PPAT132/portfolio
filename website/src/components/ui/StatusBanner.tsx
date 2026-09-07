import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

import { statusMessageVariants } from '../../lib/motion';
import { cn } from '../../lib/cn';

interface StatusBannerProps {
  tone: 'success' | 'error';
  children: string;
}

export const StatusBanner = ({ tone, children }: StatusBannerProps) => {
  const Icon = tone === 'success' ? CheckCircle : XCircle;

  return (
    <motion.div
      role={tone === 'success' ? 'status' : 'alert'}
      aria-live={tone === 'success' ? 'polite' : 'assertive'}
      initial="hidden"
      animate="visible"
      variants={statusMessageVariants}
      className={cn(
        'mt-6 flex items-center gap-3 border-2 bg-panel p-4 font-mono font-bold',
        tone === 'success' ? 'border-accent-green text-accent-green' : 'border-error text-error',
      )}
    >
      <Icon aria-hidden="true" size={24} />
      <span>{children}</span>
    </motion.div>
  );
};
