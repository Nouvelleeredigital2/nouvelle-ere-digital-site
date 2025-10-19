'use client';

import React from 'react';

interface SplitBlockData {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
}

interface SplitBlockProps {
  data: SplitBlockData;
}

export function SplitBlock({ data }: SplitBlockProps) {
  const {
    title = '',
    content = '',
    imageUrl = '',
    imageAlt = '',
    imagePosition = 'right',
    ctaText,
    ctaLink,
  } = data;

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${
          imagePosition === 'left' ? 'md:flex-row-reverse' : ''
        }`}>
          {/* Texte */}
          <div className={imagePosition === 'left' ? 'md:order-2' : ''}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-6">
                {title}
              </h2>
            )}
            {content && (
              <div
                className="prose prose-lg max-w-none text-muted-foreground mb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                className="inline-block px-8 py-4 bg-indigo-600 text-card-foreground font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Image */}
          <div className={imagePosition === 'left' ? 'md:order-1' : ''}>
            {imageUrl && (
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
