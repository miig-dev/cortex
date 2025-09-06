'use client';

import { StatsPanel } from '@/components/gamification/stats-panel';
import { CortexLogo } from '@/components/ui/cortex-logo';
import { motion } from 'framer-motion';

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-cortex-dark p-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <CortexLogo size={60} animated={true} />
          <h1 className="text-4xl font-mono font-bold text-cortex-off-white">
            Vos Statistiques
          </h1>
        </div>
        
        <p className="text-cortex-muted font-mono text-lg">
          Suivez votre progression et débloquez des badges
        </p>
      </motion.div>

      {/* Panel de statistiques */}
      <div className="max-w-4xl mx-auto">
        <StatsPanel />
      </div>

      {/* Bouton de retour */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <button
          onClick={() => window.history.back()}
          className="text-cortex-muted hover:text-cortex-off-white font-mono text-sm transition-colors"
        >
          ← Retour
        </button>
      </motion.div>
    </div>
  );
}
