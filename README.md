# 🧠 Cortex Dashboard

Une application de productivité moderne et minimaliste conçue pour les développeurs et freelances. Cortex Dashboard vous aide à organiser vos tâches, projets et areas de vie selon la méthode P.A.R.A. (Projects, Areas, Resources, Archive).

## 🖼️ Aperçu

![Cortex Dashboard](docs/screenshots/dashboard-preview.png)

*Interface moderne et minimaliste du dashboard principal*

## ✨ Fonctionnalités

### 🎯 **Dashboard Principal**
- **Horloge numérique 24h** - Affichage du temps en temps réel
- **Pomodoro intégré** - Timer de focus avec cycles travail/pause
- **Recherche et filtres** - Trouvez rapidement vos tâches
- **Statistiques visuelles** - Suivi de votre productivité

### 📋 **Gestion des Tâches**
- **Ajout rapide** - Capture instantanée de vos idées
- **Matrice Eisenhower** - Tri automatique par urgence/importance
- **Cases à cocher** - Suivi visuel de vos progrès
- **Catégorisation intelligente** - Tags automatiques (!urgent, !important)

### 🚀 **Gestion des Projets**
- **Création rapide** - Ajoutez des projets en un clic
- **Suivi des progrès** - Visualisation de l'avancement
- **Couleurs dynamiques** - Organisation visuelle

### 🏢 **Areas de Vie**
- **Organisation P.A.R.A.** - Structurez vos responsabilités
- **Répartition des tâches** - Équilibre entre les différents domaines
- **Suivi des objectifs** - Mesurez vos progrès

### 📅 **Agenda et Planning**
- **Vue calendrier** - Planification hebdomadaire
- **Événements** - Gestion de votre emploi du temps
- **Intégration Markdown** - Import/export de vos données

## 🛠️ Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour plus de robustesse
- **Tailwind CSS** - Styling moderne et responsive
- **Zustand** - Gestion d'état légère et performante
- **Framer Motion** - Animations fluides
- **Shadcn/ui** - Composants UI professionnels
- **Prisma** - ORM pour la base de données

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- pnpm (recommandé)

### Installation
```bash
# Cloner le repository
git clone https://github.com/miig-dev/cortex.git
cd cortex

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env

# Lancer l'application
pnpm dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
cortex/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── agenda/            # Page agenda
│   ├── eisenhower/        # Matrice Eisenhower
│   └── focus/             # Mode focus
├── src/
│   ├── components/        # Composants React
│   │   ├── overview/      # Composants du dashboard
│   │   ├── task/          # Composants de tâches
│   │   └── ui/            # Composants UI de base
│   ├── stores/            # Stores Zustand
│   ├── data/              # Données mockées
│   └── lib/               # Utilitaires
├── prisma/                # Schéma de base de données
└── public/                # Assets statiques
```

## 🎨 Design

Cortex Dashboard utilise un design moderne et minimaliste :

- **Thème sombre** - Réduit la fatigue oculaire
- **Typographie monospace** - Inspirée du code
- **Couleurs harmonisées** - Chaque fonction a sa couleur
- **Glassmorphism** - Effets de transparence modernes
- **Animations subtiles** - Interactions fluides

## 🔧 Scripts Disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Construit l'application pour la production
pnpm start        # Démarre l'application en production
pnpm lint         # Vérifie le code avec ESLint
pnpm type-check   # Vérifie les types TypeScript
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Zustand](https://zustand-demo.pmnd.rs/) - Gestion d'état
- [Shadcn/ui](https://ui.shadcn.com/) - Composants UI

---

**Développé avec ❤️ pour la productivité des développeurs**
