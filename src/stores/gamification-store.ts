'use client';

import { BADGES, type Badge, type BadgeType, EXPERIENCE_LEVELS, type UserStats } from '@/types/gamification';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GamificationState {
  stats: UserStats;
  updateStats: (updates: Partial<UserStats>) => void;
  addExperience: (points: number) => void;
  checkBadges: () => void;
  unlockBadge: (badgeId: BadgeType) => void;
  resetStats: () => void;
}

const initialStats: UserStats = {
  totalSessions: 0,
  totalFocusTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  ideasCaptured: 0,
  tasksCompleted: 0,
  averageSessionLength: 0,
  badges: [],
  level: 1,
  experience: 0,
  nextLevelExp: 100
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      stats: initialStats,

      updateStats: (updates) => {
        set((state) => {
          const newStats = { ...state.stats, ...updates };

          // Recalculer le niveau
          const currentLevel = EXPERIENCE_LEVELS.find(level =>
            newStats.experience >= level.exp
          ) || EXPERIENCE_LEVELS[0];

          const nextLevel = EXPERIENCE_LEVELS.find(level =>
            level.exp > newStats.experience
          );

          newStats.level = currentLevel.level;
          newStats.nextLevelExp = nextLevel?.exp || EXPERIENCE_LEVELS[EXPERIENCE_LEVELS.length - 1].exp;

          return { stats: newStats };
        });

        // Vérifier les badges après mise à jour
        get().checkBadges();
      },

      addExperience: (points) => {
        set((state) => {
          const newExperience = state.stats.experience + points;
          const newStats = { ...state.stats, experience: newExperience };

          // Recalculer le niveau
          const currentLevel = EXPERIENCE_LEVELS.find(level =>
            newExperience >= level.exp
          ) || EXPERIENCE_LEVELS[0];

          const nextLevel = EXPERIENCE_LEVELS.find(level =>
            level.exp > newExperience
          );

          newStats.level = currentLevel.level;
          newStats.nextLevelExp = nextLevel?.exp || EXPERIENCE_LEVELS[EXPERIENCE_LEVELS.length - 1].exp;

          return { stats: newStats };
        });

        get().checkBadges();
      },

      checkBadges: () => {
        const { stats } = get();
        const newBadges: Badge[] = [];

        BADGES.forEach(badge => {
          // Vérifier si le badge n'est pas déjà débloqué
          if (stats.badges.some(b => b.id === badge.id)) return;

          // Vérifier les conditions
          let shouldUnlock = false;

          switch (badge.requirement.type) {
            case 'sessions':
              shouldUnlock = stats.totalSessions >= badge.requirement.value;
              break;
            case 'time':
              shouldUnlock = stats.totalFocusTime >= badge.requirement.value;
              break;
            case 'streak':
              shouldUnlock = stats.currentStreak >= badge.requirement.value;
              break;
            case 'speed':
              shouldUnlock = stats.averageSessionLength <= badge.requirement.value;
              break;
            case 'ideas':
              shouldUnlock = stats.ideasCaptured >= badge.requirement.value;
              break;
          }

          if (shouldUnlock) {
            newBadges.push({
              ...badge,
              unlockedAt: new Date()
            });
          }
        });

        if (newBadges.length > 0) {
          set((state) => ({
            stats: {
              ...state.stats,
              badges: [...state.stats.badges, ...newBadges]
            }
          }));
        }
      },

      unlockBadge: (badgeId) => {
        const badge = BADGES.find(b => b.id === badgeId);
        if (!badge) return;

        set((state) => {
          const isAlreadyUnlocked = state.stats.badges.some(b => b.id === badgeId);
          if (isAlreadyUnlocked) return state;

          return {
            stats: {
              ...state.stats,
              badges: [...state.stats.badges, { ...badge, unlockedAt: new Date() }]
            }
          };
        });
      },

      resetStats: () => {
        set({ stats: initialStats });
      }
    }),
    {
      name: 'cortex-gamification-storage',
      partialize: (state) => ({ stats: state.stats })
    }
  )
);
