import React from 'react';
import Image from 'next/image';

interface ImageBlockData {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  layout?: 'full' | 'contained';
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
}

interface ImageBlockProps {
  data: ImageBlockData;
}

export function ImageBlock({ data }: ImageBlockProps) {
  const {
    src = '/placeholder-image.jpg',
    alt = 'Image',
    caption = '',
    width = 1200,
    height = 675,
    layout = 'contained',
    aspectRatio = 'auto',
  } = data;

  const containerClass = layout === 'full' ? 'w-full' : 'max-w-6xl mx-auto px-4';
  
  const aspectRatioClass = aspectRatio !== 'auto' ? {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspectRatio] : '';

  return (
    <section className="py-8">
      <div className={containerClass}>
        <div className={`relative overflow-hidden rounded-lg ${aspectRatioClass}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        </div>
        {caption && (
          <p className="mt-3 text-sm text-gray-600 text-center italic">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
