# 🐳 Guide de Démarrage Docker Rapide

## ⚡ Démarrage en 3 étapes

### 1. Construire l'image
```bash
cd apps/web
docker build -f Dockerfile.simple -t nouvelle-ere-digital .
```

### 2. Démarrer l'application
```bash
docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital
```

### 3. Accéder à l'application
- **Site** : http://localhost:3000
- **Admin** : http://localhost:3000/admin

## 🔧 Commandes utiles

### Gestion du conteneur
```bash
# Voir les logs
docker logs nouvelle-ere-digital

# Arrêter le conteneur
docker stop nouvelle-ere-digital

# Supprimer le conteneur
docker rm nouvelle-ere-digital

# Redémarrer
docker restart nouvelle-ere-digital
```

### Gestion de l'image
```bash
# Voir les images
docker images

# Supprimer l'image
docker rmi nouvelle-ere-digital

# Construire sans cache
docker build --no-cache -f Dockerfile.simple -t nouvelle-ere-digital .
```

## 🚨 Dépannage

### Problème de port
```bash
# Vérifier les ports utilisés
netstat -an | findstr :3000

# Arrêter le processus
taskkill /PID <PID> /F
```

### Problème de build
```bash
# Nettoyer Docker
docker system prune -f

# Rebuild complet
docker build --no-cache -f Dockerfile.simple -t nouvelle-ere-digital .
```

### Problème de conteneur
```bash
# Voir tous les conteneurs
docker ps -a

# Supprimer tous les conteneurs arrêtés
docker container prune

# Redémarrer Docker Desktop
```

## 📊 Statut de l'application

### Vérifier que l'application fonctionne
```bash
# Test de connectivité
curl http://localhost:3000

# Ou ouvrir dans le navigateur
start http://localhost:3000
```

### Logs en temps réel
```bash
docker logs -f nouvelle-ere-digital
```

## 🎯 Prochaines étapes

1. **Testez l'application** : http://localhost:3000
2. **Connectez-vous à l'admin** : http://localhost:3000/admin
3. **Créez du contenu** : Utilisez l'éditeur Studio
4. **Déployez en production** : Configurez votre serveur

---

**🐳 Docker est maintenant prêt !**
