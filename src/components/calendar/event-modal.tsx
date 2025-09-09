'use client';

import { useEffect, useState } from 'react';
import { useCortexStore } from '@/stores/cortex-store';
import type { CalendarEvent } from '@/types/calendar';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  initialDate?: Date;
  initialTime?: string;
  event?: CalendarEvent | null;
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  initialDate,
  initialTime,
  event,
}: EventModalProps) {
  const { areas } = useCortexStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    allDay: false,
    type: 'event' as 'task' | 'event' | 'meeting' | 'deadline',
    area: areas[0]?.name || 'Freelance Work',
    color: '#4361EE',
  });

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const date = initialDate || now;
      const time = initialTime || '09:00';

      setFormData({
        title: event?.title || '',
        description: event?.description || '',
        startDate: event?.start
          ? event.start.toISOString().split('T')[0]
          : date.toISOString().split('T')[0],
        startTime: event?.start ? event.start.toTimeString().slice(0, 5) : time,
        endDate: event?.end
          ? event.end.toISOString().split('T')[0]
          : date.toISOString().split('T')[0],
        endTime: event?.end ? event.end.toTimeString().slice(0, 5) : '10:00',
        allDay: event?.allDay || false,
        type: event?.type || 'event',
        area: event?.area || areas[0]?.name || 'Freelance Work',
        color: event?.color || '#4361EE',
      });
    }
  }, [isOpen, initialDate, initialTime, event, areas]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${formData.startDate}T${formData.startTime}:00`);
    const end = new Date(`${formData.endDate}T${formData.endTime}:00`);

    if (start >= end) {
      alert("L'heure de fin doit être après l'heure de début");
      return;
    }

    onSave({
      title: formData.title,
      description: formData.description,
      start,
      end,
      allDay: formData.allDay,
      color: formData.color,
      type: formData.type,
      area: formData.area,
    });

    onClose();
  };

  const handleAllDayChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      allDay: checked,
      startTime: checked ? '' : '09:00',
      endTime: checked ? '' : '10:00',
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: '#E0E0E0' }}>
            {event ? "Modifier l'événement" : 'Nouvel événement'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Fermer</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label
              htmlFor="event-title"
              className="block text-sm font-medium mb-2"
              style={{ color: '#E0E0E0', fontFamily: "'Poppins', sans-serif" }}
            >
              Titre *
            </label>
            <input
              id="event-title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#E0E0E0',
                fontFamily: "'Lato', sans-serif",
              }}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="event-description"
              className="block text-sm font-medium mb-2"
              style={{ color: '#E0E0E0' }}
            >
              Description
            </label>
            <textarea
              id="event-description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#E0E0E0',
              }}
              rows={3}
            />
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="event-type"
              className="block text-sm font-medium mb-2"
              style={{ color: '#E0E0E0' }}
            >
              Type
            </label>
            <select
              id="event-type"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as
                    | 'task'
                    | 'event'
                    | 'meeting'
                    | 'deadline',
                }))
              }
              className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#E0E0E0',
              }}
            >
              <option value="event">📅 Événement</option>
              <option value="meeting">🤝 Réunion</option>
              <option value="deadline">⏰ Échéance</option>
              <option value="task">✅ Tâche</option>
            </select>
          </div>

          {/* Area */}
          <div>
            <label
              htmlFor="event-area"
              className="block text-sm font-medium mb-2"
              style={{ color: '#E0E0E0' }}
            >
              Area
            </label>
            <select
              id="event-area"
              value={formData.area}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, area: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#E0E0E0',
              }}
            >
              {areas.map((area) => (
                <option key={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          {/* Toute la journée */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.allDay}
              onChange={(e) => handleAllDayChange(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-gray-400 bg-transparent focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="allDay"
              className="text-sm"
              style={{ color: '#E0E0E0' }}
            >
              Toute la journée
            </label>
          </div>

          {/* Dates et heures */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="event-start-date"
                className="block text-sm font-medium mb-2"
                style={{ color: '#E0E0E0' }}
              >
                Date de début *
              </label>
              <input
                id="event-start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#E0E0E0',
                }}
                required
              />
            </div>

            {!formData.allDay && (
              <div>
                <label
                  htmlFor="event-start-time"
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#E0E0E0' }}
                >
                  Heure de début
                </label>
                <input
                  id="event-start-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#E0E0E0',
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="event-end-date"
                className="block text-sm font-medium mb-2"
                style={{ color: '#E0E0E0' }}
              >
                Date de fin *
              </label>
              <input
                id="event-end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#E0E0E0',
                }}
                required
              />
            </div>

            {!formData.allDay && (
              <div>
                <label
                  htmlFor="event-end-time"
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#E0E0E0' }}
                >
                  Heure de fin
                </label>
                <input
                  id="event-end-time"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#E0E0E0',
                  }}
                />
              </div>
            )}
          </div>

          {/* Couleur */}
          <div>
            <label
              htmlFor="event-color"
              className="block text-sm font-medium mb-2"
              style={{ color: '#E0E0E0' }}
            >
              Couleur
            </label>
            <div className="flex gap-2">
              {[
                { name: 'Bleu', value: '#4361EE' },
                { name: 'Vert', value: '#4CAF50' },
                { name: 'Orange', value: '#FF7733' },
                { name: 'Rouge', value: '#EF476F' },
                { name: 'Violet', value: '#9C27B0' },
                { name: 'Cyan', value: '#4CC9F0' },
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, color: color.value }))
                  }
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-white scale-110'
                      : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: '#4361EE',
                color: 'white',
              }}
            >
              {event ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
