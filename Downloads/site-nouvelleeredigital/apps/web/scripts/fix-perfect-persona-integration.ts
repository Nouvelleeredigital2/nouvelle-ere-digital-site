// apps/web/scripts/fix-perfect-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🎯 Correction parfaite - Atteindre 100% d'intégration personas");
console.log("=" .repeat(70));

// Mappings ultra-précis pour les cas spécifiques
const perfectColorMappings = {
  // Couleurs d'état avec toutes les variantes
  'bg-red-500': 'bg-error',
  'bg-red-600': 'bg-error',
  'bg-red-700': 'bg-error',
  'bg-red-800': 'bg-error',
  'bg-red-900': 'bg-error',
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  'text-red-700': 'text-error',
  'text-red-800': 'text-error',
  'text-red-900': 'text-error',
  
  'bg-green-500': 'bg-success',
  'bg-green-600': 'bg-success',
  'bg-green-700': 'bg-success',
  'bg-green-800': 'bg-success',
  'bg-green-900': 'bg-success',
  'text-green-500': 'text-success',
  'text-green-600': 'text-success',
  'text-green-700': 'text-success',
  'text-green-800': 'text-success',
  'text-green-900': 'text-success',
  
  'bg-yellow-500': 'bg-warning',
  'bg-yellow-600': 'bg-warning',
  'bg-yellow-700': 'bg-warning',
  'bg-yellow-800': 'bg-warning',
  'bg-yellow-900': 'bg-warning',
  'text-yellow-500': 'text-warning',
  'text-yellow-600': 'text-warning',
  'text-yellow-700': 'text-warning',
  'text-yellow-800': 'text-warning',
  'text-yellow-900': 'text-warning',
  
  'bg-blue-500': 'bg-primary',
  'bg-blue-600': 'bg-primary',
  'bg-blue-700': 'bg-primary',
  'bg-blue-800': 'bg-primary',
  'bg-blue-900': 'bg-primary',
  'text-blue-500': 'text-primary',
  'text-blue-600': 'text-primary',
  'text-blue-700': 'text-primary',
  'text-blue-800': 'text-primary',
  'text-blue-900': 'text-primary',
  
  'bg-purple-500': 'bg-accent',
  'bg-purple-600': 'bg-accent',
  'bg-purple-700': 'bg-accent',
  'bg-purple-800': 'bg-accent',
  'bg-purple-900': 'bg-accent',
  'text-purple-500': 'text-accent',
  'text-purple-600': 'text-accent',
  'text-purple-700': 'text-accent',
  'text-purple-800': 'text-accent',
  'text-purple-900': 'text-accent',
  
  // Couleurs avec opacité
  'bg-red-500/': 'bg-error/',
  'bg-red-600/': 'bg-error/',
  'bg-green-500/': 'bg-success/',
  'bg-green-600/': 'bg-success/',
  'bg-yellow-500/': 'bg-warning/',
  'bg-yellow-600/': 'bg-warning/',
  'bg-blue-500/': 'bg-primary/',
  'bg-blue-600/': 'bg-primary/',
  'bg-purple-500/': 'bg-accent/',
  'bg-purple-600/': 'bg-accent/',
  
  // Couleurs de fond spéciales
  'bg-red-50': 'bg-error/10',
  'bg-red-100': 'bg-error/20',
  'bg-red-200': 'bg-error/30',
  'bg-green-50': 'bg-success/10',
  'bg-green-100': 'bg-success/20',
  'bg-green-200': 'bg-success/30',
  'bg-yellow-50': 'bg-warning/10',
  'bg-yellow-100': 'bg-warning/20',
  'bg-yellow-200': 'bg-warning/30',
  'bg-blue-50': 'bg-primary/10',
  'bg-blue-100': 'bg-primary/20',
  'bg-blue-200': 'bg-primary/30',
  'bg-purple-50': 'bg-accent/10',
  'bg-purple-100': 'bg-accent/20',
  'bg-purple-200': 'bg-accent/30',
  
  // Bordures spéciales
  'border-red-200': 'border-error/20',
  'border-red-300': 'border-error/30',
  'border-green-200': 'border-success/20',
  'border-green-300': 'border-success/30',
  'border-yellow-200': 'border-warning/20',
  'border-yellow-300': 'border-warning/30',
  'border-blue-200': 'border-primary/20',
  'border-blue-300': 'border-primary/30',
  'border-purple-200': 'border-accent/20',
  'border-purple-300': 'border-accent/30',
  
  // Couleurs de base restantes
  'bg-white': 'bg-card',
  'text-white': 'text-card-foreground',
  'bg-black': 'bg-background',
  
  // Gris restants
  'bg-gray-50': 'bg-muted',
  'bg-gray-100': 'bg-muted',
  'bg-gray-200': 'bg-muted',
  'bg-gray-300': 'bg-muted',
  'bg-gray-400': 'bg-muted',
  'bg-gray-500': 'bg-muted',
  'bg-gray-600': 'bg-muted',
  'bg-gray-700': 'bg-muted',
  'bg-gray-800': 'bg-muted',
  'bg-gray-900': 'bg-muted',
  
  'text-gray-50': 'text-muted-foreground',
  'text-gray-100': 'text-muted-foreground',
  'text-gray-200': 'text-muted-foreground',
  'text-gray-300': 'text-muted-foreground',
  'text-gray-400': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-700': 'text-muted-foreground',
  'text-gray-800': 'text-muted-foreground',
  'text-gray-900': 'text-muted-foreground',
};

