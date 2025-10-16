# 📚 Tutorial - Premier Pas avec l'Éditeur Visuel

## 🎯 Objectif

Ce tutorial vous guide pas à pas pour créer votre première page avec l'éditeur visuel.

---

## Étape 1: Configuration Initiale (5 min)

### 1.1 Créer le fichier .env

Dans `apps/web/`, créez un fichier `.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
SESSION_SECRET="dev-secret-change-in-production"
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### 1.2 Initialiser la base de données

```bash
cd apps/web
npm run db:seed
```

Vous devriez voir:
```
✅ Page d'accueil créée: home
✅ Page services créée: services
✅ Snapshot créé: ...
🎉 Seed terminé avec succès!
```

### 1.3 Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur: `http://localhost:3001`

---

## Étape 2: Se Connecter à l'Admin (2 min)

### 2.1 Ouvrir la page de connexion

Allez sur: `http://localhost:3001/login`

### 2.2 Se connecter

- **Username**: `admin`
- **Password**: `admin123`

Cliquez sur "Se connecter"

✅ Vous êtes redirigé vers `/admin/studio/home`

---

## Étape 3: Explorer les Pages Existantes (5 min)

### 3.1 Page d'accueil

Vous êtes sur l'éditeur de la page "home".

Observez:
- Le **titre** de la page en haut
- Le **champ JSON** avec la structure de la page
- Le **bouton "Sauvegarder"**

### 3.2 Voir la page publique

Dans un nouvel onglet, ouvrez: `http://localhost:3001/home`

Vous voyez:
- Un hero avec titre, description et bouton
- Une section de texte avec liste
- Un bloc CTA final

### 3.3 Page services

Retour dans l'admin, allez sur: `http://localhost:3001/admin/studio/services`

Observez la structure différente avec plusieurs sections de texte.

---

## Étape 4: Modifier une Page Existante (10 min)

### 4.1 Modifier le titre du hero

Dans l'éditeur de la page `/admin/studio/home`, trouvez:

```json
{
  "id": "hero-1",
  "type": "hero",
  "data": {
    "title": "Transformez Votre Présence Digitale",
    ...
  }
}
```

Changez le titre:

```json
"title": "Bienvenue sur Mon Nouveau Site",
```

### 4.2 Sauvegarder

Cliquez sur le bouton **"Sauvegarder"**

✅ Message: "Page sauvegardée avec succès!"

### 4.3 Publier les changements

Dans votre terminal:

```bash
npm run publish:snapshot
```

Vous verrez:
```
✅ Nouveau snapshot créé avec succès!
🌐 Pages publiées:
   - http://localhost:3001/home
```

### 4.4 Vérifier le changement

Rafraîchissez `http://localhost:3001/home`

✅ Votre nouveau titre s'affiche!

---

## Étape 5: Créer une Nouvelle Page (15 min)

### 5.1 Accéder au studio pour une nouvelle page

Allez sur: `http://localhost:3001/admin/studio/about`

### 5.2 Définir le titre

Dans le champ "Titre de la page", entrez:
```
À Propos de Nous
```

### 5.3 Créer la structure

Dans le champ JSON, remplacez tout par:

```json
{
  "blocks": [
    {
      "id": "hero-about",
      "type": "hero",
      "data": {
        "title": "Notre Histoire",
        "subtitle": "Qui sommes-nous",
        "description": "Découvrez notre parcours et nos valeurs",
        "ctaText": "Nous contacter",
        "ctaLink": "/contact",
        "alignment": "center"
      }
    },
    {
      "id": "text-mission",
      "type": "text",
      "data": {
        "content": "<h2 class='text-3xl font-bold mb-4'>Notre Mission</h2><p class='text-lg'>Accompagner les entreprises dans leur transformation digitale avec innovation et excellence.</p><ul class='mt-4 space-y-2'><li>✓ Expertise technique de pointe</li><li>✓ Approche centrée sur l'humain</li><li>✓ Résultats mesurables</li></ul>",
        "alignment": "left",
        "maxWidth": "lg",
        "paddingY": "lg"
      }
    },
    {
      "id": "text-values",
      "type": "text",
      "data": {
        "content": "<h2 class='text-3xl font-bold mb-4'>Nos Valeurs</h2><p class='text-lg'>Innovation, qualité et satisfaction client au cœur de chaque projet.</p>",
        "alignment": "center",
        "maxWidth": "md",
        "paddingY": "md"
      }
    },
    {
      "id": "cta-contact",
      "type": "cta",
      "data": {
        "title": "Travaillons Ensemble",
        "description": "Prêt à démarrer votre projet ?",
        "primaryButtonText": "Contactez-nous",
        "primaryButtonLink": "/contact",
        "backgroundColor": "bg-blue-700",
        "textColor": "text-white"
      }
    }
  ]
}
```

### 5.4 Sauvegarder

Cliquez sur **"Sauvegarder"**

### 5.5 Changer le statut en PUBLISHED

Pour l'instant, la page est en DRAFT. Pour la publier, vous devez:

1. Ouvrir Prisma Studio:
```bash
npm run db:studio
```

2. Aller dans la table "Page"
3. Trouver la page "about"
4. Changer `status` de "DRAFT" à "PUBLISHED"
5. Cliquer sur "Save 1 change"

### 5.6 Publier le snapshot

```bash
npm run publish:snapshot
```

### 5.7 Voir votre nouvelle page

