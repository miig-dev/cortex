'use client';

import { type TaskQuadrant, useCortexStore } from '@/stores/cortex-store';

const QUADRANT_LABELS: Record<TaskQuadrant, string> = {
  urgent_important: '🔥 Urgent & Important',
  noturgent_important: '📋 Important',
  urgent_notimportant: '⚡ Urgent',
  noturgent_notimportant: '🗑️ Éliminer',
};

export function SearchAndFilters() {
  const {
    searchQuery,
    selectedArea,
    selectedQuadrant,
    showCompleted,
    areas,
    setSearchQuery,
    setSelectedArea,
    setSelectedQuadrant,
    setShowCompleted,
    clearFilters,
  } = useCortexStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: '#E0E0E0' }}>
        🔍 Recherche & Filtres
      </h3>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#E0E0E0',
          }}
          suppressHydrationWarning={true}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Effacer la recherche"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Filtres compacts */}
      <div className="space-y-3">
        {/* Filtre par area */}
        <select
          value={selectedArea || ''}
          onChange={(e) => setSelectedArea(e.target.value || null)}
          className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#E0E0E0',
          }}
        >
          <option value="">Toutes les areas</option>
          {areas.map((area) => (
            <option key={area.id} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>

        {/* Filtre par quadrant */}
        <select
          value={selectedQuadrant || ''}
          onChange={(e) =>
            setSelectedQuadrant((e.target.value as TaskQuadrant) || null)
          }
          className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#E0E0E0',
          }}
        >
          <option value="">Tous les quadrants</option>
          {Object.entries(QUADRANT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Toggle tâches terminées */}
        <label
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-white hover:bg-opacity-5"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-4 h-4 rounded border-2 border-gray-400 bg-transparent focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm" style={{ color: '#E0E0E0' }}>
            Afficher terminées
          </span>
        </label>

        {/* Bouton clear */}
        {(searchQuery ||
          selectedArea ||
          selectedQuadrant ||
          !showCompleted) && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full px-3 py-2 rounded-lg border-2 border-red-400 text-red-400 hover:bg-red-400 hover:bg-opacity-10 transition-all duration-200"
          >
            Effacer filtres
          </button>
        )}
      </div>
    </div>
  );
}
