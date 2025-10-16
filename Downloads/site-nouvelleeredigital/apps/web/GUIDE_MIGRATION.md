# 🔄 Guide de Migration - Pages Statiques → Pages Dynamiques

**Objectif**: Transformer progressivement vos 20 pages statiques en pages gérées par l'éditeur visuel.

---

## 📊 Vue d'Ensemble

### Pages à Migrer (20 pages)

| # | Page | Taille | Complexité | Priorité | Temps estimé |
|---|------|--------|------------|----------|--------------|
| 1 | ChiffresClesPage | 13.9 KB | Faible | 🟢 1 | 4h |
| 2 | ConclusionPage | 12.0 KB | Faible | 🟡 3 | 4h |
| 3 | EquipeValeursPage | 15.8 KB | Moyenne | 🟡 2 | 6h |
| 4 | ContactPage | 16.9 KB | Moyenne | 🟡 2 | 6h |
| 5 | MissionPage | 17.4 KB | Moyenne | 🟢 1 | 6h |
| 6 | VisionPage | 18.4 KB | Moyenne | 🟢 1 | 6h |
| 7 | EngagementsRSEPage | 18.2 KB | Moyenne | 🟡 2 | 6h |
| 8 | ExpertisesPage | 19.7 KB | Moyenne | 🟡 2 | 8h |
| 9 | MethodePage | 20.4 KB | Haute | 🔴 3 | 8h |
| 10 | BlogPage | 20.6 KB | Haute | 🔴 3 | 8h |
| 11 | CommunicationPage | 20.7 KB | Haute | 🔴 3 | 8h |
| 12 | DesignPage | 21.4 KB | Haute | 🔴 3 | 8h |
| 13 | FormationsPage | 22.2 KB | Haute | 🔴 3 | 10h |
| 14 | AudiovisuelPage | 22.7 KB | Haute | 🔴 3 | 10h |
| 15 | IntelligenceArtificiellePage | 23.0 KB | Haute | 🔴 3 | 10h |
| 16 | SolutionsIAPage | 23.3 KB | Haute | 🔴 3 | 10h |
| 17 | DeveloppementPage | 23.2 KB | Haute | 🔴 3 | 10h |
| 18 | EvenementielPage | 23.5 KB | Haute | 🔴 3 | 10h |
| 19 | ReferencesPage | 24.0 KB | Haute | 🔴 3 | 10h |
| 20 | AccueilPage | 7.4 KB | Spéciale* | 🟢 4 | 12h |

**Total**: ~148-178 heures (3-4 semaines à temps plein)

*Spéciale: Page d'accueil contient des fonctionnalités custom (PersonaNavSelector, etc.)

---

## 🎯 Stratégie de Migration

### Approche Recommandée

**Phase 1**: Pages Simples (Priorité 1)
- VisionPage
- MissionPage  
- ChiffresClesPage

**Phase 2**: Pages Moyennes (Priorité 2)
- EquipeValeursPage
- ContactPage
- EngagementsRSEPage
- ExpertisesPage

**Phase 3**: Pages Complexes (Priorité 3)
- Toutes les pages > 20 KB

**Phase 4**: Pages Spéciales
- AccueilPage (dernière)

---

## 📝 Process de Migration Standard

### Étape 1: Préparation (15 min)

1. **Ouvrir la page source**
   ```bash
   code components/pages/VisionPage.tsx
   ```

2. **Créer un fichier de travail**
   ```bash
   touch migrations/vision-migration.md
   ```

3. **Analyser la structure**
   - Combien de sections?
   - Quels types de blocs?
   - Quelles images?
   - Quels composants spéciaux?

### Étape 2: Identifier les Blocs (30 min)

**Template d'analyse**:

```markdown
# Migration: VisionPage

## Sections identifiées

### 1. Hero
- Titre: "Notre Vision"
- Sous-titre: "L'avenir du digital"
- Description: "..."
- CTA: "Découvrir"
- Image de fond: /images/vision-hero.jpg
→ **Bloc**: Hero

### 2. Introduction
- H2: "Une Vision Humaniste"
- Paragraphes: 3
- Style: Texte centré
→ **Bloc**: Text

### 3. Valeurs + Image
- Titre: "Nos Valeurs"
- Texte: "..."
- Image: À droite
→ **Bloc**: Split

### 4. Call to Action
- Titre: "Rejoignez-nous"
- Boutons: 2
→ **Bloc**: CTA

## Blocs nécessaires
- [x] Hero
- [x] Text
- [ ] Split (à créer)
- [x] CTA

## Images à uploader
- [ ] /images/vision-hero.jpg
- [ ] /images/valeurs.jpg
```

### Étape 3: Créer les Blocs Manquants (1-4h)

Si la page nécessite un bloc qui n'existe pas encore:

