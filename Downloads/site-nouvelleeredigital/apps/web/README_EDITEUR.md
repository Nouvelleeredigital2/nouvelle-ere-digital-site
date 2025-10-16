# 🎨 Éditeur Visuel - Nouvelle Ère Digital

Transformez votre site vitrine en une application dynamique avec éditeur de contenu intégré.

## ✨ Fonctionnalités

- ✅ **Éditeur de pages** - Créez et modifiez des pages via une interface admin
- ✅ **Système de blocs** - Hero, Texte, Image, CTA et extensible
- ✅ **Publication par snapshots** - Publiez plusieurs pages en une fois
- ✅ **Bibliothèque de médias** - Gérez vos images facilement
- ✅ **Authentification** - Interface admin protégée
- ✅ **Base de données SQLite** - Aucune configuration complexe
- ✅ **TypeScript** - Type-safe avec autocomplétion
- ✅ **Next.js 14** - App Router, Server Components, API Routes

## 🚀 Installation Rapide

### 1. Créer le fichier .env

Créez `apps/web/.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
SESSION_SECRET="dev-secret-change-in-production"
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### 2. Initialiser la base de données

```bash
cd apps/web
npm run db:seed
```

### 3. Démarrer le serveur

```bash
npm run dev
```

### 4. Se connecter

- **Admin**: http://localhost:3001/login
- **Username**: `admin`
- **Password**: `admin123`

## 📚 Documentation

- **[INSTALLATION.md](./INSTALLATION.md)** - Guide d'installation détaillé
- **[QUICK_START.md](./QUICK_START.md)** - Démarrage rapide et premiers pas
- **[EDITEUR_VISUEL_README.md](./EDITEUR_VISUEL_README.md)** - Documentation complète
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture technique

## 🎯 Utilisation

### Créer une Nouvelle Page

1. Allez sur `/admin/studio/ma-page`
2. Définissez le titre et la structure JSON
3. Cliquez sur "Sauvegarder"

### Exemple de Structure

```json
{
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "title": "Bienvenue",
        "subtitle": "Innovation",
        "description": "Votre message ici",
        "ctaText": "En savoir plus",
        "ctaLink": "/about",
        "alignment": "center"
      }
    },
    {
      "id": "text-1",
      "type": "text",
      "data": {
        "content": "<h2>Section</h2><p>Contenu...</p>",
        "alignment": "left",
        "maxWidth": "lg"
      }
    }
  ]
}
```

### Publier le Site

```bash
npm run publish:snapshot
```

Ou via l'API:
```bash
POST http://localhost:3001/api/publish
```

## 🧩 Types de Blocs

### Hero Block
Bannière principale avec titre, description et CTA.

### Text Block
Contenu riche avec formatage HTML.

### Image Block
Image avec légende et contrôle du ratio.

### CTA Block
Appel à l'action avec boutons primaire/secondaire.

## 🔧 Commandes

```bash
# Base de données
npm run db:generate      # Générer le client Prisma
npm run db:migrate       # Créer une migration
npm run db:seed          # Peupler avec des données
npm run db:studio        # Ouvrir l'interface visuelle

# Publication
npm run publish:snapshot # Publier un nouveau snapshot

