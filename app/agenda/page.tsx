'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { EventModal } from '@/components/calendar/event-modal';
import { MarkdownInput } from '@/components/calendar/markdown-input';
import { WeekView } from '@/components/calendar/week-view';
import { useCortexStore } from '@/stores/cortex-store';
import type { CalendarEvent } from '@/types/calendar';

export default function AgendaPage() {
  const { tasks, events, addEvent, updateEvent } = useCortexStore();
  const [showMarkdownInput, setShowMarkdownInput] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  // Convertir les tâches en événements calendrier
  const calendarEvents = useMemo(() => {
    const taskEvents: CalendarEvent[] = tasks.map((task) => ({
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
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEventCreate = (date: Date, time?: string) => {
    setSelectedEvent(null);
    setSelectedDate(date);
    setSelectedTime(time);
    setShowEventModal(true);
  };

  const handleTaskDrop = (taskId: number, date: Date, time?: string) => {
    console.log('Tâche déplacée:', taskId, date, time);
    // Ici on pourrait mettre à jour la date de la tâche
  };

  const handleEventSave = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const handleTasksCreated = (newEvents: CalendarEvent[]) => {
    // Les événements sont maintenant gérés par le store
    console.log('Tâches créées:', newEvents);
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
                  color: 'white',
                }}
              >
                {showMarkdownInput ? 'Masquer' : 'Ajouter'} Markdown
              </button>

              <Link
                href="/"
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: '#6B7280',
                  color: 'white',
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
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: '#E0E0E0' }}
            >
              <span className="text-2xl">📊</span>
              Statistiques
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span style={{ color: '#9CA3AF' }}>Total tâches:</span>
                <span className="font-bold text-blue-400">{tasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#9CA3AF' }}>Événements:</span>
                <span className="font-bold text-purple-400">
                  {events.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#9CA3AF' }}>Cette semaine:</span>
                <span className="font-bold text-green-400">
                  {calendarEvents.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: '#E0E0E0' }}
            >
              <span className="text-2xl">🎯</span>
              Actions rapides
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowMarkdownInput(true)}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                style={{ color: '#E0E0E0' }}
              >
                📝 Ajouter tâches markdown
              </button>
              <button
                type="button"
                onClick={() => handleEventCreate(new Date())}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                style={{ color: '#E0E0E0' }}
              >
                ➕ Créer événement
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: '#E0E0E0' }}
            >
              <span className="text-2xl">🔗</span>
              Navigation
            </h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                style={{ color: '#E0E0E0' }}
              >
                📋 Planificateur
              </Link>
              <Link
                href="/eisenhower"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                style={{ color: '#E0E0E0' }}
              >
                📊 Eisenhower
              </Link>
              <Link
                href="/focus"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                style={{ color: '#E0E0E0' }}
              >
                🍅 Focus Timer
              </Link>
            </div>
          </div>
        </div>

        {/* Modal d'événement */}
        <EventModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
            setSelectedDate(undefined);
            setSelectedTime(undefined);
          }}
          onSave={handleEventSave}
          initialDate={selectedDate}
          initialTime={selectedTime}
          event={selectedEvent}
        />
      </div>
    </div>
  );
}
