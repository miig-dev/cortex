# 🧠 Cortex App - Plateforme de Gestion Intelligente

> **Application de gestion de tâches moderne inspirée de la méthode P.A.R.A. et Notion**

## 🚀 Fonctionnalités Principales

### 📥 **Inbox - Capture Sans Friction**
- Interface ultra-minimaliste pour capturer rapidement les idées
- Auto-tagging avec syntaxe Markdown (`!urgent`, `#projet`, `@personne`)
- Sauvegarde instantanée avec Enter ou Cmd+Enter
- Design dark mode optimisé pour les développeurs

### 🎯 **Quartier Général - Matrice Eisenhower**
- Tri intelligent des tâches par urgence et importance
- Drag & drop fluide entre les quadrants
- Visualisation claire des priorités
- Catégorisation automatique des nouvelles tâches

### ⏱️ **Focus - Chronomètre de Tâches**
- Chronomètre pour évaluer le temps réel des tâches
- Timer avec pause/reprise/arrêt
- Statistiques détaillées (temps total, moyen, sessions)
- Historique des tâches chronométrées
- Parfait pour évaluer le temps de correction de bugs

### 📊 **Dashboard - Vue d'Ensemble**
- Interface Notion-like avec widgets compacts
- Calendrier mini avec événements
- Statistiques en temps réel
- Ajout rapide de tâches, projets et areas
- Horloge numérique et pomodoro compact

### 📅 **Agenda - Planification**
- Vue calendrier hebdomadaire
- Intégration des tâches et événements
- Création d'événements avec syntaxe Markdown
- Gestion des plages horaires

### 📈 **Statistiques - Suivi des Performances**
- Métriques de productivité
- Répartition Eisenhower
- Historique des sessions
- Graphiques de progression

## 🛠️ Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **UI Components**: Shadcn/ui
- **Linting**: Biome
- **Package Manager**: pnpm

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- pnpm

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd cortex-app

# Installer les dépendances
pnpm install

# Démarrer en développement
pnpm dev
```

### Build de Production
```bash
# Build optimisé
pnpm build

# Démarrer en production
pnpm start
```

## 📁 Structure du Projet

```
cortex-app/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── inbox/             # Capture de tâches
│   ├── eisenhower/        # Matrice Eisenhower
│   ├── focus/             # Chronomètre de tâches
│   ├── agenda/            # Planification
│   └── stats/             # Statistiques
├── src/
│   ├── components/        # Composants réutilisables
│   ├── features/          # Fonctionnalités métier
│   ├── stores/            # Gestion d'état (Zustand)
│   ├── types/             # Types TypeScript
│   └── utils/             # Utilitaires
└── public/                # Assets statiques
```

## 🎨 Design System

### Palette de Couleurs
- **Background**: `#121212` (Dark Charcoal)
- **Text**: `#E0E0E0` (Light Gray)
- **Urgent & Important**: `#EF476F` (Pulse Red)
- **Important**: `#4CAF50` (Success Green)
- **Urgent**: `#FF7733` (Warning Orange)
- **Eliminate**: `#6B7280` (Neutral Gray)

### Typographie
- **Titres**: Poppins (H1, H2)
- **Corps**: Lato (paragraphes)
- **Code**: JetBrains Mono

## 🔧 Scripts Disponibles

```bash
pnpm dev          # Développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linting
pnpm type-check   # Vérification TypeScript
```

## 📱 Responsive Design

- **Mobile**: Interface adaptée pour smartphones
- **Tablet**: Layout optimisé pour tablettes
- **Desktop**: Expérience complète sur ordinateur

## 🚀 Déploiement

L'application est prête pour le déploiement sur :
- Vercel (recommandé)
- Netlify
- AWS Amplify
- Tout hébergeur supportant Next.js

## 📄 Licence

Propriétaire - Tous droits réservés

---

**Développé avec ❤️ pour optimiser la productivité des développeurs**