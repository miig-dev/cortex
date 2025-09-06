'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type FC, useEffect, useState } from 'react';

interface MicroConseilsProps {
  isActive: boolean;
  timeElapsed: number; // en secondes
}

const conseils = [
  "Fermez les onglets inutiles",
  "Buvez de l'eau",
  "Respirez 3 secondes",
  "Redressez votre posture",
  "Fermez les notifications",
  "Mettez votre téléphone en mode avion",
  "Ajustez la luminosité de l'écran",
  "Prenez une pause visuelle",
  "Étirez vos épaules",
  "Clignez des yeux consciemment"
];

export const MicroConseils: FC<MicroConseilsProps> = ({ isActive, timeElapsed }) => {
  const [currentConseil, setCurrentConseil] = useState(0);
  const [showConseil, setShowConseil] = useState(false);

  // Afficher un conseil toutes les 2 minutes
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setShowConseil(true);
      setCurrentConseil(prev => (prev + 1) % conseils.length);

      // Masquer le conseil après 5 secondes
      setTimeout(() => setShowConseil(false), 5000);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [isActive]);

  // Afficher un conseil aléatoire au démarrage
  useEffect(() => {
    if (isActive && timeElapsed === 0) {
      setCurrentConseil(Math.floor(Math.random() * conseils.length));
      setShowConseil(true);
      setTimeout(() => setShowConseil(false), 5000);
    }
  }, [isActive, timeElapsed]);

  return (
    <AnimatePresence>
      {showConseil && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div className="bg-cortex-charcoal/90 backdrop-blur-sm border border-cortex-electric-blue/30 rounded-lg px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cortex-electric-blue rounded-full animate-pulse" />
              <p className="text-cortex-off-white font-mono text-sm">
                💡 {conseils[currentConseil]}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