// Composants spécifiques identifiés
const specificComponents = [
  // Layout
  'components/layout/AdminNav.tsx',
  
  // Media
  'components/media/MediaLibrary.tsx',
  
  // Pages
  'components/pages/BlogPage.tsx',
  
  // Studio
  'components/studio/Inspector/ColumnsInspector.tsx',
  'components/studio/Inspector/GalleryInspector.tsx',
  'components/studio/Inspector/InspectorSection.tsx',
  'components/studio/PreviewModal.tsx',
  'components/studio/SaveIndicator.tsx',
  'components/studio/SEOPanel.tsx',
  'components/studio/ToastProvider.tsx',
  'components/studio/VersionHistory.tsx',
  
  // UI
  'components/ui/AccessibleComponents.tsx',
  'components/ui/AnimatedSection.tsx',
  'components/ui/AnimationCustomizer.tsx',
  'components/ui/CloudPreferencesManager.tsx',
  'components/ui/I18nText.tsx',
  'components/ui/LoadingStates.tsx',
  'components/ui/ModuleCard.tsx',
  'components/ui/NotificationSystem.tsx',
  'components/ui/Testimonials.tsx',
  'components/ui/ThemeCustomizer.tsx',
  'components/ui/Universe3D.tsx',
  'components/ui/UserTestingPage.tsx',
];

// Fonction pour corriger un fichier spécifique
function fixSpecificFile(filePath: string): { fixed: number; total: number; file: string } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(perfectColorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(perfectColorMappings).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newColor);
        fixed += matches.length;
      }
    });
    
    // Écrire le fichier corrigé
    if (fixed > 0) {
      writeFileSync(filePath, content, 'utf-8');
    }
    
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    return { fixed, total, file: relativePath };
  } catch (error) {
    return { fixed: 0, total: 0, file: '' };
  }
}

// Corriger les composants spécifiques
console.log("\n🎯 Correction des composants spécifiques:");

let totalFixed = 0;
let totalOccurrences = 0;
let componentsFixed = 0;

specificComponents.forEach(componentPath => {
  const fullPath = join(process.cwd(), componentPath);
  const result = fixSpecificFile(fullPath);
  
  if (result.fixed > 0) {
    console.log(`✅ ${result.file} - ${result.fixed}/${result.total} corrections`);
    totalFixed += result.fixed;
    totalOccurrences += result.total;
    componentsFixed++;
  }
});

console.log(`\n📊 Résumé de la correction parfaite:`);
console.log(`   ✅ Corrections appliquées: ${totalFixed}`);
console.log(`   📝 Occurrences totales: ${totalOccurrences}`);
console.log(`   🎨 Composants traités: ${componentsFixed}`);

console.log("\n🎉 Phase 3 terminée !");
console.log("🚀 Pour vérifier le résultat final: npx tsx scripts/check-persona-integration.ts");
