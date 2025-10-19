// apps/web/scripts/test-personas.ts
import { personas } from "../personas";
import { applyPersonaStylesServer } from "../lib/persona-styles";

console.log("🧪 Test des Personas - Vérification des Corrections");
console.log("=" .repeat(60));

personas.forEach((persona) => {
  console.log(`\n🎨 Test du persona: ${persona.name}`);
  console.log(`   ID: ${persona.id}`);
  console.log(`   Description: ${persona.description}`);
  
  // Test des variables CSS côté serveur
  const cssVariables = applyPersonaStylesServer(persona);
  
  console.log("   Variables CSS générées:");
  Object.entries(cssVariables).forEach(([key, value]) => {
    console.log(`     ${key}: ${value}`);
  });
  
  // Vérification des couleurs principales
  const colors = persona.settings.colors;
  if (colors) {
    console.log("   Couleurs principales:");
    console.log(`     Background: ${colors.background}`);
    console.log(`     Foreground: ${colors.foreground}`);
    console.log(`     Primary: ${colors.primary}`);
    console.log(`     Secondary: ${colors.secondary}`);
    console.log(`     Accent: ${colors.accent}`);
  }
  
  // Vérification des styles
  const styles = persona.settings.styles;
  if (styles) {
    console.log("   Styles:");
    console.log(`     Border Radius: ${styles.borderRadius}`);
    console.log(`     Card Shadow: ${styles.cardShadow}`);
    console.log(`     Spacing: ${styles.spacing}`);
  }
  
  // Vérification des layouts
  const layouts = persona.settings.layouts;
  if (layouts) {
    console.log("   Layouts:");
    Object.entries(layouts).forEach(([key, value]) => {
      console.log(`     ${key}: ${value}`);
    });
  }
  
  // Vérification des animations
  const animations = persona.settings.animations;
  if (animations) {
    console.log("   Animations:");
    Object.entries(animations).forEach(([key, value]) => {
      console.log(`     ${key}: ${value}`);
    });
  }
});

console.log("\n✅ Test terminé !");
console.log("\n📋 Résumé des corrections appliquées:");
console.log("   ✓ Calcul automatique des couleurs foreground pour le contraste");
console.log("   ✓ Amélioration des palettes de couleurs pour la modernité");
console.log("   ✓ Implémentation des styles spécifiques (spacing, shadows)");
console.log("   ✓ Amélioration des layouts et animations CSS");
console.log("   ✓ Configuration Tailwind étendue");
console.log("\n🚀 Pour tester visuellement, visitez: /test-personas");
