# 📤 Guide Git Push - Éditeur Visuel

## 🔍 Étape 1: Vérifier les Changements

```bash
# Se placer dans le bon dossier
cd apps/web

# Voir tous les fichiers modifiés/créés
git status

# Voir les différences en détail
git diff
```

---

## 📝 Étape 2: Préparer le Commit

### Option A: Ajouter Tous les Fichiers de l'Éditeur

```bash
# Depuis apps/web/
git add prisma/
git add lib/prisma.ts lib/session.ts lib/snapshot.ts
git add lib/types/blocks.ts lib/utils/blocks.ts
git add middleware.ts
git add app/\(admin\)/
git add app/\(public\)/
git add app/api/auth/ app/api/pages/ app/api/media/ app/api/upload/ app/api/publish/
git add components/blocks/BlockRenderer.tsx
git add components/blocks/HeroBlock.tsx
git add components/blocks/TextBlock.tsx
git add components/blocks/ImageBlock.tsx
git add components/blocks/CTABlock.tsx
git add scripts/setup.ts scripts/publish-snapshot.ts
git add public/media/.gitkeep
git add .env.example
git add .gitignore
git add *.md
```

### Option B: Ajouter Tout (Plus Simple)

```bash
# Depuis la racine du projet
cd ../..
git add .
```

**⚠️ Attention**: Vérifiez que le `.env` n'est PAS ajouté (doit être dans .gitignore)

```bash
# Vérifier que .env n'est pas ajouté
git status | grep .env
# Ne devrait montrer que .env.example
```

---

## 💾 Étape 3: Créer le Commit

### Message de Commit Suggéré

```bash
git commit -m "feat: Implémentation complète de l'éditeur visuel CMS

🎨 Ajout d'un système complet de gestion de contenu avec éditeur visuel

Infrastructure:
- Base de données Prisma + SQLite (3 tables)
- 7 routes API (auth, pages, media, upload, publish)
- Système de blocs extensible (4 types)
- Pages dynamiques avec route [slug]
- Publication par snapshots

Interface Admin:
- Connexion sécurisée avec middleware
- Studio d'édition de pages
- Bibliothèque de médias

Documentation:
- 14 guides complets (~140 pages)
- Tutorial pas à pas
- Plan d'intégration
- Guide de migration

Stats: 44 fichiers, ~3500 lignes de code, ~11000 lignes de doc

Voir: apps/web/LISEZ_MOI_EN_PREMIER.md pour démarrer"
```

### OU Message Court

```bash
git commit -m "feat: Ajout éditeur visuel CMS complet avec documentation"
```

---

## 🚀 Étape 4: Pousser vers GitHub

### Si c'est votre première fois sur cette branche

```bash
# Vérifier la branche actuelle
git branch

# Si vous n'êtes pas sur une branche feature, créez-en une
git checkout -b feature/editeur-visuel

# Pousser
git push -u origin feature/editeur-visuel
```

### Si vous êtes déjà sur une branche existante

```bash
# Pousser sur la branche actuelle
git push
```

### Si vous voulez pousser directement sur main (déconseillé)

```bash
git push origin main
```

---

## 🔍 Étape 5: Vérifier sur GitHub

1. Allez sur votre repository GitHub
2. Vérifiez que les fichiers sont bien présents
3. Vérifiez que le `.env` n'est PAS commité (sécurité)
4. Vérifiez que `prisma/dev.db` n'est PAS commité

---

## 📋 Checklist Pre-Push

Avant de pusher, vérifiez:

- [ ] Le fichier `.env` n'est PAS dans les fichiers ajoutés
- [ ] Le fichier `prisma/dev.db` n'est PAS ajouté
- [ ] Le dossier `public/media/` ne contient que `.gitkeep` (pas d'images)
- [ ] Le dossier `node_modules/` n'est PAS ajouté
- [ ] Tous les fichiers de documentation sont présents
- [ ] Le message de commit est clair et descriptif

---

## 🎯 Commandes Rapides (Copy-Paste)

### Commande Complète en Une Ligne

```bash
cd "c:\Users\5070 Ti\Downloads\site-nouvelleeredigital" && git add . && git status
```

Vérifiez que tout est OK, puis:

```bash
git commit -m "feat: Implémentation éditeur visuel CMS complet" && git push
```

---

## 🐛 Problèmes Courants

### "No upstream branch"

```bash
git push -u origin nom-de-votre-branche
```

### "Fichier .env ajouté par erreur"

```bash
# Retirer du staging
git reset HEAD .env

# Vérifier qu'il est dans .gitignore
cat .gitignore | grep .env
```

### "Trop de fichiers à commit"

C'est normal! L'éditeur visuel ajoute ~44 fichiers + documentation.

### "Conflit avec .gitignore"

```bash
# Forcer la mise à jour du .gitignore
git add -f .gitignore
git commit -m "update: Enrichissement du .gitignore"
```

---

## 📊 Vérification Post-Push

Après le push, vérifiez sur GitHub:

```
✅ Dossier prisma/ visible
✅ Dossier app/(admin)/ visible
✅ Dossier app/api/ visible
✅ Dossier components/blocks/ visible
✅ Tous les .md de documentation visibles
❌ Fichier .env NON visible (sécurité)
❌ Fichier prisma/dev.db NON visible
```

---

## 🎉 Après le Push

### Créer une Pull Request (Recommandé)

1. Allez sur GitHub
2. Cliquez sur "Compare & pull request"
3. Titre: "Ajout éditeur visuel CMS complet"
4. Description: Copiez depuis `COMMIT_MESSAGE.md`
5. Assignez des reviewers si nécessaire
6. Créez la PR

### Ou Fusionner Directement

Si vous avez poussé sur `main` et que c'est OK, c'est déjà fait!

---

## 📚 Documentation sur GitHub

Après le push, les utilisateurs pourront:

1. **Cloner le repo**
2. **Lire `apps/web/LISEZ_MOI_EN_PREMIER.md`**
3. **Suivre les instructions de démarrage**

---

## 💡 Conseils

### Tag de Version (Optionnel)

Si vous voulez marquer cette version:

```bash
git tag -a v1.0.0-editeur -m "Version 1.0.0 - Éditeur visuel"
git push origin v1.0.0-editeur
```

### Créer un README Spécifique

Un fichier `README_EDITEUR.md` a déjà été créé à la racine pour guider les nouveaux utilisateurs.

---

## 🎯 Résumé des Commandes

```bash
# 1. Ajouter tous les fichiers
git add .

# 2. Vérifier
git status

# 3. Commiter
git commit -m "feat: Implémentation éditeur visuel CMS complet"

# 4. Pousser
git push

# 5. Si erreur "no upstream"
git push -u origin votre-branche
```

---

**Nouvelle Ère Digital - Guide Git Push**

📤 **Prêt**: Pour mise à jour GitHub  
✅ **Fichiers**: ~44 nouveaux fichiers  
📚 **Documentation**: 14 guides
