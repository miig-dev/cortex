# 🤝 Guide de Contribution

Merci de votre intérêt à contribuer à Cortex Dashboard ! Ce guide vous aidera à démarrer.

## 🚀 Démarrage Rapide

### 1. Fork et Clone
```bash
git clone https://github.com/votre-username/cortex-dashboard.git
cd cortex-dashboard
```

### 2. Installation
```bash
# Installer les dépendances
pnpm install

# Copier les variables d'environnement
cp .env.example .env
```

### 3. Configuration de l'environnement
Créez un fichier `.env` avec :
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Lancer l'application
```bash
pnpm dev
```

## 📋 Standards de Code

### TypeScript
- Utilisez des types stricts
- Évitez `any` autant que possible
- Documentez les interfaces complexes

### React
- Utilisez des composants fonctionnels
- Préférez les hooks aux classes
- Nommez les composants en PascalCase

### Styling
- Utilisez Tailwind CSS
- Respectez la palette de couleurs définie
- Maintenez la cohérence visuelle

## 🎨 Palette de Couleurs

```css
/* Couleurs principales */
--cortex-bg: #121212
--cortex-text: #E0E0E0
--cortex-urgent: #EF476F
--cortex-important: #4361EE
--cortex-delegate: #FFD166
--cortex-eliminate: #6B7280
```

## 🧪 Tests

```bash
# Lancer les tests
pnpm test

# Tests avec couverture
pnpm test:coverage
```

## 📝 Commits

Utilisez des messages de commit clairs :
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage
- `refactor:` refactoring
- `test:` tests

## 🔄 Workflow

1. Créez une branche depuis `main`
2. Développez votre fonctionnalité
3. Testez vos changements
4. Créez une Pull Request
5. Attendez la review

## 🐛 Signaler un Bug

Utilisez le template d'issue GitHub et incluez :
- Description du bug
- Steps to reproduce
- Comportement attendu
- Screenshots si applicable

## ✨ Proposer une Fonctionnalité

Ouvrez une issue avec :
- Description détaillée
- Cas d'usage
- Mockups si applicable
- Impact sur l'existant

Merci de contribuer ! 🎉
