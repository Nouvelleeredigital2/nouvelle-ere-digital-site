'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from '@/stores/editorStore';
import { DraggableBlock } from './DraggableBlock';
import { BlockPreview } from './BlockPreview';
import { BlockPalette } from './BlockPalette/BlockPalette';
import { ColumnsBlock } from '@/components/blocks/ColumnsBlock';
import type { Block } from '@/lib/types/blocks';
import { Plus } from 'lucide-react';

export function Canvas() {
  const { page, reorderBlocks, setIsDragging, selectedBlockId } = useEditorStore();
  const [activeBlock, setActiveBlock] = React.useState<Block | null>(null);
  const [showPalette, setShowPalette] = React.useState(false);

  // Configuration des capteurs pour le drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Évite les clics accidentels
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const block = page?.blocks.find((b) => b.id === event.active.id);
    setActiveBlock(block || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveBlock(null);

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = page?.blocks.findIndex((b) => b.id === active.id) ?? -1;
      const newIndex = page?.blocks.findIndex((b) => b.id === over.id) ?? -1;

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground0">
        <p>Chargement de la page...</p>
      </div>
    );
  }

  if (page.blocks.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground0 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Page vide</h3>
            <p className="text-sm">Ajoutez votre premier bloc pour commencer</p>
          </div>
          <button
            className="px-6 py-3 bg-indigo-600 text-card-foreground rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            onClick={() => setShowPalette(true)}
          >
            <Plus className="w-5 h-5" />
            Ajouter un Bloc
          </button>
        </div>
        {showPalette && <BlockPalette onClose={() => setShowPalette(false)} />}
      </>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={page.blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 p-4">
            {page.blocks.map((block, index) => (
              <DraggableBlock
                key={block.id}
                block={block}
                index={index}
                isSelected={selectedBlockId === block.id}
                isNested={false}
              />
            ))}
            
            {/* Bouton pour ajouter un nouveau bloc */}
            <button
              onClick={() => setShowPalette(true)}
              className="w-full py-4 border-2 border-dashed border-border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-indigo-600"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Ajouter un bloc</span>
            </button>
          </div>
        </SortableContext>

        {/* Overlay pendant le drag */}
        <DragOverlay>
          {activeBlock ? (
            <div className="opacity-50">
              <BlockPreview block={activeBlock} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {/* Palette de blocs */}
      {showPalette && <BlockPalette onClose={() => setShowPalette(false)} />}
    </>
  );
}
