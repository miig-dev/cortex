'use client';

// biome-ignore assist/source/organizeImports: false positive
import { EisenhowerMatrix } from '@/features/eisenhower/components/eisenhower-matrix';
import type { EisenhowerQuadrant, EisenhowerTask } from '@/types/eisenhower';
import { useState } from 'react';

// Tâches d'exemple pour la démonstration
const sampleTasks: EisenhowerTask[] = [
  {
    id: '1',
    content: 'Corriger le bug critique de paiement',
    tags: ['urgent', 'bug'],
    quadrant: 'urgent-important',
    createdAt: new Date(),
    priority: 1,
  },
  {
    id: '2',
    content: 'Écrire la documentation API',
    tags: ['docs'],
    quadrant: 'important-non-urgent',
    createdAt: new Date(),
    priority: 2,
  },
  {
    id: '3',
    content: 'Répondre aux emails clients',
    tags: ['urgent'],
    quadrant: 'urgent-non-important',
    createdAt: new Date(),
    priority: 3,
  },
  {
    id: '4',
    content: 'Organiser le bureau',
    tags: [],
    quadrant: 'non-urgent-non-important',
    createdAt: new Date(),
    priority: 4,
  },
];

export default function EisenhowerPage() {
  const [tasks, setTasks] = useState<EisenhowerTask[]>(sampleTasks);

  const handleTaskMove = (taskId: string, newQuadrant: EisenhowerQuadrant) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, quadrant: newQuadrant } : task,
      ),
    );
    console.log(`Tâche ${taskId} déplacée vers ${newQuadrant}`);
    // Ici on pourrait sauvegarder en base de données
  };

  const handleTaskComplete = (taskId: string) => {
    console.log(`Tâche ${taskId} terminée`);
    // Ici on pourrait marquer comme terminée en base
  };

  const handleTaskDelete = (taskId: string) => {
    console.log(`Tâche ${taskId} supprimée`);
    // Ici on pourrait supprimer de la base
  };

  return (
    <EisenhowerMatrix
      initialTasks={tasks}
      onTaskMove={handleTaskMove}
      onTaskComplete={handleTaskComplete}
      onTaskDelete={handleTaskDelete}
    />
  );
}