Ouvrez: `http://localhost:3001/about`

✅ Votre page "À Propos" est en ligne!

---

## Étape 6: Téléverser une Image (10 min)

### 6.1 Accéder à la bibliothèque de médias

Allez sur: `http://localhost:3001/admin/media`

### 6.2 Téléverser une image

1. Cliquez sur **"Téléverser des fichiers"**
2. Sélectionnez une ou plusieurs images
3. Attendez le téléversement

✅ Vos images apparaissent dans la grille

### 6.3 Utiliser l'image dans une page

1. Notez le nom de fichier de votre image (ex: `1729105234567-abc123.jpg`)
2. Retournez dans le studio: `/admin/studio/about`
3. Ajoutez un bloc image avant le CTA:

```json
{
  "id": "image-team",
  "type": "image",
  "data": {
    "src": "/media/VOTRE-NOM-DE-FICHIER.jpg",
    "alt": "Notre équipe",
    "caption": "L'équipe Nouvelle Ère Digital",
    "layout": "contained",
    "aspectRatio": "16/9"
  }
},
```

4. Sauvegardez
5. Republiez: `npm run publish:snapshot`
6. Vérifiez sur `/about`

✅ Votre image s'affiche!

---

## Étape 7: Personnaliser un Bloc CTA (5 min)

### 7.1 Changer les couleurs

Dans n'importe quelle page, trouvez un bloc `cta` et modifiez:

```json
{
  "type": "cta",
  "data": {
    "backgroundColor": "bg-gradient-to-r from-purple-700 to-pink-600",
    "textColor": "text-white"
  }
}
```

Couleurs disponibles (Tailwind CSS):
- `bg-blue-700`, `bg-purple-700`, `bg-green-700`
- `bg-gradient-to-r from-blue-500 to-purple-600`
- etc.

### 7.2 Tester différents alignements

Pour un hero:
```json
"alignment": "left"   // Aligné à gauche
"alignment": "center" // Centré
"alignment": "right"  // Aligné à droite
```

---

## Étape 8: Comprendre le Workflow (Important!)

### Cycle de Vie d'une Page

```
1. CRÉATION
   ↓
   [Studio] Créer la page
   Status: DRAFT
   
2. ÉDITION
   ↓
   [Studio] Modifier le contenu
   Sauvegarder
   
3. PUBLICATION
   ↓
   [DB] Changer status → PUBLISHED
   [CLI] npm run publish:snapshot
   
4. EN LIGNE
   ↓
   La page est visible sur /{slug}
```

### Points Importants

⚠️ **Une page en DRAFT n'est pas visible publiquement**
⚠️ **Il faut publier un snapshot pour voir les changements**
⚠️ **Le snapshot contient TOUTES les pages PUBLISHED**

---

## Étape 9: Outils de Diagnostic (5 min)

### 9.1 Prisma Studio

Interface visuelle de la base de données:

```bash
npm run db:studio
```

Utilisez-le pour:
- Voir toutes les pages
- Changer les statuts
- Vérifier les snapshots
- Consulter les médias

### 9.2 Vérifier quel snapshot est actif

Dans Prisma Studio:
1. Ouvrez la table "PublishSnapshot"
2. Cherchez `isActive: true`
3. Regardez la date de création

### 9.3 Logs du serveur

Gardez toujours un œil sur le terminal où tourne `npm run dev`

Les erreurs API apparaissent ici.

---

## Étape 10: Astuces et Raccourcis (5 min)

### Génération d'IDs uniques

```javascript
// Utilisez toujours cette structure:
"id": "type-timestamp"

// Exemples:
"id": "hero-1729105234"
"id": "text-about-mission"
"id": "cta-contact-footer"
```

### Tester le JSON

Avant de sauvegarder, vérifiez la syntaxe:
- Copiez votre JSON
- Allez sur: https://jsonlint.com/
- Collez et validez

### Raccourcis Clavier (dans l'éditeur)

- `Ctrl+S` - Ne fonctionne pas (cliquez sur le bouton)
- `Ctrl+A` - Sélectionner tout le JSON
- `Ctrl+F` - Rechercher dans le JSON

### Sauvegarde Manuelle

Copiez régulièrement votre JSON dans un fichier texte!

```bash
# Ou sauvegardez la base de données
cp prisma/dev.db prisma/backup.db
```

---

## 🎉 Félicitations!

Vous maîtrisez maintenant les bases de l'éditeur visuel:

✅ Connexion à l'admin
✅ Modification de pages existantes
✅ Création de nouvelles pages
✅ Upload de médias
✅ Publication de snapshots
✅ Diagnostic et debugging

---

## 📚 Pour Aller Plus Loin

### Prochaines Lectures

1. **EDITEUR_VISUEL_README.md** - Documentation complète des blocs
2. **ARCHITECTURE.md** - Comprendre le système en profondeur
3. **QUICK_START.md** - Référence rapide

### Prochains Défis

1. Créer une page "Contact" avec un formulaire (TextBlock)
2. Créer une page "Portfolio" avec plusieurs images
3. Personnaliser les couleurs de tous les CTAs
4. Créer un template réutilisable

### Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs du serveur
2. Ouvrez Prisma Studio
3. Consultez la documentation
4. Vérifiez que le snapshot est actif

---

**Bonne création! 🚀**

*Nouvelle Ère Digital - Tutorial v1.0*
