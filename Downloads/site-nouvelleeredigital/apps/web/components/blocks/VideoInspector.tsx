// components/blocks/VideoInspector.tsx
import React from 'react';
import { TextControl } from '@/components/studio/PropertyControls/TextControl';
import { CheckboxControl } from '@/components/studio/PropertyControls/CheckboxControl';
import { SelectControl } from '@/components/studio/PropertyControls/SelectControl';

interface VideoBlockData {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'custom';
  title?: string;
  description?: string;
}

interface VideoInspectorProps {
  data: VideoBlockData;
  onUpdate: (data: VideoBlockData) => void;
}

export function VideoInspector({ data, onUpdate }: VideoInspectorProps) {
  const handleChange = (field: keyof VideoBlockData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* URL de la vidéo */}
      <TextControl
        name="src"
        label="URL de la vidéo"
        value={data.src}
        onChange={(value) => handleChange('src', value)}
        placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
      />

      {/* Image de prévisualisation */}
      <TextControl
        name="poster"
        label="Image de prévisualisation (poster)"
        value={data.poster || ''}
        onChange={(value) => handleChange('poster', value)}
        placeholder="https://example.com/poster.jpg"
      />

      {/* Titre */}
      <TextControl
        name="title"
        label="Titre de la vidéo"
        value={data.title || ''}
        onChange={(value) => handleChange('title', value)}
        placeholder="Titre de la vidéo..."
      />

      {/* Description */}
      <TextControl
        name="description"
        label="Description"
        value={data.description || ''}
        onChange={(value) => handleChange('description', value)}
        placeholder="Description de la vidéo..."
      />

      {/* Format d'image */}
      <SelectControl
        name="aspectRatio"
        label="Format d'image"
        value={data.aspectRatio || '16:9'}
        onChange={(value) => handleChange('aspectRatio', value as any)}
        options={[
          { label: '16:9 (Paysage)', value: '16:9' },
          { label: '4:3 (Standard)', value: '4:3' },
          { label: '1:1 (Carré)', value: '1:1' },
          { label: 'Personnalisé', value: 'custom' },
        ]}
      />

      {/* Options de lecture */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Options de lecture</h4>

        <CheckboxControl
          name="autoplay"
          label="Lecture automatique"
          checked={data.autoplay || false}
          onChange={(checked) => handleChange('autoplay', checked)}
        />

        <CheckboxControl
          name="controls"
          label="Afficher les contrôles"
          checked={data.controls ?? true}
          onChange={(checked) => handleChange('controls', checked)}
        />

        <CheckboxControl
          name="loop"
          label="Boucle infinie"
          checked={data.loop || false}
          onChange={(checked) => handleChange('loop', checked)}
        />

        <CheckboxControl
          name="muted"
          label="Muet par défaut"
          checked={data.muted || false}
          onChange={(checked) => handleChange('muted', checked)}
        />
      </div>

      {/* Légende */}
      <TextControl
        name="caption"
        label="Légende"
        value={data.caption || ''}
        onChange={(value) => handleChange('caption', value)}
        placeholder="Légende sous la vidéo..."
      />
    </div>
  );
}
