'use client';

import { SearchAndFilters } from '@/components/filters/search-and-filters';
import { QuickStats } from '@/components/stats/quick-stats';
import { TaskItem } from '@/components/task/task-item';
import { useCortexStore } from '@/stores/cortex-store';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const {
    projects,
    areas,
    addTask,
    addProject,
    addArea,
    getFilteredTasks,
  } = useCortexStore();

  const [newTask, setNewTask] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newArea, setNewArea] = useState('');
  const [selectedArea, setSelectedArea] = useState('Freelance Work');

  // Fonctions pour ajouter des éléments
  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask, selectedArea);
      setNewTask('');
    }
  };

  const handleAddProject = () => {
    if (newProject.trim()) {
      addProject(newProject);
      setNewProject('');
    }
  };

  const handleAddArea = () => {
    if (newArea.trim()) {
      addArea(newArea);
      setNewArea('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header avec navigation */}
      <header className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold" style={{ color: '#E0E0E0' }}>
              Cortex - Dashboard
            </h1>
            <nav className="flex gap-4">
              <Link
                href="/inbox"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#4361EE',
                  color: 'white'
                }}
              >
                📥 Inbox
              </Link>
              <Link
                href="/agenda"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#9C27B0',
                  color: 'white'
                }}
              >
                📅 Agenda
              </Link>
              <Link
                href="/eisenhower"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white'
                }}
              >
                📊 Eisenhower
              </Link>
              <Link
                href="/focus"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#FF7733',
                  color: 'white'
                }}
              >
                🍅 Focus
              </Link>
              <Link
                href="/stats"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#EF476F',
                  color: 'white'
                }}
              >
                🏆 Stats
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="container mx-auto px-8 py-8">

        {/* Stats rapides et recherche */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuickStats />
            </div>
            <div className="lg:col-span-1">
              <SearchAndFilters />
            </div>
          </div>
        </section>

        {/* Planificateur principal */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ color: '#E0E0E0' }}>
              📋 Planificateur
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#E0E0E0',
                }}
              >
                {areas.map((area) => (
                  <option key={area.id} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zone d'ajout de tâche */}
          <div className="flex items-center space-x-4 mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
              placeholder="Ex: 'urgent important fix bug' ou 'planifier réunion'..."
              className="flex-1 px-4 py-3 text-lg rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#E0E0E0'
              }}
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#4361EE',
                color: 'white'
              }}
            >
              ➕ Ajouter
            </button>
          </div>

          {/* Liste des tâches */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12" style={{ color: '#6B7280' }}>
                <div className="text-6xl mb-4">📝</div>
                <div className="text-xl">Aucune tâche trouvée</div>
                <div className="text-sm mt-2">Ajoutez votre première tâche ci-dessus</div>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  showActions={true}
                  compact={false}
                />
              ))
            )}
          </div>
        </section>

        {/* Projets et Areas en grille */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Projets */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>
              🚀 Projets
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <input
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAddProject)}
                placeholder="Nom du nouveau projet..."
                className="flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#E0E0E0'
                }}
              />
              <button
                type="button"
                onClick={handleAddProject}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white'
                }}
              >
                ➕
              </button>
            </div>

            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-8" style={{ color: '#6B7280' }}>
                  <div className="text-4xl mb-2">🚀</div>
                  <div>Aucun projet</div>
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg border-2 hover:shadow-md transition-all duration-200"
                    style={{
                      borderColor: project.color + '40',
                      backgroundColor: project.color + '10'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-medium" style={{ color: '#E0E0E0' }}>
                          {project.name}
                        </div>
                        {project.description && (
                          <div className="text-sm mt-1" style={{ color: '#6B7280' }}>
                            {project.description}
                          </div>
                        )}
                      </div>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Areas */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>
              🎯 Areas
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <input
                type="text"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAddArea)}
                placeholder="Nom de la nouvelle area..."
                className="flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#E0E0E0'
                }}
              />
              <button
                type="button"
                onClick={handleAddArea}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#EF476F',
                  color: 'white'
                }}
              >
                ➕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <Link
                  key={area.id}
                  href="/inbox"
                  className="p-4 rounded-lg border-2 hover:shadow-md transition-all duration-200 text-center group"
                  style={{
                    borderColor: area.color + '40',
                    backgroundColor: area.color + '10'
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: area.color }}
                  />
                  <div className="text-sm font-medium" style={{ color: '#E0E0E0' }}>
                    {area.name}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
