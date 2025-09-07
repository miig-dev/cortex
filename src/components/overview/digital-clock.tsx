'use client';

import { useEffect, useState } from 'react';

export function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Initialiser le temps côté client pour éviter l'hydratation mismatch
    setTime(new Date());
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Éviter l'hydratation mismatch en attendant que le temps soit initialisé côté client
  if (!time) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <span className="text-2xl">⏰</span>
        </div>
        <div>
          <div className="text-4xl font-mono font-bold mb-2" style={{ color: '#E0E0E0' }}>
            --:--:--
          </div>
          <div className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
            Chargement...
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          En ligne
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
      {/* Horloge numérique */}
      <div className="text-center">
        <div
          className="text-4xl font-mono font-bold mb-2"
          style={{
            color: '#E0E0E0',
            textShadow: '0 0 20px rgba(67, 97, 238, 0.5)',
            letterSpacing: '0.1em'
          }}
        >
          {formatTime(time)}
        </div>

        {/* Date */}
        <div
          className="text-sm font-medium capitalize"
          style={{ color: '#9CA3AF' }}
        >
          {formatDate(time)}
        </div>
      </div>

      {/* Indicateur de statut */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-xs" style={{ color: '#9CA3AF' }}>
          En ligne
        </span>
      </div>
    </div>
  );
}
