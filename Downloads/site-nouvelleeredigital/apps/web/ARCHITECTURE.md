# 🏗️ Architecture de l'Éditeur Visuel

## Vue d'Ensemble

L'éditeur visuel transforme votre site vitrine statique en une application dynamique avec gestion de contenu intégrée.

## 📁 Structure du Projet

```
apps/web/
├── app/
│   ├── (admin)/                    # Routes protégées admin
│   │   ├── login/                  # Page de connexion
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── studio/[slug]/      # Éditeur de pages
│   │   │   │   └── page.tsx
│   │   │   └── media/              # Bibliothèque de médias
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (public)/                   # Routes publiques
│   │   ├── [slug]/                 # Pages dynamiques
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   └── api/                        # Routes API
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       ├── pages/
│       │   ├── route.ts
│       │   └── [slug]/route.ts
│       ├── media/route.ts
│       ├── upload/route.ts
│       └── publish/route.ts
│
├── components/
│   └── blocks/                     # Composants de blocs
│       ├── BlockRenderer.tsx
│       ├── HeroBlock.tsx
│       ├── TextBlock.tsx
│       ├── ImageBlock.tsx
│       └── CTABlock.tsx
│
├── lib/
│   ├── prisma.ts                   # Client Prisma
│   ├── session.ts                  # Gestion des sessions
│   ├── snapshot.ts                 # Helpers de snapshots
│   ├── types/
│   │   └── blocks.ts               # Types TypeScript
│   └── utils/
│       └── blocks.ts               # Utilitaires de blocs
│
├── prisma/
│   ├── schema.prisma               # Schéma de base de données
│   ├── seed.ts                     # Données d'exemple
│   └── migrations/                 # Migrations
│
├── scripts/
│   ├── setup.ts                    # Script de configuration
│   └── publish-snapshot.ts         # Script de publication
│
├── middleware.ts                   # Protection des routes admin
├── .env                           # Configuration (à créer)
└── package.json
```

## 🔄 Flux de Données

### 1. Mode Édition (Admin)

```
┌─────────────┐
│   Admin UI  │ (Studio)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  API Routes │ (/api/pages)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Prisma    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   SQLite    │ (Table: Page)
└─────────────┘
```

### 2. Mode Publication

```
┌─────────────┐
│ Admin Click │ "Publish"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ API Publish │ (/api/publish)
└──────┬──────┘
       │
       ├─► Récupère toutes les pages PUBLISHED
       │
       ├─► Désactive les anciens snapshots
       │
       └─► Crée un nouveau snapshot actif
           │
           ▼
      ┌──────────────────┐
      │ PublishSnapshot  │
      │ { siteJson }     │
      └──────────────────┘
```

### 3. Mode Affichage Public

```
┌─────────────┐
│   User      │ Visite /{slug}
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ [slug]/page │ (Server Component)
└──────┬──────┘
       │
       ├─► getActiveSnapshot()
       │
       ├─► Trouve la page par slug
       │
       └─► BlockRenderer
           │
           ▼
      ┌──────────────────┐
      │ Composants Blocs │
      │ (Hero, Text...)  │
      └──────────────────┘
```

## 🗄️ Modèle de Données

### Table: Page

```typescript
{
  id: string          // ID unique (cuid)
  slug: string        // URL de la page
  locale: string      // Langue (défaut: 'fr')
  title: string       // Titre de la page
  layout: string      // JSON des blocs
  status: string      // 'DRAFT' ou 'PUBLISHED'
  createdAt: DateTime
  updatedAt: DateTime
  
  @@unique([slug, locale])
}
```

### Table: Media

```typescript
{
  id: string           // ID unique
  filename: string     // Nom du fichier stocké
  originalName: string // Nom original
  mime: string         // Type MIME
  width?: number       // Largeur
  height?: number      // Hauteur
  focalX?: number      // Point focal X (0-1)
  focalY?: number      // Point focal Y (0-1)
  alt: string          // Texte alternatif
  meta?: string        // Métadonnées JSON
  createdAt: DateTime
}
```

### Table: PublishSnapshot

```typescript
{
  id: string        // ID unique
  createdAt: DateTime
  siteJson: string  // JSON complet du site
  isActive: boolean // Un seul snapshot actif
}
```

## 🔐 Sécurité

### Middleware de Protection

Le fichier `middleware.ts` intercepte toutes les requêtes vers `/admin/*` et vérifie:
1. Présence du cookie de session
2. Validité de la session
3. Expiration (24h)

### Gestion des Sessions

