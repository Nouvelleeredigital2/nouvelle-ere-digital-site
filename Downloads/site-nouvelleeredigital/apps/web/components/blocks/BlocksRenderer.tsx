'use client';

import React from 'react';
import { Block } from '@/lib/types/blocks';
import { BlockRenderer } from './BlockRenderer';

interface BlocksRendererProps {
  blocks: Block[];
  isEditing?: boolean;
}

export function BlocksRenderer({ blocks, isEditing = false }: BlocksRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="blocks-container">
      {blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          isNested={false}
        />
      ))}
    </div>
  );
}
