'use client';

import { useId, useState } from 'react';
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
    console.log('🔍 handleAddTask appelé');
    console.log('🔍 newTask:', newTask);
    console.log('🔍 addTask function:', addTask);

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
    console.log('🔍 handleAddProject appelé');
    console.log('🔍 newProject:', newProject);
    console.log('🔍 addProject function:', addProject);

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
    console.log('🔍 handleAddArea appelé');
    console.log('🔍 newArea:', newArea);
    console.log('🔍 addArea function:', addArea);

    const trimmedArea = newArea.trim();
    if (!trimmedArea) {
      console.log('Area vide, rien à ajouter');
      return;
    }

    try {
      console.log("Ajout de l'area:", trimmedArea);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cortex Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Contenu principal - Vue d'ensemble Notion-like */}
      <div className="container mx-auto px-8 py-8">
        {/* Header avec horloge, pomodoro et recherche */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <DigitalClock />
              <CompactPomodoro />
            </div>
            <div className="w-full lg:w-96">
              <SearchAndFilters />
            </div>
          </div>
        </section>

        {/* Grille principale - Vue Notion */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Colonne 1: Calendrier et Stats */}
          <div className="xl:col-span-1 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <MiniCalendar />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <QuickStats />
            </div>
          </div>

          {/* Colonne 2: Planificateur */}
          <div className="xl:col-span-2 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <QuickTasks />
            </div>

            {/* Ajout unifié dans le planificateur */}
            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                  <span className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    ⚡
                  </span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Ajout rapide
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Ajouter une tâche */}
                  <div className="space-y-3">
                    <label
                      htmlFor={taskInputId}
                      className="text-sm font-medium text-gray-300 flex items-center gap-2"
                    >
                      <span className="text-blue-400">📝</span>
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
                        className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                        suppressHydrationWarning={true}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTask}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                      >
                        ✨ Ajouter
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
                        className="text-sm font-medium text-gray-300 flex items-center gap-2"
                      >
                        <span className="text-green-400">🚀</span>
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
                          className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                          suppressHydrationWarning={true}
                        />
                        <Button
                          type="button"
                          onClick={handleAddProject}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-3 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                        >
                          ➕
                        </Button>
                      </div>
                    </div>

                    {/* Ajouter une area */}
                    <div className="space-y-3">
                      <label
                        htmlFor={areaInputId}
                        className="text-sm font-medium text-gray-300 flex items-center gap-2"
                      >
                        <span className="text-red-400">🏢</span>
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
                          className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20"
                          suppressHydrationWarning={true}
                        />
                        <Button
                          type="button"
                          onClick={handleAddArea}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-3 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/25"
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
            <div className="transform hover:scale-105 transition-transform duration-300">
              <QuickProjects />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <QuickAreas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
