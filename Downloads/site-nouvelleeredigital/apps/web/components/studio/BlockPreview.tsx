'use client';

import React from 'react';
import type { Block } from '@/lib/types/blocks';
import { Image, Type, MousePointer2, Layout, Columns } from 'lucide-react';

interface BlockPreviewProps {
  block: Block;
}

export function BlockPreview({ block }: BlockPreviewProps) {
  switch (block.type) {
    case 'hero':
      return <HeroPreview data={block.data} />;
    case 'text':
      return <TextPreview data={block.data} />;
    case 'image':
      return <ImagePreview data={block.data} />;
    case 'cta':
      return <CTAPreview data={block.data} />;
    case 'columns':
      return <ColumnsPreview data={block.data} />;
    default:
      return <GenericPreview type={block.type} />;
  }
}

function HeroPreview({ data }: { data: any }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
      <div className="space-y-3">
        {data.subtitle && (
          <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
            {data.subtitle}
          </div>
        )}
        <h1 className="text-2xl font-bold text-muted-foreground line-clamp-2">
          {data.title || 'Titre du Hero'}
        </h1>
        {data.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}
        {data.ctaText && (
          <div className="pt-2">
            <span className="inline-block px-4 py-2 bg-indigo-600 text-card-foreground text-sm rounded-lg">
              {data.ctaText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TextPreview({ data }: { data: any }) {
  // Extraire le texte brut du HTML
  const getTextContent = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const textContent = data.content ? getTextContent(data.content) : 'Contenu texte...';

  return (
    <div className="bg-muted p-6 rounded-lg border border-border">
      <div className="flex items-start gap-3">
        <Type className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
        <div className="flex-1 space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {textContent}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground0">
            <span>Alignement: {data.alignment || 'left'}</span>
            <span>•</span>
            <span>Largeur: {data.maxWidth || 'full'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePreview({ data }: { data: any }) {
  return (
    <div className="bg-muted p-6 rounded-lg border border-border">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.alt || 'Image'}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            {data.alt || 'Image sans description'}
          </div>
          {data.caption && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.caption}
            </p>
          )}
          <div className="text-xs text-muted-foreground0">
            Taille: {data.size || 'medium'}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTAPreview({ data }: { data: any }) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-3">
          <MousePointer2 className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground">
          {data.title || 'Titre de l\'appel à l\'action'}
        </h3>
        {data.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-3 pt-2">
          {data.primaryButtonText && (
            <span className="inline-block px-4 py-2 bg-accent text-card-foreground text-sm rounded-lg">
              {data.primaryButtonText}
            </span>
          )}
          {data.secondaryButtonText && (
            <span className="inline-block px-4 py-2 bg-card text-accent border border-purple-600 text-sm rounded-lg">
              {data.secondaryButtonText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ColumnsPreview({ data }: { data: any }) {
  const columns = data.columns || 2;
  const totalBlocks = data.children?.reduce((acc: number, col: any[]) => acc + col.length, 0) || 0;

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Columns className="w-6 h-6 text-success" />
          <div>
            <div className="text-lg font-semibold text-muted-foreground">
              Mise en page colonnes
            </div>
            <div className="text-sm text-muted-foreground">
              {columns} colonne{columns > 1 ? 's' : ''} • {totalBlocks} bloc{totalBlocks > 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, index) => (
            <div key={index} className="bg-card/50 rounded border border-success/20 p-3 text-center">
              <div className="text-xs text-success font-medium">
                Colonne {index + 1}
              </div>
              <div className="text-xs text-muted-foreground0 mt-1">
                {data.children?.[index]?.length || 0} bloc{(data.children?.[index]?.length || 0) > 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground0">
          <span>Espacement: {data.gap || 'md'}</span>
          <span>•</span>
          <span>Alignement: {data.verticalAlign || 'top'}</span>
        </div>
      </div>
    </div>
  );
}

function GenericPreview({ type }: { type: string }) {
  return (
    <div className="bg-muted p-6 rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <Layout className="w-5 h-5 text-muted-foreground0" />
        <div>
          <div className="text-sm font-medium text-muted-foreground capitalize">
            {type} Block
          </div>
          <div className="text-xs text-muted-foreground0">
            Prévisualisation non disponible
          </div>
        </div>
      </div>
    </div>
  );
}
