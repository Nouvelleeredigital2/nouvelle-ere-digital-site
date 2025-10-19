# 🚀 Guide de Démarrage - Sprint 4

## 🎯 Démarrage Rapide

### Étape 1 : Préparation de l'Environnement (30min)

```bash
# 1. Mettre à jour les dépendances
npm update

# 2. Installer les nouvelles dépendances pour les blocs avancés
npm install react-player@^2.13.0          # Lecteur vidéo/audio
npm install prismjs@^1.29.0                # Coloration syntaxique
npm install react-tabs@^6.0.2              # Onglets
npm install embla-carousel-react@^8.0.0    # Carrousel avancé
npm install react-hook-form@^7.47.0        # Gestion formulaires
npm install yup@^1.3.3                     # Validation
npm install react-rating@^2.0.5            # Notation étoiles
npm install @headlessui/react@^1.7.17      # Composants UI avancés

# 3. Vérifier que tout fonctionne
npm run dev
```

### Étape 2 : Extension de l'Architecture (1h)

#### Étendre le système de blocs
```typescript
// Dans lib/block-types.ts
export const ADVANCED_BLOCK_TYPES = {
  // Contenu avancé
  VIDEO: 'video',
  AUDIO: 'audio',
  CODE: 'code',

  // Layout avancé
  TABS: 'tabs',
  ACCORDION: 'accordion',
  SLIDER: 'slider',

  // Interactif
  FORM: 'form',
  COMMENTS: 'comments',
  RATING: 'rating',
} as const;

// Dans components/blocks/BlockRenderer.tsx
case 'video':
  return <VideoBlock key={block.id} data={block.data} />;
case 'audio':
  return <AudioBlock key={block.id} data={block.data} />;
case 'code':
  return <CodeBlock key={block.id} data={block.data} />;
// ... autres blocs
```

#### Créer la factory de blocs avancés
```typescript
// Dans lib/advanced-block-factory.ts
export class AdvancedBlockFactory {
  static createBlock(type: string, data: any): Block | null {
    switch (type) {
      case 'video':
        return new VideoBlock(data);
      case 'audio':
        return new AudioBlock(data);
      case 'code':
        return new CodeBlock(data);
      // ... autres types
      default:
        return null;
    }
  }
}
```

---

## 📋 Tâche 4.1 : Blocs de Contenu Avancé (Première Priorité)

### 🎥 VideoBlock - Lecteur Vidéo Professionnel

#### 1. Créer le composant de base (2h)
```typescript
// components/blocks/VideoBlock.tsx
'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface VideoBlockData {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'custom';
}

export function VideoBlock({ data }: { data: VideoBlockData }) {
  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    'custom': '',
  }[data.aspectRatio || '16:9'];

  return (
    <div className={`relative ${aspectRatioClass}`}>
      <ReactPlayer
        url={data.src}
        poster={data.poster}
        playing={data.autoplay}
        controls={data.controls ?? true}
        loop={data.loop}
        muted={data.muted}
        width="100%"
        height="100%"
        className="absolute inset-0"
      />
      {data.caption && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          {data.caption}
        </div>
      )}
    </div>
  );
}
```

#### 2. Créer l'inspecteur (1h)
```typescript
// components/blocks/VideoInspector.tsx
import React from 'react';
import { TextControl } from '@/components/studio/PropertyControls/TextControl';
import { CheckboxControl } from '@/components/studio/PropertyControls/CheckboxControl';
import { SelectControl } from '@/components/studio/PropertyControls/SelectControl';

interface VideoInspectorProps {
  data: VideoBlockData;
  onUpdate: (data: VideoBlockData) => void;
}

export function VideoInspector({ data, onUpdate }: VideoInspectorProps) {
  return (
    <div className="space-y-4">
      <TextControl
        name="src"
        label="URL de la vidéo"
        value={data.src}
        onChange={(value) => onUpdate({ ...data, src: value })}
        placeholder="https://youtube.com/watch?v=..."
      />

      <TextControl
        name="poster"
        label="Image de prévisualisation"
        value={data.poster || ''}
        onChange={(value) => onUpdate({ ...data, poster: value })}
        placeholder="https://example.com/poster.jpg"
      />

      <SelectControl
        name="aspectRatio"
        label="Format d'image"
        value={data.aspectRatio || '16:9'}
        onChange={(value) => onUpdate({ ...data, aspectRatio: value as any })}
        options={[
          { label: '16:9 (Paysage)', value: '16:9' },
          { label: '4:3 (Standard)', value: '4:3' },
          { label: '1:1 (Carré)', value: '1:1' },
          { label: 'Personnalisé', value: 'custom' },
        ]}
      />

      <CheckboxControl
        name="autoplay"
        label="Lecture automatique"
        checked={data.autoplay || false}
        onChange={(checked) => onUpdate({ ...data, autoplay: checked })}
      />

      <CheckboxControl
        name="loop"
        label="Boucle infinie"
        checked={data.loop || false}
        onChange={(checked) => onUpdate({ ...data, loop: checked })}
      />

      <TextControl
        name="caption"
        label="Légende"
        value={data.caption || ''}
        onChange={(value) => onUpdate({ ...data, caption: value })}
        placeholder="Description de la vidéo..."
      />
    </div>
  );
}
```

