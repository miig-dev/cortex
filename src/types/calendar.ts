export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color: string;
  type: 'task' | 'event' | 'meeting' | 'deadline';
  taskId?: number; // Référence vers la tâche si c'est un événement basé sur une tâche
  area?: string;
  quadrant?:
    | 'urgent_important'
    | 'noturgent_important'
    | 'urgent_notimportant'
    | 'noturgent_notimportant';
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
  weekNumber: number;
}

export interface CalendarView {
  type: 'week' | 'month' | 'day';
  currentDate: Date;
}

export interface MarkdownTask {
  content: string;
  date?: Date;
  time?: string;
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];
  area?: string;
}
