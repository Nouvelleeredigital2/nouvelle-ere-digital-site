'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { IconBlock } from '@/lib/types/blocks';

interface IconBlockProps {
  block: IconBlock;
  isEditing?: boolean;
}

// Liste des icônes disponibles (extrait de Lucide React)
const availableIcons = [
  'home', 'user', 'users', 'settings', 'search', 'menu', 'close', 'plus', 'minus',
  'edit', 'trash', 'save', 'download', 'upload', 'copy', 'share', 'heart', 'star',
  'bell', 'mail', 'phone', 'calendar', 'clock', 'map', 'navigation', 'camera',
  'image', 'video', 'music', 'play', 'pause', 'stop', 'volume', 'wifi', 'bluetooth',
  'battery', 'lock', 'unlock', 'eye', 'eye-off', 'shield', 'alert', 'check',
  'x', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left',
  'chevron-right', 'chevron-up', 'chevron-down', 'external-link', 'link',
  'bookmark', 'tag', 'folder', 'file', 'archive', 'database', 'server', 'cloud',
  'monitor', 'smartphone', 'tablet', 'laptop', 'keyboard', 'mouse', 'headphones',
  'speaker', 'mic', 'webcam', 'printer', 'scanner', 'hard-drive', 'usb', 'sd-card',
  'wrench', 'hammer', 'screwdriver', 'gear', 'cog', 'tool', 'package', 'box',
  'truck', 'car', 'bike', 'plane', 'train', 'ship', 'anchor', 'compass',
  'globe', 'earth', 'sun', 'moon', 'cloud', 'cloud-rain', 'cloud-snow',
  'wind', 'thermometer', 'droplet', 'flame', 'zap', 'lightning', 'snowflake',
  'flower', 'tree', 'leaf', 'seedling', 'bug', 'fish', 'bird', 'cat', 'dog',
  'paw', 'bone', 'cake', 'coffee', 'wine', 'beer', 'pizza', 'hamburger'
];

export function IconBlock({ block, isEditing = false }: IconBlockProps) {
  const { icon, size, color, backgroundColor, shape, animation, link, tooltip } = block.data;

  // Obtenir le composant d'icône depuis Lucide
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.HelpCircle;

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-10 h-10';
      case '2xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getShapeClass = (shape: string) => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-none';
      case 'rounded': return 'rounded-lg';
      case 'none': return 'rounded-none';
      default: return 'rounded-none';
    }
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'spin': return 'animate-spin';
      case 'pulse': return 'animate-pulse';
      case 'bounce': return 'animate-bounce';
      case 'none': return '';
      default: return '';
    }
  };

  const iconElement = (
    <div
      className={`
        inline-flex items-center justify-center
        ${getSizeClass(size)}
        ${getShapeClass(shape)}
        ${getAnimationClass(animation || 'none')}
        ${backgroundColor ? 'p-2' : ''}
      `}
      style={{
        color: color || 'currentColor',
        backgroundColor: backgroundColor || 'transparent',
      }}
      title={tooltip || icon}
    >
      <IconComponent className={getSizeClass(size)} />
    </div>
  );

  if (link && !isEditing) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity"
      >
        {iconElement}
      </a>
    );
  }

  return iconElement;
}

// Composant pour l'éditeur d'icônes
export function IconSelector({ 
  selectedIcon, 
  onIconSelect 
}: { 
  selectedIcon: string; 
  onIconSelect: (icon: string) => void; 
}) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredIcons = availableIcons.filter(iconName => {
    return iconName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une icône..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grille des icônes */}
      <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
        {filteredIcons.map((iconName) => {
          const IconComponent = (LucideIcons as any)[iconName];
          if (!IconComponent) return null;

          return (
            <button
              key={iconName}
              onClick={() => onIconSelect(iconName)}
              className={`
                p-2 rounded-lg border-2 transition-all hover:bg-gray-50
                ${selectedIcon === iconName 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
                }
              `}
              title={iconName}
            >
              <IconComponent className="w-5 h-5 mx-auto" />
            </button>
          );
        })}
      </div>

      {/* Icône sélectionnée */}
      {selectedIcon && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Icône sélectionnée:</span>
            <div className="flex items-center space-x-2">
              {(LucideIcons as any)[selectedIcon] && React.createElement(
                (LucideIcons as any)[selectedIcon], 
                { className: "w-4 h-4" }
              )}
              <span className="text-sm text-gray-600">{selectedIcon}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}