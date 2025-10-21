#!/bin/bash

# Script de test des imports UI pour Docker

echo "🧪 Test des imports UI - Nouvelle Ère Digital"
echo "=============================================="

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ package.json non trouvé"
    echo "💡 Assurez-vous d'être dans apps/web"
    exit 1
fi

echo "✅ Dans le bon répertoire"

# Vérifier les fichiers de re-export
echo "📋 Vérification des fichiers de re-export:"

if [ -f "components/ui/card.tsx" ]; then
    echo "✅ components/ui/card.tsx"
else
    echo "❌ components/ui/card.tsx manquant"
fi

if [ -f "components/ui/badge.tsx" ]; then
    echo "✅ components/ui/badge.tsx"
else
    echo "❌ components/ui/badge.tsx manquant"
fi

if [ -f "components/ui/input.tsx" ]; then
    echo "✅ components/ui/input.tsx"
else
    echo "❌ components/ui/input.tsx manquant"
fi

# Vérifier les composants originaux
echo ""
echo "📋 Vérification des composants originaux:"

if [ -f "components/ui/Card.tsx" ]; then
    echo "✅ components/ui/Card.tsx"
else
    echo "❌ components/ui/Card.tsx manquant"
fi

if [ -f "components/ui/Badge.tsx" ]; then
    echo "✅ components/ui/Badge.tsx"
else
    echo "❌ components/ui/Badge.tsx manquant"
fi

if [ -f "components/ui/Input.tsx" ]; then
    echo "✅ components/ui/Input.tsx"
else
    echo "❌ components/ui/Input.tsx manquant"
fi

# Test de build local
echo ""
echo "🧪 Test de build local:"

if command -v npm &> /dev/null; then
    echo "✅ npm disponible"
    
    # Test de build
    echo "🔨 Test de build Next.js..."
    if npm run build > /dev/null 2>&1; then
        echo "✅ Build local réussi"
        echo "🎉 Les imports UI fonctionnent !"
    else
        echo "❌ Build local échoué"
        echo "💡 Vérifiez les erreurs avec: npm run build"
    fi
else
    echo "❌ npm non disponible"
fi

echo ""
echo "🎯 Si le build local fonctionne, le build Docker devrait aussi fonctionner !"
