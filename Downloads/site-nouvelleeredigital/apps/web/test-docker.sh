#!/bin/bash

# Script de test Docker pour Nouvelle Ère Digital

echo "🧪 Test Docker - Nouvelle Ère Digital"
echo "====================================="

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

# Vérifier si l'image existe
if ! docker image inspect nouvelle-ere-digital &> /dev/null; then
    echo "❌ Image 'nouvelle-ere-digital' non trouvée"
    echo "💡 Exécutez d'abord: docker build -t nouvelle-ere-digital ."
    exit 1
fi

echo "✅ Image Docker trouvée"

# Tester le démarrage du conteneur
echo "🚀 Test de démarrage du conteneur..."

# Démarrer le conteneur en arrière-plan
CONTAINER_ID=$(docker run -d -p 3000:3000 --name test-nouvelle-ere-digital nouvelle-ere-digital)

if [ $? -eq 0 ]; then
    echo "✅ Conteneur démarré avec l'ID: $CONTAINER_ID"
    
    # Attendre que l'application démarre
    echo "⏳ Attente du démarrage de l'application..."
    sleep 10
    
    # Tester l'accès à l'application
    echo "🌐 Test d'accès à l'application..."
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Application accessible sur http://localhost:3000"
    else
        echo "❌ Application non accessible"
    fi
    
    # Afficher les logs
    echo "📋 Logs du conteneur:"
    docker logs $CONTAINER_ID
    
    # Arrêter et supprimer le conteneur de test
    echo "🛑 Arrêt du conteneur de test..."
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
    
    echo "✅ Test terminé avec succès!"
    
else
    echo "❌ Échec du démarrage du conteneur"
    exit 1
fi
