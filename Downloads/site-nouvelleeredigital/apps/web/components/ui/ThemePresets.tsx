// components/ui/ThemePresets.tsx
"use client";

import { useState } from 'react';
import { useStyle } from '@/contexts/StyleContext';
import { Sparkles, Briefcase, Palette, Zap, Heart, Leaf } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'business' | 'creative' | 'tech' | 'minimal' | 'bold';
  config: {
    headingVariant: string;
    bodyFont: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    borderRadius: string;
    spacing: string;
    mode: string;
  };
  preview: {
    gradient: string;
    textColor: string;
  };
}

const themePresets: ThemePreset[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professionnel et sobre',
    icon: Briefcase,
    category: 'business',
    config: {
      headingVariant: 'bold',
      bodyFont: 'inter',
      primaryColor: '#1e40af',
      secondaryColor: '#0369a1',
      accentColor: '#0891b2',
      borderRadius: 'small',
      spacing: 'comfortable',
      mode: 'light',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #1e40af, #0369a1)',
      textColor: '#1e40af',
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Audacieux et coloré',
    icon: Palette,
    category: 'creative',
    config: {
      headingVariant: 'fade',
      bodyFont: 'inter',
      primaryColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      accentColor: '#f59e0b',
      borderRadius: 'xl',
      spacing: 'spacious',
      mode: 'light',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      textColor: '#ec4899',
    }
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Moderne et futuriste',
    icon: Zap,
    category: 'tech',
    config: {
      headingVariant: 'shadow',
      bodyFont: 'mono',
      primaryColor: '#06b6d4',
      secondaryColor: '#3b82f6',
      accentColor: '#8b5cf6',
      borderRadius: 'medium',
      spacing: 'comfortable',
      mode: 'dark',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      textColor: '#06b6d4',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple et élégant',
    icon: Sparkles,
    category: 'minimal',
    config: {
      headingVariant: 'minimal',
      bodyFont: 'inter',
      primaryColor: '#000000',
      secondaryColor: '#525252',
      accentColor: '#737373',
      borderRadius: 'none',
      spacing: 'compact',
      mode: 'light',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #000000, #525252)',
      textColor: '#000000',
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Vert et apaisant',
    icon: Leaf,
    category: 'creative',
    config: {
      headingVariant: 'underlined',
      bodyFont: 'inter',
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      accentColor: '#84cc16',
      borderRadius: 'large',
      spacing: 'comfortable',
      mode: 'light',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      textColor: '#059669',
    }
  },
  {
    id: 'passion',
    name: 'Passion',
    description: 'Énergique et chaleureux',
    icon: Heart,
    category: 'bold',
    config: {
      headingVariant: 'shadow',
      bodyFont: 'inter',
      primaryColor: '#dc2626',
      secondaryColor: '#ea580c',
      accentColor: '#f59e0b',
      borderRadius: 'large',
      spacing: 'spacious',
      mode: 'light',
    },
    preview: {
      gradient: 'linear-gradient(135deg, #dc2626, #ea580c)',
      textColor: '#dc2626',
    }
  },
];

export const ThemePresets = () => {
  const { saveConfig } = useStyle();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tous', count: themePresets.length },
    { id: 'business', label: 'Business', count: themePresets.filter(t => t.category === 'business').length },
    { id: 'creative', label: 'Créatif', count: themePresets.filter(t => t.category === 'creative').length },
    { id: 'tech', label: 'Tech', count: themePresets.filter(t => t.category === 'tech').length },
    { id: 'minimal', label: 'Minimal', count: themePresets.filter(t => t.category === 'minimal').length },
    { id: 'bold', label: 'Audacieux', count: themePresets.filter(t => t.category === 'bold').length },
  ];

  const filteredThemes = selectedCategory && selectedCategory !== 'all'
    ? themePresets.filter(theme => theme.category === selectedCategory)
    : themePresets;

  const applyTheme = (preset: ThemePreset) => {
    saveConfig(preset.config as any);
  };

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Thèmes Pré-définis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Appliquez un thème complet en un clic
        </p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category.id || (category.id === 'all' && !selectedCategory)
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
              }
            `}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Grille de thèmes */}
      <div className="grid grid-cols-2 gap-4">
        {filteredThemes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme)}
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-purple-600 transition-all hover:scale-105 active:scale-95"
            >
              {/* Gradient de fond */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: theme.preview.gradient }}
              />

              {/* Contenu */}
              <div className="relative p-4 space-y-3">
                {/* Icône */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ background: theme.preview.gradient }}
                >
                  <Icon size={20} />
                </div>

                {/* Nom et description */}
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {theme.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {theme.description}
                  </div>
                </div>

                {/* Aperçu des couleurs */}
                <div className="flex gap-1">
                  <div
                    className="w-8 h-8 rounded border border-white/20"
                    style={{ backgroundColor: theme.config.primaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded border border-white/20"
                    style={{ backgroundColor: theme.config.secondaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded border border-white/20"
                    style={{ backgroundColor: theme.config.accentColor }}
                  />
                </div>

                {/* Badge hover */}
                {hoveredTheme === theme.id && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Cliquez pour appliquer
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <div className="text-blue-600 dark:text-blue-400">
            💡
          </div>
          <div className="flex-1 text-sm text-blue-900 dark:text-blue-200">
            <div className="font-medium mb-1">Astuce</div>
            <div>Après avoir appliqué un thème, vous pouvez le personnaliser davantage dans les autres onglets.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Hook pour créer des thèmes personnalisés ====================

export const useThemeBuilder = () => {
  const { config, saveConfig } = useStyle();

  const saveAsCustomTheme = (name: string, description: string) => {
    const customThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');

    const newTheme = {
      id: `custom-${Date.now()}`,
      name,
      description,
      config: { ...config },
      createdAt: new Date().toISOString(),
    };

    customThemes.push(newTheme);
    localStorage.setItem('custom-themes', JSON.stringify(customThemes));

    return newTheme;
  };

  const getCustomThemes = () => {
    return JSON.parse(localStorage.getItem('custom-themes') || '[]');
  };

  const deleteCustomTheme = (id: string) => {
    const customThemes = getCustomThemes();
    const filtered = customThemes.filter((t: any) => t.id !== id);
    localStorage.setItem('custom-themes', JSON.stringify(filtered));
  };

  return {
    saveAsCustomTheme,
    getCustomThemes,
    deleteCustomTheme,
  };
};

// ==================== Composant de sauvegarde de thème personnalisé ====================

export const SaveCustomTheme = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { saveAsCustomTheme } = useThemeBuilder();

  const handleSave = () => {
    if (!name.trim()) {
      alert('Veuillez donner un nom à votre thème');
      return;
    }

    saveAsCustomTheme(name, description);
    setIsOpen(false);
    setName('');
    setDescription('');
    alert('Thème sauvegardé !');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        💾 Sauvegarder comme thème personnalisé
      </button>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Nom du thème *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Mon thème corporate"
          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Couleurs de ma marque"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};
