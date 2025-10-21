'use client';

import React from 'react';
import { Block } from '@/lib/types/blocks';
import { HeroBlock } from './HeroBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { CTABlock } from './CTABlock';
import { RichTextBlock } from './RichTextBlock';
import { GalleryBlock } from './GalleryBlock';
import { ColumnsBlock } from './ColumnsBlock';
import { VideoBlock } from './VideoBlock';
import { FormBlock } from './FormBlock';
import { IconBlock } from './IconBlock';

interface BlockRendererProps {
  block: Block;
  isNested?: boolean;
}

export function BlockRenderer({ block, isNested = false }: BlockRendererProps) {
  const baseClasses = isNested ? 'p-2' : '';

  switch (block.type) {
    case 'hero':
      return (
        <div className={baseClasses}>
          <HeroBlock data={block.data} />
        </div>
      );
    
    case 'text':
      return (
        <div className={baseClasses}>
          <TextBlock data={block.data} />
        </div>
      );
    
    case 'image':
      return (
        <div className={baseClasses}>
          <ImageBlock data={block.data} />
        </div>
      );
    
    case 'cta':
      return (
        <div className={baseClasses}>
          <CTABlock data={block.data} />
        </div>
      );
    
    case 'richtext':
      return (
        <div className={baseClasses}>
          <RichTextBlock block={block} />
        </div>
      );
    
    case 'gallery':
      return (
        <div className={baseClasses}>
          <GalleryBlock data={{ 
            ...block.data, 
            images: block.data.images || [],
            layout: block.data.layout || 'grid',
            columns: (typeof block.data.columns === 'string' ? parseInt(block.data.columns) as 2 | 3 | 4 : block.data.columns) || 3
          }} />
        </div>
      );
    
    case 'columns':
      return (
        <div className={baseClasses}>
          <ColumnsBlock block={block} />
        </div>
      );
    
    case 'video':
      return (
        <div className={baseClasses}>
          <VideoBlock data={block.data} />
        </div>
      );
    
    case 'form':
      return (
        <div className={baseClasses}>
          <FormBlock data={block.data} />
        </div>
      );
    
    case 'columns':
      return (
        <div className={baseClasses}>
          <ColumnsBlock block={block} isEditing={false} />
        </div>
      );
    
    case 'icon':
      return (
        <div className={baseClasses}>
          <IconBlock block={block} isEditing={false} />
        </div>
      );
    
    default:
      return (
        <div className={`${baseClasses} p-4 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground`}>
          Bloc non reconnu: {(block as any).type}
        </div>
      );
  }
}