
import { mockAreas, mockEvents, mockProjects, mockTasks } from '@/data/mock-data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskQuadrant = 'urgent_important' | 'noturgent_important' | 'urgent_notimportant' | 'noturgent_notimportant';

export interface Task {
  id: number;
  content: string;
  area: string;
  completed: boolean;
  quadrant: TaskQuadrant;
  priority: number; // 1 = haute, 2 = moyenne, 3 = basse
  createdAt: Date;
  updatedAt: Date;
  color?: string;
  bgColor?: string;
  title?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
}

export interface Area {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color: string;
  type: 'task' | 'event' | 'meeting' | 'deadline';
  taskId?: number;
  area?: string;
  quadrant?: TaskQuadrant;
}

interface CortexState {
  // Données
  tasks: Task[];
  projects: Project[];
  areas: Area[];
  events: CalendarEvent[];

  // Filtres et recherche
  searchQuery: string;
  selectedArea: string | null;
  selectedQuadrant: TaskQuadrant | null;
  showCompleted: boolean;

  // Actions pour les tâches
  addTask: (content: string, area: string) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  moveTaskToQuadrant: (id: number, quadrant: TaskQuadrant) => void;

  // Actions pour les projets
  addProject: (name: string, description?: string, color?: string) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  toggleProject: (id: number) => void;

  // Actions pour les areas
  addArea: (name: string, color?: string) => void;
  updateArea: (id: number, updates: Partial<Area>) => void;
  deleteArea: (id: number) => void;

  // Actions pour les événements
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;

  // Actions pour les filtres
  setSearchQuery: (query: string) => void;
  setSelectedArea: (area: string | null) => void;
  setSelectedQuadrant: (quadrant: TaskQuadrant | null) => void;
  setShowCompleted: (show: boolean) => void;
  clearFilters: () => void;

  // Actions utilitaires
  getTasksByQuadrant: (quadrant: TaskQuadrant) => Task[];
  getTasksByArea: (area: string) => Task[];
  getFilteredTasks: () => Task[];
  getStats: () => {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    tasksByQuadrant: Record<TaskQuadrant, number>;
    tasksByArea: Record<string, number>;
  };
}

// Couleurs par défaut pour les quadrants Eisenhower
const QUADRANT_COLORS = {
  urgent_important: { quadrant: 'urgent_important' as TaskQuadrant, color: '#EF476F', bgColor: '#2A0A0A', title: '🔥 URGENT & IMPORTANT' },
  noturgent_important: { quadrant: 'noturgent_important' as TaskQuadrant, color: '#4CAF50', bgColor: '#0A1A2A', title: '📋 IMPORTANT' },
  urgent_notimportant: { quadrant: 'urgent_notimportant' as TaskQuadrant, color: '#FF7733', bgColor: '#2A2A0A', title: '⚡ URGENT' },
  noturgent_notimportant: { quadrant: 'noturgent_notimportant' as TaskQuadrant, color: '#6B7280', bgColor: '#1A1A1A', title: '🗑️ ÉLIMINER' },
};

// Fonction pour catégoriser automatiquement les tâches
const categorizeTask = (content: string): { quadrant: TaskQuadrant; color: string; bgColor: string; title: string } => {
  const lowerContent = content.toLowerCase();

  // Mots-clés pour Urgent
  const urgentKeywords = ['urgent', 'asap', 'maintenant', 'immédiat', 'critique', 'deadline', 'échéance', '!urgent'];
  // Mots-clés pour Important
  const importantKeywords = ['important', 'priorité', 'essentiel', 'crucial', 'vital', 'stratégique', '!important'];

  const isUrgent = urgentKeywords.some(keyword => lowerContent.includes(keyword));
  const isImportant = importantKeywords.some(keyword => lowerContent.includes(keyword));

  if (isUrgent && isImportant) {
    return QUADRANT_COLORS.urgent_important;
  } else if (!isUrgent && isImportant) {
    return QUADRANT_COLORS.noturgent_important;
  } else if (isUrgent && !isImportant) {
    return QUADRANT_COLORS.urgent_notimportant;
  } else {
    return QUADRANT_COLORS.noturgent_notimportant;
  }
};

