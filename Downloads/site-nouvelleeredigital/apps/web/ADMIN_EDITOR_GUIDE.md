# Éditeur Visuel Admin - Guide d'utilisation

## 🎯 Fonctionnalités implémentées

L'éditeur visuel admin est maintenant **pleinement fonctionnel** avec les fonctionnalités suivantes :

### ✅ Backend (API)
- **Sauvegarde des pages** : Route PATCH `/api/pages/[slug]` pour persister les modifications
- **Upload de médias** : Route POST `/api/upload` pour gérer les fichiers
- **Bibliothèque de médias** : Route GET `/api/media` pour récupérer les médias
- **Sécurité** : Middleware d'authentification pour protéger les routes admin

### ✅ Frontend (Interface)
- **Studio d'édition complet** : Interface avec palette de blocs, canvas et inspecteur
- **Sauvegarde en temps réel** : Bouton de sauvegarde connecté à l'API
- **Gestion des médias** : Bibliothèque de médias avec upload et sélection
- **Authentification** : Page de login et protection des routes

## 🚀 Comment utiliser l'éditeur

### 1. Accès à l'administration

1. **Se connecter** : Allez sur `/login`
   - Pour la démo, utilisez n'importe quel email et mot de passe
   - Le système créera un cookie d'authentification

2. **Dashboard admin** : Accédez à `/admin`
   - Liste des pages existantes
   - Boutons pour créer/éditer des pages

### 2. Édition d'une page

1. **Ouvrir le studio** : Cliquez sur "Éditer" pour une page
   - URL : `/admin/studio/[slug]`

2. **Interface du studio** :
   - **Palette de blocs** (gauche) : Ajouter des blocs (texte, image, etc.)
   - **Canvas** (centre) : Zone d'édition visuelle
   - **Inspecteur** (droite) : Propriétés du bloc sélectionné

3. **Modifier le contenu** :
   - Cliquez sur un bloc pour le sélectionner
   - Utilisez l'inspecteur pour modifier les propriétés
   - Les changements sont visibles immédiatement

4. **Sauvegarder** :
   - Bouton "Sauvegarder" en haut à droite
   - Sauvegarde automatique après 30 secondes d'inactivité
   - Indicateur de statut de sauvegarde

### 3. Gestion des médias

1. **Upload d'images** :
   - Dans l'inspecteur d'un bloc image
   - Zone de glisser-déposer ou bouton "Uploader"
   - Formats supportés : JPG, PNG, GIF, WebP, SVG (max 10MB)

2. **Bibliothèque de médias** :
   - Bouton "Bibliothèque" dans l'inspecteur d'image
   - Recherche et filtrage des médias
   - Suppression des médias inutilisés

## 🔧 Structure technique

### API Routes
```
/api/pages/[slug]     - GET (récupérer) / PATCH (sauvegarder)
/api/upload           - POST (upload) / DELETE (supprimer)
/api/media            - GET (lister) / PATCH (mettre à jour)
```

### Composants principaux
```
/components/studio/
├── Canvas.tsx              - Zone d'édition visuelle
├── Inspector/              - Panneau de propriétés
├── BlockPalette/           - Palette de blocs
├── PropertyControls/       - Contrôles de propriétés
└── SaveIndicator.tsx       - Indicateur de sauvegarde

/components/media/
└── MediaLibrary.tsx        - Bibliothèque de médias

/stores/
└── editorStore.ts          - État global de l'éditeur
```

### Base de données
- **Pages** : Contenu JSON des blocs
- **Media** : Métadonnées des fichiers uploadés
- **Users** : Authentification (NextAuth.js)

## 🛠️ Configuration requise

### Variables d'environnement
```env
DATABASE_URL="file:./dev.db"  # SQLite pour le développement
```

### Dépendances principales
- **Next.js 14** : Framework React
- **Prisma** : ORM pour la base de données
- **Zustand** : Gestion d'état
- **Tailwind CSS** : Styling
- **Lucide React** : Icônes

## 🎨 Types de blocs supportés

- **Hero** : Section d'en-tête avec titre, sous-titre, CTA
- **Text** : Bloc de texte simple
- **RichText** : Éditeur de texte riche
- **Image** : Image avec légende et options de layout
- **CTA** : Call-to-action avec boutons
- **Gallery** : Galerie d'images
- **Columns** : Colonnes (2, 3, 4)
- **Video** : Lecteur vidéo
- **Tabs** : Onglets
- **Accordion** : Accordéon
- **Form** : Formulaire personnalisable

## 🔒 Sécurité

- **Authentification** : Cookie `admin-auth` requis
- **Protection des routes** : Middleware Next.js
- **Validation** : Schémas Zod pour les API
- **Upload sécurisé** : Validation des types et tailles de fichiers

## 🚀 Prochaines étapes

Pour aller plus loin, vous pourriez ajouter :

1. **Authentification complète** : NextAuth.js avec base de données
2. **Rôles et permissions** : Admin, Editor, Contributor
3. **Historique des versions** : Sauvegarde automatique des versions
4. **Templates** : Modèles de pages prédéfinis
5. **SEO avancé** : Métadonnées, sitemap automatique
6. **Prévisualisation** : Mode aperçu avant publication
7. **Collaboration** : Édition simultanée, commentaires
8. **Analytics** : Statistiques d'utilisation des pages

## 📝 Notes importantes

- **Développement** : L'éditeur fonctionne en mode développement
- **Production** : Configurer l'authentification et la base de données
- **Performance** : Optimiser les images et le chargement
- **Backup** : Sauvegarder régulièrement la base de données

---

L'éditeur visuel est maintenant **entièrement fonctionnel** et prêt à être utilisé ! 🎉
