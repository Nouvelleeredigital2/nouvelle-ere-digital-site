import React from 'react';

interface TextBlockData {
  content?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  paddingY?: 'sm' | 'md' | 'lg';
}

interface TextBlockProps {
  data: TextBlockData;
}

export function TextBlock({ data }: TextBlockProps) {
  const {
    content = '<p>Contenu du texte...</p>',
    alignment = 'left',
    maxWidth = 'lg',
    paddingY = 'md',
  } = data;

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[alignment];

  const maxWidthClass = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }[maxWidth];

  const paddingClass = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
  }[paddingY];

  return (
    <section className={`${paddingClass} px-4`}>
      <div
        className={`${maxWidthClass} ${alignmentClass} prose prose-lg`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