- **Cookie**: `admin_session` (httpOnly, secure en production)
- **Durée**: 24 heures
- **Stockage**: Base64 encodé dans le cookie
- **Validation**: À chaque requête vers `/admin/*`

### API Routes Protégées

Les routes suivantes nécessitent une authentification:
- `POST /api/pages`
- `PUT /api/pages`
- `DELETE /api/pages`
- `POST /api/upload`
- `POST /api/publish`

## 🧩 Système de Blocs

### Architecture des Blocs

Chaque bloc est un objet JSON avec:

```typescript
{
  id: string,      // Identifiant unique
  type: string,    // Type de bloc ('hero', 'text', etc.)
  data: object     // Données spécifiques au bloc
}
```

### Extensibilité

Pour ajouter un nouveau type de bloc:

1. **Créer le composant** dans `/components/blocks/`:
```typescript
// MyNewBlock.tsx
export function MyNewBlock({ data }: { data: MyNewBlockData }) {
  return <div>...</div>;
}
```

2. **Ajouter au BlockRenderer**:
```typescript
case 'mynewblock':
  return <MyNewBlock key={block.id} data={block.data} />;
```

3. **Définir le type** dans `/lib/types/blocks.ts`:
```typescript
export interface MyNewBlockData {
  // ... propriétés
}
```

4. **Créer un helper** dans `/lib/utils/blocks.ts`:
```typescript
export function createMyNewBlock(overrides?: Partial<MyNewBlockData>) {
  return {
    id: `mynewblock-${Date.now()}`,
    type: 'mynewblock',
    data: { ...defaults, ...overrides },
  };
}
```

## 🚀 Déploiement

### Variables d'Environnement (Production)

```bash
DATABASE_URL="file:./prisma/prod.db"
SESSION_SECRET="long-random-string-here"
NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr
NODE_ENV=production
```

### Checklist de Déploiement

- [ ] Changer les identifiants admin
- [ ] Utiliser une vraie base de données (PostgreSQL/MySQL)
- [ ] Générer un `SESSION_SECRET` sécurisé
- [ ] Configurer HTTPS
- [ ] Activer la validation CSRF
- [ ] Limiter les taux de requêtes (rate limiting)
- [ ] Sauvegarder régulièrement la base de données
- [ ] Configurer les logs d'erreur
- [ ] Optimiser les images avec Sharp
- [ ] Mettre en place un CDN pour `/media`

## 📊 Performance

### Optimisations Implémentées

- ✅ **Server Components**: Rendu côté serveur pour les pages publiques
- ✅ **Static Generation**: `generateStaticParams()` pour les pages
- ✅ **JSON Efficient**: Layout stocké en JSON pour parsing rapide
- ✅ **Snapshots**: Évite les requêtes DB multiples

### Optimisations Futures

- ⏭️ **ISR (Incremental Static Regeneration)**: Revalider après publication
- ⏭️ **Image Optimization**: Utiliser `next/image` avec Sharp
- ⏭️ **Caching**: Redis pour les snapshots actifs
- ⏭️ **CDN**: CloudFlare/Vercel Edge pour les assets

## 🔧 Maintenance

### Commandes Utiles

```bash
# Voir la structure de la base de données
npm run db:studio

# Créer une migration
npm run db:migrate

# Sauvegarder la base de données
cp prisma/dev.db prisma/backup-$(date +%Y%m%d).db

# Restaurer depuis un snapshot
# Via Prisma Studio ou script custom
```

### Monitoring

Surveillez:
- Taille de la base de données
- Nombre de snapshots (nettoyer les anciens)
- Taille du dossier `/public/media`
- Temps de réponse des API
- Erreurs 500 dans les logs

## 🎯 Roadmap

### Phase 1 (Actuel)
- ✅ CRUD de pages via JSON
- ✅ Système de blocs basique
- ✅ Publication par snapshots
- ✅ Authentification simple

### Phase 2
- ⏭️ Interface glisser-déposer (@dnd-kit)
- ⏭️ Éditeur WYSIWYG (TipTap)
- ⏭️ Prévisualisation en temps réel
- ⏭️ Gestion des révisions (historique)

### Phase 3
- ⏭️ Templates de pages
- ⏭️ Bibliothèque de composants
- ⏭️ Thèmes personnalisables
- ⏭️ Multi-utilisateurs et permissions

### Phase 4
- ⏭️ Internationalisation (i18n)
- ⏭️ SEO avancé
- ⏭️ Analytics intégré
- ⏭️ A/B Testing

---

**Nouvelle Ère Digital** - Architecture v1.0
