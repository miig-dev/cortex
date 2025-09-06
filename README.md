# Cortex App

Plateforme de gestion intelligente et moderne construite avec Next.js 15, TypeScript et Tailwind CSS v4.

## 🚀 Technologies

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui
- **Database** : Prisma + PostgreSQL
- **Testing** : Vitest + Playwright
- **Linting** : Biome
- **Package Manager** : pnpm

## 📦 Installation

```bash
# Cloner le repository
git clone <repository-url>
cd cortex-app

# Installer les dépendances
pnpm install

# Configurer la base de données
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Générer le client Prisma
pnpm prisma generate

# Lancer le serveur de développement
pnpm dev
```

## 🛠️ Scripts disponibles

```bash
# Développement
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production

# Qualité de code
pnpm lint         # Linting avec Biome
pnpm format       # Formatage automatique
pnpm type-check   # Vérification des types

# Tests
pnpm test         # Tests unitaires
pnpm test:watch   # Tests en mode watch
pnpm test:coverage # Tests avec couverture
pnpm test:e2e     # Tests end-to-end

# CI/CD
pnpm ci           # Script CI complet
```

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   ├── layout/         # Composants de layout
│   └── features/       # Composants spécifiques aux features
├── features/           # Logique métier par feature
├── lib/                # Utilitaires et configuration
├── types/              # Types TypeScript partagés
├── stores/             # État global (Zustand)
└── test/               # Configuration des tests
```

## 🧪 Tests

### Tests unitaires
```bash
pnpm test
```

### Tests e2e
```bash
pnpm test:e2e
```

### Couverture de code
```bash
pnpm test:coverage
```

## 🚀 Déploiement

Le projet est configuré pour être déployé sur Vercel :

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Le déploiement se fait automatiquement sur push

## 📝 Doctrine de développement

Ce projet suit la [doctrine MIGDEV](./CLEAN_CODE.md) qui définit :

- **TypeScript strict** : Pas de `any`, validation Zod
- **Architecture Next.js** : App Router, Server Components
- **Qualité de code** : Linting, tests, formatage automatique
- **Performance** : Optimisations Next.js, images optimisées
- **Sécurité** : Validation des données, headers de sécurité

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'feat: add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT © MIGDEV
