'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { defaultBlockData } from '@/lib/inspectorSchemas';
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MousePointer2,
  Search,
  Plus,
  X,
  FileText,
  Images,
  Columns,
  Star
} from 'lucide-react';

interface BlockDefinition {
  type: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const blockDefinitions: BlockDefinition[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Section d\'en-tête avec titre et CTA',
    icon: <Layout className="w-5 h-5" />,
    category: 'Layout',
  },
  {
    type: 'text',
    label: 'Texte',
    description: 'Bloc de contenu texte riche',
    icon: <Type className="w-5 h-5" />,
    category: 'Contenu',
  },
  {
    type: 'image',
    label: 'Image',
    description: 'Image avec légende optionnelle',
    icon: <ImageIcon className="w-5 h-5" />,
    category: 'Média',
  },
  {
    type: 'cta',
    label: 'Call-to-Action',
    description: 'Boutons d\'appel à l\'action',
    icon: <MousePointer2 className="w-5 h-5" />,
    category: 'Contenu',
  },
  {
    type: 'richtext',
    label: 'Texte Riche (WYSIWYG)',
    description: 'Éditeur de texte formaté avec barre d\'outils',
    icon: <FileText className="w-5 h-5" />,
    category: 'Contenu',
  },
  {
    type: 'gallery',
    label: 'Galerie',
    description: 'Collection d\'images (Grid, Masonry, Carousel)',
    icon: <Images className="w-5 h-5" />,
    category: 'Média',
  },
  {
    type: 'columns',
    label: 'Colonnes',
    description: 'Mise en page multi-colonnes (2, 3 ou 4)',
    icon: <Columns className="w-5 h-5" />,
    category: 'Layout',
  },
  {
    type: 'icon',
    label: 'Icône',
    description: 'Icône avec personnalisation (taille, couleur, animation)',
    icon: <Star className="w-5 h-5" />,
    category: 'Média',
  },
];

const categories = Array.from(new Set(blockDefinitions.map(b => b.category)));

interface BlockPaletteProps {
  onClose: () => void;
}

export function BlockPalette({ onClose }: BlockPaletteProps) {
  const { addBlock } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const filteredBlocks = blockDefinitions.filter((block) => {
    const matchesSearch = block.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBlock = (blockType: string) => {
    const blockId = `${blockType}-${Date.now()}`;
    const defaultData = defaultBlockData[blockType as keyof typeof defaultBlockData] || {};
    
    addBlock({
      id: blockId,
      type: blockType,
      data: defaultData,
    } as any); // Typage simplifié pour éviter les problèmes d'union complexe
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-muted-foreground">
              Ajouter un Bloc
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choisissez un type de bloc pour l'ajouter à votre page
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground0" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-border space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un bloc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('Tous')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'Tous'
                  ? 'bg-indigo-600 text-card-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-card-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Block Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredBlocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun bloc trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredBlocks.map((block) => (
                <button
                  key={block.type}
                  onClick={() => handleAddBlock(block.type)}
                  className="group p-6 border-2 border-border rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-card-foreground transition-colors">
                      {block.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-muted-foreground mb-1">
                        {block.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {block.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted">
          <p className="text-xs text-muted-foreground text-center">
            💡 Astuce: Vous pouvez réorganiser les blocs par glisser-déposer après les avoir ajoutés
          </p>
        </div>
      </div>
    </div>
  );
}
