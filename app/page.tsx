'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  // État pour gérer l'hydratation
  const [isHydrated, setIsHydrated] = useState(false);

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

  // Effet pour gérer l'hydratation
  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
  const addTask = () => {
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

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject('');
    }
  };

  const addArea = () => {
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
  // Éviter l'hydratation mismatch en ne rendant pas les inputs côté serveur
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="flex items-center justify-center h-screen">
          <div className="text-slate-300">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header simplifié */}
      <header className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold" style={{ color: '#E0E0E0' }}>
            Igor_MigDev
          </h1>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="container mx-auto px-8 py-8">

        {/* Calendrier Section - Version simplifiée */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#E0E0E0' }}>
              Calendrier hebdomadaire
            </h2>
            <button
              className="px-4 py-2 rounded font-medium transition-colors"
              style={{
                backgroundColor: '#4361EE',
                color: 'white'
              }}
            >
              Nouveau
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div
                key={day}
                className="text-center py-3 text-sm font-medium"
                style={{ color: '#6B7280' }}
              >
                {day}
              </div>
            ))}
            {[25, 26, 27, 28, 29, 30, 31].map((day) => (
              <div
                key={day}
                className={`text-center py-3 text-lg font-bold rounded ${
                  day === 28
                    ? 'text-white'
                    : 'hover:bg-gray-800'
                }`}
                style={{
                  backgroundColor: day === 28 ? '#EF476F' : 'transparent',
                  color: day === 28 ? 'white' : '#E0E0E0'
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </section>

        {/* Planificateur Section - Version simplifiée */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>
            PLANIFICATEUR
          </h2>

          {/* Zone d'ajout simplifiée */}
          <div className="flex items-center space-x-4 mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addTask)}
              placeholder="Ex: 'urgent important fix bug' ou 'planifier réunion'..."
              className="flex-1 px-4 py-3 text-lg rounded border-2 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,0,0,0.1)',
                color: '#E0E0E0'
              }}
            />
            <button
              onClick={() => addTask()}
              className="px-6 py-3 rounded font-medium transition-colors"
              style={{
                backgroundColor: '#4361EE',
                color: 'white'
              }}
            >
              Ajouter
            </button>
          </div>

          {/* Liste des tâches simplifiée */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-4 p-4 rounded border-l-4 hover:bg-gray-800 transition-colors"
                style={{
                  borderLeftColor: task.color,
                  backgroundColor: task.bgColor + '10'
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: task.color }}
                />
                <div className="flex-1">
                  <div
                    className={`text-lg ${task.completed ? 'line-through opacity-50' : ''}`}
                    style={{ color: '#E0E0E0' }}
                  >
                    {task.content}
                  </div>
                  <div
                    className="text-sm mt-1 font-semibold"
                    style={{ color: task.color }}
                  >
                    {task.title}
                  </div>
                </div>
                <div className="text-sm" style={{ color: '#6B7280' }}>
                  {task.area}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projets Section - Version simplifiée */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>
            PROJETS
          </h2>

          {/* Zone d'ajout simplifiée */}
          <div className="flex items-center space-x-4 mb-8">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addProject)}
              placeholder="Nom du nouveau projet..."
              className="flex-1 px-4 py-3 text-lg rounded border-2 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,0,0,0.1)',
                color: '#E0E0E0'
              }}
            />
            <button
              onClick={() => addProject()}
              className="px-6 py-3 rounded font-medium transition-colors"
              style={{
                backgroundColor: '#4361EE',
                color: 'white'
              }}
            >
              Ajouter
            </button>
          </div>

          {/* Liste des projets simplifiée */}
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="text-center py-8" style={{ color: '#6B7280' }}>
                Aucun projet pour le moment
              </div>
            ) : (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 rounded hover:bg-gray-800 transition-colors"
                  style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                >
                  <div className="text-lg" style={{ color: '#E0E0E0' }}>
                    {project}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Areas Section - Version simplifiée */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>
            AREAS
          </h2>

          {/* Zone d'ajout simplifiée */}
          <div className="flex items-center space-x-4 mb-8">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addArea)}
              placeholder="Nom de la nouvelle area..."
              className="flex-1 px-4 py-3 text-lg rounded border-2 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,0,0,0.1)',
                color: '#E0E0E0'
              }}
            />
            <button
              onClick={() => addArea()}
              className="px-6 py-3 rounded font-medium transition-colors"
              style={{
                backgroundColor: '#4361EE',
                color: 'white'
              }}
            >
              Ajouter
            </button>
          </div>

          {/* Grille des areas simplifiée */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areas.map((area, index) => (
              <Link
                key={index}
                href="/inbox"
                className="p-4 rounded hover:bg-gray-800 transition-colors text-center"
                style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#E0E0E0'
                }}
              >
                {area}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
