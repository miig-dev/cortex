export type BadgeType =
  | 'deep-worker'
  | 'idea-master'
  | 'procrastination-slayer'
  | 'focus-champion'
  | 'productivity-guru'
  | 'consistency-king'
  | 'speed-demon'
  | 'zen-master';

export type BadgeRequirementType =
  | 'sessions'
  | 'time'
  | 'streak'
  | 'speed'
  | 'ideas'
  | 'tasks';

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    type: BadgeRequirementType;
    value: number;
  };
  unlockedAt?: Date;
}

export interface UserStats {
  totalSessions: number;
  totalFocusTime: number; // en secondes
  currentStreak: number;
  longestStreak: number;
  ideasCaptured: number;
  tasksCompleted: number;
  averageSessionLength: number; // en secondes
  badges: Badge[];
  level: number;
  experience: number;
  nextLevelExp: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
}

export const BADGES: Badge[] = [
  {
    id: 'deep-worker',
    name: 'Deep Worker',
    description: 'Complétez 10 sessions de focus',
    icon: '🧠',
    color: 'cortex-electric-blue',
    requirement: { type: 'sessions', value: 10 },
  },
  {
    id: 'idea-master',
    name: 'Idea Master',
    description: "Capturez 50 idées dans l'Inbox",
    icon: '💡',
    color: 'cortex-vibrant-orange',
    requirement: { type: 'ideas', value: 50 },
  },
  {
    id: 'procrastination-slayer',
    name: 'Procrastination Slayer',
    description: 'Terminez 25 tâches en une journée',
    icon: '⚔️',
    color: 'cortex-pulse-red',
    requirement: { type: 'tasks', value: 25 },
  },
  {
    id: 'focus-champion',
    name: 'Focus Champion',
    description: 'Accumulez 10 heures de focus',
    icon: '🏆',
    color: 'cortex-soft-green',
    requirement: { type: 'time', value: 36000 }, // 10 heures en secondes
  },
  {
    id: 'productivity-guru',
    name: 'Productivity Guru',
    description: 'Maintenez une série de 7 jours',
    icon: '🎯',
    color: 'cortex-electric-blue',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: "Utilisez l'app pendant 30 jours consécutifs",
    icon: '👑',
    color: 'cortex-vibrant-orange',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complétez une session en moins de 20 minutes',
    icon: '⚡',
    color: 'cortex-pulse-red',
    requirement: { type: 'speed', value: 1200 }, // 20 minutes en secondes
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Accumulez 100 heures de focus total',
    icon: '🧘',
    color: 'cortex-soft-green',
    requirement: { type: 'time', value: 360000 }, // 100 heures en secondes
  },
];

export const EXPERIENCE_LEVELS = [
  { level: 1, exp: 0, title: 'Débutant' },
  { level: 2, exp: 100, title: 'Apprenti' },
  { level: 3, exp: 250, title: 'Explorateur' },
  { level: 4, exp: 500, title: 'Développeur' },
  { level: 5, exp: 1000, title: 'Expert' },
  { level: 6, exp: 2000, title: 'Maître' },
  { level: 7, exp: 3500, title: 'Guru' },
  { level: 8, exp: 5000, title: 'Légende' },
  { level: 9, exp: 7500, title: 'Mythique' },
  { level: 10, exp: 10000, title: 'Transcendant' },
];
