// apps/web/scripts/analyze-remaining-components.ts
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🔍 Analyse des 27 composants restants - Phase 2");
console.log("=" .repeat(60));

// Fonction pour analyser un fichier
function analyzeFile(filePath: string): { file: string; issues: string[] } {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const issues: string[] = [];
    
    // Patterns de couleurs hardcodées
    const patterns = [
      { pattern: /bg-red-\d+/g, name: 'bg-red-*' },
      { pattern: /bg-green-\d+/g, name: 'bg-green-*' },
      { pattern: /bg-yellow-\d+/g, name: 'bg-yellow-*' },
      { pattern: /bg-blue-\d+/g, name: 'bg-blue-*' },
      { pattern: /bg-purple-\d+/g, name: 'bg-purple-*' },
      { pattern: /text-red-\d+/g, name: 'text-red-*' },
      { pattern: /text-green-\d+/g, name: 'text-green-*' },
      { pattern: /text-yellow-\d+/g, name: 'text-yellow-*' },
      { pattern: /text-blue-\d+/g, name: 'text-blue-*' },
      { pattern: /text-purple-\d+/g, name: 'text-purple-*' },
      { pattern: /bg-white/g, name: 'bg-white' },
      { pattern: /text-white/g, name: 'text-white' },
      { pattern: /bg-black/g, name: 'bg-black' },
      { pattern: /bg-gray-\d+/g, name: 'bg-gray-*' },
      { pattern: /text-gray-\d+/g, name: 'text-gray-*' },
    ];
    
    patterns.forEach(({ pattern, name }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push(`${name}: ${matches.length} occurrences`);
      }
    });
    
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    return { file: relativePath, issues };
  } catch (error) {
    return { file: '', issues: [] };
  }
}

// Composants restants identifiés
const remainingComponents = [
  // Blocs
  'components/blocks/HeroBlock.tsx',
  'components/blocks/BlogPage.tsx',
  
  // Demo
  'components/demo/PersonaDemo.tsx',
  'components/demo/PersonaShowcase.tsx',
  
  // Layout
  'components/layout/AdminNav.tsx',
  
  // Media
  'components/media/MediaLibrary.tsx',
  
  // Modals
  'components/modals/ServiceModal.tsx',
  
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
  'components/ui/OptimizedImage.tsx',
  'components/ui/Testimonials.tsx',
  'components/ui/ThemeCustomizer.tsx',
  'components/ui/Universe3D.tsx',
  'components/ui/UserTestingPage.tsx',
];

console.log("\n📊 Analyse des composants restants:\n");

let totalIssues = 0;
const categories = {
  'bg-red-*': 0,
  'bg-green-*': 0,
  'bg-yellow-*': 0,
  'bg-blue-*': 0,
  'bg-purple-*': 0,
  'text-red-*': 0,
  'text-green-*': 0,
  'text-yellow-*': 0,
  'text-blue-*': 0,
  'text-purple-*': 0,
  'bg-white': 0,
  'text-white': 0,
  'bg-black': 0,
  'bg-gray-*': 0,
  'text-gray-*': 0,
};

remainingComponents.forEach(componentPath => {
  const fullPath = join(process.cwd(), componentPath);
  const result = analyzeFile(fullPath);
  
  if (result.issues.length > 0) {
    console.log(`⚠️  ${result.file}`);
    result.issues.forEach(issue => {
      console.log(`   - ${issue}`);
      const [category] = issue.split(':');
      if (categories[category]) {
        categories[category]++;
      }
      totalIssues++;
    });
    console.log('');
  }
});

console.log("📈 Résumé par catégorie:");
Object.entries(categories).forEach(([category, count]) => {
  if (count > 0) {
    console.log(`   ${category}: ${count} occurrences`);
  }
});

console.log(`\n🎯 Total: ${totalIssues} occurrences à corriger`);
console.log(`📁 Composants: ${remainingComponents.length}`);

console.log("\n🚀 Plan d'action Phase 2:");
console.log("   1. Corriger les couleurs d'état (bg-red-, bg-green-, etc.)");
console.log("   2. Corriger les couleurs de démo (text-white)");
console.log("   3. Corriger les couleurs spécialisées restantes");
console.log("   4. Validation finale 100%");