```bash
# 1. Créer le composant
code components/blocks/SplitBlock.tsx

# 2. L'ajouter au BlockRenderer
code components/blocks/BlockRenderer.tsx

# 3. Définir les types
code lib/types/blocks.ts
```

**Voir**: `PLAN_INTEGRATION.md` section "Créer SplitBlock"

### Étape 4: Uploader les Médias (30 min)

```bash
# 1. Se connecter à l'admin
http://localhost:3001/login

# 2. Aller dans la bibliothèque
http://localhost:3001/admin/media

# 3. Uploader toutes les images de la page
# (upload multiple supporté)

# 4. Noter les noms de fichiers générés
vision-hero → 1729105234567-abc123.jpg
valeurs → 1729105298765-def456.jpg
```

### Étape 5: Créer la Structure JSON (1-2h)

```bash
# Aller dans le studio
http://localhost:3001/admin/studio/vision-new
```

**Template JSON**:

```json
{
  "blocks": [
    {
      "id": "hero-vision",
      "type": "hero",
      "data": {
        "title": "Notre Vision",
        "subtitle": "L'avenir du digital",
        "description": "Replacer le sens et l'humain au cœur de la transformation numérique. Découvrez notre vision, notre philosophie et notre approche de l'innovation responsable.",
        "ctaText": "Découvrir notre approche",
        "ctaLink": "/methode",
        "backgroundImage": "/media/1729105234567-abc123.jpg",
        "alignment": "center"
      }
    },
    {
      "id": "text-intro",
      "type": "text",
      "data": {
        "content": "<h2 class='text-3xl font-bold mb-6'>Une Vision Humaniste du Digital</h2><p class='text-lg mb-4'>Dans un monde en constante évolution technologique, nous croyons fermement qu'il est temps de replacer l'humain au centre de chaque innovation. Notre vision ne se limite pas à créer des outils numériques performants ; elle aspire à construire des ponts entre la technologie et les besoins réels des personnes.</p><p class='text-lg'>C'est cette philosophie qui guide chacune de nos actions et qui fait de nous des partenaires de confiance pour accompagner les entreprises dans leur transformation digitale.</p>",
        "alignment": "center",
        "maxWidth": "lg",
        "paddingY": "lg"
      }
    },
    {
      "id": "split-valeurs",
      "type": "split",
      "data": {
        "title": "Nos Valeurs Fondamentales",
        "content": "<p class='text-lg mb-4'>Chez Nouvelle Ère Digital, nos valeurs ne sont pas de simples mots affichés sur un mur. Elles sont le socle sur lequel repose chaque décision, chaque projet, chaque interaction.</p><ul class='space-y-2'><li>✓ <strong>Innovation responsable</strong>: Créer avec éthique</li><li>✓ <strong>Excellence technique</strong>: La qualité avant tout</li><li>✓ <strong>Collaboration</strong>: Ensemble, nous allons plus loin</li><li>✓ <strong>Impact positif</strong>: Contribuer à un monde meilleur</li></ul>",
        "imageUrl": "/media/1729105298765-def456.jpg",
        "imagePosition": "right",
        "backgroundColor": "bg-gray-50"
      }
    },
    {
      "id": "cta-contact",
      "type": "cta",
      "data": {
        "title": "Envie d'en Savoir Plus ?",
        "description": "Discutons ensemble de votre vision et de comment nous pouvons vous accompagner",
        "primaryButtonText": "Nous Contacter",
        "primaryButtonLink": "/contact",
        "secondaryButtonText": "Voir Notre Méthode",
        "secondaryButtonLink": "/methode",
        "backgroundColor": "bg-indigo-700",
        "textColor": "text-white"
      }
    }
  ]
}
```

### Étape 6: Test et Ajustements (1-2h)

1. **Sauvegarder dans l'éditeur**

2. **Changer le status en PUBLISHED**
   ```bash
   npm run db:studio
   # Table: Page
   # Trouver "vision-new"
   # Changer status → PUBLISHED
   # Save
   ```

3. **Publier**
   ```bash
   npm run publish:snapshot
   ```

4. **Comparer**
   - Ancienne: http://localhost:3001/vision
   - Nouvelle: http://localhost:3001/vision-new

5. **Ajuster si nécessaire**
   - Retourner dans le studio
   - Modifier le JSON
   - Sauvegarder
   - Republier

### Étape 7: Bascule (5 min)

**Option A: Redirection**

```typescript
// app/(marketing)/vision/page.tsx
import { redirect } from 'next/navigation';

export default function Vision() {
  redirect('/vision-new');
}
```

**Option B: Suppression + Renommage**

```bash
# 1. Supprimer l'ancienne page statique
rm -rf app/(marketing)/vision/

# 2. Renommer le slug dans la DB
npm run db:studio
# Table: Page
# vision-new → vision
# Save

# 3. Republier
npm run publish:snapshot

# 4. Tester
# http://localhost:3001/vision
```

