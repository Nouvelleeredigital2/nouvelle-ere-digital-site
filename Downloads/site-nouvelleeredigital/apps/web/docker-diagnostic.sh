#!/bin/bash

# Script de diagnostic Docker pour Nouvelle Ère Digital

echo "🔍 Diagnostic Docker - Nouvelle Ère Digital"
echo "============================================"

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

echo "✅ Docker est installé"

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "Dockerfile.simple" ]; then
    echo "❌ Dockerfile.simple non trouvé"
    echo "💡 Assurez-vous d'être dans le répertoire apps/web"
    exit 1
fi

echo "✅ Dockerfile.simple trouvé"

# Vérifier les fichiers essentiels
echo "📋 Vérification des fichiers essentiels:"

if [ -f "package.json" ]; then
    echo "✅ package.json"
else
    echo "❌ package.json manquant"
fi

if [ -f "tsconfig.docker.json" ]; then
    echo "✅ tsconfig.docker.json"
else
    echo "❌ tsconfig.docker.json manquant"
fi

if [ -f "next.config.mjs" ]; then
    echo "✅ next.config.mjs"
else
    echo "❌ next.config.mjs manquant"
fi

if [ -d "components/ui" ]; then
    echo "✅ components/ui/"
    echo "   Composants trouvés:"
    ls components/ui/*.tsx | head -5 | sed 's/^/   - /'
else
    echo "❌ components/ui/ manquant"
fi

if [ -d "prisma" ]; then
    echo "✅ prisma/"
else
    echo "❌ prisma/ manquant"
fi

# Vérifier les dépendances
echo ""
echo "📦 Vérification des dépendances:"

if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json trouvé"
else
    echo "⚠️  package-lock.json manquant (normal, utilise npm install)"
fi

# Vérifier les variables d'environnement
echo ""
echo "🔐 Vérification des variables d'environnement:"

if [ -f ".env.local" ]; then
    echo "✅ .env.local trouvé"
else
    echo "⚠️  .env.local manquant (peut causer des problèmes)"
fi

# Test de build local
echo ""
echo "🧪 Test de build local:"

if command -v npm &> /dev/null; then
    echo "✅ npm disponible"
    
    # Vérifier si node_modules existe
    if [ -d "node_modules" ]; then
        echo "✅ node_modules trouvé"
        
        # Test de build
        echo "🔨 Test de build Next.js..."
        if npm run build > /dev/null 2>&1; then
            echo "✅ Build local réussi"
        else
            echo "❌ Build local échoué"
            echo "💡 Vérifiez les erreurs avec: npm run build"
        fi
    else
        echo "⚠️  node_modules manquant"
        echo "💡 Installez les dépendances avec: npm install"
    fi
else
    echo "❌ npm non disponible"
fi

# Vérifier Docker
echo ""
echo "🐳 Vérification Docker:"

if docker info > /dev/null 2>&1; then
    echo "✅ Docker fonctionne"
    
    # Vérifier les images existantes
    if docker images | grep -q "nouvelle-ere-digital"; then
        echo "✅ Image nouvelle-ere-digital trouvée"
    else
        echo "⚠️  Image nouvelle-ere-digital non trouvée"
    fi
    
    # Vérifier les conteneurs
    if docker ps -a | grep -q "nouvelle-ere-digital"; then
        echo "⚠️  Conteneur nouvelle-ere-digital existe déjà"
        echo "💡 Arrêtez-le avec: docker stop nouvelle-ere-digital"
    fi
else
    echo "❌ Docker ne fonctionne pas"
fi

echo ""
echo "🎯 Recommandations:"
echo "1. Assurez-vous d'être dans apps/web/"
echo "2. Vérifiez que tous les fichiers essentiels sont présents"
echo "3. Testez le build local d'abord: npm run build"
echo "4. Construisez l'image Docker: docker build -f Dockerfile.simple -t nouvelle-ere-digital ."
echo "5. Démarrez le conteneur: docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital"
