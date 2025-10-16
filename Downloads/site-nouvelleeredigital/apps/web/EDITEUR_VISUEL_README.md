# Éditeur Visuel - Guide d'Utilisation

## 🎯 Vue d'ensemble

Votre site dispose maintenant d'un éditeur visuel complet qui vous permet de créer et gérer vos pages dynamiquement via une interface admin.

## 🚀 Démarrage Rapide

### 1. Démarrer le serveur de développement

```bash
npm run dev
```

### 2. Accéder à l'interface admin

1. Ouvrez votre navigateur à `http://localhost:3000/login`
2. Connectez-vous avec les identifiants par défaut:
   - **Username**: `admin`
   - **Password**: `admin123`

### 3. Créer votre première page

1. Accédez à `/admin/studio/home` pour créer la page d'accueil
2. Modifiez le titre
3. Ajoutez des blocs dans le JSON de structure
4. Cliquez sur "Sauvegarder"

## 📝 Structure des Blocs

### Exemple de structure JSON

```json
{
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "title": "Bienvenue sur notre site",
        "subtitle": "Innovation",
        "description": "Nous créons des expériences digitales exceptionnelles",
        "ctaText": "Découvrir",
        "ctaLink": "/services",
        "alignment": "center"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "data": {
        "content": "<h2>Notre expertise</h2><p>Nous accompagnons les entreprises dans leur transformation digitale.</p>",
        "alignment": "center",
        "maxWidth": "lg"
      }
    },
    {
      "id": "cta-1",
      "type": "cta",
      "data": {
        "title": "Prêt à démarrer ?",
        "description": "Contactez-nous pour discuter de votre projet",
        "primaryButtonText": "Nous contacter",
        "primaryButtonLink": "/contact",
        "secondaryButtonText": "En savoir plus",
        "secondaryButtonLink": "/about"
      }
    }
  ]
}
```

## 🧩 Types de Blocs Disponibles

### 1. Hero Block (`hero`)

Bloc d'en-tête avec image de fond et appel à l'action.

**Propriétés:**
- `title` (string): Titre principal
- `subtitle` (string): Surtitre
- `description` (string): Description
- `ctaText` (string): Texte du bouton
- `ctaLink` (string): Lien du bouton
- `backgroundImage` (string): URL de l'image de fond
- `alignment` (string): "left" | "center" | "right"

### 2. Text Block (`text`)

Bloc de contenu riche avec formatage HTML.

**Propriétés:**
- `content` (string): Contenu HTML
- `alignment` (string): "left" | "center" | "right"
- `maxWidth` (string): "sm" | "md" | "lg" | "xl" | "full"
- `paddingY` (string): "sm" | "md" | "lg"

### 3. Image Block (`image`)

Bloc d'image avec légende.

**Propriétés:**
- `src` (string): URL de l'image
- `alt` (string): Texte alternatif
- `caption` (string): Légende
- `width` (number): Largeur
- `height` (number): Hauteur
- `layout` (string): "full" | "contained"
- `aspectRatio` (string): "16/9" | "4/3" | "1/1" | "auto"

### 4. CTA Block (`cta`)

Bloc d'appel à l'action avec boutons.

**Propriétés:**
- `title` (string): Titre
- `description` (string): Description
- `primaryButtonText` (string): Texte du bouton principal
- `primaryButtonLink` (string): Lien du bouton principal
- `secondaryButtonText` (string): Texte du bouton secondaire
- `secondaryButtonLink` (string): Lien du bouton secondaire
- `backgroundColor` (string): Classe de couleur de fond
- `textColor` (string): Classe de couleur de texte

## 📚 Workflow de Publication

### Mode Brouillon (DRAFT)

1. Créez ou modifiez une page dans le studio
2. La page est sauvegardée avec le statut "DRAFT"
3. Elle n'est pas visible sur le site public

### Publication

1. Changez le statut de la page à "PUBLISHED" dans le JSON:
   ```json
   {
     "status": "PUBLISHED"
   }
   ```
2. Appelez l'API de publication:
   ```bash
   POST /api/publish
   ```
3. Un snapshot du site est créé avec toutes les pages publiées
4. Les pages sont maintenant visibles sur le site public

## 🗄️ Structure de la Base de Données

### Table: `Page`
- Stocke toutes les versions de pages
- Le champ `layout` contient la structure JSON des blocs
- Le champ `status` détermine si la page est publiée

### Table: `Media`
- Gère la bibliothèque de médias
- Stocke les métadonnées des images uploadées

### Table: `PublishSnapshot`
- Contient les snapshots du site publié
- Un seul snapshot est actif à la fois
- Permet le rollback en cas de besoin

## 🎨 Bibliothèque de Médias

1. Accédez à `/admin/media`
2. Cliquez sur "Téléverser des fichiers"
3. Sélectionnez vos images
4. Les fichiers sont stockés dans `/public/media`
5. Utilisez `/media/nom-du-fichier.jpg` dans vos blocs

## 🔐 Sécurité

### Authentification

- Les routes `/admin/*` sont protégées par middleware
- La session est stockée dans un cookie httpOnly
- Durée de session: 24 heures

### Identifiants par Défaut

⚠️ **Important**: Changez les identifiants par défaut en production!

Modifiez le fichier `/app/api/auth/login/route.ts` pour ajouter une vraie gestion d'utilisateurs avec mots de passe hashés.

## 🔄 Routes API

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Pages
- `GET /api/pages` - Liste toutes les pages
- `GET /api/pages/[slug]` - Récupère une page par slug
- `POST /api/pages` - Crée une nouvelle page
- `PUT /api/pages` - Met à jour une page
- `DELETE /api/pages?id=xxx` - Supprime une page

### Médias
- `GET /api/media` - Liste tous les médias
- `POST /api/upload` - Upload de fichiers

### Publication
- `POST /api/publish` - Crée un nouveau snapshot
- `GET /api/publish` - Récupère le snapshot actif

## 🛠️ Prochaines Étapes

1. **Interface Glisser-Déposer**: Intégrez `@dnd-kit` pour un éditeur visuel complet
2. **Éditeur WYSIWYG**: Ajoutez un éditeur riche pour le TextBlock
3. **Prévisualisation**: Ajoutez un mode preview avant publication
4. **Historique**: Implémentez un système d'undo/redo avec Zustand
5. **Thèmes**: Créez des templates de blocs prédéfinis
6. **Optimisation d'images**: Intégrez Sharp pour le traitement d'images

## 📞 Support

Pour toute question ou assistance, consultez la documentation complète dans le dossier `/docs`.

---

**Nouvelle Ère Digital** - Votre partenaire en transformation digitale