#### 3. Intégrer dans le système (30min)
```typescript
// Dans components/studio/BlockPalette/BlockPalette.tsx
{
  type: 'video',
  label: 'Vidéo',
  description: 'Lecteur vidéo YouTube/Vimeo ou fichier local',
  icon: <Play className="w-5 h-5" />,
  category: 'Media',
},

// Dans components/studio/Inspector/Inspector.tsx
{selectedBlock.type === 'video' && (
  <VideoInspector data={selectedBlock.data} onUpdate={handleUpdate} />
)}

// Dans components/blocks/BlockRenderer.tsx
case 'video':
  return <VideoBlock key={block.id} data={block.data} />;
```

---

## 📋 Tâche 4.2 : Blocs de Layout Avancé

### 📑 TabsBlock - Onglets Interactifs

#### 1. Créer le composant (3h)
```typescript
// components/blocks/TabsBlock.tsx
'use client';

import React, { useState } from 'react';
import { BlockRenderer } from './BlockRenderer';

interface TabsBlockData {
  tabs: Array<{
    id: string;
    title: string;
    content: Block[];
    icon?: string;
  }>;
  defaultTab?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function TabsBlock({ data }: { data: TabsBlockData }) {
  const [activeTab, setActiveTab] = useState(
    data.defaultTab || data.tabs[0]?.id || ''
  );

  const activeTabData = data.tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`tabs ${data.orientation === 'vertical' ? 'tabs-vertical' : 'tabs-horizontal'}`}>
      {/* Navigation */}
      <div className="tabs-nav">
        {data.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-title">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="tabs-content">
        {activeTabData && (
          <div className="tab-pane active">
            <BlockRenderer blocks={activeTabData.content} />
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 🎯 Prochaines Étapes Concrètes

### Cette Semaine (Objectif : 3-4 blocs)
1. **🎥 VideoBlock** - Lecteur vidéo complet ✅
2. **📑 TabsBlock** - Onglets interactifs ✅
3. **💻 CodeBlock** - Blocs de code (si temps)

### Semaine Prochaine (Objectif : 3-4 blocs)
1. **🎵 AudioBlock** - Lecteur audio
2. **🎯 AccordionBlock** - Accordéon pliable
3. **📝 FormBlock** - Formulaires dynamiques

---

## 🚨 Points d'Attention

### Sécurité
- ✅ Validation des URLs vidéo/audio
- ✅ Sanitisation des légendes et titres
- ✅ Gestion des erreurs de lecture

### Performance
- ✅ Lazy loading des composants lourds
- ✅ Optimisation des miniatures vidéo
- ✅ Caching des ressources externes

### UX
- ✅ Transitions fluides entre onglets
- ✅ Indicateurs visuels d'état
- ✅ Responsive design automatique

---

## 🎉 Prêt à Commencer ?

Le **Sprint 4** est maintenant **prêt à démarrer** avec une architecture solide et des objectifs clairs.

**Première action recommandée** :
```bash
# Implémenter le VideoBlock en premier
# C'est le bloc le plus demandé et le plus visible
```

**Vous êtes prêt à créer des expériences utilisateur sophistiquées !** 🚀

---

**Nouvelle Ère Digital**  
Sprint 4 : Démarrage | 18 Octobre 2025

🎯 **15+ blocs avancés | Plateforme professionnelle | Innovation continue**
