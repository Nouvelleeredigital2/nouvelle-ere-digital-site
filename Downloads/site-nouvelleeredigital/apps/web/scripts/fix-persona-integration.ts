// apps/web/scripts/fix-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🔧 Correction automatique de l'intégration des personas");
console.log("=" .repeat(60));

// Mappings de couleurs hardcodées vers classes personas
const colorMappings = {
  // Backgrounds
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
  
  // Text colors
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
  
  // Borders
  'border-gray-200': 'border-border',
  'border-gray-300': 'border-border',
  'border-gray-400': 'border-border',
  'border-gray-500': 'border-border',
  'border-gray-600': 'border-border',
  'border-gray-700': 'border-border',
  'border-gray-800': 'border-border',
  'border-gray-900': 'border-border',
  
  // Primary colors (blue)
  'bg-blue-500': 'bg-primary',
  'bg-blue-600': 'bg-primary',
  'bg-blue-700': 'bg-primary',
  'text-blue-500': 'text-primary',
  'text-blue-600': 'text-primary',
  'text-blue-700': 'text-primary',
  
  // Success colors (green)
  'bg-green-500': 'bg-success',
  'bg-green-600': 'bg-success',
  'text-green-500': 'text-success',
  'text-green-600': 'text-success',
  
  // Error colors (red)
  'bg-red-500': 'bg-error',
  'bg-red-600': 'bg-error',
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  
  // Warning colors (yellow)
  'bg-yellow-500': 'bg-warning',
  'bg-yellow-600': 'bg-warning',
  'text-yellow-500': 'text-warning',
  'text-yellow-600': 'text-warning',
  
  // Purple colors
  'bg-purple-500': 'bg-accent',
  'bg-purple-600': 'bg-accent',
  'text-purple-500': 'text-accent',
  'text-purple-600': 'text-accent',
};

// Composants prioritaires à corriger en premier
const priorityComponents = [
  'Modal.tsx',
  'Toast.tsx', 
  'Skeleton.tsx',
  'SearchBox.tsx',
  'ThemeSwitch.tsx',
  'ThemeCustomizer.tsx',
  'NotificationSystem.tsx',
  'LoadingStates.tsx',
  'ServiceDetailSheet.tsx',
  'Testimonials.tsx'
];

// Fonction pour corriger un fichier
function fixFile(filePath: string): { fixed: number; total: number } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(colorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(colorMappings).forEach(([oldColor, newColor]) => {
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
    
    return { fixed, total };
  } catch (error) {
    return { fixed: 0, total: 0 };
  }
}

// Fonction pour scanner un répertoire
function scanAndFixDirectory(dirPath: string, isPriority: boolean = false): void {
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanAndFixDirectory(fullPath, isPriority);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const shouldFix = isPriority || priorityComponents.includes(item);
        
        if (shouldFix) {
          const result = fixFile(fullPath);
          if (result.fixed > 0) {
            const relativePath = fullPath.replace(process.cwd(), '').replace(/\\/g, '/');
            console.log(`✅ ${relativePath} - ${result.fixed}/${result.total} corrections`);
          }
        }
      }
    }
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
}

// Corriger les composants prioritaires
console.log("\n🎯 Correction des composants prioritaires:");
const uiPath = join(process.cwd(), 'components', 'ui');
scanAndFixDirectory(uiPath, true);

// Corriger les composants de blocs
console.log("\n📦 Correction des composants de blocs:");
const blocksPath = join(process.cwd(), 'components', 'blocks');
scanAndFixDirectory(blocksPath, true);

// Corriger les composants de layout
console.log("\n🏗️ Correction des composants de layout:");
const layoutPath = join(process.cwd(), 'components', 'layout');
scanAndFixDirectory(layoutPath, true);

// Corriger les composants de studio
console.log("\n🎨 Correction des composants de studio:");
const studioPath = join(process.cwd(), 'components', 'studio');
scanAndFixDirectory(studioPath, true);

console.log("\n🎉 Corrections terminées !");
console.log("🚀 Pour tester: /test-personas");
console.log("🔍 Pour vérifier: npx tsx scripts/check-persona-integration.ts");