---

## 🎯 Exemple Complet: Migration de VisionPage

### 1. Analyse (VisionPage.tsx)

```typescript
// Structure actuelle
export function VisionPage() {
  return (
    <>
      <Hero
        title="Notre Vision"
        subtitle="L'avenir du digital"
        description="..."
      />
      
      <TextSection>
        <h2>Une Vision Humaniste</h2>
        <p>...</p>
      </TextSection>
      
      <SplitSection
        title="Nos Valeurs"
        imagePosition="right"
      >
        <p>...</p>
        <ul>...</ul>
      </SplitSection>
      
      <CTASection
        title="Envie d'en savoir plus ?"
      />
    </>
  );
}
```

### 2. Mapping vers les Blocs

| Section Actuelle | Bloc Éditeur | Status |
|-----------------|--------------|--------|
| `<Hero />` | HeroBlock | ✅ Existe |
| `<TextSection />` | TextBlock | ✅ Existe |
| `<SplitSection />` | SplitBlock | ❌ À créer |
| `<CTASection />` | CTABlock | ✅ Existe |

### 3. Créer SplitBlock

```bash
# Créer le composant
code components/blocks/SplitBlock.tsx
```

**Contenu**: Voir `PLAN_INTEGRATION.md` section "Exemple: Créer SplitBlock"

### 4. Uploader les Images

- `vision-hero.jpg` → `/media/1729105234567-abc123.jpg`
- `valeurs.jpg` → `/media/1729105298765-def456.jpg`

### 5. Créer dans l'Éditeur

http://localhost:3001/admin/studio/vision-new

**JSON**: Voir template dans "Étape 5" ci-dessus

### 6. Publier

```bash
npm run db:studio
# Changer status → PUBLISHED

npm run publish:snapshot
```

### 7. Comparer et Ajuster

- Ouvrir les deux versions côte à côte
- Ajuster les marges, couleurs, tailles
- Itérer jusqu'à satisfaction

### 8. Basculer

```bash
rm -rf app/(marketing)/vision/
# Renommer vision-new → vision dans la DB
npm run publish:snapshot
```

✅ **Migration terminée!**

---

## 📋 Checklist de Migration

### Avant de Commencer

- [ ] L'éditeur est opérationnel (`npm run dev`)
- [ ] Je suis connecté à l'admin
- [ ] J'ai accès à la page source
- [ ] J'ai identifié les blocs nécessaires

### Pendant la Migration

- [ ] Structure analysée
- [ ] Blocs manquants créés
- [ ] Images uploadées
- [ ] JSON créé et testé
- [ ] Page sauvegardée (DRAFT)
- [ ] Contenu vérifié
- [ ] Liens fonctionnels
- [ ] Images s'affichent
- [ ] Responsive OK

### Avant la Bascule

- [ ] Status changé → PUBLISHED
- [ ] Snapshot publié
- [ ] Page visible sur /slug-new
- [ ] Comparaison avec l'originale
- [ ] Performance OK (Lighthouse)
- [ ] SEO OK (meta tags)
- [ ] Accessibilité OK

### Après la Bascule

- [ ] Ancienne page supprimée ou redirigée
- [ ] Slug renommé si nécessaire
- [ ] Nouveau snapshot publié
- [ ] Page accessible sur /slug original
- [ ] Tests de régression OK
- [ ] Documentation mise à jour

---

## 🛠️ Outils et Scripts

### Script d'Extraction de Contenu (à créer)

**Fichier**: `scripts/extract-content.ts`

```typescript
// Extraire automatiquement le contenu d'une page statique
// et générer un JSON utilisable dans l'éditeur

import fs from 'fs';
import path from 'path';

const pageName = process.argv[2]; // Ex: VisionPage

// 1. Lire le fichier
const content = fs.readFileSync(
  path.join(__dirname, `../components/pages/${pageName}.tsx`),
  'utf-8'
);

// 2. Parser et extraire les sections
// (logique d'extraction à implémenter)

// 3. Générer le JSON
const json = {
  blocks: [
    // ...blocs extraits
  ]
};

// 4. Sauvegarder
fs.writeFileSync(
  `./migrations/${pageName}.json`,
  JSON.stringify(json, null, 2)
);

console.log(`✅ JSON généré: migrations/${pageName}.json`);
```

**Usage**:
```bash
npx tsx scripts/extract-content.ts VisionPage
# → Génère migrations/VisionPage.json
```

### Script d'Import Bulk (à créer)

**Fichier**: `scripts/import-pages.ts`

