// apps/web/scripts/check-persona-integration.ts
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🔍 Vérification de l'intégration des personas dans tous les composants");
console.log("=" .repeat(70));

// Classes Tailwind liées aux personas
const personaClasses = [
  'bg-primary', 'text-primary-foreground',
  'bg-secondary', 'text-secondary-foreground', 
  'bg-accent', 'text-accent-foreground',
  'bg-card', 'text-card-foreground',
  'bg-background', 'text-foreground',
  'bg-muted', 'text-muted-foreground',
  'border-border',
  'text-dynamic-', 'font-persona-',
  'shadow-dynamic-', 'p-dynamic-', 'm-dynamic-', 'gap-dynamic-',
  'card-persona', 'btn-primary', 'btn-secondary',
  'animated-element', 'animate-', 'animation-persona-',
  'spacing-compact', 'spacing-normal', 'spacing-spacious'
];

// Fonction pour scanner un fichier
function scanFile(filePath: string): { file: string; found: string[]; missing: string[] } {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const found: string[] = [];
    const missing: string[] = [];
    
    // Vérifier si le fichier utilise des classes de couleurs hardcodées
    const hardcodedColors = [
      'bg-white', 'bg-black', 'text-white', 'text-black',
      'bg-gray-', 'text-gray-', 'bg-blue-', 'text-blue-',
      'bg-red-', 'text-red-', 'bg-green-', 'text-green-',
      'bg-yellow-', 'text-yellow-', 'bg-purple-', 'text-purple-'
    ];
    
    hardcodedColors.forEach(colorClass => {
      if (content.includes(colorClass)) {
        missing.push(colorClass);
      }
    });
    
    // Vérifier les classes personas utilisées
    personaClasses.forEach(personaClass => {
      if (content.includes(personaClass)) {
        found.push(personaClass);
      }
    });
    
    return { file: filePath, found, missing };
  } catch (error) {
    return { file: filePath, found: [], missing: [] };
  }
}

// Fonction pour scanner un répertoire récursivement
function scanDirectory(dirPath: string, results: any[] = []): any[] {
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath, results);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const result = scanFile(fullPath);
        if (result.found.length > 0 || result.missing.length > 0) {
          results.push(result);
        }
      }
    }
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
  
  return results;
}

// Scanner les composants
const componentsPath = join(process.cwd(), 'components');
const results = scanDirectory(componentsPath);

console.log(`\n📊 Résultats de l'analyse (${results.length} fichiers analysés):\n`);

let totalFound = 0;
let totalMissing = 0;
let wellIntegrated = 0;
let needsAttention = 0;

results.forEach(result => {
  const { file, found, missing } = result;
  const relativePath = file.replace(process.cwd(), '').replace(/\\/g, '/');
  
  if (found.length > 0 && missing.length === 0) {
    console.log(`✅ ${relativePath}`);
    console.log(`   Utilise: ${found.join(', ')}`);
    wellIntegrated++;
    totalFound += found.length;
  } else if (missing.length > 0) {
    console.log(`⚠️  ${relativePath}`);
    if (found.length > 0) {
      console.log(`   Utilise: ${found.join(', ')}`);
    }
    console.log(`   Couleurs hardcodées: ${missing.join(', ')}`);
    needsAttention++;
    totalFound += found.length;
    totalMissing += missing.length;
  } else if (found.length > 0) {
    console.log(`✅ ${relativePath}`);
    console.log(`   Utilise: ${found.join(', ')}`);
    wellIntegrated++;
    totalFound += found.length;
  }
});

console.log(`\n📈 Statistiques:`);
console.log(`   ✅ Composants bien intégrés: ${wellIntegrated}`);
console.log(`   ⚠️  Composants à améliorer: ${needsAttention}`);
console.log(`   🎨 Classes personas utilisées: ${totalFound}`);
console.log(`   🔧 Couleurs hardcodées trouvées: ${totalMissing}`);

if (needsAttention > 0) {
  console.log(`\n🔧 Actions recommandées:`);
  console.log(`   1. Remplacer les couleurs hardcodées par les classes personas`);
  console.log(`   2. Utiliser bg-primary au lieu de bg-blue-500`);
  console.log(`   3. Utiliser text-primary-foreground au lieu de text-white`);
  console.log(`   4. Utiliser bg-card au lieu de bg-white`);
  console.log(`   5. Utiliser border-border au lieu de border-gray-200`);
} else {
  console.log(`\n🎉 Excellent ! Tous les composants utilisent le système de personas !`);
}

console.log(`\n🚀 Pour tester visuellement: /test-personas`);
