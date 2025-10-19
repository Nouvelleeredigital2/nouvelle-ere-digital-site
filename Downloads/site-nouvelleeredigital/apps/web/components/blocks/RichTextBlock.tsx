'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextBlock as RichTextBlockType } from '@/lib/types/blocks';

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  const { content, alignment = 'left', maxWidth = 'lg', paddingY = 'md' } = block.data;

  // Éditeur en mode lecture seule pour le rendu public
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '<p></p>',
    editable: false,
    editorProps: {
      attributes: {
        class: 'rich-text-content focus:outline-none',
      },
    },
  });

  // Classes pour l'alignement
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Classes pour la largeur maximale
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  };

  // Classes pour le padding vertical
  const paddingYClasses = {
    none: 'py-0',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16',
  };

  return (
    <div className={`w-full ${paddingYClasses[paddingY]}`}>
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4`}>
        <div
          className={`
            prose prose-lg prose-slate max-w-none
            ${alignmentClasses[alignment]}
            prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-h4:text-xl prose-h4:mt-4 prose-h4:mb-2
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-muted-foreground prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          `}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
