# 🔧 Guide de Diagnostic - Système de Personas

## 🚀 Démarrage du Serveur
```bash
npm run dev
```
→ Ouvrez `http://localhost:3001`

## 🔍 **Diagnostic des Personas**

### **1. Vérification Console (F12 → Console)**

#### **✅ Messages Normaux Attendues :**
```
✅ Persona chargé depuis localStorage: L'Artiste
✅ Styles appliqués pour le persona: L'Artiste
ℹ️ Aucun persona sauvegardé, utilisation du persona par défaut
```

#### **❌ Erreurs à Corriger :**
- `❌ Erreur lors du chargement du persona depuis localStorage`
- `❌ Persona avec id "xxx" non trouvé`
- `Cannot find name 'usePersona'` (erreur d'import)

### **2. Vérification des Variables CSS**

#### **Outils de Développement → Elements → html**
Vérifiez que les variables CSS sont définies :
```css
--color-background: #0a0a2a
--color-primary: #818cf8
--color-secondary: #fde047
--font-fontFamilySans: "Inter", "system-ui", sans-serif
```

### **3. Test du Sélecteur de Personas**

#### **Sur la Page d'Accueil :**
1. **Localisez le sélecteur** (header, coin supérieur droit)
2. **Cliquez dessus** → Menu déroulant devrait apparaître
3. **Sélectionnez un persona différent**
4. **Observez les changements** de couleurs en temps réel

#### **Sur /demo :**
1. **Allez à** `http://localhost:3001/demo`
2. **Sélectionnez différents personas**
3. **Vérifiez les changements** dans la palette de couleurs

## 🎯 **Résolution des Problèmes Courants**

### **Problème : Sélecteur invisible**
**Solution :**
- Vérifiez que `PersonaNavSelector` est bien dans le header
- Vérifiez l'import dans `AccueilPage.tsx`

### **Problème : Couleurs ne changent pas**
**Solution :**
- Ouvrez les outils de développement
- Vérifiez les variables CSS dans l'élément `<html>`
- Testez avec le persona "L'Artiste" (le plus contrasté)

### **Problème : Erreurs console**
**Solution :**
- Vérifiez les imports dans tous les fichiers
- Assurez-vous que tous les personas sont correctement définis
- Vérifiez que `PersonaProvider` englobe toute l'application

## 📊 **Structure des Fichiers**

```
apps/web/
├── components/
│   ├── context/PersonaProvider.tsx     ✅ Contexte principal
│   ├── ui/PersonaNavSelector.tsx       ✅ Sélecteur navigation
│   └── ui/ServiceCard.tsx              ✅ Composants réutilisables
├── hooks/
│   └── usePersonaClasses.ts           ✅ Hook pour classes CSS
├── lib/
│   └── persona-styles.ts              ✅ Fonctions utilitaires
├── personas/
│   ├── index.ts                       ✅ Export de tous les personas
│   ├── artiste.ts                     ✅ Définition des personas
│   └── nouveaux-personas.ts           ✅ Personas supplémentaires
└── app/
    ├── layout.tsx                     ✅ Provider dans layout
    └── page.tsx                       ✅ Page d'accueil
```

## ✅ **Vérifications Finales**

- **✅ Sélecteur visible** dans le header
- **✅ Changements de couleurs** en temps réel
- **✅ Aucun message d'erreur** dans la console
- **✅ Variables CSS** correctement définies
- **✅ Persistance** entre les sessions

Votre système de personnalisation visuelle est maintenant **100% fonctionnel** ! 🎨✨
