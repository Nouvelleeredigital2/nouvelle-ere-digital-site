# Vitrine Monorepo (Next.js 14 + TypeScript + Tailwind)

Monorepo front prêt pour un site vitrine moderne. Ossature uniquement (UI neutre, blocs, layout, thèmes, navigation, SEO, a11y). Pas de logique métier.

## Stack
- **Next.js 14+ App Router** (`apps/web/app/`)
- **TypeScript strict** (paths alias `@/*`)
- **Tailwind CSS** + **variables CSS** (design tokens)
- **lucide-react** (icônes), **Framer Motion** (apparitions légères)
- **ESLint / Prettier**, **Husky + lint-staged**
- **SEO** (metadata, `sitemap.ts`, `robots.ts`)
- **A11y** (focus visible, contrast AA visé)

> Remarque: les primitives UI sont "shadcn-like" (API simple et neutre). Vous pouvez remplacer/étendre avec `shadcn/ui` si souhaité.

## Démarrage
```bash
# Installation à la racine
npm install

# Lancer l'app Web
npm run dev

# Build / Start
npm run build
npm run start

# Qualité
npm run lint
npm run format
npm run typecheck
```

## Structure
```
apps/web/
  app/
    layout.tsx
    page.tsx
    (marketing)/sandbox/page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/{Header,Footer,SiteNav,ThemeSection}.tsx
    ui/{Container,Grid,Button,Card,Badge,SectionHeading,Text,Icon,Media}.tsx
    blocks/{Hero,Split,FeatureList,Steps,KPI,CTA}.tsx
  config/{nav.config.ts,routes.config.ts}
  lib/{utils.ts,seo.ts}
  styles/{globals.css,prose.css}
  public/{favicon.svg,og-image.svg}
```

## Ajouter une page
1. Créez `apps/web/app/mon-slug/page.tsx`.
2. Exportez `metadata` si besoin:
```ts
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
export const metadata: Metadata = generatePageMetadata({ title: "Ma page", description: "…" });
```
3. Ajoutez l'entrée de route dans `apps/web/config/routes.config.ts`:
```ts
{ id: "mon-slug", path: "/mon-slug", title: "Ma page" }
```

## Composer une page avec les blocs
Exemple minimal:
```tsx
import { ThemeSection } from "@/components/layout/ThemeSection";
import { Hero } from "@/components/blocks/Hero";

export default function Page() {
  return (
    <ThemeSection variant="light">
      <Hero title="Titre" subtitle="Sous-titre" cta={{ label: "Action", href: "/" }} />
    </ThemeSection>
  );
}
```

## Ajouter une variante de Button / Badge
- Ouvrez `apps/web/components/ui/Button.tsx` ou `Badge.tsx`.
- Ajoutez une clé dans `variants` / `styles` et mappez les classes Tailwind.
- Utilisez la variante via `variant="maVariante"`.

## Thèming via variables CSS
- Les tokens sont dans `apps/web/styles/globals.css` (`:root`).
- Modifiez `--color-…`, `--radius-…`, `--shadow-…`, `--font-sans`.
- Les composants s'appuient sur Tailwind mappé aux variables.

## Navigation
- Le header lit `apps/web/config/nav.config.ts` (`navLinks`).
- Ajoutez/modifiez `{ label, href, group?, external? }`.

## SEO
- `apps/web/lib/seo.ts` expose `siteDefaults` et `generatePageMetadata()`.
- `app/sitemap.ts` et `app/robots.ts` utilisent `routes.config.ts`.

## A11y
- Focus visible global.
- `aria-current="page"` côté nav active.
- Couleurs prévues pour contraste AA sur clair/sombre.

## Remplacer par shadcn/ui (optionnel)
- Installez `shadcn/ui` et générez les primitives souhaitées.
- Remappez nos composants `ui/*` si besoin pour conserver l'API.

## Conventions
- Fichiers courts, stateless, props typées + JSDoc succinct.
- Pas d'appels réseau, pas de logique métier.

## Licence
MIT
