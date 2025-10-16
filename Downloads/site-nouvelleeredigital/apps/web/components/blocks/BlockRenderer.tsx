import React from 'react';
import { HeroBlock } from './HeroBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { CTABlock } from './CTABlock';

export interface Block {
  id: string;
  type: string;
  data: any;
}

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Aucun contenu à afficher</p>
          <p className="text-sm text-gray-400 mt-2">
            Veuillez configurer cette page dans le studio admin
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} data={block.data} />;
          case 'text':
            return <TextBlock key={block.id} data={block.data} />;
          case 'image':
            return <ImageBlock key={block.id} data={block.data} />;
          case 'cta':
            return <CTABlock key={block.id} data={block.data} />;
          default:
            console.warn(`Type de bloc inconnu: ${block.type}`);
            return (
              <div key={block.id} className="p-4 bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  Bloc de type &quot;{block.type}&quot; non supporté
                </p>
              </div>
            );
        }
      })}
    </>
  );
}
