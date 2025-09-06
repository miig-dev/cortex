# Guide Clean Code MIGDEV

Ce document détaille les règles et bonnes pratiques de codage à suivre sur ce projet. Il est basé sur la doctrine MIGDEV.

## Commandements Absolus

### 1. `any` est interdit.

Utilisez `unknown` et validez les données avec Zod.

**Mauvais :**
```typescript
function processData(data: any) {
  // ...
}
```

**Bon :**
```typescript
import { z } from 'zod';

const DataSchema = z.object({
  // ...
});

function processData(data: unknown) {
  const parsedData = DataSchema.parse(data);
  // ...
}
```

### 2. `// @ts-ignore` est interdit.

Corrigez la cause racine du problème de type. Si vous ne pouvez pas, utilisez `// @ts-expect-error` avec un commentaire expliquant pourquoi.

## Règles de Codage

### TypeScript

- **Toujours utiliser `type` au lieu de `interface`** : `type` est plus cohérent et plus flexible.
- **Validation systématique avec Zod** : Ne faites jamais confiance aux données externes.
- **Éviter les `enum`, préférer `as const`** : Plus léger et plus en phase avec le JavaScript moderne.

### Nommage

- **Variables** : `camelCase`
- **Composants** : `PascalCase`
- **Fichiers** : `kebab-case`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Types** : `PascalCase` avec suffixe `Type` si nécessaire.

