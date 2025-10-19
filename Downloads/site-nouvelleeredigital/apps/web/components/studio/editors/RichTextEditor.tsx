'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  List, 
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  X,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
    ],
    content: content || '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate max-w-none focus:outline-none min-h-[300px] p-4 border border-border rounded-lg',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon: Icon, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    icon: any; 
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-muted transition-colors ${
        isActive ? 'bg-indigo-100 text-indigo-700' : 'text-muted-foreground'
      }`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const addLink = () => {
    const url = window.prompt('Entrez l\'URL du lien:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Barre d'outils */}
      <div className="border-b border-border bg-muted p-2 flex flex-wrap gap-1">
        {/* Formatage texte */}
        <div className="flex gap-1 pr-2 border-r border-border">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            icon={Bold}
            title="Gras (Ctrl+B)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            icon={Italic}
            title="Italique (Ctrl+I)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            icon={Strikethrough}
            title="Barré"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            icon={Code}
            title="Code inline"
          />
        </div>

        {/* Titres */}
        <div className="flex gap-1 pr-2 border-r border-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              editor.isActive('paragraph')
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-muted-foreground hover:bg-muted'
            }`}
            title="Paragraphe"
          >
            P
          </button>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            icon={Heading2}
            title="Titre 2"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            icon={Heading3}
            title="Titre 3"
          />
        </div>

        {/* Listes */}
        <div className="flex gap-1 pr-2 border-r border-border">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            icon={List}
            title="Liste à puces"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            icon={ListOrdered}
            title="Liste numérotée"
          />
        </div>

        {/* Autres */}
        <div className="flex gap-1 pr-2 border-r border-border">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            icon={Quote}
            title="Citation"
          />
          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive('link')}
            icon={LinkIcon}
            title="Ajouter un lien"
          />
          {editor.isActive('link') && (
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              icon={X}
              title="Supprimer le lien"
            />
          )}
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            title="Annuler (Ctrl+Z)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            title="Rétablir (Ctrl+Y)"
          />
        </div>
      </div>

      {/* Zone d'édition */}
      <div className="bg-card">
        <EditorContent editor={editor} />
      </div>

      {/* Info footer */}
      <div className="border-t border-border bg-muted px-3 py-2 text-xs text-muted-foreground0">
        <div className="flex items-center justify-between">
          <span>
            {editor.storage.characterCount?.characters() || 0} caractères
          </span>
          <span className="text-muted-foreground">
            Utilisez la barre d'outils pour formater votre texte
          </span>
        </div>
      </div>
    </div>
  );
}