# Développement
npm run dev              # Démarrer le serveur
npm run build            # Build production
npm run start            # Démarrer en production
```

## 📦 Structure

```
apps/web/
├── app/
│   ├── (admin)/         # Interface admin protégée
│   ├── (public)/        # Pages publiques dynamiques
│   └── api/             # Routes API
├── components/blocks/   # Composants de blocs
├── lib/                 # Helpers et utilitaires
├── prisma/              # Schéma et migrations
└── scripts/             # Scripts utilitaires
```

## 🔐 Sécurité

### En Développement
- Identifiants par défaut: `admin` / `admin123`
- Session de 24h dans un cookie httpOnly
- Routes admin protégées par middleware

### En Production
⚠️ **Important** - Avant de déployer:

1. Changez les identifiants admin
2. Utilisez une base de données robuste (PostgreSQL/MySQL)
3. Générez un `SESSION_SECRET` sécurisé
4. Activez HTTPS
5. Configurez le rate limiting

## 🌐 Routes

### Interface Admin
- `/login` - Connexion
- `/admin/studio/[slug]` - Éditeur de page
- `/admin/media` - Bibliothèque de médias

### API
- `POST /api/auth/login` - Authentification
- `GET/POST/PUT/DELETE /api/pages` - Gestion des pages
- `POST /api/upload` - Upload de médias
- `POST /api/publish` - Publication

### Pages Publiques
- `/[slug]` - Toutes les pages dynamiques
- `/home` - Page d'accueil
- `/services` - Page services (exemple)

## 🎨 Personnalisation

### Ajouter un Nouveau Type de Bloc

1. Créez le composant dans `components/blocks/`:
```typescript
export function MyBlock({ data }) {
  return <div>{data.title}</div>;
}
```

2. Ajoutez-le au `BlockRenderer.tsx`:
```typescript
case 'myblock':
  return <MyBlock key={block.id} data={block.data} />;
```

3. Définissez le type dans `lib/types/blocks.ts`

4. Créez un helper dans `lib/utils/blocks.ts`

## 📊 Base de Données

### Tables

- **Page** - Stocke les pages avec leur layout JSON
- **Media** - Bibliothèque de médias
- **PublishSnapshot** - Snapshots du site publié

### Accès Direct

```bash
npm run db:studio
```

Ouvre une interface web pour voir et modifier la base de données.

## 🔄 Workflow

### Mode Édition
1. Créer/modifier des pages dans le studio
2. Pages en mode DRAFT (brouillon)
3. Tester localement

### Mode Publication
1. Passer les pages en PUBLISHED
2. Lancer `npm run publish:snapshot`
3. Un snapshot est créé avec toutes les pages publiées
4. Les pages sont visibles sur le site public

## 🐛 Dépannage

### "Page non trouvée"
- Vérifiez qu'un snapshot existe: `npm run db:studio`
- Créez un snapshot: `npm run publish:snapshot`

### "Client is not generated"
```bash
npm run db:generate
```

### Réinitialiser la base
```bash
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

## 🚀 Prochaines Étapes

L'éditeur actuel est une base solide. Voici les évolutions possibles:

### Court Terme
- [ ] Interface glisser-déposer avec @dnd-kit
- [ ] Éditeur WYSIWYG avec TipTap
- [ ] Prévisualisation avant publication
- [ ] Optimisation d'images avec Sharp

### Moyen Terme
- [ ] Templates de pages prédéfinis
- [ ] Historique et undo/redo avec Zustand
- [ ] Gestion des révisions
- [ ] Multi-utilisateurs avec rôles

### Long Terme
- [ ] Internationalisation (i18n)
- [ ] SEO avancé par page
- [ ] Analytics intégré
- [ ] A/B Testing
- [ ] Migration vers PostgreSQL

## 💡 Exemples d'Utilisation

### Page d'Accueil Complète

Voir le fichier `prisma/seed.ts` pour un exemple complet avec:
- Hero avec call-to-action
- Section de texte avec liste
- Bloc CTA final

### Page Services

Exemple avec plusieurs sections de texte et un CTA de contact.

### Personnalisation Visuelle

Tous les blocs utilisent Tailwind CSS. Modifiez les classes directement dans les composants ou passez des classes via les données:

```json
{
  "type": "cta",
  "data": {
    "backgroundColor": "bg-purple-700",
    "textColor": "text-white"
  }
}
```

## 📞 Support

Pour toute question:
1. Consultez la documentation complète
2. Vérifiez les exemples dans `prisma/seed.ts`
3. Inspectez la base de données avec `npm run db:studio`

## 🏆 Contribution

Ce système est conçu pour être extensible. N'hésitez pas à:
- Ajouter de nouveaux types de blocs
- Améliorer l'interface admin
- Optimiser les performances
- Ajouter des fonctionnalités

---

**Nouvelle Ère Digital** - Votre partenaire en transformation digitale

🌟 **Version**: 1.0.0  
📅 **Date**: Octobre 2025  
👨‍💻 **Stack**: Next.js 14, TypeScript, Prisma, SQLite, Tailwind CSS
