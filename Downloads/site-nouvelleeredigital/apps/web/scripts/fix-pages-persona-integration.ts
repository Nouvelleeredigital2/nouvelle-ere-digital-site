// apps/web/scripts/fix-pages-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("📄 Correction des pages - Intégration personas Phase 1");
console.log("=" .repeat(60));

// Mappings spécifiques pour les pages
const pageColorMappings = {
  // Backgrounds de pages
  'bg-white': 'bg-background',
  'bg-black': 'bg-background',
  
  // Textes de pages
  'text-white': 'text-card-foreground',
  'text-black': 'text-foreground',
  
  // Couleurs spécifiques aux pages
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  'text-purple-500': 'text-accent',
  'text-purple-600': 'text-accent',
  
  // Backgrounds avec opacité
  'bg-white/': 'bg-background/',
  'bg-black/': 'bg-background/',
};

// Pages prioritaires identifiées
const priorityPages = [
  'AudiovisuelPage.tsx',
  'BlogPage.tsx', 
  'ChiffresClesPage.tsx',
  'CommunicationPage.tsx',
  'ConclusionPage.tsx',
  'ContactPage.tsx',
  'DesignPage.tsx',
  'DeveloppementPage.tsx',
  'EngagementsRSEPage.tsx',
  'EquipeValeursPage.tsx',
  'EvenementielPage.tsx',
  'ExpertisesPage.tsx',
  'FormationsPage.tsx',
  'IntelligenceArtificiellePage.tsx',
  'MethodePage.tsx',
  'MissionPage.tsx',
  'ReferencesPage.tsx',
  'SolutionsIAPage.tsx',
  'VisionPage.tsx'
];

// Fonction pour corriger une page
function fixPage(filePath: string): { fixed: number; total: number; file: string } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(pageColorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(pageColorMappings).forEach(([oldColor, newColor]) => {
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

// Corriger les pages
console.log("\n📄 Correction des pages:");
const pagesPath = join(process.cwd(), 'components', 'pages');

let totalFixed = 0;
let totalOccurrences = 0;

try {
  const items = readdirSync(pagesPath);
  
  for (const item of items) {
    if (item.endsWith('.tsx') && priorityPages.includes(item)) {
      const fullPath = join(pagesPath, item);
      const result = fixPage(fullPath);
      
      if (result.fixed > 0) {
        console.log(`✅ ${result.file} - ${result.fixed}/${result.total} corrections`);
        totalFixed += result.fixed;
        totalOccurrences += result.total;
      }
    }
  }
} catch (error) {
  console.log("❌ Erreur lors de la lecture du répertoire pages");
}

console.log(`\n📊 Résumé des corrections de pages:`);
console.log(`   ✅ Corrections appliquées: ${totalFixed}`);
console.log(`   📝 Occurrences totales: ${totalOccurrences}`);
console.log(`   📄 Pages traitées: ${priorityPages.length}`);

console.log("\n🎯 Prochaines étapes:");
console.log("   1. Corriger les composants Media");
console.log("   2. Corriger les composants UI spécialisés");
console.log("   3. Validation finale");

console.log("\n🚀 Pour tester: /test-personas");
