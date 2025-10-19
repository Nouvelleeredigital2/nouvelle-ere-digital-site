'use client';

import React from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import TextAlign from '@tiptap/extension-text-align';
// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Commencez à écrire...',
  className = ''
}: RichTextEditorProps) {
  // Version simplifiée en attendant la configuration complète de TipTap
  const [localContent, setLocalContent] = React.useState(content || '');

  React.useEffect(() => {
    if (content !== localContent) {
      setLocalContent(content || '');
    }
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onChange(newContent);
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children, 
    title 
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded hover:bg-gray-100 transition-colors
        ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );

  const Separator = () => (
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Barre d'outils */}
      <div className="border-b border-gray-300 bg-gray-50 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Annuler/Rétablir */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Annuler"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rétablir"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
          
          <Separator />

          {/* Titres */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Titre 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Titre 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Titre 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            isActive={editor.isActive('heading', { level: 4 })}
            title="Titre 4"
          >
            <Heading4 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            isActive={editor.isActive('heading', { level: 5 })}
            title="Titre 5"
          >
            <Heading5 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            isActive={editor.isActive('heading', { level: 6 })}
            title="Titre 6"
          >
            <Heading6 className="w-4 h-4" />
          </ToolbarButton>

          <Separator />

          {/* Formatage de texte */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Gras"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italique"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Souligné"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Barré"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <Separator />

          {/* Alignement */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Aligner à gauche"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Centrer"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Aligner à droite"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="Justifier"
          >
            <AlignJustify className="w-4 h-4" />
          </ToolbarButton>

          <Separator />

          {/* Listes */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Liste à puces"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Liste numérotée"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Citation"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <Separator />

          {/* Liens et images */}
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Entrez l\'URL du lien:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            isActive={editor.isActive('link')}
            title="Ajouter un lien"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Entrez l\'URL de l\'image:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
            title="Ajouter une image"
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Zone d'édition */}
      <div className="p-4 min-h-[200px]">
        <textarea
          value={localContent}
          onChange={handleContentChange}
          placeholder={placeholder}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="mt-2 text-xs text-gray-500">
          Éditeur de texte simplifié. TipTap sera activé après la configuration complète.
        </div>
      </div>
    </div>
  );
}
