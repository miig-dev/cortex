'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: FC<ProgressBarProps> = ({
  current,
  max,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const colorClasses = {
    blue: 'bg-cortex-electric-blue',
    green: 'bg-cortex-soft-green',
    orange: 'bg-cortex-vibrant-orange',
    red: 'bg-cortex-pulse-red',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-sm text-cortex-off-white">
            {label}
          </span>
          {showPercentage && (
            <span className="font-mono text-sm text-cortex-muted">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          'w-full bg-cortex-charcoal rounded-full overflow-hidden',
          sizeClasses[size],
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full transition-all duration-300',
            colorClasses[color],
            'shadow-lg',
          )}
        />
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="font-mono text-xs text-cortex-muted">
          {current} / {max}
        </span>
        {current >= max && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-xs text-cortex-soft-green font-bold"
          >
            ✓ Complété !
          </motion.span>
        )}
      </div>
    </div>
  );
};
