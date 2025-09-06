'use client';

import { CortexLogo } from '@/components/ui/cortex-logo';
import { useGamificationStore } from '@/stores/gamification-store';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface InboxItem {
  id: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

interface InboxCaptureProps {
  onItemAdded: (item: InboxItem) => void;
  pendingCount: number;
}

export function InboxCapture({ onItemAdded, pendingCount }: InboxCaptureProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Gamification
  const { updateStats, addExperience } = useGamificationStore();

  // Auto-resize du textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  // Auto-tagging intelligent
  const extractTags = (text: string): string[] => {
    const tags: string[] = [];

    // Tags d'urgence
    if (text.includes('!urgent') || text.includes('!important')) {
      tags.push('urgent');
    }

    // Tags de type
    if (text.includes('#docs') || text.includes('#documentation')) {
      tags.push('docs');
    }
    if (text.includes('#bug') || text.includes('#fix')) {
      tags.push('bug');
    }
    if (text.includes('#feature') || text.includes('#feat')) {
      tags.push('feature');
    }

    // Tags de projet
    const projectMatch = text.match(/@(\w+)/g);
    if (projectMatch) {
      tags.push(...projectMatch.map(tag => tag.substring(1)));
    }

    return tags;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!inputValue.trim()) return;

    try {
      const tags = extractTags(inputValue);
      const newItem: InboxItem = {
        id: Date.now().toString(),
        content: inputValue.trim(),
        tags,
        createdAt: new Date(),
      };

      onItemAdded(newItem);
      setInputValue('');

      // Mise à jour des statistiques de gamification
      updateStats({
        ideasCaptured: 1 // Une idée capturée
      });

      // Ajouter de l'expérience
      addExperience(5); // 5 XP par idée capturée

      // Son de validation (optionnel)
      if (typeof window !== 'undefined' && 'Audio' in window) {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU5k9n1unEiBC13yO/eizEIHWq+8+OWT');
          audio.volume = 0.3;
          audio.play().catch(() => {}); // Ignore les erreurs de son
        } catch (error) {
          console.log('Erreur audio ignorée:', error);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      // Cmd+Enter ou Ctrl+Enter = reste ouvert pour rafale d'idées
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderTags = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('!urgent') || word.startsWith('!important')) {
        return (
          <span key={index} className="inline-block bg-cortex-pulse-red/20 text-cortex-pulse-red px-2 py-1 rounded text-sm font-mono font-bold mr-1">
            {word}
          </span>
        );
      }
      if (word.startsWith('#')) {
        return (
          <span key={index} className="inline-block bg-cortex-electric-blue/20 text-cortex-electric-blue px-2 py-1 rounded text-sm font-mono font-bold mr-1">
            {word}
          </span>
        );
      }
      if (word.startsWith('@')) {
        return (
          <span key={index} className="inline-block bg-cortex-vibrant-orange/20 text-cortex-vibrant-orange px-2 py-1 rounded text-sm font-mono font-bold mr-1">
            {word}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="min-h-screen bg-cortex-dark flex flex-col items-center justify-center p-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <CortexLogo size={80} animated={true} />
      </motion.div>

      {/* Champ de saisie principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Tapez ici... !urgent fix bug"
              className="w-full min-h-[60px] max-h-[200px] px-6 py-4 bg-transparent border-2 border-cortex-electric-blue/30 rounded-lg outline-none text-cortex-off-white text-xl font-mono placeholder-cortex-muted resize-none transition-all duration-200 focus:border-cortex-electric-blue focus:text-white"
              style={{
                fontSize: '20px',
                lineHeight: '1.5',
              }}
            />

            {/* Curseur clignotant simulé */}
            {isFocused && inputValue === '' && (
              <motion.div
                className="absolute top-4 left-6 w-0.5 h-6 bg-cortex-electric-blue"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>

          {/* Rendu des tags en temps réel */}
          {inputValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-cortex-charcoal/50 rounded-lg border border-cortex-charcoal"
            >
              <div className="text-cortex-off-white font-mono text-lg">
                {renderTags(inputValue)}
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Compteur d'idées en attente */}
      {pendingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-cortex-muted font-mono text-sm"
        >
          ({pendingCount} idée{pendingCount > 1 ? 's' : ''} en attente)
        </motion.div>
      )}

      {/* Instructions discrètes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-12 text-cortex-muted font-mono text-xs text-center max-w-md"
      >
        <div>Enter = sauvegarder • Ctrl+Enter = sauvegarder et rester ouvert</div>
        <div className="mt-2">
          Tags: !urgent #docs @projet
        </div>
      </motion.div>
    </div>
  );
}
