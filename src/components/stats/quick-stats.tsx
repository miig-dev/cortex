'use client';

import { useCortexStore } from '@/stores/cortex-store';

export function QuickStats() {
  const { getStats } = useCortexStore();
  const stats = getStats();

  const completionRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">{stats.totalTasks}</div>
          <div className="text-sm text-blue-100">Tâches totales</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
          <div className="text-sm text-green-100">Terminées</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">{stats.pendingTasks}</div>
          <div className="text-sm text-orange-100">En cours</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">{completionRate}%</div>
          <div className="text-sm text-purple-100">Complétion</div>
        </div>
      </div>

      {/* Répartition Eisenhower */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#E0E0E0' }}>
          📊 Répartition Eisenhower
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#2A0A0A' }}>
            <span className="text-sm" style={{ color: '#EF476F' }}>🔥 Urgent & Important</span>
            <span className="text-sm font-bold" style={{ color: '#EF476F' }}>
              {stats.tasksByQuadrant.urgent_important || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#0A1A2A' }}>
            <span className="text-sm" style={{ color: '#4CAF50' }}>📋 Important</span>
            <span className="text-sm font-bold" style={{ color: '#4CAF50' }}>
              {stats.tasksByQuadrant.noturgent_important || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#2A2A0A' }}>
            <span className="text-sm" style={{ color: '#FF7733' }}>⚡ Urgent</span>
            <span className="text-sm font-bold" style={{ color: '#FF7733' }}>
              {stats.tasksByQuadrant.urgent_notimportant || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#1A1A1A' }}>
            <span className="text-sm" style={{ color: '#6B7280' }}>🗑️ Éliminer</span>
            <span className="text-sm font-bold" style={{ color: '#6B7280' }}>
              {stats.tasksByQuadrant.noturgent_notimportant || 0}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
