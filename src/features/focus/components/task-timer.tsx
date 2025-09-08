'use client';

import { motion } from 'framer-motion';
import { type FC, useEffect, useState } from 'react';
import { ConfettiExplosion } from 'react-confetti-explosion';

interface TaskTimerProps {
  task: string;
  onTimeRecorded?: (timeSpent: number) => void;
}

export const TaskTimer: FC<TaskTimerProps> = ({ task, onTimeRecorded }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // en secondes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<number[]>([]);

  // Chronomètre logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  // Formatage du temps
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);

    // Enregistrer le temps de la session
    if (elapsedTime > 0) {
      setSessionHistory((prev) => [...prev, elapsedTime]);
      onTimeRecorded?.(elapsedTime);

      // Confettis pour célébrer
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const handleNewSession = () => {
    handleStop();
    setElapsedTime(0);
    setSessionHistory([]);
  };

  // Calculs des statistiques
  const totalTime =
    sessionHistory.reduce((sum, time) => sum + time, 0) + elapsedTime;
  const averageTime =
    sessionHistory.length > 0
      ? Math.round(
          sessionHistory.reduce((sum, time) => sum + time, 0) /
            sessionHistory.length,
        )
      : 0;

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      {/* Confettis de célébration */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <ConfettiExplosion
            particleCount={200}
            duration={3000}
            colors={['#4361EE', '#4CAF50', '#FF7733', '#EF476F']}
          />
        </div>
      )}

      {/* Tâche en cours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Tâche en cours</h2>
        <p className="text-lg text-slate-300 font-mono max-w-md">{task}</p>
      </motion.div>

      {/* Chronomètre principal */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-6">
        <div className="text-center">
          {/* Temps écoulé */}
          <motion.div
            key={elapsedTime}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl font-mono font-bold text-white mb-4 drop-shadow-lg"
          >
            {formatTime(elapsedTime)}
          </motion.div>

          {/* Statut */}
          <div className="text-lg font-mono text-slate-300 mb-6">
            {isRunning && !isPaused && (
              <span className="text-green-400">⏱️ En cours...</span>
            )}
            {isPaused && <span className="text-yellow-400">⏸️ En pause</span>}
            {!isRunning && !isPaused && elapsedTime === 0 && (
              <span className="text-slate-400">▶️ Prêt à commencer</span>
            )}
            {!isRunning && !isPaused && elapsedTime > 0 && (
              <span className="text-blue-400">⏹️ Arrêté</span>
            )}
          </div>

          {/* Contrôles */}
          <div className="flex gap-3 justify-center flex-wrap">
            {!isRunning && !isPaused && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
              >
                ▶️ Démarrer
              </motion.button>
            )}

            {isRunning && !isPaused && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePause}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
              >
                ⏸️ Pause
              </motion.button>
            )}

            {isPaused && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResume}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
                >
                  ▶️ Reprendre
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStop}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
                >
                  ⏹️ Arrêter
                </motion.button>
              </>
            )}

            {!isRunning && !isPaused && elapsedTime > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
              >
                🔄 Reset
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques de la session */}
      {(sessionHistory.length > 0 || elapsedTime > 0) && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 w-full">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            📊 Statistiques
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Temps total */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {formatTime(totalTime)}
              </div>
              <div className="text-sm text-slate-400">Temps total</div>
            </div>

            {/* Temps moyen */}
            {averageTime > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {formatTime(averageTime)}
                </div>
                <div className="text-sm text-slate-400">Temps moyen</div>
              </div>
            )}

            {/* Nombre de sessions */}
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {sessionHistory.length}
              </div>
              <div className="text-sm text-slate-400">Sessions</div>
            </div>
          </div>

          {/* Historique des sessions */}
          {sessionHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-400 mb-2">
                Historique des sessions :
              </h4>
              <div className="flex flex-wrap gap-2">
                {sessionHistory.map((time, idx) => (
                  <span
                    key={`session-${time}-${idx}`}
                    className="px-2 py-1 bg-gray-700 text-slate-300 text-xs rounded font-mono"
                  >
                    {formatTime(time)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nouvelle session */}
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewSession}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
            >
              🆕 Nouvelle session
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};
