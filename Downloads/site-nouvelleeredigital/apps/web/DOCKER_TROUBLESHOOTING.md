# 🚨 Guide de Dépannage Docker

## 🔍 Problèmes Courants et Solutions

### **1. Erreur TypeScript : Cannot read file '/tsconfig.base.json'**

**Problème** : Next.js cherche un fichier `tsconfig.base.json` qui n'existe pas.

**Solution** :
```bash
# Vérifier que tsconfig.docker.json existe
ls tsconfig.docker.json

# Le Dockerfile doit copier ce fichier AVANT le code source
# Ordre correct dans Dockerfile.simple :
# 1. COPY tsconfig.docker.json ./tsconfig.json
# 2. COPY . ./
```

### **2. Module not found: Can't resolve '@/components/ui/card'**

**Problème** : Les composants UI ne sont pas trouvés.

**Solutions** :
```bash
# Vérifier que les composants existent
ls components/ui/Card.tsx
ls components/ui/Badge.tsx
ls components/ui/Input.tsx

# Vérifier le tsconfig.json
cat tsconfig.json | grep paths
```

### **3. npm ci command can only install with an existing package-lock.json**

**Problème** : `npm ci` nécessite un `package-lock.json`.

**Solution** : Utiliser `npm install` dans le Dockerfile.

### **4. Build failed because of webpack errors**

**Problème** : Erreurs de compilation.

**Solutions** :
```bash
# Test de build local d'abord
npm run build

# Vérifier les erreurs TypeScript
npm run typecheck

# Nettoyer le cache
rm -rf .next
npm run build
```

### **5. Dockerfile.simple: no such file or directory**

**Problème** : Mauvais répertoire.

**Solution** :
```bash
# S'assurer d'être dans apps/web
cd apps/web
ls Dockerfile.simple

# Construire depuis le bon répertoire
docker build -f Dockerfile.simple -t nouvelle-ere-digital .
```

## 🔧 Commandes de Diagnostic

### **Vérification complète**
```bash
# Rendre le script exécutable
chmod +x docker-diagnostic.sh

# Lancer le diagnostic
./docker-diagnostic.sh
```

### **Vérifications manuelles**
```bash
# Vérifier les fichiers essentiels
ls -la package.json tsconfig.docker.json Dockerfile.simple

# Vérifier les composants UI
ls components/ui/Card.tsx Badge.tsx Input.tsx

# Vérifier Docker
docker --version
docker info

# Vérifier les images
docker images | grep nouvelle-ere-digital
```

## 🛠️ Solutions par Étapes

### **Étape 1 : Préparation**
```bash
cd apps/web
npm install
npm run build  # Test local
```

### **Étape 2 : Build Docker**
```bash
docker build -f Dockerfile.simple -t nouvelle-ere-digital .
```

### **Étape 3 : Test du conteneur**
```bash
docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital
docker logs nouvelle-ere-digital
```

### **Étape 4 : Vérification**
```bash
curl http://localhost:3000
# Ou ouvrir http://localhost:3000 dans le navigateur
```

## 🧹 Nettoyage

### **En cas de problème**
```bash
# Arrêter et supprimer le conteneur
docker stop nouvelle-ere-digital
docker rm nouvelle-ere-digital

# Supprimer l'image
docker rmi nouvelle-ere-digital

# Nettoyer Docker
docker system prune -f

# Rebuild complet
docker build --no-cache -f Dockerfile.simple -t nouvelle-ere-digital .
```

## 📋 Checklist de Dépannage

- [ ] Être dans le répertoire `apps/web`
- [ ] `package.json` existe
- [ ] `tsconfig.docker.json` existe
- [ ] `Dockerfile.simple` existe
- [ ] Composants UI existent (`Card.tsx`, `Badge.tsx`, `Input.tsx`)
- [ ] Docker fonctionne (`docker info`)
- [ ] Build local fonctionne (`npm run build`)
- [ ] Pas de conteneur existant (`docker ps -a`)

## 🆘 En Cas d'Urgence

### **Reset complet**
```bash
# Arrêter tout
docker stop $(docker ps -q)
docker rm $(docker ps -aq)

# Supprimer les images
docker rmi $(docker images -q)

# Nettoyer tout
docker system prune -a -f

# Redémarrer Docker Desktop
# Puis recommencer depuis le début
```

---

**🔧 Avec ce guide, vous devriez pouvoir résoudre tous les problèmes Docker !**
