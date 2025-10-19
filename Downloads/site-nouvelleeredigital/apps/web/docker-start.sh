#!/bin/bash

# Script de démarrage Docker pour Nouvelle Ère Digital

echo "🐳 Démarrage de Nouvelle Ère Digital avec Docker"
echo "================================================"

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé."
    exit 1
fi

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev       Démarrer en mode développement"
    echo "  prod      Démarrer en mode production"
    echo "  build     Construire l'image Docker"
    echo "  stop      Arrêter tous les conteneurs"
    echo "  clean     Nettoyer les images et conteneurs"
    echo "  logs      Afficher les logs"
    echo "  shell     Ouvrir un shell dans le conteneur"
    echo "  help      Afficher cette aide"
    echo ""
    echo "Examples:"
    echo "  $0 dev     # Démarre en mode développement"
    echo "  $0 prod    # Démarre en mode production"
    echo "  $0 build   # Construit l'image"
}

# Fonction pour démarrer en développement
start_dev() {
    echo "🚀 Démarrage en mode développement..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Fonction pour démarrer en production
start_prod() {
    echo "🚀 Démarrage en mode production..."
    docker-compose up --build -d
    echo "✅ Application démarrée sur http://localhost:3000"
}

# Fonction pour construire l'image
build_image() {
    echo "🔨 Construction de l'image Docker..."
    docker build -t nouvelle-ere-digital .
    echo "✅ Image construite avec succès"
}

# Fonction pour arrêter les conteneurs
stop_containers() {
    echo "🛑 Arrêt des conteneurs..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Conteneurs arrêtés"
}

# Fonction pour nettoyer
clean_docker() {
    echo "🧹 Nettoyage des images et conteneurs..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo "✅ Nettoyage terminé"
}

# Fonction pour afficher les logs
show_logs() {
    echo "📋 Affichage des logs..."
    docker-compose logs -f
}

# Fonction pour ouvrir un shell
open_shell() {
    echo "🐚 Ouverture d'un shell dans le conteneur..."
    docker-compose exec web /bin/sh
}

# Traitement des arguments
case "${1:-help}" in
    dev)
        start_dev
        ;;
    prod)
        start_prod
        ;;
    build)
        build_image
        ;;
    stop)
        stop_containers
        ;;
    clean)
        clean_docker
        ;;
    logs)
        show_logs
        ;;
    shell)
        open_shell
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
