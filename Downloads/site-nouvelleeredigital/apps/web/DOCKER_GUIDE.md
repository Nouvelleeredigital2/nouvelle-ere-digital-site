# 🐳 Guide Docker - Nouvelle Ère Digital

Ce guide vous explique comment utiliser Docker pour développer et déployer votre site Nouvelle Ère Digital.

## 📋 Prérequis

- **Docker Desktop** installé et démarré
- **Docker Compose** (inclus avec Docker Desktop)
- **Git** pour cloner le repository

## 🚀 Démarrage Rapide

### 1. Cloner le projet
```bash
git clone https://github.com/Nouvelleeredigital2/nouvelle-ere-digital-site.git
cd nouvelle-ere-digital-site/apps/web
```

### 2. Démarrer en mode développement
```bash
# Utiliser le script de démarrage
chmod +x docker-start.sh
./docker-start.sh dev

# Ou directement avec Docker Compose
docker-compose -f docker-compose.dev.yml up --build
```

### 3. Accéder à l'application
- **Site** : http://localhost:3001
- **Admin** : http://localhost:3001/admin
- **Prisma Studio** : http://localhost:5555 (optionnel)

## 🔧 Commandes Docker

### Script de démarrage
```bash
./docker-start.sh [COMMAND]
```

**Commandes disponibles :**
- `dev` - Mode développement avec hot reload
- `prod` - Mode production
- `build` - Construire l'image Docker
- `stop` - Arrêter tous les conteneurs
- `clean` - Nettoyer les images et conteneurs
- `logs` - Afficher les logs
- `shell` - Ouvrir un shell dans le conteneur

### Commandes Docker Compose

#### Mode Développement
```bash
# Démarrer avec hot reload
docker-compose -f docker-compose.dev.yml up --build

# Démarrer en arrière-plan
docker-compose -f docker-compose.dev.yml up -d

# Afficher les logs
docker-compose -f docker-compose.dev.yml logs -f

# Arrêter
docker-compose -f docker-compose.dev.yml down
```

#### Mode Production
```bash
# Démarrer en production
docker-compose up --build -d

# Afficher les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

#### Avec Prisma Studio
```bash
# Démarrer avec Prisma Studio
docker-compose -f docker-compose.dev.yml --profile tools up
```

## 🏗️ Structure des Fichiers Docker

```
apps/web/
├── Dockerfile              # Image de production
├── Dockerfile.dev          # Image de développement
├── docker-compose.yml      # Configuration production
├── docker-compose.dev.yml  # Configuration développement
├── .dockerignore           # Fichiers à ignorer
└── docker-start.sh         # Script de démarrage
```

## 🌐 Ports et Services

### Mode Développement
- **3001** - Application Next.js
- **5555** - Prisma Studio (optionnel)

### Mode Production
- **3000** - Application Next.js
- **5432** - PostgreSQL (optionnel)
- **6379** - Redis (optionnel)

## 🔐 Variables d'Environnement

### Fichier .env pour Docker
```env
# Base de données
DATABASE_URL="file:./prisma/dev.db"

# Authentification
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Nouvelle Ère Digital"
```

## 📊 Base de Données

### SQLite (par défaut)
- Base de données persistante dans `./prisma/dev.db`
- Pas de configuration supplémentaire nécessaire

### PostgreSQL (optionnel)
```bash
# Démarrer avec PostgreSQL
docker-compose --profile production up -d
```

## 🚀 Déploiement

### 1. Build de l'image
```bash
docker build -t nouvelle-ere-digital .
```

### 2. Tag pour le registry
```bash
docker tag nouvelle-ere-digital:latest votre-registry/nouvelle-ere-digital:latest
```

### 3. Push vers le registry
```bash
docker push votre-registry/nouvelle-ere-digital:latest
```

### 4. Déploiement sur serveur
```bash
# Sur le serveur
docker pull votre-registry/nouvelle-ere-digital:latest
docker run -d -p 3000:3000 --name nouvelle-ere-digital votre-registry/nouvelle-ere-digital:latest
```

## 🔍 Debugging

### Afficher les logs
```bash
# Logs en temps réel
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f web
```

### Ouvrir un shell dans le conteneur
```bash
# Mode développement
docker-compose -f docker-compose.dev.yml exec web-dev /bin/sh

# Mode production
docker-compose exec web /bin/sh
```

### Inspecter l'image
```bash
docker run -it nouvelle-ere-digital /bin/sh
```

## 🧹 Nettoyage

### Nettoyer les conteneurs arrêtés
```bash
docker container prune
```

### Nettoyer les images non utilisées
```bash
docker image prune
```

### Nettoyer tout
```bash
docker system prune -a
```

### Nettoyer avec le script
```bash
./docker-start.sh clean
```

## ⚠️ Dépannage

### Problème de permissions
```bash
# Sur Linux/Mac
sudo chown -R $USER:$USER .
```

### Problème de port déjà utilisé
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Arrêter le processus
sudo kill -9 PID
```

### Problème de build
```bash
# Nettoyer le cache Docker
docker builder prune

# Rebuild sans cache
docker-compose build --no-cache
```

## 📈 Optimisations

### Multi-stage build
Le Dockerfile utilise un build multi-stage pour :
- Réduire la taille de l'image finale
- Séparer les dépendances de développement et production
- Optimiser les performances

### Cache des layers
- Les dépendances sont installées dans un layer séparé
- Le code source est copié après l'installation des dépendances
- Cela permet de réutiliser le cache lors des modifications de code

## 🎯 Prochaines Étapes

1. **Testez le build** : `./docker-start.sh build`
2. **Démarrez en dev** : `./docker-start.sh dev`
3. **Testez en prod** : `./docker-start.sh prod`
4. **Déployez** : Configurez votre registry et serveur

---

**🐳 Docker est maintenant configuré pour votre projet !**