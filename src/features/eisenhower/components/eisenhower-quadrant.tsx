'use client';

import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import {
  type EisenhowerQuadrant,
  type EisenhowerTask,
  QUADRANT_COLORS,
  QUADRANT_LABELS,
} from '@/types/eisenhower';
import { TaskCard } from './task-card';

interface EisenhowerQuadrantProps {
  quadrant: EisenhowerQuadrant;
  tasks: EisenhowerTask[];
  onTaskComplete?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const EisenhowerQuadrantComponent: FC<EisenhowerQuadrantProps> = ({
  quadrant,
  tasks,
  onTaskComplete,
  onTaskDelete,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: quadrant,
  });

  const quadrantInfo = QUADRANT_LABELS[quadrant];
  const quadrantColor = QUADRANT_COLORS[quadrant];

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative min-h-[300px] p-6 rounded-xl border-2 border-dashed transition-all duration-300',
        `bg-${quadrantColor}`,
        isOver &&
          'border-cortex-electric-blue border-solid scale-105 shadow-lg shadow-cortex-electric-blue/20',
      )}
    >
      {/* En-tête du quadrant */}
      <div className="mb-6">
        <h3 className="text-lg font-mono font-bold text-cortex-off-white mb-2">
          {quadrantInfo.title}
        </h3>
        <p className="text-sm font-mono text-cortex-muted">
          {quadrantInfo.description}
        </p>
        <div className="mt-2 text-xs font-mono text-cortex-muted">
          {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Zone de drop */}
      <div className="space-y-3 min-h-[200px]">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOver ? 0.3 : 0.1 }}
            className="flex items-center justify-center h-32 text-cortex-muted font-mono text-sm border-2 border-dashed border-cortex-muted/30 rounded-lg"
          >
            {isOver ? 'Déposez ici...' : 'Aucune tâche'}
          </motion.div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onTaskComplete}
              onDelete={onTaskDelete}
            />
          ))
        )}
      </div>

      {/* Indicateur de drop actif */}
      {isOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-cortex-electric-blue/10 rounded-xl border-2 border-cortex-electric-blue border-dashed flex items-center justify-center"
        >
          <div className="text-cortex-electric-blue font-mono font-bold text-lg">
            Déposez ici
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
