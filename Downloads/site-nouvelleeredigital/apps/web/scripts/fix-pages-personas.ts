#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Mapping des couleurs hardcodées vers les classes personas
const colorMappings = [
  // Couleurs zinc vers personas
  { from: /text-zinc-500/g, to: 'text-muted-foreground' },
  { from: /text-zinc-400/g, to: 'text-muted-foreground' },
  { from: /text-zinc-300/g, to: 'text-muted-foreground' },
  { from: /text-zinc-700/g, to: 'text-foreground' },
  { from: /text-zinc-900/g, to: 'text-foreground' },
  { from: /text-zinc-100/g, to: 'text-card-foreground' },
  { from: /bg-zinc-50/g, to: 'bg-muted' },
  { from: /bg-zinc-900/g, to: 'bg-background' },
  { from: /bg-zinc-800/g, to: 'bg-background' },
  { from: /bg-zinc-700/g, to: 'bg-background' },
  
  // Couleurs slate vers personas
  { from: /text-slate-500/g, to: 'text-muted-foreground' },
  { from: /text-slate-400/g, to: 'text-muted-foreground' },
  { from: /text-slate-300/g, to: 'text-muted-foreground' },
  { from: /text-slate-700/g, to: 'text-foreground' },
  { from: /text-slate-900/g, to: 'text-foreground' },
  { from: /text-slate-100/g, to: 'text-card-foreground' },
  { from: /bg-slate-50/g, to: 'bg-muted' },
  { from: /bg-slate-900/g, to: 'bg-background' },
  { from: /bg-slate-800/g, to: 'bg-background' },
  { from: /bg-slate-700/g, to: 'bg-background' },
  
  // Couleurs gray vers personas
  { from: /text-gray-500/g, to: 'text-muted-foreground' },
  { from: /text-gray-400/g, to: 'text-muted-foreground' },
  { from: /text-gray-300/g, to: 'text-muted-foreground' },
  { from: /text-gray-700/g, to: 'text-foreground' },
  { from: /text-gray-900/g, to: 'text-foreground' },
  { from: /text-gray-100/g, to: 'text-card-foreground' },
  { from: /bg-gray-50/g, to: 'bg-muted' },
  { from: /bg-gray-900/g, to: 'bg-background' },
  { from: /bg-gray-800/g, to: 'bg-background' },
  { from: /bg-gray-700/g, to: 'bg-background' },
  
  // Couleurs neutres vers personas
  { from: /text-neutral-500/g, to: 'text-muted-foreground' },
  { from: /text-neutral-400/g, to: 'text-muted-foreground' },
  { from: /text-neutral-300/g, to: 'text-muted-foreground' },
  { from: /text-neutral-700/g, to: 'text-foreground' },
  { from: /text-neutral-900/g, to: 'text-foreground' },
  { from: /text-neutral-100/g, to: 'text-card-foreground' },
  { from: /bg-neutral-50/g, to: 'bg-muted' },
  { from: /bg-neutral-900/g, to: 'bg-background' },
  { from: /bg-neutral-800/g, to: 'bg-background' },
  { from: /bg-neutral-700/g, to: 'bg-background' },
  
  // Couleurs stone vers personas
  { from: /text-stone-500/g, to: 'text-muted-foreground' },
  { from: /text-stone-400/g, to: 'text-muted-foreground' },
  { from: /text-stone-300/g, to: 'text-muted-foreground' },
  { from: /text-stone-700/g, to: 'text-foreground' },
  { from: /text-stone-900/g, to: 'text-foreground' },
  { from: /text-stone-100/g, to: 'text-card-foreground' },
  { from: /bg-stone-50/g, to: 'bg-muted' },
  { from: /bg-stone-900/g, to: 'bg-background' },
  { from: /bg-stone-800/g, to: 'bg-background' },
  { from: /bg-stone-700/g, to: 'bg-background' },
];

function fixPagesPersonas() {
  console.log('🔧 Correction des couleurs hardcodées dans les pages...\n');
  
  // Trouver tous les fichiers de pages
  const pagesDir = path.join(process.cwd(), 'apps', 'web', 'components', 'pages');
  const pageFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(pagesDir, file));
  
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  for (const filePath of pageFiles) {
    totalFiles++;
    console.log(`📄 Traitement: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let modifiedContent = content;
      let hasChanges = false;
      
      // Appliquer tous les mappings
      for (const mapping of colorMappings) {
        const newContent = modifiedContent.replace(mapping.from, mapping.to);
        if (newContent !== modifiedContent) {
          modifiedContent = newContent;
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        modifiedFiles++;
        console.log(`  ✅ Modifié`);
      } else {
        console.log(`  ⏭️  Aucun changement nécessaire`);
      }
      
    } catch (error) {
      console.error(`  ❌ Erreur lors du traitement: ${error}`);
    }
  }
  
  console.log(`\n📊 Résumé:`);
  console.log(`   📁 Fichiers traités: ${totalFiles}`);
  console.log(`   ✏️  Fichiers modifiés: ${modifiedFiles}`);
  console.log(`   ✅ Taux de succès: ${Math.round((modifiedFiles / totalFiles) * 100)}%`);
  
  if (modifiedFiles > 0) {
    console.log(`\n🎉 Correction terminée ! Les pages utilisent maintenant les classes personas.`);
  } else {
    console.log(`\n✨ Toutes les pages étaient déjà correctement configurées !`);
  }
}

// Exécuter le script
fixPagesPersonas();
