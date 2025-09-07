'use client';

import { useCortexStore } from '@/stores/cortex-store';

export function QuickProjects() {
  const { projects } = useCortexStore();
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#E0E0E0' }}>
          <span className="text-2xl">🚀</span>
          Projets
        </h3>
        <div className="text-sm" style={{ color: '#9CA3AF' }}>
          {projects.length} projet{projects.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Projets récents */}
      <div className="space-y-3">
        {recentProjects.length === 0 ? (
          <div className="text-center py-6" style={{ color: '#6B7280' }}>
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-sm">Aucun projet</div>
          </div>
        ) : (
          recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate" style={{ color: '#E0E0E0' }}>
                  {project.name}
                </div>
                {project.description && (
                  <div className="text-xs truncate" style={{ color: '#9CA3AF' }}>
                    {project.description}
                  </div>
                )}
              </div>
              <div className="text-xs" style={{ color: '#6B7280' }}>
                {project.completed ? '✅' : '⏳'}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions rapides */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs" style={{ color: '#9CA3AF' }}>
          {projects.filter(p => !p.completed).length} actifs • {projects.filter(p => p.completed).length} terminés
        </div>
      </div>
    </div>
  );
}
