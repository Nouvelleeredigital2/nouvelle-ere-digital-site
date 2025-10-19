// apps/web/scripts/fix-final-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🎯 Correction finale - Atteindre 100% d'intégration personas");
console.log("=" .repeat(70));

// Mappings complets pour la correction finale
const finalColorMappings = {
  // Couleurs d'état
  'bg-red-500': 'bg-error',
  'bg-red-600': 'bg-error',
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  
  'bg-green-500': 'bg-success',
  'bg-green-600': 'bg-success',
  'text-green-500': 'text-success',
  'text-green-600': 'text-success',
  
  'bg-yellow-500': 'bg-warning',
  'bg-yellow-600': 'bg-warning',
  'text-yellow-500': 'text-warning',
  'text-yellow-600': 'text-warning',
  
  'bg-blue-500': 'bg-primary',
  'bg-blue-600': 'bg-primary',
  'text-blue-500': 'text-primary',
  'text-blue-600': 'text-primary',
  
  'bg-purple-500': 'bg-accent',
  'bg-purple-600': 'bg-accent',
  'text-purple-500': 'text-accent',
  'text-purple-600': 'text-accent',
  
  // Couleurs de base
  'bg-white': 'bg-card',
  'text-white': 'text-card-foreground',
  'bg-black': 'bg-background',
  
  // Couleurs avec opacité
  'bg-red-500/': 'bg-error/',
  'bg-green-500/': 'bg-success/',
  'bg-yellow-500/': 'bg-warning/',
  'bg-blue-500/': 'bg-primary/',
  'bg-purple-500/': 'bg-accent/',
  
  // Couleurs de fond spéciales
  'bg-red-50': 'bg-error/10',
  'bg-green-50': 'bg-success/10',
  'bg-yellow-50': 'bg-warning/10',
  'bg-blue-50': 'bg-primary/10',
  'bg-purple-50': 'bg-accent/10',
  
  // Bordures spéciales
  'border-red-200': 'border-error/20',
  'border-green-200': 'border-success/20',
  'border-yellow-200': 'border-warning/20',
  'border-blue-200': 'border-primary/20',
  'border-purple-200': 'border-accent/20',
  
  // Textes avec opacité
  'text-red-700': 'text-error',
  'text-green-700': 'text-success',
  'text-yellow-700': 'text-warning',
  'text-blue-700': 'text-primary',
  'text-purple-700': 'text-accent',
  
  'text-red-900': 'text-error',
  'text-green-900': 'text-success',
  'text-yellow-900': 'text-warning',
  'text-blue-900': 'text-primary',
  'text-purple-900': 'text-accent',
  
  // Gris (si pas encore corrigés)
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

// Fonction pour corriger un fichier
function fixFile(filePath: string): { fixed: number; total: number; file: string } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(finalColorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(finalColorMappings).forEach(([oldColor, newColor]) => {
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

// Fonction pour scanner tous les composants
function scanAndFixAllComponents(): void {
  const paths = [
    join(process.cwd(), 'components', 'blocks'),
    join(process.cwd(), 'components', 'demo'),
    join(process.cwd(), 'components', 'layout'),
    join(process.cwd(), 'components', 'media'),
    join(process.cwd(), 'components', 'modals'),
    join(process.cwd(), 'components', 'studio'),
    join(process.cwd(), 'components', 'ui'),
  ];
  
  let totalFixed = 0;
  let totalOccurrences = 0;
  let componentsFixed = 0;
  
  paths.forEach(path => {
    try {
      const items = readdirSync(path);
      
      items.forEach(item => {
        if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          const fullPath = join(path, item);
          const stat = statSync(fullPath);
          
          if (stat.isFile()) {
            const result = fixFile(fullPath);
            if (result.fixed > 0) {
              console.log(`✅ ${result.file} - ${result.fixed}/${result.total} corrections`);
              totalFixed += result.fixed;
              totalOccurrences += result.total;
              componentsFixed++;
            }
          }
        }
      });
    } catch (error) {
      // Ignorer les erreurs de lecture
    }
  });
  
  console.log(`\n📊 Résumé de la correction finale:`);
  console.log(`   ✅ Corrections appliquées: ${totalFixed}`);
  console.log(`   📝 Occurrences totales: ${totalOccurrences}`);
  console.log(`   🎨 Composants traités: ${componentsFixed}`);
}

// Exécuter les corrections
console.log("\n🎯 Correction finale de tous les composants:");
scanAndFixAllComponents();

console.log("\n🎉 Phase 2 terminée !");
console.log("🚀 Pour vérifier le résultat: npx tsx scripts/check-persona-integration.ts");
