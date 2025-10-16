import React from 'react';

interface HeroBlockData {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center' | 'right';
}

interface HeroBlockProps {
  data: HeroBlockData;
}

export function HeroBlock({ data }: HeroBlockProps) {
  const {
    title = 'Titre du Hero',
    subtitle = '',
    description = '',
    ctaText = '',
    ctaLink = '#',
    backgroundImage = '',
    alignment = 'center',
  } = data;

  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[alignment];

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center py-20 px-4"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto flex flex-col ${alignmentClass} space-y-6`}>
        {subtitle && (
          <p className="text-lg font-medium text-white/90 uppercase tracking-wide">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-white/90 max-w-2xl">
            {description}
          </p>
        )}
        {ctaText && (
          <a
            href={ctaLink}
            className="inline-block px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
