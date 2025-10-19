# 🚀 Guide d'Utilisation Docker - Nouvelle Ère Digital

## 📋 Prérequis

1. **Docker Desktop** doit être installé et démarré
2. **Docker Engine** doit être en cours d'exécution

## 🛠️ Construction de l'Image

### Option 1 : Utilisation des Scripts NPM
```bash
# Construire l'image Docker
npm run docker:build

# Démarrer le conteneur
npm run docker:run
```

### Option 2 : Commandes Docker Directes
```bash
# Construire l'image
docker build -t nouvelle-ere-digital .

# Lister les images
docker images

# Démarrer le conteneur
docker run -d -p 3001:3001 --name nouvelle-ere-digital-container nouvelle-ere-digital

# Voir les logs
docker logs nouvelle-ere-digital-container

# Arrêter le conteneur
docker stop nouvelle-ere-digital-container

# Supprimer le conteneur
docker rm nouvelle-ere-digital-container
```

## 🐳 Utilisation avec Docker Compose

```bash
# Construire et démarrer avec docker-compose
docker-compose up --build

# Démarrer en arrière-plan
docker-compose up -d --build

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## 🌐 Accès à l'Application

Une fois le conteneur démarré, l'application sera accessible à :
- **URL locale** : `http://localhost:3001`
- **Port** : 3001 (configurable dans le Dockerfile)

## 🔧 Configuration Docker

### Variables d'Environnement
Le conteneur utilise automatiquement les variables définies dans le fichier `.env` :
- `DATABASE_URL=file:./dev.db`
- `NEXTAUTH_SECRET=test-secret-key-for-development`
- `NEXTAUTH_URL=http://localhost:3001`

### Volumes
- `./dev.db:/app/dev.db` - Base de données SQLite persistante

## 🚨 Dépannage

### Problème : Docker Desktop n'est pas démarré
1. Ouvrir Docker Desktop
2. Attendre que le moteur démarre
3. Réessayer la commande

### Problème : Port 3001 déjà utilisé
```bash
# Vérifier les processus sur le port
netstat -ano | findstr :3001

# Tuer le processus si nécessaire
taskkill /PID <PID> /F

# Ou utiliser un autre port
docker run -p 3002:3001 nouvelle-ere-digital
```

### Problème : Erreurs de build
```bash
# Nettoyer le cache Docker
docker system prune -a

# Rebuilder l'image
docker build --no-cache -t nouvelle-ere-digital .
```

## 📊 Avantages de Docker

✅ **Environnement isolé** : Aucun conflit avec l'environnement système
✅ **Reproductible** : Même résultat sur toutes les machines
✅ **Portable** : Facile à déployer ailleurs
✅ **Sécurisé** : Conteneur sandboxé
✅ **Évolutif** : Facile à scaler avec docker-compose

## 🎯 Prochaines Étapes

1. **Démarrer Docker Desktop**
2. **Construire l'image** : `npm run docker:build`
3. **Tester l'application** : `npm run docker:run`
4. **Vérifier l'accès** : http://localhost:3001

---

**🚀 Votre application Nouvelle Ère Digital est maintenant prête pour le déploiement Docker !**

**Nouvelle Ère Digital** | Guide Docker | 18 Octobre 2025
