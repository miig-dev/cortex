'use client';

import { useCortexStore } from '@/stores/cortex-store';
import Link from 'next/link';

export function QuickAreas() {
  const { areas, tasks } = useCortexStore();

  const getTasksForArea = (areaName: string) => {
    return tasks.filter(task => task.area === areaName);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#E0E0E0' }}>
          <span className="text-2xl">🎯</span>
          Areas
        </h3>
        <div className="text-sm" style={{ color: '#9CA3AF' }}>
          {areas.length} area{areas.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Grille des areas */}
      <div className="grid grid-cols-2 gap-3">
        {areas.slice(0, 6).map((area) => {
          const areaTasks = getTasksForArea(area.name);
          const completedTasks = areaTasks.filter(t => t.completed).length;
          const totalTasks = areaTasks.length;
          
          return (
            <Link
              key={area.id}
              href="/inbox"
              className="p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: area.color }}
                />
                <div className="font-medium text-sm truncate" style={{ color: '#E0E0E0' }}>
                  {area.name}
                </div>
              </div>
              
              {/* Progression */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-600 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%',
                      backgroundColor: area.color
                    }}
                  />
                </div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>
                  {completedTasks}/{totalTasks}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs" style={{ color: '#9CA3AF' }}>
          {tasks.length} tâches réparties dans {areas.length} areas
        </div>
      </div>
    </div>
  );
}
