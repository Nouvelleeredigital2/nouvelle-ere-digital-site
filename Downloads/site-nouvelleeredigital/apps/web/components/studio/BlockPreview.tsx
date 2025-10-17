'use client';

import React from 'react';
import type { Block } from '@/lib/types/blocks';
import { Image, Type, MousePointer2, Layout } from 'lucide-react';

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
        <h1 className="text-2xl font-bold text-gray-900 line-clamp-2">
          {data.title || 'Titre du Hero'}
        </h1>
        {data.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {data.description}
          </p>
        )}
        {data.ctaText && (
          <div className="pt-2">
            <span className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg">
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
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start gap-3">
        <Type className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-700 line-clamp-3">
            {textContent}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
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
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.alt || 'Image'}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium text-gray-900">
            {data.alt || 'Image sans description'}
          </div>
          {data.caption && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {data.caption}
            </p>
          )}
          <div className="text-xs text-gray-500">
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
          <MousePointer2 className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {data.title || 'Titre de l\'appel à l\'action'}
        </h3>
        {data.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {data.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-3 pt-2">
          {data.primaryButtonText && (
            <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded-lg">
              {data.primaryButtonText}
            </span>
          )}
          {data.secondaryButtonText && (
            <span className="inline-block px-4 py-2 bg-white text-purple-600 border border-purple-600 text-sm rounded-lg">
              {data.secondaryButtonText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function GenericPreview({ type }: { type: string }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
      <div className="flex items-center gap-3">
        <Layout className="w-5 h-5 text-gray-500" />
        <div>
          <div className="text-sm font-medium text-gray-700 capitalize">
            {type} Block
          </div>
          <div className="text-xs text-gray-500">
            Prévisualisation non disponible
          </div>
        </div>
      </div>
    </div>
  );
}
