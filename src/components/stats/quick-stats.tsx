'use client';

import { useCortexStore } from '@/stores/cortex-store';
import Link from 'next/link';

export function QuickStats() {
  const { getStats } = useCortexStore();
  const stats = getStats();

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Tâches totales */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">{stats.totalTasks}</div>
        <div className="text-sm text-blue-100">Tâches totales</div>
      </div>

      {/* Tâches terminées */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
        <div className="text-sm text-green-100">Terminées</div>
      </div>

      {/* Tâches en cours */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">{stats.pendingTasks}</div>
        <div className="text-sm text-orange-100">En cours</div>
      </div>

      {/* Taux de completion */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">{completionRate}%</div>
        <div className="text-sm text-purple-100">Complétion</div>
      </div>

      {/* Répartition par quadrant */}
      <div className="col-span-2 md:col-span-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#E0E0E0' }}>
          Répartition Eisenhower
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

      {/* Liens rapides */}
      <div className="col-span-2 md:col-span-4 flex gap-2">
        <Link
          href="/eisenhower"
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
        >
          📊 Matrice Eisenhower
        </Link>
        <Link
          href="/focus"
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
        >
          🍅 Focus Timer
        </Link>
        <Link
          href="/stats"
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
        >
          🏆 Statistiques
        </Link>
      </div>
    </div>
  );
}
