# 🚀 COMMENCEZ ICI

## ⚡ Démarrage en 3 Minutes

### 1️⃣ Créer le fichier .env

Dans `apps/web/`, créez un fichier `.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
SESSION_SECRET="dev-secret-change-in-production"
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### 2️⃣ Initialiser

```bash
cd apps/web
npm run db:seed
npm run dev
```

### 3️⃣ Se connecter

Ouvrez: `http://localhost:3001/login`

- Username: `admin`
- Password: `admin123`

---

## ✅ C'est Prêt!

Vous pouvez maintenant:
- ✅ Éditer des pages: `/admin/studio/home`
- ✅ Gérer les médias: `/admin/media`
- ✅ Voir le site: `/home` ou `/services`

---

## 📚 Documentation

Selon votre besoin, consultez:

| Document | Quand l'utiliser |
|----------|------------------|
| **TUTORIAL.md** | 📖 Premier pas détaillé (recommandé pour débuter) |
| **QUICK_START.md** | ⚡ Référence rapide et exemples de code |
| **EDITEUR_VISUEL_README.md** | 📚 Documentation complète des blocs et API |
| **ARCHITECTURE.md** | 🏗️ Comprendre le système technique |
| **INSTALLATION.md** | 🔧 Installation détaillée et dépannage |
| **IMPLEMENTATION_SUMMARY.md** | 📋 Ce qui a été implémenté |

---

## 🎯 Workflow Typique

### Pour modifier une page existante:

1. Allez sur `/admin/studio/{slug}`
2. Modifiez le JSON
3. Cliquez sur "Sauvegarder"
4. Publiez: `npm run publish:snapshot`
5. Vérifiez sur `/{slug}`

### Pour créer une nouvelle page:

1. Allez sur `/admin/studio/ma-nouvelle-page`
2. Définissez le titre et le JSON
3. Sauvegardez
4. Changez le status en "PUBLISHED" (via Prisma Studio)
5. Publiez: `npm run publish:snapshot`
6. Visitez `/ma-nouvelle-page`

---

## 🧩 Structure d'une Page (Copier-Coller)

```json
{
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "title": "Votre Titre",
        "subtitle": "Sous-titre",
        "description": "Description",
        "ctaText": "Bouton",
        "ctaLink": "/lien",
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
    },
    {
      "id": "cta-1",
      "type": "cta",
      "data": {
        "title": "Prêt à démarrer ?",
        "primaryButtonText": "Commencer",
        "primaryButtonLink": "/contact"
      }
    }
  ]
}
```

---

## 🔧 Commandes Essentielles

```bash
# Démarrer le serveur
npm run dev

# Publier les changements
npm run publish:snapshot

# Ouvrir la base de données (interface visuelle)
npm run db:studio

# Réinitialiser tout
rm prisma/dev.db
npm run db:seed
```

---

## ⚠️ Important

### Avant de Publier

1. ✅ Vérifiez que votre JSON est valide
2. ✅ Testez en mode DRAFT d'abord
3. ✅ Assurez-vous que le status est "PUBLISHED"
4. ✅ Publiez un snapshot

### En Cas de Problème

```bash
# 1. Vérifier les logs du serveur
# (dans le terminal où tourne npm run dev)

# 2. Ouvrir Prisma Studio
npm run db:studio

# 3. Vérifier qu'un snapshot actif existe
# Table: PublishSnapshot, colonne: isActive = true
```

---

## 📞 Besoin d'Aide?

1. **Problème d'installation** → `INSTALLATION.md`
2. **Comment faire X ?** → `TUTORIAL.md`
3. **Référence des blocs** → `EDITEUR_VISUEL_README.md`
4. **Comprendre le système** → `ARCHITECTURE.md`

---

## 🎉 Exemples Prêts à l'Emploi

### Page d'accueil complète
→ Consultez `/admin/studio/home` (créée par le seed)

### Page services
→ Consultez `/admin/studio/services` (créée par le seed)

### Templates à copier
→ Voir `QUICK_START.md` section "Exemples"

---

## 🚀 Prochaines Étapes Recommandées

1. **Jour 1**: Suivre le `TUTORIAL.md` pas à pas
2. **Jour 2**: Créer 2-3 pages personnalisées
3. **Jour 3**: Uploader des images et les intégrer
4. **Jour 4**: Personnaliser les styles (couleurs, alignements)
5. **Jour 5**: Planifier les évolutions (drag & drop, etc.)

---

**Nouvelle Ère Digital - Éditeur Visuel v1.0**

🌟 **Status**: ✅ Opérationnel  
📅 **Date**: Octobre 2025  
🎯 **Version**: 1.0.0
