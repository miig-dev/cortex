'use client';

import { SearchAndFilters } from '@/components/filters/search-and-filters';
import { CompactPomodoro } from '@/components/overview/compact-pomodoro';
import { DigitalClock } from '@/components/overview/digital-clock';
import { MiniCalendar } from '@/components/overview/mini-calendar';
import { QuickAreas } from '@/components/overview/quick-areas';
import { QuickProjects } from '@/components/overview/quick-projects';
import { QuickTasks } from '@/components/overview/quick-tasks';
import { QuickStats } from '@/components/stats/quick-stats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCortexStore } from '@/stores/cortex-store';
import { useId, useState } from 'react';

export default function HomePage() {
  const { addTask, addProject, addArea } = useCortexStore();

  const [newTask, setNewTask] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newArea, setNewArea] = useState('');

  // Génération d'IDs uniques pour les inputs
  const taskInputId = useId();
  const projectInputId = useId();
  const areaInputId = useId();

  // Fonctions pour ajouter des éléments
  const handleAddTask = () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      console.log('Tâche vide, rien à ajouter');
      return;
    }

    try {
      console.log('Ajout de la tâche:', trimmedTask);
      addTask(trimmedTask, 'Freelance Work');
      setNewTask('');
      console.log('✅ Tâche ajoutée avec succès');
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la tâche:", error);
    }
  };

  const handleAddProject = () => {
    const trimmedProject = newProject.trim();
    if (!trimmedProject) {
      console.log('Projet vide, rien à ajouter');
      return;
    }

    try {
      console.log('Ajout du projet:', trimmedProject);
      addProject(trimmedProject);
      setNewProject('');
      console.log('✅ Projet ajouté avec succès');
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout du projet:", error);
    }
  };

  const handleAddArea = () => {
    const trimmedArea = newArea.trim();
    if (!trimmedArea) {
      console.log('Area vide, rien à ajouter');
      return;
    }

    try {
      console.log('Ajout de l\'area:', trimmedArea);
      addArea(trimmedArea);
      setNewArea('');
      console.log('✅ Area ajoutée avec succès');
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de l'area:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        action();
      } catch (error) {
        console.error("❌ Erreur lors de l'exécution de l'action:", error);
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold" style={{ color: '#E0E0E0' }}>
              Cortex - Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Contenu principal - Vue d'ensemble Notion-like */}
      <div className="container mx-auto px-8 py-8">
        {/* Header avec horloge, pomodoro et recherche */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6 gap-6">
            <DigitalClock />
            <CompactPomodoro />
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
          <div className="xl:col-span-2 space-y-6">
            <QuickTasks />

            {/* Ajout unifié dans le planificateur */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                  <span className="text-2xl">⚡</span>
                  Ajout rapide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Ajouter une tâche */}
                  <div className="space-y-3">
                    <label
                      htmlFor={taskInputId}
                      className="text-sm font-medium text-gray-400"
                    >
                      Que devez-vous faire ?
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id={taskInputId}
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
                        placeholder="Tapez votre tâche ici..."
                        className="flex-1"
                        suppressHydrationWarning={true}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTask}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>

                  {/* Séparateur */}
                  <div className="border-t border-gray-600"></div>

                  {/* Ajouter projet et area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ajouter un projet */}
                    <div className="space-y-3">
                      <label
                        htmlFor={projectInputId}
                        className="text-sm font-medium text-gray-400"
                      >
                        Nouveau projet
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id={projectInputId}
                          type="text"
                          value={newProject}
                          onChange={(e) => setNewProject(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleAddProject)}
                          placeholder="Nom du nouveau projet..."
                          className="flex-1"
                          suppressHydrationWarning={true}
                        />
                        <Button
                          type="button"
                          onClick={handleAddProject}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          ➕
                        </Button>
                      </div>
                    </div>

                    {/* Ajouter une area */}
                    <div className="space-y-3">
                      <label
                        htmlFor={areaInputId}
                        className="text-sm font-medium text-gray-400"
                      >
                        Nouvelle area
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id={areaInputId}
                          type="text"
                          value={newArea}
                          onChange={(e) => setNewArea(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleAddArea)}
                          placeholder="Nom de la nouvelle area..."
                          className="flex-1"
                          suppressHydrationWarning={true}
                        />
                        <Button
                          type="button"
                          onClick={handleAddArea}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          ➕
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne 3: Projets et Areas */}
          <div className="xl:col-span-1 space-y-6">
            <QuickProjects />
            <QuickAreas />
          </div>
        </div>
      </div>
    </div>
  );
}
