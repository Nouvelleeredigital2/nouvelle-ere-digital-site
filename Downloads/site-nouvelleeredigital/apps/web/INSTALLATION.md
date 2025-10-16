# 📦 Installation de l'Éditeur Visuel

## Étape par Étape

### 1. Créer le fichier .env

Créez manuellement le fichier `apps/web/.env` avec le contenu suivant:

```bash
# Base de données SQLite
DATABASE_URL="file:./prisma/dev.db"

# Secret pour les sessions (changez en production)
SESSION_SECRET="dev-secret-change-in-production"

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### 2. Générer le Client Prisma

```bash
cd apps/web
npm run db:generate
```

Cette commande génère le client Prisma à partir du schéma.

### 3. Peupler la Base de Données

```bash
npm run db:seed
```

Cette commande va:
- ✅ Créer la base de données SQLite
- ✅ Créer 2 pages d'exemple (home et services)
- ✅ Créer un snapshot publié
- ✅ Afficher les URLs d'accès

### 4. Démarrer le Serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

### 5. Premier Test

#### Se connecter à l'admin
- URL: `http://localhost:3001/login`
- Username: `admin`
- Password: `admin123`

#### Accéder au Studio
- Home: `http://localhost:3001/admin/studio/home`
- Services: `http://localhost:3001/admin/studio/services`
- Médias: `http://localhost:3001/admin/media`

#### Voir les pages publiques
- `http://localhost:3001/home`
- `http://localhost:3001/services`

## 🎉 C'est prêt!

Vous pouvez maintenant:
- ✅ Créer de nouvelles pages via le studio
- ✅ Modifier le contenu des pages existantes
- ✅ Téléverser des médias
- ✅ Publier des snapshots

## 📚 Documentation

- **Guide de démarrage**: `QUICK_START.md`
- **Documentation complète**: `EDITEUR_VISUEL_README.md`

## 🔧 Commandes Utiles

```bash
# Ouvrir Prisma Studio (interface visuelle de la BDD)
npm run db:studio

# Créer un nouveau snapshot
npm run publish:snapshot

# Réinitialiser la base de données
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

## ⚠️ Troubleshooting

### Erreur "Can't reach database server"

Vérifiez que le fichier `.env` existe et contient le bon `DATABASE_URL`.

### Erreur "Client is not generated"

Lancez: `npm run db:generate`

### Les pages ne s'affichent pas

1. Vérifiez qu'un snapshot existe: `npm run db:studio`
2. Créez un snapshot: `npm run publish:snapshot`

---

**Nouvelle Ère Digital** - Éditeur Visuel v1.0
