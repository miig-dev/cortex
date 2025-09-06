'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/stores/gamification-store';
import { BadgeComponent } from './badge';
import { ProgressBar } from './progress-bar';

interface StatsPanelProps {
  className?: string;
}

export const StatsPanel: FC<StatsPanelProps> = ({ className }) => {
  const { stats } = useGamificationStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const _formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  const recentBadges = stats.badges
    .filter((badge) => badge.unlockedAt)
    .sort(
      (a, b) =>
        new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime(),
    )
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-cortex-charcoal/50 backdrop-blur-sm border border-cortex-charcoal rounded-xl p-6',
        className,
      )}
    >
      {/* En-tête */}
      <div className="mb-6">
        <h3 className="text-xl font-mono font-bold text-cortex-off-white mb-2">
          Vos Statistiques
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cortex-electric-blue rounded-full animate-pulse" />
          <span className="font-mono text-sm text-cortex-muted">
            Niveau {stats.level} • {stats.experience} XP
          </span>
        </div>
      </div>

      {/* Barre de progression du niveau */}
      <div className="mb-6">
        <ProgressBar
          current={stats.experience}
          max={stats.nextLevelExp}
          label="Progression du niveau"
          color="blue"
          size="md"
        />
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-cortex-electric-blue">
            {stats.totalSessions}
          </div>
          <div className="text-xs font-mono text-cortex-muted">Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-cortex-soft-green">
            {formatTime(stats.totalFocusTime)}
          </div>
          <div className="text-xs font-mono text-cortex-muted">Focus total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-cortex-vibrant-orange">
            {stats.currentStreak}
          </div>
          <div className="text-xs font-mono text-cortex-muted">
            Série actuelle
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-cortex-pulse-red">
            {stats.ideasCaptured}
          </div>
          <div className="text-xs font-mono text-cortex-muted">
            Idées capturées
          </div>
        </div>
      </div>

      {/* Badges récents */}
      {recentBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-mono font-bold text-cortex-off-white mb-3">
            Badges récents
          </h4>
          <div className="flex gap-3">
            {recentBadges.map((badge) => (
              <BadgeComponent
                key={badge.id}
                badge={badge}
                size="sm"
                isNew={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tous les badges */}
      <div>
        <h4 className="font-mono font-bold text-cortex-off-white mb-3">
          Tous les badges ({stats.badges.length})
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {stats.badges.map((badge) => (
            <BadgeComponent
              key={badge.id}
              badge={badge}
              size="sm"
              showDescription={true}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
