# 🌟 Nouvelle Ère Digital - Site Builder

Un système de gestion de contenu (CMS) moderne et complet avec éditeur visuel, système de personas et API REST.

## ✨ Fonctionnalités

### 🎨 Système de Personas
- **Thèmes adaptatifs** : "Naturel" et "Minimaliste" avec couleurs, typographie et animations personnalisées
- **CSS dynamique** : Variables CSS qui s'adaptent automatiquement au persona sélectionné
- **Contrastes optimisés** : Couleurs foreground calculées pour l'accessibilité

### 🎯 Éditeur Visuel (Studio)
- **Drag & Drop** : Interface intuitive pour créer et organiser le contenu
- **12 types de blocs** : Hero, Text, Image, CTA, RichText, Gallery, Columns, Video, Tabs, Accordion, Form, Icon
- **Sauvegarde automatique** : Auto-save après 30 secondes d'inactivité
- **Historique** : Undo/Redo avec limite de 50 actions
- **Prévisualisation** : Mode preview en temps réel

### 🔧 API REST Complète
- **Pages** : CRUD complet (GET, POST, PUT, PATCH, DELETE)
- **Services** : Gestion du catalogue de services
- **Media** : Upload, gestion et optimisation des médias
- **Blog** : Système de blog avec pagination et filtres
- **Versioning** : Historique des versions avec restauration

### 🌐 Site Public
- **Rendu dynamique** : Pages générées à partir du contenu admin
- **SEO optimisé** : Métadonnées automatiques et sitemap
- **Performance** : Génération statique avec cache intelligent
- **Responsive** : Design adaptatif sur tous les écrans

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Base de données SQLite (incluse)

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/nouvelle-ere-digital.git
cd nouvelle-ere-digital

# Installer les dépendances
cd apps/web
npm install

# Configurer l'environnement
cp .env.example .env

# Initialiser la base de données
npm run db:push
npm run db:seed

# Démarrer le serveur de développement
npm run dev
```

### Accès
- **Site public** : http://localhost:3001
- **Administration** : http://localhost:3001/admin
- **Studio d'édition** : http://localhost:3001/admin/studio

### Identifiants par défaut
- **Email** : `admin@nouvelleeredigital.com`
- **Rôle** : `ADMIN`

## 📁 Structure du Projet

```
apps/web/
├── app/                    # Pages Next.js
│   ├── (admin)/           # Interface d'administration
│   ├── (public)/          # Pages publiques
│   └── api/               # API REST
├── components/            # Composants React
│   ├── blocks/            # Blocs de contenu
│   ├── studio/            # Éditeur visuel
│   └── ui/                # Composants UI
├── lib/                   # Utilitaires et configuration
├── personas/              # Définitions des thèmes
├── prisma/                # Schéma de base de données
└── styles/                # Styles CSS globaux
```

## 🎨 Personas Disponibles

### 🌿 Le Naturel
- **Couleurs** : Verts naturels avec accents dorés
- **Typographie** : Inter + Merriweather (confortable)
- **Style** : Arrondis généreux, ombres douces, espacement spacieux
- **Animations** : Transitions subtiles et fluides

### ⚫ Le Minimaliste
- **Couleurs** : Noir et blanc avec gris sophistiqués
- **Typographie** : Inter + Crimson Text (compact)
- **Style** : Angles droits, pas d'ombres, espacement réduit
- **Animations** : Transitions très subtiles

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev                 # Serveur de développement
npm run build              # Build de production
npm run start              # Serveur de production

# Base de données
npm run db:generate        # Générer le client Prisma
npm run db:push           # Synchroniser le schéma
npm run db:seed           # Données initiales
npm run db:studio         # Interface Prisma Studio

# Utilitaires
npm run lint              # Linter ESLint
npm run typecheck         # Vérification TypeScript
```

## 🌐 Déploiement

### Vercel (Recommandé)
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Docker
```bash
# Build de l'image
docker build -t nouvelle-ere-digital .

# Exécution
docker run -p 3001:3001 nouvelle-ere-digital
```

## 📊 Technologies Utilisées

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, CSS Variables
- **Base de données** : Prisma, SQLite
- **Authentification** : NextAuth.js
- **État** : Zustand
- **Formulaires** : React Hook Form + Zod
- **Éditeur** : TipTap (Rich Text)
- **Drag & Drop** : @dnd-kit
- **Animations** : Framer Motion

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : contact@nouvelleeredigital.com
- **Documentation** : [Wiki du projet](https://github.com/votre-username/nouvelle-ere-digital/wiki)
- **Issues** : [GitHub Issues](https://github.com/votre-username/nouvelle-ere-digital/issues)

## 🎯 Roadmap

- [ ] Système de templates
- [ ] Intégration e-commerce
- [ ] Analytics avancées
- [ ] API GraphQL
- [ ] Multi-langues
- [ ] Mode sombre automatique

---

**Développé avec ❤️ par Nouvelle Ère Digital**