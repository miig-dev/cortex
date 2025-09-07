'use client';

import { SearchAndFilters } from '@/components/filters/search-and-filters';
import { QuickStats } from '@/components/stats/quick-stats';
import { TaskItem } from '@/components/task/task-item';
import { MiniCalendar } from '@/components/overview/mini-calendar';
import { QuickTasks } from '@/components/overview/quick-tasks';
import { QuickProjects } from '@/components/overview/quick-projects';
import { QuickAreas } from '@/components/overview/quick-areas';
import { DigitalClock } from '@/components/overview/digital-clock';
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

      {/* Contenu principal - Vue d'ensemble Notion-like */}
      <div className="container mx-auto px-8 py-8">
        
        {/* Header avec horloge et recherche */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <DigitalClock />
            <div className="w-96">
              <SearchAndFilters />
            </div>
          </div>
        </section>

        {/* Grille principale - Vue Notion */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Colonne 1: Calendrier et Stats */}
          <div className="xl:col-span-1 space-y-6">
            <MiniCalendar />
            <QuickStats />
          </div>

          {/* Colonne 2: Planificateur */}
          <div className="xl:col-span-2">
            <QuickTasks />
          </div>

          {/* Colonne 3: Projets et Areas */}
          <div className="xl:col-span-1 space-y-6">
            <QuickProjects />
            <QuickAreas />
          </div>
        </div>

        {/* Section d'ajout rapide */}
        <section className="mt-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#E0E0E0' }}>
              <span className="text-2xl">⚡</span>
              Ajout rapide
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ajouter une tâche */}
              <div className="space-y-3">
                <label className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                  Nouvelle tâche
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
                    placeholder="Tâche urgente..."
                    className="flex-1 px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    style={{
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#E0E0E0'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                    style={{
                      backgroundColor: '#4361EE',
                      color: 'white'
                    }}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Ajouter un projet */}
              <div className="space-y-3">
                <label className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                  Nouveau projet
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleAddProject)}
                    placeholder="Site e-commerce..."
                    className="flex-1 px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    style={{
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#E0E0E0'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white'
                    }}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Ajouter une area */}
              <div className="space-y-3">
                <label className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                  Nouvelle area
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleAddArea)}
                    placeholder="Formation..."
                    className="flex-1 px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    style={{
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#E0E0E0'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddArea}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                    style={{
                      backgroundColor: '#EF476F',
                      color: 'white'
                    }}
                  >
                    ➕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
