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

  // Barre d'outils avancée désactivée tant que TipTap n'est pas configuré

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Barre d'outils désactivée tant que TipTap n'est pas configuré */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 text-xs text-gray-500">
        Barre d'outils avancée désactivée (TipTap en cours de configuration)
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
