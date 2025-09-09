'use client';

import { motion } from 'framer-motion';
import { type FC, useEffect, useState } from 'react';
import { ConfettiExplosion } from 'react-confetti-explosion';

interface FocusTimerProps {
  task: string;
  duration?: number; // en minutes
  onComplete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export const FocusTimer: FC<FocusTimerProps> = ({
  task,
  duration = 25, // 25 minutes par défaut (Pomodoro)
  onComplete,
  onPause,
  onResume,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // en secondes
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Session terminée
      setIsActive(false);
      setShowConfetti(true);
      onComplete?.();

      // Son de fin de session
      if (typeof window !== 'undefined' && 'Audio' in window) {
        const audio = new Audio(
          'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU5k9n1unEiBC13yO/eizEIHWq+8+OWT',
        );
        audio.volume = 0.5;
        audio.play().catch(() => {});
      }

      // Masquer les confettis après 3 secondes
      setTimeout(() => setShowConfetti(false), 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete]);

  // Calculs pour l'animation circulaire
  const percentage = (timeLeft / (duration * 60)) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${((100 - percentage) / 100) * circumference} ${circumference}`;

  // Interpolation de couleur : Rouge → Bleu
  const red = Math.floor(
    (percentage / 100) * 239 + (1 - percentage / 100) * 76,
  );
  const green = Math.floor(
    (percentage / 100) * 71 + (1 - percentage / 100) * 201,
  );
  const blue = Math.floor(
    (percentage / 100) * 111 + (1 - percentage / 100) * 240,
  );
  const strokeColor = `rgb(${red}, ${green}, ${blue})`;

  // Formatage du temps
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsActive(false);
    setIsPaused(true);
    onPause?.();
  };

  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
    onResume?.();
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
  };

  return (
    <div className="relative flex items-center justify-center w-96 h-96">
      {/* Confettis de fin de session */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <ConfettiExplosion
            particleCount={200}
            duration={3000}
            colors={['#4361EE', '#4CAF50', '#FF7733', '#EF476F']}
          />
        </div>
      )}

      {/* Cercle de fond */}
      <svg className="transform -rotate-90 w-full h-full">
        <title>Timer circulaire</title>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#4A5568"
          strokeWidth="12"
          fill="transparent"
          className="opacity-40"
        />

        {/* Cercle animé */}
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={strokeColor}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          style={{ strokeDasharray }}
          initial={{ strokeDasharray: `${circumference} ${circumference}` }}
          animate={{ strokeDasharray }}
          transition={{ duration: 1, ease: 'linear' }}
          className="drop-shadow-lg"
        />
      </svg>

      {/* Contenu central */}
      <div className="absolute text-center">
        {/* Timer */}
        <motion.div
          key={timeString}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-6xl font-mono font-bold text-white mb-4 drop-shadow-lg"
        >
          {timeString}
        </motion.div>

        {/* Tâche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-mono text-slate-200 mb-8 max-w-xs drop-shadow-md"
        >
          {task}
        </motion.div>

        {/* Contrôles */}
        <div className="flex gap-4 justify-center">
          {!isActive && !isPaused && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
            >
              ▶️ Commencer
            </motion.button>
          )}

          {isActive && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
            >
              ⏸️ Pause
            </motion.button>
          )}

          {isPaused && (
            <div className="flex gap-2">
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
                onClick={handleReset}
                className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
              >
                🔄 Reset
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
