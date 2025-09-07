'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { WeekView } from '@/components/calendar/week-view';
import { MarkdownInput } from '@/components/calendar/markdown-input';
import { CalendarEvent } from '@/types/calendar';
import { useCortexStore } from '@/stores/cortex-store';

export default function AgendaPage() {
  const { tasks, addTask } = useCortexStore();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showMarkdownInput, setShowMarkdownInput] = useState(false);

  // Convertir les tâches en événements calendrier
  const calendarEvents = useMemo(() => {
    const taskEvents: CalendarEvent[] = tasks.map(task => ({
      id: `task-${task.id}`,
      title: task.content,
      description: task.area,
      start: task.createdAt,
      end: new Date(task.createdAt.getTime() + 60 * 60 * 1000), // 1 heure par défaut
      allDay: false,
      color: task.color || '#4361EE',
      type: 'task',
      taskId: task.id,
      area: task.area,
      quadrant: task.quadrant,
    }));

    return [...taskEvents, ...events];
  }, [tasks, events]);

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Événement cliqué:', event);
    // Ici on pourrait ouvrir un modal d'édition
  };

  const handleEventCreate = (date: Date, time?: string) => {
    console.log('Créer événement:', date, time);
    // Ici on pourrait ouvrir un formulaire de création d'événement
  };

  const handleTaskDrop = (taskId: number, date: Date, time?: string) => {
    console.log('Tâche déplacée:', taskId, date, time);
    // Ici on pourrait mettre à jour la date de la tâche
  };

  const handleTasksCreated = (newEvents: CalendarEvent[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold hover:opacity-80 transition-opacity"
                style={{ color: '#E0E0E0' }}
              >
                ← Cortex
              </Link>
              <h1 className="text-3xl font-bold" style={{ color: '#E0E0E0' }}>
                📅 Agenda
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowMarkdownInput(!showMarkdownInput)}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: showMarkdownInput ? '#4CAF50' : '#4361EE',
                  color: 'white'
                }}
              >
                {showMarkdownInput ? 'Masquer' : 'Ajouter'} Markdown
              </button>
              
              <Link
                href="/"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#6B7280',
                  color: 'white'
                }}
              >
                Retour
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="container mx-auto px-8 py-8">
        {/* Input markdown */}
        {showMarkdownInput && (
          <div className="mb-8">
            <MarkdownInput
              onTasksCreated={handleTasksCreated}
              className="mb-6"
            />
          </div>
        )}

        {/* Vue semaine */}
        <WeekView
          events={calendarEvents}
          onEventClick={handleEventClick}
          onEventCreate={handleEventCreate}
          onTaskDrop={handleTaskDrop}
        />

        {/* Stats rapides */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0E0E0' }}>
              📊 Statistiques
            </h3>
            <div className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
              <div>Total tâches: {tasks.length}</div>
              <div>Événements calendrier: {events.length}</div>
              <div>Tâches cette semaine: {calendarEvents.length}</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0E0E0' }}>
              🎯 Actions rapides
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowMarkdownInput(true)}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                style={{ color: '#E0E0E0' }}
              >
                + Ajouter tâches markdown
              </button>
              <button
                type="button"
                onClick={() => console.log('Créer événement')}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                style={{ color: '#E0E0E0' }}
              >
                + Créer événement
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0E0E0' }}>
              🔗 Navigation
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                style={{ color: '#E0E0E0' }}
              >
                📋 Planificateur
              </Link>
              <Link
                href="/eisenhower"
                className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                style={{ color: '#E0E0E0' }}
              >
                📊 Eisenhower
              </Link>
              <Link
                href="/focus"
                className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                style={{ color: '#E0E0E0' }}
              >
                🍅 Focus Timer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
