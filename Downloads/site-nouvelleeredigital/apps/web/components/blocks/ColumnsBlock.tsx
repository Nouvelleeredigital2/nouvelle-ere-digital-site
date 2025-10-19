'use client';

import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditorStore } from '@/stores/editorStore';
import { BlockRenderer } from './BlockRenderer';
import { DraggableBlock } from '../studio/DraggableBlock';
import { Plus } from 'lucide-react';
import type { ColumnsBlock, Block } from '@/lib/types/blocks';

interface ColumnsBlockProps {
  block: ColumnsBlock;
  isEditing?: boolean;
}

export function ColumnsBlock({ block, isEditing = false }: ColumnsBlockProps) {
  const { addBlockToColumn, reorderBlocksInColumn, selectedBlockId } = useEditorStore();
  const [showPalette, setShowPalette] = React.useState<string | null>(null);

  // Configuration des capteurs pour le drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent, columnId: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const column = block.data.columns.find(c => c.id === columnId);
      if (!column) return;

      const oldIndex = column.blocks.findIndex((b: Block) => b.id === active.id);
      const newIndex = column.blocks.findIndex((b: Block) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocksInColumn(block.id, columnId, oldIndex, newIndex);
      }
    }
  };

  const handleAddBlock = (columnId: string, blockType: string) => {
    addBlockToColumn(block.id, columnId, blockType);
    setShowPalette(null);
  };

  const getGapClass = (gap: string) => {
    switch (gap) {
      case 'none': return 'gap-0';
      case 'sm': return 'gap-2';
      case 'md': return 'gap-4';
      case 'lg': return 'gap-6';
      case 'xl': return 'gap-8';
      default: return 'gap-4';
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'start': return 'items-start';
      case 'center': return 'items-center';
      case 'end': return 'items-end';
      case 'stretch': return 'items-stretch';
      default: return 'items-stretch';
    }
  };

  if (!isEditing) {
    // Mode rendu public
    return (
      <div className={`grid ${getGapClass(block.data.gap)} ${getAlignmentClass(block.data.alignment)}`}
           style={{
             gridTemplateColumns: `repeat(${block.data.columns.length}, 1fr)`,
           }}>
        {block.data.columns.map((column) => (
          <div key={column.id} className="space-y-4">
            {column.blocks.map((subBlock: Block) => (
              <BlockRenderer key={subBlock.id} block={subBlock} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Mode édition
  return (
    <div className={`grid ${getGapClass(block.data.gap)} ${getAlignmentClass(block.data.alignment)} min-h-[200px]`}
         style={{
           gridTemplateColumns: `repeat(${block.data.columns.length}, 1fr)`,
         }}>
      {block.data.columns.map((column, columnIndex) => (
        <div key={column.id} className="min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">
              Colonne {columnIndex + 1}
            </h4>
            <div className="text-xs text-gray-500">
              {column.width}/12
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, column.id)}
          >
            <SortableContext
              items={column.blocks.map((b: Block) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {column.blocks.map((subBlock: Block) => (
                  <DraggableBlock
                    key={subBlock.id}
                    block={subBlock}
                    index={0} // Index dans la colonne
                    isSelected={selectedBlockId === subBlock.id}
                    isNested={true}
                    parentBlockId={block.id}
                    parentColumnId={column.id}
                  />
                ))}

                {/* Bouton pour ajouter un bloc dans cette colonne */}
                <button
                  onClick={() => setShowPalette(column.id)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Ajouter un bloc</span>
                </button>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}