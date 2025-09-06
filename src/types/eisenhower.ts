export type EisenhowerQuadrant =
  | 'urgent-important'
  | 'important-non-urgent'
  | 'urgent-non-important'
  | 'non-urgent-non-important';

export interface EisenhowerTask {
  id: string;
  content: string;
  tags: string[];
  quadrant: EisenhowerQuadrant;
  createdAt: Date;
  completedAt?: Date;
  priority: number; // 1-4 (1 = highest)
}

export interface EisenhowerMatrix {
  'urgent-important': EisenhowerTask[];
  'important-non-urgent': EisenhowerTask[];
  'urgent-non-important': EisenhowerTask[];
  'non-urgent-non-important': EisenhowerTask[];
}

export const QUADRANT_LABELS: Record<EisenhowerQuadrant, { title: string; description: string }> = {
  'urgent-important': {
    title: 'URGENT & IMPORTANT',
    description: 'Crises, délais serrés, problèmes critiques'
  },
  'important-non-urgent': {
    title: 'IMPORTANT & NON URGENT',
    description: 'Planification, développement, prévention'
  },
  'urgent-non-important': {
    title: 'URGENT & NON IMPORTANT',
    description: 'Interruptions, distractions, tâches déléguables'
  },
  'non-urgent-non-important': {
    title: 'NON URGENT & NON IMPORTANT',
    description: 'Tâches chronophages, futilités'
  }
};

export const QUADRANT_COLORS: Record<EisenhowerQuadrant, string> = {
  'urgent-important': 'quadrant-urgent-important',
  'important-non-urgent': 'quadrant-important-non-urgent',
  'urgent-non-important': 'quadrant-urgent-non-important',
  'non-urgent-non-important': 'quadrant-non-urgent-non-important'
};
