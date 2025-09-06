'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { type FC, useState } from 'react';
import { CortexLogo } from '@/components/ui/cortex-logo';
import type {
  EisenhowerMatrix as EisenhowerMatrixType,
  EisenhowerQuadrant,
  EisenhowerTask,
} from '@/types/eisenhower';
import { EisenhowerQuadrantComponent } from './eisenhower-quadrant';
import { TaskCard } from './task-card';

interface EisenhowerMatrixProps {
  initialTasks?: EisenhowerTask[];
  onTaskMove?: (taskId: string, newQuadrant: EisenhowerQuadrant) => void;
  onTaskComplete?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const EisenhowerMatrix: FC<EisenhowerMatrixProps> = ({
  initialTasks = [],
  onTaskMove,
  onTaskComplete,
  onTaskDelete,
}) => {
  const [activeTask, setActiveTask] = useState<EisenhowerTask | null>(null);
  const [tasks, setTasks] = useState<EisenhowerTask[]>(initialTasks);

  // Organiser les tâches par quadrant
  const matrix: EisenhowerMatrixType = {
    'urgent-important': tasks.filter(
      (task) => task.quadrant === 'urgent-important',
    ),
    'important-non-urgent': tasks.filter(
      (task) => task.quadrant === 'important-non-urgent',
    ),
    'urgent-non-important': tasks.filter(
      (task) => task.quadrant === 'urgent-non-important',
    ),
    'non-urgent-non-important': tasks.filter(
      (task) => task.quadrant === 'non-urgent-non-important',
    ),
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newQuadrant = over.id as EisenhowerQuadrant;

    // Mettre à jour la tâche
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, quadrant: newQuadrant } : task,
      ),
    );

    // Callback parent
    onTaskMove?.(taskId, newQuadrant);

    setActiveTask(null);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    onTaskComplete?.(taskId);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    onTaskDelete?.(taskId);
  };

  const totalTasks = tasks.length;
  const completedTasks = initialTasks.length - totalTasks;

  return (
    <div className="min-h-screen bg-cortex-dark p-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <CortexLogo size={60} animated={true} />
          <h1 className="text-4xl font-mono font-bold text-cortex-off-white">
            Quartier Général
          </h1>
        </div>

        <p className="text-cortex-muted font-mono text-lg mb-4">
          Matrice Eisenhower - Organisez vos tâches par urgence et importance
        </p>

        {/* Statistiques */}
        <div className="flex justify-center gap-8 text-sm font-mono">
          <div className="text-cortex-soft-green">
            ✓ {completedTasks} terminée{completedTasks > 1 ? 's' : ''}
          </div>
          <div className="text-cortex-electric-blue">
            📋 {totalTasks} en cours
          </div>
        </div>
      </motion.div>

      {/* Matrice 2x2 */}
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ligne 1: Important */}
            <div className="space-y-8">
              <EisenhowerQuadrantComponent
                quadrant="urgent-important"
                tasks={matrix['urgent-important']}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
              <EisenhowerQuadrantComponent
                quadrant="important-non-urgent"
                tasks={matrix['important-non-urgent']}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
            </div>

            {/* Ligne 2: Non Important */}
            <div className="space-y-8">
              <EisenhowerQuadrantComponent
                quadrant="urgent-non-important"
                tasks={matrix['urgent-non-important']}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
              <EisenhowerQuadrantComponent
                quadrant="non-urgent-non-important"
                tasks={matrix['non-urgent-non-important']}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging={true} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center text-cortex-muted font-mono text-sm"
      >
        <div>Glissez-déposez les tâches entre les quadrants</div>
        <div className="mt-2">Clic droit sur une tâche pour les actions</div>
      </motion.div>
    </div>
  );
};
