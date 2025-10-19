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
import { TabsBlock } from './TabsBlock';
import { AccordionBlock } from './AccordionBlock';
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
          <RichTextBlock data={block.data} />
        </div>
      );
    
    case 'gallery':
      return (
        <div className={baseClasses}>
          <GalleryBlock data={block.data} />
        </div>
      );
    
    case 'columns':
      return (
        <div className={baseClasses}>
          <ColumnsBlock data={block.data} />
        </div>
      );
    
    case 'video':
      return (
        <div className={baseClasses}>
          <VideoBlock data={block.data} />
        </div>
      );
    
    case 'tabs':
      return (
        <div className={baseClasses}>
          <TabsBlock data={block.data} />
        </div>
      );
    
    case 'accordion':
      return (
        <div className={baseClasses}>
          <AccordionBlock data={block.data} />
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
        <div className={`${baseClasses} p-4 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground0`}>
          Bloc non reconnu: {block.type}
        </div>
      );
  }
}