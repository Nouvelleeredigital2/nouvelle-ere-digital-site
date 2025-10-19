# 🐳 Docker - Démarrage Ultra Simple

## ⚡ En 2 commandes seulement !

### 1. Construire l'image
```bash
cd apps/web
docker build -f Dockerfile.simple -t nouvelle-ere-digital .
```

### 2. Démarrer l'application
```bash
docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital
```

## 🌐 Accéder à l'application

- **Site** : http://localhost:3000
- **Admin** : http://localhost:3000/admin

## 🔧 Commandes essentielles

```bash
# Voir les logs
docker logs nouvelle-ere-digital

# Arrêter
docker stop nouvelle-ere-digital

# Supprimer
docker rm nouvelle-ere-digital

# Redémarrer
docker restart nouvelle-ere-digital
```

## 🧪 Test automatique

```bash
# Rendre le script exécutable
chmod +x test-docker-final.sh

# Lancer le test
./test-docker-final.sh
```

## 🚨 Si ça ne marche pas

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

---

**🐳 C'est tout ! Votre application est maintenant dans Docker !**
