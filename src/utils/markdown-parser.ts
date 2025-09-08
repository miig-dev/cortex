import { CalendarEvent, MarkdownTask } from '@/types/calendar';

/**
 * Parse une chaîne markdown et extrait les tâches avec leurs métadonnées
 */
export function parseMarkdownTasks(markdown: string): MarkdownTask[] {
  const tasks: MarkdownTask[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Détecter les listes de tâches (bullet points, checkboxes, etc.)
    if (isTaskLine(trimmedLine)) {
      const task = parseTaskLine(trimmedLine);
      if (task) {
        tasks.push(task);
      }
    }
  }

  return tasks;
}

/**
 * Vérifie si une ligne contient une tâche
 */
function isTaskLine(line: string): boolean {
  // Patterns pour détecter les tâches :
  // - [ ] Tâche
  // - [x] Tâche terminée
  // - * Tâche
  // - - Tâche
  // - + Tâche
  // - 1. Tâche
  const taskPatterns = [
    /^\s*[-*+]\s+\[[ x]\]\s+/, // - [ ] ou - [x]
    /^\s*[-*+]\s+/, // - ou * ou +
    /^\s*\d+\.\s+/, // 1. ou 2. etc.
    /^\s*-\s+/, // - simple
  ];

  return taskPatterns.some((pattern) => pattern.test(line));
}

/**
 * Parse une ligne de tâche et extrait les métadonnées
 */
function parseTaskLine(line: string): MarkdownTask | null {
  // Nettoyer la ligne
  let content = line
    .replace(/^\s*[-*+]\s+\[[ x]\]\s+/, '') // Enlever - [ ] ou - [x]
    .replace(/^\s*[-*+]\s+/, '') // Enlever - ou * ou +
    .replace(/^\s*\d+\.\s+/, '') // Enlever 1. ou 2. etc.
    .trim();

  if (!content) return null;

  const task: MarkdownTask = { content };

  // Extraire la date (format: @2024-01-15, @today, @tomorrow, @monday, etc.)
  const dateMatch = content.match(
    /@(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{4}-\d{2}-\d{2})/i,
  );
  if (dateMatch) {
    task.date = parseDate(dateMatch[1]);
    content = content.replace(dateMatch[0], '').trim();
  }

  // Extraire l'heure (format: @14:30, @2:30pm, @14h30, etc.)
  const timeMatch = content.match(
    /@(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[ap]m)?|\d{1,2}h\d{2})/i,
  );
  if (timeMatch) {
    task.time = timeMatch[1];
    content = content.replace(timeMatch[0], '').trim();
  }

  // Extraire la priorité (format: !urgent, !high, !medium, !low)
  const priorityMatch = content.match(/!(urgent|high|medium|low)/i);
  if (priorityMatch) {
    task.priority = priorityMatch[1].toLowerCase() as 'high' | 'medium' | 'low';
    content = content.replace(priorityMatch[0], '').trim();
  }

  // Extraire les tags (format: #tag1 #tag2)
  const tagMatches = content.match(/#(\w+)/g);
  if (tagMatches) {
    task.tags = tagMatches.map((tag) => tag.substring(1));
    content = content.replace(/#\w+/g, '').trim();
  }

  // Extraire l'area (format: @area:Freelance Work)
  const areaMatch = content.match(/@area:([^@\s]+)/i);
  if (areaMatch) {
    task.area = areaMatch[1];
    content = content.replace(areaMatch[0], '').trim();
  }

  // Nettoyer le contenu final
  task.content = content.replace(/\s+/g, ' ').trim();

  return task.content ? task : null;
}

/**
 * Parse une date depuis une chaîne
 */
function parseDate(dateStr: string): Date {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (dateStr.toLowerCase()) {
    case 'today':
      return today;
    case 'tomorrow':
      return new Date(today.getTime() + 24 * 60 * 60 * 1000);
    case 'monday':
      return getNextWeekday(today, 1);
    case 'tuesday':
      return getNextWeekday(today, 2);
    case 'wednesday':
      return getNextWeekday(today, 3);
    case 'thursday':
      return getNextWeekday(today, 4);
    case 'friday':
      return getNextWeekday(today, 5);
    case 'saturday':
      return getNextWeekday(today, 6);
    case 'sunday':
      return getNextWeekday(today, 0);
    default:
      // Format YYYY-MM-DD
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? today : date;
  }
}

/**
 * Trouve le prochain jour de la semaine spécifié
 */
function getNextWeekday(from: Date, targetDay: number): Date {
  const result = new Date(from);
  const currentDay = result.getDay();
  const daysUntilTarget = (targetDay - currentDay + 7) % 7;
  result.setDate(
    result.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget),
  );
  return result;
}

/**
 * Convertit une tâche markdown en événement calendrier
 */
export function markdownTaskToEvent(
  task: MarkdownTask,
  taskId: number,
): CalendarEvent {
  const startDate = task.date || new Date();
  const startTime = task.time ? parseTime(task.time) : null;

  let start = new Date(startDate);
  if (startTime) {
    start.setHours(startTime.hours, startTime.minutes, 0, 0);
  }

  let end = new Date(start);
  if (startTime) {
    end.setHours(start.getHours() + 1); // Durée par défaut d'1 heure
  } else {
    end.setHours(23, 59, 59, 999); // Toute la journée
  }

  return {
    id: `task-${taskId}`,
    title: task.content,
    description: task.tags?.join(', '),
    start,
    end,
    allDay: !startTime,
    color: getPriorityColor(task.priority),
    type: 'task',
    taskId,
    area: task.area,
  };
}

/**
 * Parse une heure depuis une chaîne
 */
function parseTime(timeStr: string): { hours: number; minutes: number } {
  // Format 24h: 14:30, 14:30:00
  let match = timeStr.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return { hours, minutes };
  }

  // Format 12h: 2:30pm, 2:30 PM
  match = timeStr.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[4].toLowerCase();

    if (ampm === 'pm' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'am' && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  // Format français: 14h30
  match = timeStr.match(/^(\d{1,2})h(\d{2})$/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return { hours, minutes };
  }

  // Par défaut, retourner l'heure actuelle
  const now = new Date();
  return { hours: now.getHours(), minutes: now.getMinutes() };
}

/**
 * Obtient la couleur selon la priorité
 */
function getPriorityColor(priority?: string): string {
  switch (priority?.toLowerCase()) {
    case 'urgent':
    case 'high':
      return '#EF476F';
    case 'medium':
      return '#FF7733';
    case 'low':
      return '#4CAF50';
    default:
      return '#4361EE';
  }
}
