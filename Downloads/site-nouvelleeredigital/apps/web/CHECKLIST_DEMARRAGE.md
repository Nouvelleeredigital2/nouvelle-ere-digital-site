# ✅ Checklist de Démarrage - Éditeur Visuel

## Avant de Commencer

### 1. Vérifier que tous les fichiers sont présents

- [x] `prisma/schema.prisma` - Schéma de base de données
- [x] `prisma/seed.ts` - Données d'exemple
- [x] `lib/prisma.ts` - Client Prisma
- [x] `lib/session.ts` - Gestion des sessions
- [x] `lib/snapshot.ts` - Helpers snapshots
- [x] `middleware.ts` - Protection routes admin
- [x] `app/(admin)/login/page.tsx` - Page de connexion
- [x] `app/(admin)/admin/studio/[slug]/page.tsx` - Éditeur
- [x] `app/(admin)/admin/media/page.tsx` - Bibliothèque médias
- [x] `app/(public)/[slug]/page.tsx` - Pages dynamiques
- [x] `app/api/auth/login/route.ts` - API login
- [x] `app/api/pages/route.ts` - API pages
- [x] `app/api/upload/route.ts` - API upload
- [x] `app/api/publish/route.ts` - API publish
- [x] `components/blocks/BlockRenderer.tsx` - Renderer
- [x] `components/blocks/HeroBlock.tsx` - Bloc Hero
- [x] `components/blocks/TextBlock.tsx` - Bloc Text
- [x] `components/blocks/ImageBlock.tsx` - Bloc Image
- [x] `components/blocks/CTABlock.tsx` - Bloc CTA
- [x] `public/media/` - Dossier pour les uploads ✅ CRÉÉ

### 2. Configuration Initiale

#### A. Créer le fichier `.env`

```bash
# Copier l'exemple
cp .env.example .env

# Ou créer manuellement avec ce contenu:
DATABASE_URL="file:./prisma/dev.db"
SESSION_SECRET="dev-secret-change-in-production"
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

Statut: [ ] Fait

#### B. Installer les dépendances (si pas déjà fait)

```bash
npm install
```

Statut: [ ] Fait

#### C. Générer le client Prisma

```bash
npm run db:generate
```

Statut: [ ] Fait

#### D. Créer la base de données et peupler

```bash
npm run db:seed
```

Cette commande va:
- ✅ Créer le fichier `prisma/dev.db`
- ✅ Exécuter la migration initiale
- ✅ Créer 2 pages d'exemple (home, services)
- ✅ Créer 1 snapshot publié

Statut: [ ] Fait

#### E. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur: http://localhost:3001

Statut: [ ] Fait

### 3. Premier Test

#### A. Accéder à l'admin

1. Ouvrir: http://localhost:3001/login
2. Se connecter:
   - Username: `admin`
   - Password: `admin123`
3. Vous devriez être redirigé vers: http://localhost:3001/admin/studio/home

Statut: [ ] Fait

#### B. Voir une page dynamique

1. Ouvrir: http://localhost:3001/home
2. Vous devriez voir la page d'accueil créée par le seed
3. Contenu chargé depuis la base de données

Statut: [ ] Fait

#### C. Uploader une image

1. Aller sur: http://localhost:3001/admin/media
2. Cliquer sur "Téléverser des fichiers"
3. Sélectionner une image
4. L'image devrait apparaître dans la grille

Statut: [ ] Fait

### 4. Vérifications Supplémentaires

#### A. Base de données

```bash
# Ouvrir Prisma Studio
npm run db:studio

# Vérifier:
# - Table "Page" contient 2 pages (home, services)
# - Table "PublishSnapshot" contient 1 snapshot (isActive = true)
```

Statut: [ ] Fait

#### B. Fichiers générés

Vérifier que ces fichiers existent:
- [ ] `prisma/dev.db` - Base de données SQLite
- [ ] `prisma/migrations/` - Dossier avec la migration initiale
- [ ] `node_modules/@prisma/client/` - Client Prisma généré

#### C. Logs

Vérifier qu'il n'y a pas d'erreurs dans le terminal où tourne `npm run dev`

Statut: [ ] Fait

---

## ✅ Tout est OK?

Si toutes les cases sont cochées, vous êtes prêt!

### Prochaines Étapes

1. **Lire le tutorial**: `TUTORIAL.md`
2. **Créer votre première page**: Suivre les étapes 1-5 du tutorial
3. **Explorer la documentation**: `INDEX_DOCUMENTATION.md`

---

## 🐛 Problèmes Courants

### "Can't reach database server"

**Solution**: Vérifier que le fichier `.env` existe et contient la bonne `DATABASE_URL`

### "Client is not generated"

**Solution**: 
```bash
npm run db:generate
```

### "Page non trouvée" sur /home

**Solution**: 
```bash
# Vérifier qu'un snapshot existe
npm run db:studio
# Si pas de snapshot:
npm run publish:snapshot
```

### Erreur lors de l'upload d'images

**Solution**: Vérifier que le dossier `public/media/` existe (maintenant créé ✅)

---

## 📞 Besoin d'Aide?

Consultez: `INSTALLATION.md` section "Troubleshooting"

---

**Nouvelle Ère Digital - Checklist de Démarrage**

✅ Tous les fichiers créés  
✅ Dossier media créé  
🔧 Configuration à faire  
🚀 Prêt pour le démarrage
