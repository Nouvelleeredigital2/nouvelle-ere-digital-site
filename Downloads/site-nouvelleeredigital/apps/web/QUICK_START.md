# 🚀 Guide de Démarrage Rapide - Éditeur Visuel

## Étapes d'Installation

### 1. Configuration de l'environnement

Créez un fichier `.env` dans `apps/web/` avec le contenu suivant:

```bash
# Base de données SQLite
DATABASE_URL="file:./dev.db"

# Secret pour les sessions (changez en production)
SESSION_SECRET="votre-secret-change-moi-en-production"

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Initialisation de la base de données

La base de données a déjà été créée lors de la migration. Pour peupler avec des données d'exemple:

```bash
npm run db:seed
```

Cette commande va créer:
- ✅ Une page d'accueil (`/home`)
- ✅ Une page services (`/services`)
- ✅ Un snapshot publié du site

### 3. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

### 4. Premier Test

#### A. Se connecter à l'admin

1. Allez sur: `http://localhost:3001/login`
2. Connectez-vous avec:
   - Username: `admin`
   - Password: `admin123`

#### B. Accéder au Studio

Après connexion, allez sur:
- `http://localhost:3001/admin/studio/home` - Éditer la page d'accueil
- `http://localhost:3001/admin/studio/services` - Éditer la page services
- `http://localhost:3001/admin/media` - Gérer les médias

#### C. Voir les pages publiques

- `http://localhost:3001/home` - Page d'accueil
- `http://localhost:3001/services` - Page services

## 📝 Créer une Nouvelle Page

### Via le Studio (interface simplifiée)

1. Allez sur `/admin/studio/ma-nouvelle-page`
2. Modifiez le titre: "Ma Nouvelle Page"
3. Dans le champ JSON, collez:

```json
{
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "title": "Ma Nouvelle Page",
        "subtitle": "Un sous-titre accrocheur",
        "description": "Une description de la page",
        "ctaText": "En savoir plus",
        "ctaLink": "/contact",
        "alignment": "center"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "data": {
        "content": "<h2>Section de contenu</h2><p>Votre contenu ici...</p>",
        "alignment": "left",
        "maxWidth": "lg"
      }
    }
  ]
}
```

4. Cliquez sur "Sauvegarder"
5. La page est en mode DRAFT (brouillon)

### Publier la Page

1. Modifiez le JSON pour ajouter le statut PUBLISHED:
   
   **Note**: Actuellement, vous devez modifier manuellement la page dans la base de données ou via l'API pour changer le statut.

2. Publiez le site:

```bash
# Via l'API (avec curl ou Postman)
POST http://localhost:3001/api/publish
```

Ou utilisez le script de publication:

```bash
npm run publish:snapshot
```

3. Votre page est maintenant visible sur `/ma-nouvelle-page`

## 🎨 Personnaliser les Blocs

### Exemple: Hero avec Image de Fond

```json
{
  "id": "hero-custom",
  "type": "hero",
  "data": {
    "title": "Titre Personnalisé",
    "subtitle": "Innovation",
    "description": "Une description engageante",
    "ctaText": "Découvrir",
    "ctaLink": "/about",
    "backgroundImage": "/media/mon-image.jpg",
    "alignment": "left"
  }
}
```

### Exemple: Bloc de Texte Riche

```json
{
  "id": "text-rich",
  "type": "text",
  "data": {
    "content": "<h2 class='text-4xl font-bold'>Titre Important</h2><p class='text-lg mt-4'>Paragraphe avec <strong>texte en gras</strong> et <em>italique</em>.</p><ul class='list-disc pl-6 mt-4'><li>Point 1</li><li>Point 2</li><li>Point 3</li></ul>",
    "alignment": "center",
    "maxWidth": "lg",
    "paddingY": "lg"
  }
}
```

### Exemple: Image avec Légende

```json
{
  "id": "image-1",
  "type": "image",
  "data": {
    "src": "/media/mon-image.jpg",
    "alt": "Description de l'image",
    "caption": "Légende de l'image",
    "layout": "contained",
    "aspectRatio": "16/9"
  }
}
```

## 🗄️ Commandes Utiles

```bash
# Générer le client Prisma après modification du schéma
npm run db:generate

# Créer une nouvelle migration
npm run db:migrate

# Ouvrir Prisma Studio (interface visuelle de la BDD)
npm run db:studio

# Peupler la base avec des données d'exemple
npm run db:seed

# Publier un snapshot
npm run publish:snapshot
```

## 🔧 Dépannage

### La page ne s'affiche pas

1. Vérifiez que la page est publiée (status: "PUBLISHED")
2. Vérifiez qu'un snapshot a été créé:
   ```bash
   npm run db:studio
   ```
   Allez dans PublishSnapshot et vérifiez qu'il existe un snapshot avec `isActive = true`

### Erreur "Page non trouvée"

1. Vérifiez que le slug est correct
2. Vérifiez que la page existe dans la base de données
3. Vérifiez que la page est incluse dans le snapshot actif

### Erreur de connexion admin

1. Vérifiez que vous utilisez les bons identifiants:
   - Username: `admin`
   - Password: `admin123`
2. Vérifiez que le cookie de session n'est pas expiré (24h)

## 📚 Ressources

- **Documentation complète**: `EDITEUR_VISUEL_README.md`
- **Structure des blocs**: Voir la section "Types de Blocs" dans le README
- **API Routes**: Voir la section "Routes API" dans le README

## 🎯 Prochaines Étapes

1. ✅ Créer vos premières pages
2. ✅ Téléverser des images dans la bibliothèque de médias
3. ✅ Personnaliser les blocs selon vos besoins
4. ⏭️ Implémenter l'interface glisser-déposer (prochaine version)
5. ⏭️ Ajouter un éditeur WYSIWYG pour le texte riche
6. ⏭️ Créer des templates de pages

---

**Besoin d'aide?** Consultez `EDITEUR_VISUEL_README.md` pour la documentation complète.
