#!/bin/bash

# Script de démarrage Docker simple pour Nouvelle Ère Digital

echo "🐳 Démarrage Docker Simple - Nouvelle Ère Digital"
echo "================================================="

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

echo "✅ Docker est installé"

# Fonction pour construire l'image
build_image() {
    echo "🔨 Construction de l'image Docker..."
    docker build -f Dockerfile.simple -t nouvelle-ere-digital .
    if [ $? -eq 0 ]; then
        echo "✅ Image construite avec succès"
    else
        echo "❌ Échec de la construction de l'image"
        exit 1
    fi
}

# Fonction pour démarrer le conteneur
start_container() {
    echo "🚀 Démarrage du conteneur..."
    
    # Arrêter le conteneur existant s'il existe
    docker stop nouvelle-ere-digital 2>/dev/null
    docker rm nouvelle-ere-digital 2>/dev/null
    
    # Démarrer le nouveau conteneur
    docker run -d -p 3000:3000 --name nouvelle-ere-digital nouvelle-ere-digital
    
    if [ $? -eq 0 ]; then
        echo "✅ Conteneur démarré avec succès"
        echo "🌐 Application accessible sur: http://localhost:3000"
        echo "📋 Pour voir les logs: docker logs nouvelle-ere-digital"
        echo "🛑 Pour arrêter: docker stop nouvelle-ere-digital"
    else
        echo "❌ Échec du démarrage du conteneur"
        exit 1
    fi
}

# Fonction pour arrêter le conteneur
stop_container() {
    echo "🛑 Arrêt du conteneur..."
    docker stop nouvelle-ere-digital
    docker rm nouvelle-ere-digital
    echo "✅ Conteneur arrêté"
}

# Fonction pour afficher les logs
show_logs() {
    echo "📋 Logs du conteneur:"
    docker logs -f nouvelle-ere-digital
}

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Construire l'image Docker"
    echo "  start     Démarrer le conteneur"
    echo "  stop      Arrêter le conteneur"
    echo "  restart   Redémarrer le conteneur"
    echo "  logs      Afficher les logs"
    echo "  status    Afficher le statut"
    echo "  help      Afficher cette aide"
    echo ""
    echo "Examples:"
    echo "  $0 build     # Construire l'image"
    echo "  $0 start     # Démarrer l'application"
    echo "  $0 logs      # Voir les logs"
}

# Fonction pour afficher le statut
show_status() {
    echo "📊 Statut du conteneur:"
    docker ps -a --filter name=nouvelle-ere-digital
}

# Traitement des arguments
case "${1:-help}" in
    build)
        build_image
        ;;
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        stop_container
        start_container
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac
