'use client';

import { CalendarDay, CalendarEvent } from '@/types/calendar';
import { useMemo, useState } from 'react';

interface WeekViewProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (date: Date, time?: string) => void;
  onTaskDrop?: (taskId: number, date: Date, time?: string) => void;
}

export function WeekView({ events, onEventClick, onEventCreate, onTaskDrop }: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedTask, setDraggedTask] = useState<number | null>(null);

  // Générer les jours de la semaine
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Lundi
    startOfWeek.setDate(diff);

    const days: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.toDateString() === date.toDateString();
      });

      days.push({
        date,
        events: dayEvents,
        isToday: date.toDateString() === new Date().toDateString(),
        isCurrentMonth: date.getMonth() === currentDate.getMonth(),
      });
    }

    return days;
  }, [currentDate, events]);

  const weekNumber = useMemo(() => {
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }, [currentDate]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDragOver = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onTaskDrop) {
      onTaskDrop(parseInt(taskId, 10), date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      {/* Header de la semaine */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Agenda
              </h2>
              <p className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                Semaine {weekNumber} • {currentDate.toLocaleDateString('fr-FR', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateWeek('prev')}
            className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            style={{ color: '#E0E0E0' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goToToday}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            Aujourd'hui
          </button>

          <button
            type="button"
            onClick={() => navigateWeek('next')}
            className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            style={{ color: '#E0E0E0' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grille de la semaine */}
      <div className="grid grid-cols-7 gap-2">
        {/* En-têtes des jours */}
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
          <div
            key={day}
            className="p-4 text-center font-bold text-sm uppercase tracking-wider"
            style={{ color: '#9CA3AF' }}
          >
            {day}
          </div>
        ))}

        {/* Jours de la semaine */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-[140px] p-3 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
              day.isToday
                ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-purple-500/20'
                : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-800/70'
            }`}
            onDragOver={(e) => handleDragOver(e, day.date)}
            onDrop={(e) => handleDrop(e, day.date)}
          >
            {/* Numéro du jour */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-lg font-bold ${
                  day.isToday
                    ? 'text-purple-400'
                    : day.isCurrentMonth
                      ? 'text-white'
                      : 'text-gray-500'
                }`}
              >
                {day.date.getDate()}
              </span>

              <button
                type="button"
                onClick={() => onEventCreate?.(day.date)}
                className="w-8 h-8 rounded-full hover:bg-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ color: '#9CA3AF' }}
                title="Ajouter un événement"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Événements du jour */}
            <div className="space-y-2">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: event.color + '25',
                    borderLeft: `4px solid ${event.color}`,
                    color: '#E0E0E0',
                    boxShadow: `0 2px 8px ${event.color}20`
                  }}
                >
                  <div className="font-semibold truncate mb-1">{event.title}</div>
                  {!event.allDay && (
                    <div className="text-xs opacity-80 font-medium">
                      {formatTime(event.start)}
                    </div>
                  )}
                  {event.area && (
                    <div className="text-xs opacity-60 truncate">
                      {event.area}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
