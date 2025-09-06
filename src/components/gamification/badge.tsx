'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type Badge } from '@/types/gamification';
import { cn } from '@/lib/utils';

interface BadgeProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  isNew?: boolean;
}

export const BadgeComponent: FC<BadgeProps> = ({ 
  badge, 
  size = 'md', 
  showDescription = false,
  isNew = false
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-full border-2 transition-all duration-200',
        sizeClasses[size],
        `bg-${badge.color}/20 border-${badge.color}/50`,
        'hover:shadow-lg hover:shadow-cortex-electric-blue/20'
      )}
      title={badge.description}
    >
      {/* Indicateur de nouveau badge */}
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-cortex-pulse-red rounded-full flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </motion.div>
      )}
      
      {/* Icône du badge */}
      <div className="text-center">
        {badge.icon}
      </div>
      
      {/* Description (optionnelle) */}
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className={cn(
            'bg-cortex-charcoal/90 backdrop-blur-sm border border-cortex-electric-blue/30 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap',
            textSizeClasses[size]
          )}>
            <div className="font-mono font-bold text-cortex-off-white">
              {badge.name}
            </div>
            <div className="font-mono text-cortex-muted text-xs">
              {badge.description}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
