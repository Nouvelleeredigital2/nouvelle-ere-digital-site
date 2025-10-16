# Contributing Guide

Merci de contribuer à ce monorepo front. L'objectif est d'offrir une ossature claire, accessible et typée, sans logique produit.

## Prérequis

- Node 18+
- npm 9+

## Installation

```bash
npm install
```

Husky sera installé via le script `prepare`. Les hooks vérifient format, lint et types.

## Scripts utiles

- `npm run dev` — lance `apps/web` en mode développement
- `npm run build` — build Next.js
- `npm run start` — start en prod
- `npm run lint` — ESLint (dans l'app)
- `npm run format` — Prettier write
- `npm run typecheck` — TypeScript sans émission

## Règles de code

- TypeScript strict, pas d'`any` non justifié
- Composants stateless et présentatifs uniquement (pas d'appel réseau)
- Props documentées via JSDoc succinct
- Fichiers courts, noms explicites
- Accessibilité: rôles, `aria-*`, focus visible, contrastes AA

## Ajouter une page

1. Créer `apps/web/app/slug/page.tsx`
2. Optionnel: `export const metadata` via `generatePageMetadata()`
3. Ajouter l'entrée dans `apps/web/config/routes.config.ts`

## Ajouter/étendre un composant

- Les primitives UI se trouvent dans `apps/web/components/ui/*`
- Les blocs (sections) sont dans `apps/web/components/blocks/*`
- Ajouter des variantes en mappant les classes Tailwind aux tokens CSS

## Commit

- Les commits doivent passer `pre-commit` (lint-staged)
- Favoriser des messages clairs (conventionnel recommandé)

## Dossiers à connaître

- `apps/web/app/` — App Router Next.js
- `apps/web/config/` — navigation et registre des routes
- `apps/web/lib/` — utilitaires et SEO
- `apps/web/styles/` — Tailwind + tokens CSS
- `apps/web/public/` — assets

## Revue

- Vérifier a11y, sémantique, responsive, et cohérence des tokens

Merci !
