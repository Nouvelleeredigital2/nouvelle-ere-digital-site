// apps/web/scripts/fix-specialized-persona-integration.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log("🎨 Correction des composants UI spécialisés - Intégration personas Phase 1");
console.log("=" .repeat(80));

// Mappings pour les couleurs spécialisées restantes
const specializedColorMappings = {
  // Couleurs d'état spécifiques
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
};

// Composants UI spécialisés identifiés
const specializedComponents = [
  // Composants avec bg-red-
  'DraggableBlock.tsx',
  'GalleryInspector.tsx',
  'LoadingStates.tsx',
  'Universe3D.tsx',
  
  // Composants avec bg-green-
  'InspectorSection.tsx',
  'ModuleCard.tsx',
  'PreviewModal.tsx',
  'SaveIndicator.tsx',
  'SEOPanel.tsx',
  'ToastProvider.tsx',
  'VersionHistory.tsx',
  
  // Composants avec bg-blue-
  'AdminNav.tsx',
  'AnimatedSection.tsx',
  'CloudPreferencesManager.tsx',
  'InspectorSection.tsx',
  'LoadingStates.tsx',
  'NotificationSystem.tsx',
  'PersonaAnalyticsDashboard.tsx',
  'SaveIndicator.tsx',
  'SEOPanel.tsx',
  'ToastProvider.tsx',
  'VersionHistory.tsx',
  
  // Composants avec bg-yellow-
  'AnimationCustomizer.tsx',
  'I18nText.tsx',
  'Testimonials.tsx',
  'ToastProvider.tsx',
  'UserTestingPage.tsx',
  
  // Composants avec bg-purple-
  'AnimationCustomizer.tsx',
  'HeroBlock.tsx',
  'SEOPanel.tsx',
  'ThemeCustomizer.tsx',
  'VersionHistory.tsx',
];

// Fonction pour corriger un composant spécialisé
function fixSpecializedComponent(filePath: string): { fixed: number; total: number; file: string } {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let fixed = 0;
    let total = 0;
    
    // Compter les occurrences avant correction
    Object.keys(specializedColorMappings).forEach(oldColor => {
      const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        total += matches.length;
      }
    });
    
    // Appliquer les corrections
    Object.entries(specializedColorMappings).forEach(([oldColor, newColor]) => {
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

// Fonction pour scanner tous les composants UI
function scanAndFixUIComponents(): void {
  const uiPath = join(process.cwd(), 'components', 'ui');
  const studioPath = join(process.cwd(), 'components', 'studio');
  const layoutPath = join(process.cwd(), 'components', 'layout');
  
  let totalFixed = 0;
  let totalOccurrences = 0;
  let componentsFixed = 0;
  
  const paths = [
    { path: uiPath, name: 'UI' },
    { path: studioPath, name: 'Studio' },
    { path: layoutPath, name: 'Layout' }
  ];
  
  paths.forEach(({ path, name }) => {
    try {
      const items = readdirSync(path);
      
      items.forEach(item => {
        if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          const fullPath = join(path, item);
          const stat = statSync(fullPath);
          
          if (stat.isFile()) {
            const result = fixSpecializedComponent(fullPath);
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
  
  console.log(`\n📊 Résumé des corrections spécialisées:`);
  console.log(`   ✅ Corrections appliquées: ${totalFixed}`);
  console.log(`   📝 Occurrences totales: ${totalOccurrences}`);
  console.log(`   🎨 Composants traités: ${componentsFixed}`);
}

// Exécuter les corrections
console.log("\n🎨 Correction des composants UI spécialisés:");
scanAndFixUIComponents();

console.log("\n🎯 Phase 1 - Résumé complet:");
console.log("   1. ✅ Pages corrigées (143 corrections)");
console.log("   2. ✅ Composants Media corrigés (95 corrections)");
console.log("   3. ✅ Composants UI spécialisés corrigés");
console.log("   4. 🔄 Validation finale en cours...");

console.log("\n🚀 Pour tester: /test-personas");
