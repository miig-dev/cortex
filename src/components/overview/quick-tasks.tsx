'use client';

import { TaskItem } from '@/components/task/task-item';
import { useCortexStore } from '@/stores/cortex-store';
import { useEffect, useState } from 'react';

export function QuickTasks() {
  const { tasks, getFilteredTasks } = useCortexStore();
  const [isClient, setIsClient] = useState(false);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
    setRecentTasks(getFilteredTasks().slice(0, 5));
  }, [getFilteredTasks]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#E0E0E0' }}>
          <span className="text-2xl">📋</span>
          Planificateur
        </h3>
        <div className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
          {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Tâches récentes */}
      <div className="space-y-2">
        {!isClient ? (
          <div className="text-center py-6" style={{ color: '#6B7280' }}>
            <div className="text-4xl mb-2 animate-pulse">⏳</div>
            <div className="text-sm">Chargement...</div>
          </div>
        ) : recentTasks.length === 0 ? (
          <div className="text-center py-6" style={{ color: '#6B7280' }}>
            <div className="text-4xl mb-2">📝</div>
            <div className="text-sm">Aucune tâche</div>
          </div>
        ) : (
          recentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              showActions={false}
              compact={true}
            />
          ))
        )}
      </div>

      {/* Actions rapides */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs" style={{ color: '#9CA3AF' }}>
          {tasks.filter(t => !t.completed).length} en cours • {tasks.filter(t => t.completed).length} terminées
        </div>
      </div>
    </div>
  );
}
