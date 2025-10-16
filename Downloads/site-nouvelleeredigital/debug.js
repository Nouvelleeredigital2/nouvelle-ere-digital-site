// Diagnostic script pour vérifier le système de personas
console.log("🔍 Diagnostic du système de personas...");

// Vérifier si les personas sont importés correctement
try {
  const { personas } = require("./apps/web/personas/index.ts");
  console.log("✅ Personas importés:", personas.length, "personas trouvés");
  console.log("Premier persona:", personas[0]?.name);
} catch (error) {
  console.error("❌ Erreur d'import des personas:", error.message);
}

// Vérifier les variables CSS
try {
  const root = document.documentElement;
  const bgColor = getComputedStyle(root).getPropertyValue("--color-background");
  console.log("✅ Variable CSS --color-background:", bgColor);
} catch (error) {
  console.error("❌ Erreur de lecture des variables CSS:", error.message);
}

console.log("🔍 Diagnostic terminé");
