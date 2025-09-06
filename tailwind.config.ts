/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette Cortex - Dark Mode First
        cortex: {
          dark: '#121212', // Background principal
          'off-white': '#E0E0E0', // Texte principal
          'electric-blue': '#4361EE', // Accent principal
          'soft-green': '#4CAF50', // Success/Done
          'vibrant-orange': '#FF7733', // Gamification/Energy
          'pulse-red': '#EF476F', // Focus Timer start
          'calm-blue': '#4CC9F0', // Focus Timer end
          charcoal: '#1A1A1A', // Background secondaire
          muted: '#6B7280', // Texte secondaire
        },
        // Quadrants Eisenhower
        quadrant: {
          'urgent-important': '#2A0A0A', // Rouge très pâle
          'important-non-urgent': '#0A1A2A', // Bleu très pâle
          'urgent-non-important': '#2A2A0A', // Jaune très pâle
          'non-urgent-non-important': '#1A1A1A', // Gris
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
