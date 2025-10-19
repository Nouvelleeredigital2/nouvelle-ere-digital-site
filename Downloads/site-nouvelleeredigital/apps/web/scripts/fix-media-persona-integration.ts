// apps/web/scripts/fix-media-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🎬 Correction des composants Media - Intégration personas Phase 1");
console.log("=" .repeat(70));

// Mappings spécifiques pour les composants Media
const mediaColorMappings = {
  // Backgrounds d'éditeurs
  'bg-white': 'bg-card',
  'bg-black': 'bg-background',
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
  
  // Textes d'éditeurs
  'text-white': 'text-card-foreground',
  'text-black': 'text-foreground',
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
  
  // Bordures d'éditeurs
  'border-gray-200': 'border-border',
  'border-gray-300': 'border-border',
  'border-gray-400': 'border-border',
  'border-gray-500': 'border-border',
  
  // Couleurs d'état
  'bg-blue-50': 'bg-primary/10',
  'bg-blue-200': 'bg-primary/20',
  'text-blue-700': 'text-primary',
  'text-blue-900': 'text-primary',
  'border-blue-200': 'border-primary/20',
  
  // Couleurs d'erreur/succès
  'text-red-500': 'text-error',
  'text-green-500': 'text-success',
  'text-green-600': 'text-success',
  
  // Couleurs spéciales pour les éditeurs
  'bg-indigo-600': 'bg-primary',
  'bg-indigo-700': 'bg-primary',
  'hover:bg-indigo-700': 'hover:bg-primary/90',
};

// Composants Media à corriger
const mediaComponents = [
  'MediaEditor.tsx',
  'MediaLibrary.tsx', 
  'MediaUploader.tsx'
];

// Fonction pour corriger un composant Media
function fixMediaComponent(filePath: string): { fixed: number; total: number; file: string } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(mediaColorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(mediaColorMappings).forEach(([oldColor, newColor]) => {
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

// Corriger les composants Media
console.log("\n🎬 Correction des composants Media:");
const mediaPath = join(process.cwd(), 'components', 'media');

let totalFixed = 0;
let totalOccurrences = 0;

try {
  const items = readdirSync(mediaPath);
  
  for (const item of items) {
    if (item.endsWith('.tsx') && mediaComponents.includes(item)) {
      const fullPath = join(mediaPath, item);
      const result = fixMediaComponent(fullPath);
      
      if (result.fixed > 0) {
        console.log(`✅ ${result.file} - ${result.fixed}/${result.total} corrections`);
        totalFixed += result.fixed;
        totalOccurrences += result.total;
      }
    }
  }
} catch (error) {
  console.log("❌ Erreur lors de la lecture du répertoire media");
}

console.log(`\n📊 Résumé des corrections Media:`);
console.log(`   ✅ Corrections appliquées: ${totalFixed}`);
console.log(`   📝 Occurrences totales: ${totalOccurrences}`);
console.log(`   🎬 Composants traités: ${mediaComponents.length}`);

console.log("\n🎯 Prochaines étapes:");
console.log("   1. ✅ Pages corrigées");
console.log("   2. ✅ Composants Media corrigés");
console.log("   3. Corriger les composants UI spécialisés");
console.log("   4. Validation finale");

console.log("\n🚀 Pour tester: /test-personas");
