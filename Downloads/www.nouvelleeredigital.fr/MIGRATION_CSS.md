# Migration CSS - Charte Violet/Zinc

## ✅ Fichiers déjà migrés

- `tailwind.config.ts` - Configuration complète avec palette brand
- `styles/globals.css` - Utilitaires CSS avec classes brand
- `components/ui/Button.tsx` - Supporte primary, outline, ghost, secondaire
- `components/ui/SectionHeading.tsx` - Utilise text-brand
- `components/pages/AccueilPage.tsx` - Entièrement migré

## ❌ Fichiers à migrer

### Composants UI

#### `components/ui/Badge.tsx`
```tsx
// AVANT
violet: "bg-[var(--couleur-primaire)] text-[var(--couleur-light)]",
turquoise: "bg-[var(--couleur-secondaire)] text-[var(--couleur-light)]",
neutre: "bg-[var(--couleur-gris-clair)] text-[var(--couleur-texte-base)]",

// APRÈS
violet: "bg-brand text-white",
turquoise: "bg-teal-500 text-white", // ou supprimer si non utilisé
neutre: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
```

#### `components/ui/Card.tsx`
```tsx
// AVANT
"bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-8"

// APRÈS
"card p-8" // ou "bg-white rounded-2xl shadow-soft p-8 dark:bg-zinc-900/60"
```

#### `components/ui/KPI.tsx`
```tsx
// AVANT
className="rounded-[var(--border-radius-large)] bg-[var(--couleur-light)] shadow-[var(--box-shadow-subtil)] p-6"
className="text-3xl md:text-4xl font-bold text-[var(--couleur-primaire)]"
className="mt-2 text-sm text-[var(--couleur-texte-secondaire)]"

// APRÈS
className="rounded-2xl bg-white shadow-soft p-6 dark:bg-zinc-900/60"
className="text-3xl md:text-4xl font-bold text-brand"
className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
```

### Blocs

#### `components/blocks/Hero.tsx`
```tsx
// AVANT
dark ? "bg-[var(--couleur-dark)] text-[var(--couleur-light)]" : "bg-[var(--couleur-light)] text-[var(--couleur-texte-base)]"
"text-[var(--couleur-secondaire)]"
"text-[var(--couleur-texte-secondaire)]"

// APRÈS
dark ? "bg-zinc-950 text-zinc-50" : "bg-white text-zinc-900"
"text-brand"
"text-zinc-600 dark:text-zinc-400"
```

#### `components/blocks/FeatureList.tsx`
```tsx
// AVANT
"bg-[var(--couleur-primaire)]/10 text-[var(--couleur-primaire)]"
"text-[var(--couleur-texte-secondaire)]"

// APRÈS
"bg-brand/10 text-brand"
"text-zinc-600 dark:text-zinc-400"
```

#### `components/blocks/Steps.tsx`
```tsx
// AVANT
"bg-[var(--couleur-surface)]"
"bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)]"
"text-[var(--couleur-primaire)]"

// APRÈS
"bg-zinc-50 dark:bg-zinc-900"
"bg-white rounded-2xl shadow-soft dark:bg-zinc-900/60"
"text-brand"
```

#### `components/blocks/Testimonials.tsx`
```tsx
// AVANT
"bg-[var(--couleur-surface)]"
"text-[var(--couleur-texte-secondaire)]"

// APRÈS
"bg-zinc-50 dark:bg-zinc-900"
"text-zinc-600 dark:text-zinc-400"
```

#### `components/blocks/CaseList.tsx`
- Même pattern que ci-dessus

#### `components/blocks/CTA.tsx`
- Même pattern que ci-dessus

### Layout

#### `components/layout/Header.tsx`
```tsx
// AVANT
"bg-[var(--couleur-light)]/80 backdrop-blur-md border-b border-[var(--couleur-gris-clair)]"
"text-[var(--couleur-primaire)]"
"text-[var(--couleur-texte-base)]"

// APRÈS
"bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800"
"text-brand"
"text-zinc-900 dark:text-zinc-50"
```

### Modals

#### `components/modals/ServiceModal.tsx`
```tsx
// AVANT
"bg-[var(--couleur-light)] shadow-[var(--box-shadow-subtil)]"
"border-[var(--couleur-gris-clair)]"
"text-[var(--couleur-texte-base)]"
"text-[var(--couleur-texte-secondaire)]"

// APRÈS
"bg-white shadow-soft dark:bg-zinc-900"
"border-zinc-200 dark:border-zinc-800"
"text-zinc-900 dark:text-zinc-50"
"text-zinc-600 dark:text-zinc-400"
```

### Pages

#### `app/(marketing)/sandbox/page.tsx`
Ligne 67:
```tsx
// AVANT
<p className="text-[var(--couleur-texte-secondaire)]">

// APRÈS
<p className="text-zinc-600 dark:text-zinc-400">
```

Ligne 91:
```tsx
// AVANT
<p className="text-[var(--couleur-texte-secondaire)]">

// APRÈS
<p className="text-zinc-600 dark:text-zinc-400">
```

Ligne 95:
```tsx
// AVANT
<div className="w-full h-64 rounded-[var(--border-radius-large)] bg-[var(--couleur-surface)] border border-[var(--couleur-gris-clair)]" />

// APRÈS
<div className="w-full h-64 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800" />
```

## 📋 Mapping des variables

| Ancienne variable | Nouvelle classe Tailwind |
|-------------------|-------------------------|
| `var(--couleur-primaire)` | `text-brand` ou `bg-brand` |
| `var(--couleur-secondaire)` | `text-teal-500` (ou supprimer) |
| `var(--couleur-light)` | `bg-white dark:bg-zinc-900` |
| `var(--couleur-dark)` | `bg-zinc-950` |
| `var(--couleur-surface)` | `bg-zinc-50 dark:bg-zinc-900` |
| `var(--couleur-gris-clair)` | `border-zinc-200 dark:border-zinc-800` |
| `var(--couleur-texte-base)` | `text-zinc-900 dark:text-zinc-50` |
| `var(--couleur-texte-secondaire)` | `text-zinc-600 dark:text-zinc-400` |
| `var(--border-radius-large)` | `rounded-2xl` |
| `var(--box-shadow-subtil)` | `shadow-soft` |

## 🎯 Prochaines étapes

1. Migrer les composants UI (Badge, Card, KPI)
2. Migrer les blocs (Hero, FeatureList, Steps, etc.)
3. Migrer le layout (Header)
4. Migrer les modals (ServiceModal)
5. Nettoyer la page sandbox
6. Supprimer les anciennes variables CSS de `globals.css` si elles existent encore

## ✨ Avantages de la migration

- ✅ Autocomplete Tailwind dans l'IDE
- ✅ Dark mode natif
- ✅ Moins de CSS personnalisé
- ✅ Meilleure maintenabilité
- ✅ Charte graphique cohérente
