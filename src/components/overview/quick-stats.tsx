'use client';

import { useCortexStore } from '@/stores/cortex-store';

export function QuickStats() {
  const { getStats } = useCortexStore();
  const stats = getStats();

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: '#E0E0E0' }}
        >
          <span className="text-2xl">📊</span>
          Statistiques
        </h3>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {stats.totalTasks}
          </div>
          <div className="text-xs" style={{ color: '#9CA3AF' }}>
            Tâches
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {completionRate}%
          </div>
          <div className="text-xs" style={{ color: '#9CA3AF' }}>
            Complétion
          </div>
        </div>
      </div>

      {/* Répartition Eisenhower */}
      <div className="space-y-2">
        <div className="text-sm font-medium" style={{ color: '#E0E0E0' }}>
          Répartition Eisenhower
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div
            className="flex items-center justify-between p-2 rounded text-xs"
            style={{ backgroundColor: '#2A0A0A' }}
          >
            <span style={{ color: '#EF476F' }}>🔥 Urgent</span>
            <span className="font-bold" style={{ color: '#EF476F' }}>
              {stats.tasksByQuadrant.urgent_important || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded text-xs"
            style={{ backgroundColor: '#0A1A2A' }}
          >
            <span style={{ color: '#4CAF50' }}>📋 Important</span>
            <span className="font-bold" style={{ color: '#4CAF50' }}>
              {stats.tasksByQuadrant.noturgent_important || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded text-xs"
            style={{ backgroundColor: '#2A2A0A' }}
          >
            <span style={{ color: '#FF7733' }}>⚡ Urgent</span>
            <span className="font-bold" style={{ color: '#FF7733' }}>
              {stats.tasksByQuadrant.urgent_notimportant || 0}
            </span>
          </div>
          <div
            className="flex items-center justify-between p-2 rounded text-xs"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            <span style={{ color: '#6B7280' }}>🗑️ Éliminer</span>
            <span className="font-bold" style={{ color: '#6B7280' }}>
              {stats.tasksByQuadrant.noturgent_notimportant || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
