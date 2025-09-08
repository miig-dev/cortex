'use client';

import { useCortexStore } from '@/stores/cortex-store';
import { useState } from 'react';

export function MiniCalendar() {
  const { events } = useCortexStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Générer les jours du mois
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Jours du mois précédent
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = new Date(currentYear, currentMonth, -i);
    days.push({ date: day, isCurrentMonth: false, isToday: false });
  }

  // Jours du mois actuel
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    days.push({ date, isCurrentMonth: true, isToday });
  }

  // Jours du mois suivant pour compléter la grille
  const remainingDays = 42 - days.length; // 6 semaines × 7 jours
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    days.push({ date, isCurrentMonth: false, isToday: false });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#E0E0E0' }}>
          <span className="text-2xl">📅</span>
          Calendrier
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded hover:bg-gray-700 transition-colors"
            style={{ color: '#9CA3AF' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="px-3 py-1 text-xs rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: '#4361EE',
              color: 'white'
            }}
          >
            Aujourd'hui
          </button>
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="p-1 rounded hover:bg-gray-700 transition-colors"
            style={{ color: '#9CA3AF' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mois et année */}
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold" style={{ color: '#E0E0E0' }}>
          {monthNames[currentMonth]} {currentYear}
        </h4>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['L', 'M', 'W', 'J', 'V', 'S', 'D'].map((day, index) => (
          <div key={`day-${index}`} className="text-center text-xs font-bold" style={{ color: '#9CA3AF' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          return (
            <div
              key={index}
              className={`aspect-square flex flex-col items-center justify-center text-xs rounded-lg transition-colors ${
                day.isToday
                  ? 'bg-purple-500 text-white font-bold'
                  : day.isCurrentMonth
                    ? 'hover:bg-gray-700 text-white'
                    : 'text-gray-500'
              }`}
            >
              <span className="font-medium">{day.date.getDate()}</span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-1">
                  {dayEvents.slice(0, 2).map((event, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="w-1 h-1 rounded-full bg-gray-400" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs" style={{ color: '#9CA3AF' }}>
          {events.length} événement{events.length > 1 ? 's' : ''} ce mois
        </div>
      </div>
    </div>
  );
}
