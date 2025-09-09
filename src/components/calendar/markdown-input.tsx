'use client';

import { useRef, useState } from 'react';
import { useCortexStore } from '@/stores/cortex-store';
import type { CalendarEvent } from '@/types/calendar';
import {
  markdownTaskToEvent,
  parseMarkdownTasks,
} from '@/utils/markdown-parser';

interface MarkdownInputProps {
  onTasksCreated?: (events: CalendarEvent[]) => void;
  placeholder?: string;
  className?: string;
}

export function MarkdownInput({
  onTasksCreated,
  placeholder = 'Tapez vos tâches en markdown...\nEx: - [ ] urgent important fix bug @monday @14:30 #bug @area:Freelance Work',
  className = '',
}: MarkdownInputProps) {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addTask, areas } = useCortexStore();

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);

    try {
      // Parser le markdown
      const markdownTasks = parseMarkdownTasks(input);

      if (markdownTasks.length === 0) {
        // Si pas de tâches markdown détectées, créer une tâche simple
        const area = areas[0]?.name || 'Freelance Work';
        addTask(input.trim(), area);
        setInput('');
        return;
      }

      // Créer les tâches et événements
      const events: CalendarEvent[] = [];

      for (const markdownTask of markdownTasks) {
        // Ajouter la tâche au store
        const area = markdownTask.area || areas[0]?.name || 'Freelance Work';
        addTask(markdownTask.content, area);

        // Créer l'événement calendrier si une date est spécifiée
        if (markdownTask.date) {
          const taskId = Date.now() + Math.random(); // ID temporaire
          const event = markdownTaskToEvent(markdownTask, taskId);
          events.push(event);
        }
      }

      // Notifier les événements créés
      if (events.length > 0 && onTasksCreated) {
        onTasksCreated(events);
      }

      setInput('');
    } catch (error) {
      console.error('Erreur lors du parsing markdown:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');

    // Détecter si c'est du markdown
    if (
      pastedText.includes('```') ||
      pastedText.includes('- [') ||
      pastedText.includes('* ') ||
      pastedText.includes('1. ')
    ) {
      e.preventDefault();
      setInput(pastedText);

      // Auto-processer après un délai
      setTimeout(() => {
        handleSubmit();
      }, 100);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="w-full h-32 px-4 py-3 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#E0E0E0',
          }}
        />

        {/* Indicateur de traitement */}
        {isProcessing && (
          <div className="absolute top-3 right-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Aide markdown */}
      <div className="text-xs" style={{ color: '#6B7280' }}>
        <div className="mb-2 font-medium">💡 Syntaxe markdown supportée :</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            • <code>- [ ] Tâche</code> - Liste de tâches
          </div>
          <div>
            • <code>@monday</code> - Date (lundi, today, tomorrow)
          </div>
          <div>
            • <code>@14:30</code> - Heure (14:30, 2:30pm, 14h30)
          </div>
          <div>
            • <code>!urgent</code> - Priorité (urgent, high, medium, low)
          </div>
          <div>
            • <code>#bug</code> - Tags
          </div>
          <div>
            • <code>@area:Freelance</code> - Area
          </div>
        </div>
        <div className="mt-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">
            Ctrl+Enter
          </kbd>{' '}
          pour traiter
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!input.trim() || isProcessing}
          className="px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: input.trim() ? '#4361EE' : '#6B7280',
            color: 'white',
          }}
        >
          {isProcessing ? 'Traitement...' : 'Créer les tâches'}
        </button>
      </div>
    </div>
  );
}
