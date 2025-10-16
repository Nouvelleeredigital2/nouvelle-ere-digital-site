# 🎭 Guide de Test - Système de Personas

## 🚀 Démarrage du Serveur

```bash
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:3001`

## ✅ Vérifications à Effectuer

### 1. **Vérification du PersonaDebugger**

- Ouvrez `http://localhost:3001/`
- En bas à droite, vous devriez voir un petit débogueur noir
- Il devrait afficher : "Persona: L'Artiste" et "Total: X personas"

### 2. **Test de Sélection de Persona**

- Cliquez sur les cartes de personas en bas de la page d'accueil
- Le débogueur devrait se mettre à jour avec le nouveau persona sélectionné
- Les couleurs de la page devraient changer en temps réel

### 3. **Vérification des Variables CSS**

- Ouvrez les outils de développement (F12)
- Allez dans l'onglet "Elements" > "html"
- Dans la section "Computed" ou "Styles", cherchez les variables CSS :
  - `--color-background`
  - `--color-foreground`
  - `--color-primary`
  - `--color-secondary`

### 4. **Test de Persistance**

- Sélectionnez un persona différent
- Rechargez la page (F5)
- Le même persona devrait rester sélectionné
- Les couleurs devraient persister

## 🎨 **Personas à Tester**

1. **L'Artiste** (par défaut) - Bleu nuit profond avec violet électrique
2. **L'Architecte** - Palette professionnelle sobre
3. **L'Innovateur** - Couleurs high-tech vives

## 🔍 **Diagnostic si Ça Ne Marche Pas**

### **Vérifier la Console (F12 > Console)**

- Pas d'erreurs JavaScript
- Messages de succès lors de la sélection

### **Vérifier le localStorage**

```javascript
// Dans la console du navigateur
console.log(localStorage.getItem("creative-persona-v1"));
```

### **Vérifier les Variables CSS**

```javascript
// Dans la console du navigateur
console.log(getComputedStyle(document.documentElement).getPropertyValue("--color-primary"));
```

## 📱 **Tests sur Mobile**

- Ouvrez les outils de développement
- Activez le mode responsive
- Testez la sélection de personas sur différents appareils

## ⚡ **Résolution Rapide**

Si les changements ne sont pas visibles :

1. **Vérifiez que le serveur est démarré** : `http://localhost:3001`
2. **Testez la page sandbox** : `http://localhost:3001/sandbox`
3. **Vérifiez que le débogueur affiche les changements**
4. **Inspectez les variables CSS dans le navigateur**

Le système de personnalisation visuelle devrait maintenant fonctionner parfaitement ! 🎨✨