export const useCortexStore = create<CortexState>()(
  persist(
    (set, get) => ({
      // État initial avec données mock
      events: mockEvents,
      tasks: mockTasks,
      projects: mockProjects,
      areas: mockAreas,
      searchQuery: '',
      selectedArea: null,
      selectedQuadrant: null,
      showCompleted: true,

      // Actions pour les tâches
      addTask: (content: string, area: string) => {
        const categorization = categorizeTask(content);
        const newTask: Task = {
          id: Date.now(),
          content,
          area,
          completed: false,
          quadrant: categorization.quadrant,
          priority: categorization.quadrant === 'urgent_important' ? 1 :
                   categorization.quadrant === 'noturgent_important' ? 2 : 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          color: categorization.color,
          bgColor: categorization.bgColor,
          title: categorization.title,
        };

        set((state) => ({
          tasks: [...state.tasks, newTask]
        }));
      },

      updateTask: (id: number, updates: Partial<Task>) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          )
        }));
      },

      deleteTask: (id: number) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },

      toggleTask: (id: number) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date() }
              : task
          )
        }));
      },

      moveTaskToQuadrant: (id: number, quadrant: TaskQuadrant) => {
        const categorization = QUADRANT_COLORS[quadrant];
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  quadrant,
                  color: categorization.color,
                  bgColor: categorization.bgColor,
                  title: categorization.title,
                  updatedAt: new Date()
                }
              : task
          )
        }));
      },

      // Actions pour les projets
      addProject: (name: string, description?: string, color?: string) => {
        const colors = ['#4361EE', '#4CAF50', '#FF7733', '#EF476F', '#4CC9F0', '#6B7280'];
        const newProject: Project = {
          id: Date.now(),
          name,
          description,
          color: color || colors[Math.floor(Math.random() * colors.length)],
          createdAt: new Date(),
          updatedAt: new Date(),
          completed: false,
        };

        set((state) => ({
          projects: [...state.projects, newProject]
        }));
      },

      updateProject: (id: number, updates: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: new Date() }
              : project
          )
        }));
      },

      deleteProject: (id: number) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        }));
      },

      toggleProject: (id: number) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, completed: !project.completed, updatedAt: new Date() }
              : project
          )
        }));
      },

      // Actions pour les areas
      addArea: (name: string, color?: string) => {
        const colors = ['#4361EE', '#4CAF50', '#FF7733', '#EF476F', '#4CC9F0', '#6B7280'];
        const newArea: Area = {
          id: Date.now(),
          name,
          color: color || colors[Math.floor(Math.random() * colors.length)],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          areas: [...state.areas, newArea]
        }));
      },

      updateArea: (id: number, updates: Partial<Area>) => {
        set((state) => ({
          areas: state.areas.map((area) =>
            area.id === id
              ? { ...area, ...updates, updatedAt: new Date() }
              : area
          )
        }));
      },

      deleteArea: (id: number) => {
        set((state) => ({
          areas: state.areas.filter((area) => area.id !== id)
        }));
      },

      // Actions pour les événements
      addEvent: (eventData: Omit<CalendarEvent, 'id'>) => {
        const newEvent: CalendarEvent = {
          ...eventData,
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        set((state) => ({
          events: [...state.events, newEvent]
        }));
      },

      updateEvent: (id: string, updates: Partial<CalendarEvent>) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...updates }
              : event
          )
        }));
      },

      deleteEvent: (id: string) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id)
        }));
      },

      // Actions pour les filtres
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedArea: (area: string | null) => set({ selectedArea: area }),
      setSelectedQuadrant: (quadrant: TaskQuadrant | null) => set({ selectedQuadrant: quadrant }),
      setShowCompleted: (show: boolean) => set({ showCompleted: show }),
      clearFilters: () => set({
        searchQuery: '',
        selectedArea: null,
        selectedQuadrant: null,
        showCompleted: true
      }),

      // Actions utilitaires
      getTasksByQuadrant: (quadrant: TaskQuadrant) => {
        return get().tasks.filter((task) => task.quadrant === quadrant);
      },

      getTasksByArea: (area: string) => {
        return get().tasks.filter((task) => task.area === area);
      },

      getFilteredTasks: () => {
        const { tasks, searchQuery, selectedArea, selectedQuadrant, showCompleted } = get();

        return tasks.filter((task) => {
          // Filtre par recherche
          if (searchQuery && !task.content.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }

          // Filtre par area
          if (selectedArea && task.area !== selectedArea) {
            return false;
          }

          // Filtre par quadrant
          if (selectedQuadrant && task.quadrant !== selectedQuadrant) {
            return false;
          }

          // Filtre par statut de completion
          if (!showCompleted && task.completed) {
            return false;
          }

          return true;
        });
      },

      getStats: () => {
        const { tasks } = get();
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        const tasksByQuadrant = tasks.reduce((acc, task) => {
          acc[task.quadrant] = (acc[task.quadrant] || 0) + 1;
          return acc;
        }, {} as Record<TaskQuadrant, number>);

        const tasksByArea = tasks.reduce((acc, task) => {
          acc[task.area] = (acc[task.area] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return {
          totalTasks,
          completedTasks,
          pendingTasks,
          tasksByQuadrant,
          tasksByArea,
        };
      },
    }),
    {
      name: 'cortex-storage', // nom de la clé dans localStorage
      partialize: (state) => ({
        tasks: state.tasks,
        projects: state.projects,
        areas: state.areas,
        events: state.events,
      }),
    }
  )
);