```typescript
// Importer plusieurs pages d'un coup depuis un fichier JSON

import { prisma } from '../lib/prisma';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));

async function importPages() {
  for (const page of data.pages) {
    await prisma.page.create({
      data: {
        slug: page.slug,
        title: page.title,
        layout: JSON.stringify(page.layout),
        status: 'DRAFT',
        locale: 'fr',
      },
    });
    console.log(`✅ Page créée: ${page.slug}`);
  }
}

importPages();
```

**Usage**:
```bash
npx tsx scripts/import-pages.ts migrations/bulk-import.json
```

---

## 📊 Suivi de la Migration

### Tableau de Bord (à créer)

```bash
# Voir les stats de migration
npm run migration:status

# Résultat attendu:
# Pages migrées: 5/20 (25%)
# En cours: 2
# Restantes: 13
# Temps estimé: 95h
```

### Fichier de Suivi

**Fichier**: `migrations/progress.json`

```json
{
  "pages": [
    {
      "name": "VisionPage",
      "slug": "vision",
      "status": "completed",
      "migratedAt": "2025-10-20",
      "timeSpent": "6h"
    },
    {
      "name": "MissionPage",
      "slug": "mission",
      "status": "in_progress",
      "startedAt": "2025-10-21"
    },
    {
      "name": "ExpertisesPage",
      "slug": "expertises",
      "status": "pending"
    }
  ],
  "stats": {
    "completed": 1,
    "inProgress": 1,
    "pending": 18,
    "totalEstimatedHours": 148
  }
}
```

---

## 💡 Conseils et Astuces

### Productivité

1. **Migrer par groupes**: Pages similaires ensemble
2. **Réutiliser les patterns**: Créer des templates de JSON
3. **Automatiser**: Scripts d'extraction et d'import
4. **Batch upload**: Toutes les images d'un coup

### Qualité

1. **Comparer pixel-perfect**: Utiliser des outils de diff visuel
2. **Tester responsive**: Mobile, tablet, desktop
3. **Vérifier les liens**: Tous les liens doivent fonctionner
4. **Performance**: Lighthouse > 90 sur toutes les métriques

### Organisation

1. **Documenter**: Prendre des notes pour chaque page
2. **Versionner**: Commiter après chaque migration
3. **Communiquer**: Informer l'équipe des changements
4. **Planifier**: 1-2 pages par semaine

---

## 🎯 Planning Suggéré

### Semaine 1-2: Préparation

- [ ] Créer tous les blocs manquants (8-10 blocs)
- [ ] Tester l'éditeur en profondeur
- [ ] Uploader toutes les images

### Semaine 3: Premières Migrations

- [ ] VisionPage (6h)
- [ ] MissionPage (6h)
- [ ] ChiffresClesPage (4h)
- [ ] ConclusionPage (4h)

**Total**: 4 pages / 20h

### Semaine 4-5: Pages Moyennes

- [ ] EquipeValeursPage (6h)
- [ ] ContactPage (6h)
- [ ] EngagementsRSEPage (6h)
- [ ] ExpertisesPage (8h)

**Total**: 4 pages / 26h

### Semaine 6-8: Pages Complexes

- [ ] MethodePage (8h)
- [ ] BlogPage (8h)
- [ ] CommunicationPage (8h)
- [ ] DesignPage (8h)
- [ ] FormationsPage (10h)
- [ ] AudiovisuelPage (10h)

**Total**: 6 pages / 52h

### Semaine 9-10: Fin de Migration

- [ ] IntelligenceArtificiellePage (10h)
- [ ] SolutionsIAPage (10h)
- [ ] DeveloppementPage (10h)
- [ ] EvenementielPage (10h)
- [ ] ReferencesPage (10h)

**Total**: 5 pages / 50h

### Semaine 11: Page Spéciale

- [ ] AccueilPage (12h)
- [ ] Tests de régression (8h)
- [ ] Optimisations (8h)

**Total**: 1 page + tests / 28h

---

## 🎉 Conclusion

### Résumé

**Total pages**: 20  
**Temps total estimé**: 148-178h  
**Durée calendaire**: 8-12 semaines  
**Effort**: 15-20h/semaine

### Après la Migration Complète

Vous aurez:
- ✅ 20 pages dynamiques 100% éditables
- ✅ Aucune page statique hardcodée
- ✅ Système 100% CMS
- ✅ Contenu modifiable sans développeur
- ✅ Workflow de publication professionnel

### Prochaine Étape

**Commencez par une page simple**:
```bash
# 1. Choisissez: VisionPage ou MissionPage
# 2. Suivez le process ci-dessus
# 3. Prenez votre temps
# 4. Documentez vos apprentissages
```

---

**Nouvelle Ère Digital - Guide de Migration v1.0**

📅 **Date**: 16 Octobre 2025  
🔄 **Status**: Prêt pour la migration  
🎯 **Objectif**: 20/20 pages dynamiques
