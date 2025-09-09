'use client';

import { useEffect, useState } from 'react';
import { useCortexStore } from '@/stores/cortex-store';

export function QuickStats() {
  const { getStats } = useCortexStore();
  const [stats, setStats] = useState<{
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    completionRate: number;
    eisenhowerBreakdown: {
      urgentImportant: number;
      notUrgentImportant: number;
      urgentNotImportant: number;
      notUrgentNotImportant: number;
    };
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getStats());
  }, [getStats]);

  // Éviter l'hydratation mismatch en attendant que les stats soient chargées côté client
  if (!isClient || !stats) {
    return (
      <div className="space-y-6">
        {/* Stats principales - état de chargement */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-600 to-gray-700 p-3 rounded-lg text-center animate-pulse"
            >
              <div className="text-xl font-bold text-white mb-1">--</div>
              <div className="text-xs text-gray-300 leading-tight">
                Chargement...
              </div>
            </div>
          ))}
        </div>

        {/* Répartition Eisenhower - état de chargement */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: '#E0E0E0' }}
          >
            📊 Répartition Eisenhower
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded bg-gray-700 animate-pulse"
              >
                <span className="text-sm text-gray-400">--</span>
                <span className="text-sm font-bold text-gray-400">--</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completionRate =
    stats?.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-white mb-1">
            {stats.totalTasks}
          </div>
          <div className="text-xs text-blue-100 leading-tight">
            Tâches totales
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-white mb-1">
            {stats.completedTasks}
          </div>
          <div className="text-xs text-green-100 leading-tight">Terminées</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-white mb-1">
            {stats.pendingTasks}
          </div>
          <div className="text-xs text-orange-100 leading-tight">En cours</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-white mb-1">
            {completionRate}%
          </div>
          <div className="text-xs text-purple-100 leading-tight">
            Complétion
          </div>
        </div>
      </div>

      {/* Répartition Eisenhower */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#E0E0E0' }}>
          📊 Répartition Eisenhower
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: '#2A0A0A' }}
          >
            <span className="text-sm" style={{ color: '#EF476F' }}>
              🔥 Urgent & Important
            </span>
            <span className="text-sm font-bold" style={{ color: '#EF476F' }}>
              {stats.tasksByQuadrant.urgent_important || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: '#0A1A2A' }}
          >
            <span className="text-sm" style={{ color: '#4CAF50' }}>
              📋 Important
            </span>
            <span className="text-sm font-bold" style={{ color: '#4CAF50' }}>
              {stats.tasksByQuadrant.noturgent_important || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: '#2A2A0A' }}
          >
            <span className="text-sm" style={{ color: '#FF7733' }}>
              ⚡ Urgent
            </span>
            <span className="text-sm font-bold" style={{ color: '#FF7733' }}>
              {stats.tasksByQuadrant.urgent_notimportant || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            <span className="text-sm" style={{ color: '#6B7280' }}>
              🗑️ Éliminer
            </span>
            <span className="text-sm font-bold" style={{ color: '#6B7280' }}>
              {stats.tasksByQuadrant.noturgent_notimportant || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
