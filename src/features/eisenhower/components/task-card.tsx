'use client';

import { cn } from '@/lib/utils';
import { type EisenhowerTask } from '@/types/eisenhower';
import { motion } from 'framer-motion';
import { type FC } from 'react';

interface TaskCardProps {
  task: EisenhowerTask;
  isDragging?: boolean;
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskCard: FC<TaskCardProps> = ({
  task,
  isDragging = false,
  onComplete,
  onDelete
}) => {
  const getTagColor = (tag: string) => {
    if (tag === 'urgent') return 'bg-cortex-pulse-red/20 text-cortex-pulse-red';
    if (tag === 'docs') return 'bg-cortex-electric-blue/20 text-cortex-electric-blue';
    if (tag === 'bug') return 'bg-cortex-pulse-red/20 text-cortex-pulse-red';
    if (tag === 'feature') return 'bg-cortex-soft-green/20 text-cortex-soft-green';
    return 'bg-cortex-muted/20 text-cortex-muted';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? 2 : 0
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative p-4 rounded-lg border-2 border-transparent',
        'bg-cortex-charcoal/50 backdrop-blur-sm',
        'hover:border-cortex-electric-blue/30',
        'transition-all duration-200',
        isDragging && 'shadow-2xl shadow-cortex-electric-blue/20'
      )}
    >
      {/* Contenu de la tâche */}
      <div className="space-y-3">
        <p className="text-cortex-off-white font-mono text-sm leading-relaxed">
          {task.content}
        </p>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'px-2 py-1 rounded text-xs font-mono font-medium',
                  getTagColor(tag)
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-cortex-muted text-xs font-mono">
          {new Date(task.createdAt).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {/* Actions au hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-1">
          {onComplete && (
            <button
              onClick={() => onComplete(task.id)}
              className="p-1 rounded bg-cortex-soft-green/20 text-cortex-soft-green hover:bg-cortex-soft-green/30 transition-colors"
              title="Marquer comme terminé"
            >
              ✓
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded bg-cortex-pulse-red/20 text-cortex-pulse-red hover:bg-cortex-pulse-red/30 transition-colors"
              title="Supprimer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Indicateur de priorité */}
      <div className="absolute top-2 left-2">
        <div className={cn(
          'w-2 h-2 rounded-full',
          task.priority === 1 && 'bg-cortex-pulse-red',
          task.priority === 2 && 'bg-cortex-vibrant-orange',
          task.priority === 3 && 'bg-cortex-electric-blue',
          task.priority === 4 && 'bg-cortex-muted'
        )} />
      </div>
    </motion.div>
  );
};
