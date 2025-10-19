'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/stores/editorStore';
import { BlockPreview } from './BlockPreview';
import { ColumnsBlock } from '@/components/blocks/ColumnsBlock';
import type { Block } from '@/lib/types/blocks';
import {
  GripVertical,
  Trash2,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';

interface DraggableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  isNested?: boolean;
  parentBlockId?: string;
  parentColumnId?: string;
}

export function DraggableBlock({ 
  block, 
  index, 
  isSelected, 
  isNested = false, 
  parentBlockId, 
  parentColumnId 
}: DraggableBlockProps) {
  const { selectBlock, deleteBlock, duplicateBlock, deleteBlockFromColumn } = useEditorStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = () => {
    selectBlock(block.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Supprimer ce bloc ?')) {
      if (isNested && parentBlockId && parentColumnId) {
        deleteBlockFromColumn(parentBlockId, parentColumnId, block.id);
      } else {
        deleteBlock(block.id);
      }
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(block.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group
        border-2 rounded-lg
        transition-all duration-200
        ${isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-200'
          : isHovered
          ? 'border-border'
          : 'border-transparent'
        }
        ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}
        bg-card hover:shadow-md
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toolbar qui apparaît au survol */}
      {(isHovered || isSelected) && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-card border border-border rounded-t-lg px-3 py-1 shadow-sm z-10">
          {/* Informations du bloc */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium capitalize">{block.type}</span>
            <span className="text-muted-foreground">•</span>
            <span>Bloc #{index + 1}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Handle pour drag */}
            <button
              {...attributes}
              {...listeners}
              className="p-1.5 hover:bg-muted rounded cursor-grab active:cursor-grabbing"
              title="Déplacer"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Dupliquer */}
            <button
              onClick={handleDuplicate}
              className="p-1.5 hover:bg-muted rounded"
              title="Dupliquer"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Supprimer */}
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-error/10 rounded"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4 text-error" />
            </button>
          </div>
        </div>
      )}

      {/* Contenu du bloc */}
      <div className="p-4">
        {block.type === 'columns' ? (
          <ColumnsBlock block={block as any} isEditing={true} />
        ) : (
          <BlockPreview block={block} />
        )}
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none border-2 border-indigo-500 rounded-lg" />
      )}
    </div>
  );
}
