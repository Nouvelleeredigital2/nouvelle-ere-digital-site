#!/bin/bash

# Script de test Docker final pour Nouvelle Ère Digital

echo "🧪 Test Docker Final - Nouvelle Ère Digital"
echo "============================================"

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

echo "✅ Docker est installé"

# Vérifier si l'image existe
if ! docker image inspect nouvelle-ere-digital &> /dev/null; then
    echo "❌ Image 'nouvelle-ere-digital' non trouvée"
    echo "💡 Construisez d'abord l'image avec:"
    echo "   docker build -f Dockerfile.simple -t nouvelle-ere-digital ."
    exit 1
fi

echo "✅ Image Docker trouvée"

# Arrêter le conteneur existant s'il existe
docker stop nouvelle-ere-digital 2>/dev/null
docker rm nouvelle-ere-digital 2>/dev/null

# Tester le démarrage du conteneur
echo "🚀 Test de démarrage du conteneur..."

# Démarrer le conteneur en arrière-plan
CONTAINER_ID=$(docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital)

if [ $? -eq 0 ]; then
    echo "✅ Conteneur démarré avec l'ID: $CONTAINER_ID"
    
    # Attendre que l'application démarre
    echo "⏳ Attente du démarrage de l'application (20 secondes)..."
    sleep 20
    
    # Tester l'accès à l'application
    echo "🌐 Test d'accès à l'application..."
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Application accessible sur http://localhost:3000"
        echo "🎉 Test réussi !"
        echo ""
        echo "📋 URLs disponibles:"
        echo "   Site: http://localhost:3000"
        echo "   Admin: http://localhost:3000/admin"
        echo ""
        echo "🔧 Commandes utiles:"
        echo "   Logs: docker logs nouvelle-ere-digital"
        echo "   Arrêter: docker stop nouvelle-ere-digital"
        echo "   Supprimer: docker rm nouvelle-ere-digital"
    else
        echo "❌ Application non accessible"
        echo "📋 Logs du conteneur:"
        docker logs nouvelle-ere-digital
    fi
    
    # Demander si on veut garder le conteneur
    echo ""
    read -p "Voulez-vous garder le conteneur en cours d'exécution ? (y/N): " keep_container
    
    if [[ $keep_container =~ ^[Yy]$ ]]; then
        echo "✅ Conteneur conservé. Accédez à http://localhost:3000"
    else
        echo "🛑 Arrêt du conteneur de test..."
        docker stop $CONTAINER_ID
        docker rm $CONTAINER_ID
        echo "✅ Conteneur arrêté"
    fi
    
    echo "✅ Test terminé avec succès!"
    
else
    echo "❌ Échec du démarrage du conteneur"
    exit 1
fi
