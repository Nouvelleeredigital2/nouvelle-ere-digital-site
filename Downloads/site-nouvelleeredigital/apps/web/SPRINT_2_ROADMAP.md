# 🗺️ Sprint 2 : Enrichir les Capacités de Contenu

**Priorité** : **MOYENNE**  
**Durée estimée** : 2-3 semaines  
**Objectif** : Transformer l'éditeur en outil de création de contenu riche et flexible

---

## 🎯 Objectifs du Sprint

1. **Créer le Bloc "Texte Riche" (WYSIWYG)**
2. **Développer les Blocs de Mise en Page (Colonnes)**
3. **Créer le Bloc Galerie d'images**

---

## 📋 Tâche 2.1 : Bloc Texte Riche (WYSIWYG)

### Objectif
Permettre l'édition de texte formaté directement dans l'éditeur avec une barre d'outils complète.

### Technologies
- **Tiptap** (déjà installé : `@tiptap/react`, `@tiptap/starter-kit`)
- Extensions nécessaires : Bold, Italic, Strike, Link, Heading, BulletList, OrderedList

### Fichiers à créer

#### 1. `components/blocks/RichTextBlock.tsx`
```tsx
interface RichTextBlockData {
  content: string; // JSON de Tiptap
  alignment?: 'left' | 'center' | 'right' | 'justify';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

#### 2. `components/studio/Inspector/RichTextInspector.tsx`
- Éditeur Tiptap intégré
- Barre d'outils : Gras, Italique, Souligné, H2, H3, Listes
- Options d'alignement et largeur

#### 3. `lib/tiptap-extensions/` (optionnel)
- Extensions personnalisées si nécessaire

### Fonctionnalités

**Barre d'outils minimale** :
- **Texte** : Gras, Italique, Barré, Code inline
- **Titres** : H2, H3, H4
- **Listes** : Liste à puces, Liste numérotée
- **Liens** : Insertion/édition de liens
- **Formatage** : Alignement (gauche, centre, droite)

**Avancé (Phase 2)** :
- Citation (blockquote)
- Séparateur horizontal
- Couleur de texte
- Image inline

### Implémentation

```tsx
// components/blocks/RichTextBlock.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function RichTextBlock({ data }: RichTextBlockProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data.content,
    editable: false, // Read-only en mode public
  });

  return (
    <div className={`prose prose-lg ${alignmentClass}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
```

### Schéma de validation

```ts
// lib/inspectorSchemas.ts
export const richTextBlockSchema = z.object({
  content: z.string(),
  alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).default('lg'),
  paddingY: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
});
```

### Estimation
- **Temps** : 8-10 heures
- **Complexité** : Moyenne
- **Dépendances** : Aucune

---

## 📋 Tâche 2.2 : Blocs de Mise en Page (Colonnes)

### Objectif
Permettre de créer des sections multi-colonnes et d'y glisser d'autres blocs.

### Complexité
⚠️ **ÉLEVÉE** - Nécessite d'adapter la logique de `dnd-kit` pour les conteneurs imbriqués.

### Fichiers à créer

#### 1. `components/blocks/ColumnsBlock.tsx`
```tsx
interface ColumnsBlockData {
  columns: number; // 2, 3, ou 4
  gap?: 'sm' | 'md' | 'lg';
  children: Block[][]; // Tableau de colonnes, chaque colonne contient des blocs
}
```

#### 2. `components/studio/Inspector/ColumnsInspector.tsx`
- Sélecteur de nombre de colonnes
- Espacement entre colonnes
- Alignement vertical

#### 3. `components/studio/ColumnDropZone.tsx`
- Zone de drop pour chaque colonne
- Indicateur visuel lors du drag

### Architecture des données

```json
{
  "id": "col-1",
  "type": "columns",
  "data": {
    "columns": 3,
    "gap": "md",
    "children": [
      [
        { "id": "text-1", "type": "text", "data": {...} },
        { "id": "img-1", "type": "image", "data": {...} }
      ],
      [
        { "id": "text-2", "type": "text", "data": {...} }
      ],
      [
        { "id": "cta-1", "type": "cta", "data": {...} }
      ]
    ]
  }
}
```

### Défis techniques

1. **Drag & Drop imbriqué**
   - Adapter `dnd-kit` pour supporter les conteneurs imbriqués
   - Gérer les `droppableId` hiérarchiques

2. **Gestion de l'état**
   - Mise à jour des blocs dans les colonnes
   - Déplacement entre colonnes

3. **Responsive**
   - Sur mobile : colonnes empilées verticalement
   - Sur tablette : 2 colonnes max
   - Sur desktop : nombre choisi

### Implémentation progressive

**Phase 1** : Structure de base
- Affichage des colonnes (sans drag & drop)
- Blocs statiques à l'intérieur

**Phase 2** : Drag & Drop
- Déplacement de blocs entre colonnes
- Création de nouvelles colonnes

**Phase 3** : Polissage
- Animations fluides
- Prévisualisation en temps réel

### Estimation
- **Temps** : 16-20 heures
- **Complexité** : Élevée
- **Dépendances** : Bonne compréhension de dnd-kit

---

## 📋 Tâche 2.3 : Bloc Galerie

### Objectif
Créer un bloc pour afficher plusieurs images dans une galerie.

### Fichiers à créer

#### 1. `components/blocks/GalleryBlock.tsx`
```tsx
interface GalleryBlockData {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }>;
  layout: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}
```

#### 2. `components/studio/Inspector/GalleryInspector.tsx`
- Gestion de la liste d'images
- Ajout/suppression d'images
- Sélection du layout
- Configuration des colonnes

### Layouts disponibles

**1. Grid (Grille)**
```
┌────┬────┬────┐
│    │    │    │
├────┼────┼────┤
│    │    │    │
└────┴────┴────┘
```

**2. Masonry (Maçonnerie)**
```
┌────┬────┬────┐
│    │    │ │  │
│    ├────┤ │  │
│    │    │ │  │
├────┼────┤ │  │
│    │    ├────┤
│    │    │    │
└────┴────┴────┘
```

**3. Carousel (Carrousel)**
```
  ◄  [   Image   ]  ►
      ● ○ ○ ○ ○
```

### Fonctionnalités

**De base** :
- Upload multiple d'images
- Réorganisation par drag & drop
- Texte alternatif et légende par image

**Avancé** :
- Lightbox pour agrandissement
- Lazy loading
- Transitions animées

### Bibliothèques recommandées

- **Masonry** : `react-masonry-css`
- **Carousel** : `embla-carousel-react` (léger et performant)
- **Lightbox** : `yet-another-react-lightbox`

### Implémentation

```tsx
// components/blocks/GalleryBlock.tsx
'use client';

import Masonry from 'react-masonry-css';

export function GalleryBlock({ data }: GalleryBlockProps) {
  if (data.layout === 'masonry') {
    return (
      <Masonry
        breakpointCols={data.columns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {data.images.map((img) => (
          <div key={img.id}>
            <img src={img.src} alt={img.alt} />
            {img.caption && <p>{img.caption}</p>}
          </div>
        ))}
      </Masonry>
    );
  }
  
  // Grid, Carousel...
}
```

### Estimation
- **Temps** : 10-12 heures
- **Complexité** : Moyenne
- **Dépendances** : Nouvelles bibliothèques à installer

---

## 📦 Dépendances à installer

```bash
# Pour le Bloc Galerie
npm install react-masonry-css embla-carousel-react yet-another-react-lightbox

# (Tiptap déjà installé)
```

---

## 🎯 Ordre recommandé d'implémentation

### Semaine 1
1. **Bloc Texte Riche** (Tâche 2.1)
   - Jour 1-2 : Structure de base + Tiptap
   - Jour 3 : Barre d'outils
   - Jour 4 : Inspecteur
   - Jour 5 : Tests et polissage

### Semaine 2
2. **Bloc Galerie** (Tâche 2.3)
   - Jour 1-2 : Structure + Grid layout
   - Jour 3 : Masonry layout
   - Jour 4 : Carousel layout
   - Jour 5 : Inspecteur + lightbox

### Semaine 3
3. **Bloc Colonnes** (Tâche 2.2)
   - Jour 1-2 : Structure sans drag & drop
   - Jour 3-4 : Drag & drop imbriqué
   - Jour 5 : Tests et responsive

---

## 🧪 Tests à effectuer

### Pour chaque bloc

1. **Fonctionnel**
   - Création du bloc
   - Édition dans l'inspecteur
   - Sauvegarde et rechargement
   - Suppression

2. **Visuel**
   - Rendu sur différentes tailles d'écran
   - Alignement et espacement
   - Cohérence avec le design system

3. **Performance**
   - Temps de chargement
   - Rendu de 10+ images (Galerie)
   - Smooth drag & drop (Colonnes)

---

## 📈 Métriques de succès

### Bloc Texte Riche
- ✅ Toutes les fonctions de formatage fonctionnent
- ✅ Sauvegarde du contenu en JSON
- ✅ Pas de perte de formatage au rechargement

### Bloc Galerie
- ✅ Support de 20+ images sans ralentissement
- ✅ Les 3 layouts fonctionnent correctement
- ✅ Lightbox s'ouvre correctement

### Bloc Colonnes
- ✅ Drag & drop entre colonnes fluide
- ✅ Responsive sur tous les appareils
- ✅ Pas de bug d'état lors du déplacement

---

## 🎓 Ressources

### Documentation Tiptap
- [Guide de démarrage](https://tiptap.dev/docs/editor/getting-started/install)
- [Extensions](https://tiptap.dev/docs/editor/extensions/overview)

### Documentation dnd-kit
- [Nested containers](https://docs.dndkit.com/presets/sortable/nested-sortable)
- [Multiple containers](https://docs.dndkit.com/presets/sortable/multiple-containers)

### Exemples de galeries
- [React Masonry CSS](https://github.com/paulcollett/react-masonry-css)
- [Embla Carousel](https://www.embla-carousel.com/examples/)

---

## 🚨 Risques et mitigations

### Risque 1 : Drag & Drop imbriqué complexe
**Mitigation** : Commencer par une version simple sans drag & drop, puis ajouter progressivement.

### Risque 2 : Performance du Bloc Galerie
**Mitigation** : Utiliser lazy loading et virtualisation si nécessaire.

### Risque 3 : Tiptap trop lourd
**Mitigation** : Importer uniquement les extensions nécessaires, pas le StarterKit complet.

---

## ✅ Checklist avant de commencer

- [ ] Sprint 1 complété et testé
- [ ] Dépendances installées (`npm install ...`)
- [ ] Documentation Tiptap lue
- [ ] Environnement de dev fonctionnel
- [ ] Backup de la base de données

---

## 🎉 Après le Sprint 2

Vous aurez :
- ✅ Un éditeur WYSIWYG professionnel
- ✅ Des mises en page flexibles avec colonnes
- ✅ Des galeries d'images magnifiques
- ✅ Un CMS qui rivalise avec WordPress/Webflow

**Prêt pour le Sprint 3** : SEO dynamique et polissage final.

---

**Nouvelle Ère Digital**  
Sprint 2 Roadmap | Prêt à démarrer  
Complexité : Moyenne à Élevée | Durée : 2-3 semaines
