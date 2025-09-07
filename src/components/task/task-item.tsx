'use client';

import { type Task, useCortexStore } from '@/stores/cortex-store';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onMove?: (taskId: number, quadrant: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onMove,
  showActions = true,
  compact = false
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const { toggleTask, updateTask, deleteTask } = useCortexStore();

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      updateTask(task.id, { content: editContent });
      setIsEditing(false);
    } else {
      setEditContent(task.content);
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    } else {
      deleteTask(task.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditContent(task.content);
    }
  };

  const getPriorityIcon = (priority: number) => {
    switch (priority) {
      case 1: return '🔴';
      case 2: return '🟡';
      case 3: return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div
      className={`group flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
        compact ? 'py-2' : 'py-3'
      }`}
      style={{
        backgroundColor: task.bgColor || '#1A1A1A',
        borderColor: task.color ? `${task.color}40` : 'rgba(255,255,255,0.1)',
      }}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={handleToggle}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-400 hover:border-gray-300'
        }`}
        style={{ marginTop: '2px' }}
        aria-label={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Contenu de la tâche */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="w-full bg-transparent border-none outline-none text-sm"
            style={{ color: task.color || '#E0E0E0' }}
            autoFocus={true}
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${task.completed ? 'line-through opacity-60' : ''}`}
              style={{ color: task.color || '#E0E0E0' }}
            >
              {task.content}
            </span>
            {!compact && (
              <span className="text-xs opacity-60">
                {getPriorityIcon(task.priority)}
              </span>
            )}
          </div>
        )}

        {!compact && (
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${task.color}20`,
                color: task.color || '#E0E0E0'
              }}
            >
              {task.area}
            </span>
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${task.color}20`,
                color: task.color || '#E0E0E0'
              }}
            >
              {task.title}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleEdit}
            className="p-1 rounded hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            title="Modifier"
            aria-label="Modifier la tâche"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-200"
            title="Supprimer"
            aria-label="Supprimer la tâche"
          >
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
