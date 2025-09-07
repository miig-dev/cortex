'use client';

import { useState, useMemo } from 'react';
import { CalendarEvent, CalendarDay, CalendarWeek } from '@/types/calendar';
import { useCortexStore } from '@/stores/cortex-store';
import { parseMarkdownTasks, markdownTaskToEvent } from '@/utils/markdown-parser';

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
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Header de la semaine */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold" style={{ color: '#E0E0E0' }}>
            📅 Agenda - Semaine {weekNumber}
          </h2>
          <span className="text-sm" style={{ color: '#6B7280' }}>
            {currentDate.toLocaleDateString('fr-FR', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateWeek('prev')}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            style={{ color: '#E0E0E0' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={goToToday}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: '#4361EE',
              color: 'white'
            }}
          >
            Aujourd'hui
          </button>
          
          <button
            type="button"
            onClick={() => navigateWeek('next')}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            style={{ color: '#E0E0E0' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grille de la semaine */}
      <div className="grid grid-cols-7 gap-1">
        {/* En-têtes des jours */}
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
          <div
            key={day}
            className="p-3 text-center font-semibold text-sm"
            style={{ color: '#6B7280' }}
          >
            {day}
          </div>
        ))}

        {/* Jours de la semaine */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-[120px] p-2 border rounded-lg transition-colors ${
              day.isToday 
                ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onDragOver={(e) => handleDragOver(e, day.date)}
            onDrop={(e) => handleDrop(e, day.date)}
          >
            {/* Numéro du jour */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium ${
                  day.isToday 
                    ? 'text-blue-400' 
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
                className="w-6 h-6 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors"
                style={{ color: '#6B7280' }}
                title="Ajouter un événement"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Événements du jour */}
            <div className="space-y-1">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: event.color + '20',
                    borderLeft: `3px solid ${event.color}`,
                    color: '#E0E0E0'
                  }}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  {!event.allDay && (
                    <div className="text-xs opacity-70">
                      {formatTime(event.start)}
                    </div>
                  )}
                  {event.area && (
                    <div className="text-xs opacity-50">
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
