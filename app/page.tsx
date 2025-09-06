'use client';

import { ArrowRight, Brain, Calendar, Plus, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type TaskQuadrant = 'urgent_important' | 'noturgent_important' | 'urgent_notimportant' | 'noturgent_notimportant';

interface Task {
  id: number;
  content: string;
  area: string;
  completed: boolean;
  quadrant: TaskQuadrant;
  color?: string;
  bgColor?: string;
  title?: string;
}

export default function HomePage() {
  // États pour gérer les données dynamiques
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      content: 'Tâche à accomplir',
      area: 'Freelance Work',
      completed: false,
      quadrant: 'noturgent_notimportant',
      color: '#6B7280',
      bgColor: '#1A1A1A',
      title: '🗑️ ÉLIMINER',
    },
  ]);
  const [projects, setProjects] = useState<string[]>([]);
  const [areas, setAreas] = useState([
    'Freelance Work',
    'Marketing',
    'Web site',
    'Health & Wellness',
    'Admin',
    'Questionnaire avant le rendez-vous',
    'Personal Development',
    "Discussion pendant l'entretien",
  ]);
  const [newTask, setNewTask] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newArea, setNewArea] = useState('');

  // Fonction pour catégoriser automatiquement les tâches selon Eisenhower
  const categorizeTask = (content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Mots-clés pour Urgent
    const urgentKeywords = ['urgent', 'asap', 'maintenant', 'immédiat', 'critique', 'deadline', 'échéance', '!urgent'];
    // Mots-clés pour Important
    const importantKeywords = ['important', 'priorité', 'essentiel', 'crucial', 'vital', '!important', 'prioritaire'];
    
    const isUrgent = urgentKeywords.some(keyword => lowerContent.includes(keyword));
    const isImportant = importantKeywords.some(keyword => lowerContent.includes(keyword));
    
    if (isUrgent && isImportant) {
      return {
        quadrant: 'urgent_important' as const,
        color: '#EF476F',
        bgColor: '#2A0A0A',
        title: '🔥 FAIRE MAINTENANT'
      };
    } else if (!isUrgent && isImportant) {
      return {
        quadrant: 'noturgent_important' as const,
        color: '#4361EE',
        bgColor: '#0A1A2A',
        title: '🧠 PLANIFIER'
      };
    } else if (isUrgent && !isImportant) {
      return {
        quadrant: 'urgent_notimportant' as const,
        color: '#FFD166',
        bgColor: '#2A2A0A',
        title: '⏱️ DÉLÉGUER'
      };
    } else {
      return {
        quadrant: 'noturgent_notimportant' as const,
        color: '#6B7280',
        bgColor: '#1A1A1A',
        title: '🗑️ ÉLIMINER'
      };
    }
  };

  // Fonctions pour ajouter des éléments
  const addTask = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (newTask.trim()) {
      const categorization = categorizeTask(newTask);
      const task: Task = {
        id: Date.now(),
        content: newTask,
        area: 'Freelance Work',
        completed: false,
        quadrant: categorization.quadrant,
        color: categorization.color,
        bgColor: categorization.bgColor,
        title: categorization.title,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const addProject = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject('');
    }
  };

  const addArea = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (newArea.trim()) {
      setAreas([...areas, newArea]);
      setNewArea('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Bar */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-300 text-sm">
                La méthode P.A.R.A / Igor_MigDev
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">
                Dernière modification : 19 août
              </span>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Star className="w-4 h-4" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Header Section with Code Background */}
      <div className="relative bg-slate-800 h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-20">
            <pre className="text-xs text-slate-400 p-4 font-mono">
              {`previousElements.length = 0;
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  if (element.classList.contains('active')) {
    previousElements.push(element);
  }
}`}
            </pre>
          </div>
        </div>
        <div className="absolute top-8 left-8">
          <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
            <Calendar className="w-8 h-8 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">Igor_MigDev</h1>

        {/* Calendrier Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Calendrier</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Calendrier hebdomadaire
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Calendrier mensuel
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300 font-medium">août 2025</span>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-sm">Aucune date (1)</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'].map(
                (day) => (
                  <div
                    key={day}
                    className="text-center text-slate-400 text-sm py-2"
                  >
                    {day}
                  </div>
                ),
              )}
              {[25, 26, 27, 28, 29, 30, 31].map((day) => (
                <div
                  key={day}
                  className={`text-center py-2 text-sm rounded ${
                    day === 28
                      ? 'bg-red-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button className="text-slate-400 text-sm hover:text-white transition-colors">
                Gérer dans le calendrier
              </button>
              <div className="flex items-center space-x-2">
                <button className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <span className="text-slate-300 text-sm">Aujourd'hui</span>
                <button className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Planificateur Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">PLANIFICATEUR</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors">
                Pas de date
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Horaire quotidien
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {/* Input pour ajouter une nouvelle tâche */}
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addTask)}
                  placeholder="Ex: 'urgent important fix bug' ou 'planifier réunion'..."
                  className="flex-1 px-3 py-2 bg-slate-700 text-slate-200 text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={addTask}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>

              {/* Liste des tâches */}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 hover:bg-slate-700 rounded-lg border-l-4"
                  style={{ 
                    borderLeftColor: task.color,
                    backgroundColor: task.bgColor + '20'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: task.color }}
                  />
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}
                    >
                      {task.content}
                    </div>
                    <div 
                      className="text-xs mt-1 font-semibold"
                      style={{ color: task.color }}
                    >
                      {task.title}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">{task.area}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projets Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">PROJETS</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors">
                Active
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Archivé
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                All Projets
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Input pour ajouter un nouveau projet */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addProject)}
                placeholder="Nom du nouveau projet..."
                className="flex-1 px-3 py-2 bg-slate-700 text-slate-200 text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addProject}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>

            {/* Liste des projets */}
            <div className="space-y-2">
              {projects.length === 0 ? (
                <div className="text-slate-400 text-sm text-center py-4">
                  Aucun projet pour le moment
                </div>
              ) : (
                projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 text-slate-300 text-sm">
                      {project}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">AREAS</h2>
            <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
              All Areas
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Input pour ajouter une nouvelle area */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addArea)}
                placeholder="Nom de la nouvelle area..."
                className="flex-1 px-3 py-2 bg-slate-700 text-slate-200 text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addArea}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {areas.map((area, index) => (
                <Link
                  key={index}
                  href="/inbox"
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 text-sm transition-colors"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Source Databases */}
        <section className="mb-12">
          <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">Source Databases</span>
          </button>
        </section>
      </div>
    </div>
  );
}
