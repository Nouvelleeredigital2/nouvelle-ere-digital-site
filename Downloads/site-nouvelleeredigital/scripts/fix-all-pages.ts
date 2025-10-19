#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const pages = [
  'AccueilPage.tsx',
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
  'VisionPage.tsx',
];

const replacements = [
  { from: /text-zinc-500 dark:text-zinc-400/g, to: 'text-muted-foreground' },
  { from: /text-zinc-900 dark:text-card-foreground/g, to: 'text-foreground' },
  { from: /text-zinc-700 dark:text-zinc-300/g, to: 'text-foreground' },
  { from: /text-zinc-900 dark:text-zinc-100/g, to: 'text-foreground' },
  { from: /bg-zinc-50 dark:bg-zinc-900\/30/g, to: 'bg-muted' },
  { from: /text-slate-500 dark:text-slate-400/g, to: 'text-muted-foreground' },
  { from: /text-slate-900 dark:text-slate-100/g, to: 'text-foreground' },
  { from: /text-slate-700 dark:text-slate-300/g, to: 'text-foreground' },
  { from: /bg-slate-50 dark:bg-slate-900\/30/g, to: 'bg-muted' },
];

let modified = 0;
let total = 0;

for (const page of pages) {
  const filePath = path.join('apps', 'web', 'components', 'pages', page);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  ${page} - fichier non trouvé`);
    continue;
  }
  
  total++;
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  for (const replacement of replacements) {
    content = content.replace(replacement.from, replacement.to);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modified++;
    console.log(`✅ ${page} - modifié`);
  } else {
    console.log(`⏭️  ${page} - aucun changement`);
  }
}

console.log(`\n📊 Résumé: ${modified}/${total} fichiers modifiés`);
