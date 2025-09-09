'use client';

import { useState } from 'react';
import { TaskTimer } from '@/features/focus/components/task-timer';

export default function FocusPage() {
  const [currentTask, setCurrentTask] = useState(
    'Sélectionnez une tâche à accomplir',
  );
  const [taskHistory, setTaskHistory] = useState<
    Array<{ task: string; timeSpent: number; date: Date }>
  >([]);

  const handleTimeRecorded = (timeSpent: number) => {
    console.log(
      `Temps enregistré : ${Math.floor(timeSpent / 60)} minutes pour "${currentTask}"`,
    );

    // Sauvegarder dans l'historique
    setTaskHistory((prev) => [
      ...prev,
      {
        task: currentTask,
        timeSpent,
        date: new Date(),
      },
    ]);
  };

  const handleNewTask = () => {
    const newTask = prompt(
      'Quelle tâche voulez-vous chronométrer ?',
      currentTask,
    );
    if (newTask?.trim()) {
      setCurrentTask(newTask.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          ⏱️ Chronomètre de Tâches
        </h1>
        <p className="text-slate-400">Évaluez le temps réel de vos tâches</p>
      </div>

      {/* Task Timer */}
      <TaskTimer task={currentTask} onTimeRecorded={handleTimeRecorded} />

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={handleNewTask}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono font-bold rounded-lg transition-all duration-200 shadow-lg"
        >
          📝 Changer de tâche
        </button>
      </div>

      {/* Historique des tâches */}
      {taskHistory.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">
              📋 Historique des tâches
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {taskHistory
                .slice()
                .reverse()
                .map((entry) => (
                  <div
                    key={`${entry.task}-${entry.date.getTime()}`}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
                  >
                    <div>
                      <div className="text-white font-medium">{entry.task}</div>
                      <div className="text-sm text-slate-400">
                        {entry.date.toLocaleString('fr-FR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-mono font-bold text-green-400">
                        {Math.floor(entry.timeSpent / 60)}:
                        {(entry.timeSpent % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-400">minutes</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
