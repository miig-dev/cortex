'use client';

import { FocusDashboard } from '@/features/focus/components/focus-dashboard';

export default function FocusPage() {
  const handleSessionComplete = (duration: number) => {
    console.log(
      `Session terminée ! Durée: ${Math.floor(duration / 60)} minutes`,
    );
    // Ici on pourrait sauvegarder les statistiques en base
  };

  const handleSessionPause = () => {
    console.log('Session mise en pause');
  };

  const handleSessionResume = () => {
    console.log('Session reprise');
  };

  return (
    <FocusDashboard
      initialTask="Sélectionnez une tâche à accomplir"
      onSessionComplete={handleSessionComplete}
      onSessionPause={handleSessionPause}
      onSessionResume={handleSessionResume}
    />
  );
}
