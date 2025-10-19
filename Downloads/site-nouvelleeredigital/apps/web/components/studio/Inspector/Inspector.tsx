'use client';

import React from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { HeroInspector } from './HeroInspector';
import { TextInspector } from './TextInspector';
import { ImageInspector } from './ImageInspector';
import { CTAInspector } from './CTAInspector';
import { RichTextInspector } from './RichTextInspector';
import { GalleryInspector } from './GalleryInspector';
import { ColumnsInspector } from './ColumnsInspector';
import { IconInspector } from './IconInspector';
import { X, Info } from 'lucide-react';

export function Inspector() {
  const { page, selectedBlockId, selectBlock, updateBlock } = useEditorStore();

  // Trouver le bloc sélectionné
  const selectedBlock = page?.blocks.find((b) => b.id === selectedBlockId);

  // Fonction pour mettre à jour les données du bloc
  const handleUpdate = (data: Partial<any>) => {
    if (selectedBlockId) {
      updateBlock(selectedBlockId, data);
    }
  };

  // Si aucun bloc sélectionné
  if (!selectedBlock) {
    return (
      <aside className="w-80 bg-card border-l border-border overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Propriétés
            </h3>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Aucun bloc sélectionné
            </p>
            <p className="text-xs text-muted-foreground0">
              Cliquez sur un bloc dans le canvas pour éditer ses propriétés
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-card border-l border-border overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              Propriétés
            </h3>
            <p className="text-xs text-muted-foreground0 mt-0.5">
              Bloc {selectedBlock.type}
            </p>
          </div>
          <button
            onClick={() => selectBlock(null)}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5 text-muted-foreground0" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Afficher l'inspecteur approprié selon le type */}
        {selectedBlock.type === 'hero' && (
          <HeroInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'text' && (
          <TextInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'image' && (
          <ImageInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'cta' && (
          <CTAInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'richtext' && (
          <RichTextInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'gallery' && (
          <GalleryInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'columns' && (
          <ColumnsInspector block={selectedBlock} onUpdate={handleUpdate} />
        )}
        
        {selectedBlock.type === 'icon' && (
          <IconInspector data={selectedBlock.data} onUpdate={handleUpdate} />
        )}

        {/* Fallback pour types non supportés */}
        {!['hero', 'text', 'image', 'cta', 'richtext', 'gallery', 'columns', 'icon'].includes(selectedBlock.type) && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-2">
              Type de bloc non supporté
            </p>
            <p className="text-xs text-muted-foreground0">
              {selectedBlock.type}
            </p>
          </div>
        )}
      </div>

      {/* Info sur la sauvegarde automatique */}
      <div className="border-t border-border px-6 py-3 bg-muted">
        <p className="text-xs text-muted-foreground0 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-success rounded-full"></span>
          Les modifications sont sauvegardées automatiquement
        </p>
      </div>
    </aside>
  );
}
