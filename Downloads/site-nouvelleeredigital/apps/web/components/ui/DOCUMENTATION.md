# Documentation des Composants UI

Cette documentation couvre tous les composants UI développés et adaptés au design system du projet. Chaque composant est conçu pour être réutilisable, accessible et cohérent avec les tokens CSS définis (ex. : `--couleur-light`, `--border-radius-large`).

## Sommaire

- [Composants de Base et Layout](#composants-de-base-et-layout)
- [Composants de Données et Analytics](#composants-de-données-et-analytics)
- [Composants de Sélection et Filtres](#composants-de-sélection-et-filtres)
- [Composants Héro et Visuels](#composants-héro-et-visuels)
- [Composants Utilitaires et Accessibilité](#composants-utilitaires-et-accessibilité)
- [Composants Supplémentaires](#composants-supplémentaires)

## Composants de Base et Layout

### GridLayout

- **Rôle** : Layout en grille pour organiser des éléments.
- **Props principales** : `children`, `columns`, `gap`, `variant`.
- **États** : `default`, `hover`, `active`, `focus`, `disabled`, `selected`, `invalid`, `dragging`.
- **Accessibilité** : Rôles ARIA pour grille et cellules.

### DragCanvas

- **Rôle** : Zone interactive pour glisser-déposer des éléments.
- **Props principales** : `items`, `width`, `height`, `snapToGrid`.
- **États** : Même liste.
- **Accessibilité** : Application ARIA.

### ModuleCard

- **Rôle** : Carte pour représenter un module.
- **Props principales** : `module`, `actions`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Article ARIA.

## Composants de Données et Analytics

### AISummaryPanel

- **Rôle** : Panneau pour afficher un résumé IA.
- **Props principales** : `summary`, `actions`, `isLoading`.
- **États** : Même liste.
- **Accessibilité** : Region ARIA.

### AnalyticsTracker

- **Rôle** : Tracker pour visualiser des métriques.
- **Props principales** : `data`, `filters`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Region ARIA.

### ExportPanel

- **Rôle** : Panneau pour configurer l'export.
- **Props principales** : `formats`, `options`, `isOpen`.
- **États** : Même liste.
- **Accessibilité** : Dialog ARIA.

### CompatibilityIndicator

- **Rôle** : Indicateur de compatibilité.
- **Props principales** : `compatibility`, `label`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Status ARIA.

## Composants de Sélection et Filtres

### CategoryFilterChips

- **Rôle** : Puces pour filtrer par catégories.
- **Props principales** : `categories`, `selectedIds`, `multiple`.
- **États** : Même liste.
- **Accessibilité** : Group ARIA.

### ColorLegend

- **Rôle** : Légende pour expliquer les couleurs.
- **Props principales** : `items`, `orientation`, `interactive`.
- **États** : Même liste.
- **Accessibilité** : List ARIA.

### BundleSelector

- **Rôle** : Sélecteur pour choisir des bundles.
- **Props principales** : `bundles`, `selectedIds`, `multiple`.
- **États** : Même liste.
- **Accessibilité** : Listbox ARIA.

### BundleCard

- **Rôle** : Carte pour présenter un bundle.
- **Props principales** : `bundle`, `image`, `price`.
- **États** : Même liste.
- **Accessibilité** : Article ARIA.

### H2Chips, H2Dots, H2Icons, H2Metrics, H2Steps

- **Rôles** : Composants spécialisés pour éléments H2 (puces, dots, icônes, métriques, étapes).
- **Props principales** : `chips/dots/icons/metrics/steps`, `selectedIds`.
- **États** : Même liste.
- **Accessibilité** : List ARIA avec niveaux.

## Composants Héro et Visuels

### HeroBeforeAfter

- **Rôle** : Comparaison avant/après héroïque.
- **Props principales** : `before`, `after`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroCinemagraph

- **Rôle** : Élément héro avec animation subtile.
- **Props principales** : `src`, `title`, `subtitle`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroCollage

- **Rôle** : Collage d'éléments héroïques.
- **Props principales** : `items`, `layout`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroDuoTone

- **Rôle** : Élément héro avec effet duotone.
- **Props principales** : `src`, `primaryColor`, `secondaryColor`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroGradientMap

- **Rôle** : Carte héroïque avec dégradés.
- **Props principales** : `src`, `gradients`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroIsometric

- **Rôle** : Scène héroïque en vue isométrique.
- **Props principales** : `scene`, `camera`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### HeroOrbitMask

- **Rôle** : Masque héroïque avec éléments en orbite.
- **Props principales** : `center`, `orbitals`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### GalaxyRibbon

- **Rôle** : Ruban galactique décoratif.
- **Props principales** : `content`, `title`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Banner ARIA.

### MiniConstellation

- **Rôle** : Petite constellation d'éléments.
- **Props principales** : `stars`, `connections`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

## Composants Utilitaires et Accessibilité

### ConsentManager

- **Rôle** : Gestionnaire de consentements.
- **Props principales** : `categories`, `selectedIds`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Dialog ARIA.

### FocusRing

- **Rôle** : Indicateur de focus visuel.
- **Props principales** : `children`, `color`, `size`.
- **États** : Même liste.
- **Accessibilité** : Pas de rôle spécifique si décoratif.

### I18nText

- **Rôle** : Texte internationalisé.
- **Props principales** : `key`, `params`, `fallback`.
- **États** : Même liste.
- **Accessibilité** : Text ARIA.

## Composants Supplémentaires

### NeedCaptureForm

- **Rôle** : Formulaire pour capturer des besoins.
- **Props principales** : `fields`, `initialValues`, `onSubmit`.
- **États** : Même liste.
- **Accessibilité** : Form ARIA.

### OrbitBreadcrumbs

- **Rôle** : Breadcrumbs avec effet orbital.
- **Props principales** : `items`, `currentId`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Navigation ARIA.

### PlanetBadge

- **Rôle** : Badge avec thème planétaire.
- **Props principales** : `label`, `planet`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

### SearchBox

- **Rôle** : Boîte de recherche avec suggestions.
- **Props principales** : `placeholder`, `suggestions`, `onSearch`.
- **États** : Même liste.
- **Accessibilité** : Searchbox ARIA.

### SectionHeader

- **Rôle** : En-tête pour sections.
- **Props principales** : `title`, `subtitle`, `actions`.
- **États** : Même liste.
- **Accessibilité** : Banner ARIA.

### ServiceDetailSheet

- **Rôle** : Feuille de détails pour services.
- **Props principales** : `service`, `isOpen`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Dialog ARIA.

### ServiceList

- **Rôle** : Liste de services.
- **Props principales** : `services`, `selectedIds`, `variant`.
- **États** : Même liste.
- **Accessibilité** : List ARIA.

### Skeleton

- **Rôle** : Placeholder pour états de chargement.
- **Props principales** : `variant`, `lines`, `animated`.
- **États** : Même liste.
- **Accessibilité** : Status ARIA.

### SkipLink

- **Rôle** : Lien de saut pour accessibilité.
- **Props principales** : `href`, `label`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Link ARIA.

### ThemeSwitch

- **Rôle** : Interrupteur pour thèmes.
- **Props principales** : `themes`, `currentTheme`, `variant`.
- **États** : Même liste.
- **Accessibilité** : Switch ARIA.

### Toast

- **Rôle** : Notification toast.
- **Props principales** : `message`, `type`, `duration`.
- **États** : Même liste.
- **Accessibilité** : Alert ARIA.

### TrajectoireIAOverlay

- **Rôle** : Overlay pour trajectoires IA.
- **Props principales** : `trajectories`, `variant`, `opacity`.
- **États** : Même liste.
- **Accessibilité** : Img ARIA.

## Principes Généraux

- **États Communs** : Tous les composants gèrent `default`, `hover`, `active`, `focus`, `disabled`, `selected`, `invalid`, `dragging`.
- **Tokens** : Utilisation de variables CSS pour couleurs, typos, ombres, radius.
- **Accessibilité** : Rôles ARIA, chemins clavier (Tab, Enter, Esc), attributs comme `aria-live`.
- **Pas de Logique Métier** : Composants UI purs, déléguant les actions à des callbacks.
- **Responsive** : Media queries intégrées pour mobile.
- **Performance** : Animations optimisées, lazy loading si nécessaire.

## Utilisation et Intégration

Voici des exemples pratiques pour intégrer les composants dans vos pages.

### Exemple : Page de Services

```tsx
import {
  SectionHeader,
  ServiceList,
  ServiceDetailSheet,
  Toast,
  SearchBox,
  NeedCaptureForm,
  OrbitBreadcrumbs,
  ThemeSwitch,
  SkipLink,
} from "@/components/ui";

const ServicesPage = () => {
  return (
    <>
      <SkipLink href="#main-content" label="Aller au contenu principal" />
      <OrbitBreadcrumbs items={[{ id: "home", label: "Accueil" }]} currentId="services" />
      <SectionHeader title="Nos Services" actions={[{ id: "add", label: "Ajouter" }]} />
      <SearchBox placeholder="Rechercher..." onSearch={(query) => console.log(query)} />
      <ServiceList services={services} onSelect={(id) => openDetail(id)} />
      <ServiceDetailSheet service={selectedService} isOpen={isOpen} />
      <Toast message="Service ajouté !" type="success" />
    </>
  );
};
```

### Bonnes Pratiques

- **États** : Utilisez les états pour gérer les interactions (ex. : `selected` pour les éléments actifs).
- **Accessibilité** : Ajoutez des rôles ARIA et des chemins clavier pour tous les composants interactifs.
- **Tokens** : Utilisez les variables CSS pour maintenir la cohérence visuelle.
- **Performance** : Implémentez le lazy loading pour les composants lourds comme les overlays.
- **Tests** : Testez chaque composant avec des outils comme axe-core pour l'accessibilité.
