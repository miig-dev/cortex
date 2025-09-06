'use client';

import { motion } from 'framer-motion';
import { type FC, useEffect, useState } from 'react';
import { CortexLogo } from '@/components/ui/cortex-logo';
import { useGamificationStore } from '@/stores/gamification-store';
import { FocusTimer } from './focus-timer';
import { MicroConseils } from './micro-conseils';

interface FocusDashboardProps {
  initialTask?: string;
  onSessionComplete?: (duration: number) => void;
  onSessionPause?: () => void;
  onSessionResume?: () => void;
}

export const FocusDashboard: FC<FocusDashboardProps> = ({
  initialTask = 'Sélectionnez une tâche à accomplir',
  onSessionComplete,
  onSessionPause,
  onSessionResume,
}) => {
  const [currentTask, setCurrentTask] = useState(initialTask);
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  // Gamification
  const { updateStats, addExperience } = useGamificationStore();

  // Mise à jour du temps écoulé
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleSessionComplete = () => {
    const sessionDuration = timeElapsed;
    setSessionsCompleted((prev) => prev + 1);
    setTotalFocusTime((prev) => prev + sessionDuration);
    setTimeElapsed(0);
    setIsActive(false);

    // Mise à jour des statistiques de gamification
    updateStats({
      totalSessions: sessionsCompleted + 1,
      totalFocusTime: totalFocusTime + sessionDuration,
      tasksCompleted: 1, // Une tâche terminée par session
      averageSessionLength: sessionDuration,
    });

    // Ajouter de l'expérience
    const expGained = Math.floor(sessionDuration / 60) * 10; // 10 XP par minute
    addExperience(expGained);

    onSessionComplete?.(sessionDuration);
  };

  const handleSessionPause = () => {
    setIsActive(false);
    onSessionPause?.();
  };

  const handleSessionResume = () => {
    setIsActive(true);
    onSessionResume?.();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background pattern subtil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cortex-electric-blue/10 to-cortex-pulse-red/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(67,97,238,0.1)_100%)]" />
      </div>

      {/* Logo discret */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-10"
      >
        <CortexLogo size={40} animated={false} />
      </motion.div>

      {/* Statistiques discrètes */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 right-8 z-10 text-cortex-muted font-mono text-sm"
      >
        <div>Sessions: {sessionsCompleted}</div>
        <div>Focus: {formatTime(totalFocusTime)}</div>
      </motion.div>

      {/* Contenu principal */}
      <div className="relative z-20 text-center">
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-mono font-bold text-cortex-off-white mb-8"
        >
          Mode Focus
        </motion.h1>

        {/* Timer principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <FocusTimer
            task={currentTask}
            duration={25}
            onComplete={handleSessionComplete}
            onPause={handleSessionPause}
            onResume={handleSessionResume}
          />
        </motion.div>

        {/* Input pour changer la tâche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-md mx-auto"
        >
          <input
            type="text"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-cortex-muted font-mono text-lg text-center placeholder-cortex-muted/50"
            placeholder="Quelle tâche voulez-vous accomplir ?"
            disabled={isActive}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-cortex-muted font-mono text-sm max-w-md mx-auto"
        >
          <div className="space-y-2">
            <div>🎯 Concentrez-vous sur une seule tâche</div>
            <div>⏰ 25 minutes de focus intense</div>
            <div>☕ 5 minutes de pause entre les sessions</div>
            <div>🔄 Répétez pour maintenir la productivité</div>
          </div>
        </motion.div>
      </div>

      {/* Micro-conseils */}
      <MicroConseils isActive={isActive} timeElapsed={timeElapsed} />

      {/* Bouton de retour discret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 z-10"
      >
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-cortex-muted hover:text-cortex-off-white font-mono text-sm transition-colors"
        >
          ← Retour
        </button>
      </motion.div>
    </div>
  );
};
