'use client';

import { useEffect, useState } from 'react';
import { useGamificationStore } from '@/stores/gamification-store';

export function CompactPomodoro() {
  const [isClient, setIsClient] = useState(false);
  const { addExperience, unlockBadge } = useGamificationStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session terminée
      setIsRunning(false);

      if (!isBreak) {
        // Fin de session de travail
        setSessionCount((prev) => prev + 1);
        addExperience(50); // +50 XP par session

        // Badge pour 10 sessions (deep-worker)
        if (sessionCount + 1 === 10) {
          unlockBadge('deep-worker');
        }

        // Passer à la pause
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minutes de pause
      } else {
        // Fin de pause
        setIsBreak(false);
        setTimeLeft(25 * 60); // Retour au travail
      }
    }

    return () => clearInterval(interval);
  }, [
    isClient,
    isRunning,
    timeLeft,
    isBreak,
    sessionCount,
    addExperience,
    unlockBadge,
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const getProgress = () => {
    const total = isBreak ? 5 * 60 : 25 * 60;
    return ((total - timeLeft) / total) * 100;
  };

  if (!isClient) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-pulse">🍅</div>
            <div className="text-sm text-gray-400">Chargement...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: '#E0E0E0' }}
        >
          <span className="text-2xl">🍅</span>
          Focus
        </h3>
        <div className="text-xs" style={{ color: '#9CA3AF' }}>
          {sessionCount} session{sessionCount > 1 ? 's' : ''}
        </div>
      </div>

      {/* Timer */}
      <div className="text-center mb-4">
        <div
          className="text-3xl font-mono font-bold mb-2"
          style={{
            color: isBreak ? '#4CAF50' : '#FF7733',
            textShadow: `0 0 20px ${isBreak ? 'rgba(76, 175, 80, 0.5)' : 'rgba(255, 119, 51, 0.5)'}`,
            letterSpacing: '0.1em',
          }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Mode */}
        <div
          className="text-sm font-medium"
          style={{ color: isBreak ? '#4CAF50' : '#FF7733' }}
        >
          {isBreak ? 'Pause' : 'Travail'}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-1000"
            style={{
              width: `${getProgress()}%`,
              backgroundColor: isBreak ? '#4CAF50' : '#FF7733',
            }}
          />
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={toggleTimer}
          className="flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
          style={{
            backgroundColor: isRunning ? '#EF476F' : '#FF7733',
            color: 'white',
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
          style={{
            backgroundColor: '#6B7280',
            color: 'white',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
