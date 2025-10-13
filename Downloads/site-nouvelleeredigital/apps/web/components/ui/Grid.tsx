"use client";

import React from 'react';
import { useCreativePersona } from '@/components/context/ThemeProvider';
import { cn } from '@/lib/utils';
import type { LayoutStyle, HeroStyle } from '@/shared/theme.types';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  layoutType?: 'gallery' | 'sections' | 'heroStyle';
  fallbackLayout?: LayoutStyle | HeroStyle;
}

export function Grid({
  children,
  className,
  layoutType = 'gallery',
  fallbackLayout = 'symmetrical-grid'
}: GridProps) {
  const { persona } = useCreativePersona();

  // Essaie d'abord d'utiliser la valeur du persona, sinon utilise le fallback
  const getLayoutFromPersona = (): LayoutStyle | HeroStyle => {
    try {
      if (layoutType === 'gallery') {
        return persona?.settings?.layouts?.gallery || fallbackLayout;
      } else if (layoutType === 'sections') {
        return persona?.settings?.layouts?.sections || fallbackLayout;
      } else if (layoutType === 'heroStyle') {
        return persona?.settings?.layouts?.heroStyle || fallbackLayout;
      }
      return fallbackLayout;
    } catch (error) {
      console.warn('Erreur lors de la lecture du layout du persona:', error);
      return fallbackLayout;
    }
  };

  const layoutStyle = getLayoutFromPersona();

  const gridClasses: Record<string, string> = {
    'symmetrical-grid': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
    'asymmetrical-masonry': 'columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6',
    'single-column': 'flex flex-col items-center space-y-6 md:space-y-8',
    'magazine-layout': 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr',
    'card-grid': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    'full-visual': 'w-full',
    'split-text-image': 'grid grid-cols-1 lg:grid-cols-2 gap-8',
    'minimalist': 'max-w-4xl mx-auto',
    'immersive': 'w-full min-h-screen flex items-center justify-center',
    'classic': 'max-w-6xl mx-auto',
  };

  // Gestion spéciale pour les layouts qui nécessitent un wrapper
  if (layoutStyle === 'single-column') {
    return (
      <div className={cn(gridClasses[layoutStyle], className)}>
        {React.Children.map(children, child => (
          <div className="w-full max-w-3xl">{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(gridClasses[layoutStyle] || gridClasses[fallbackLayout as string], className)}>
      {children}
    </div>
  );
}

// Export aussi l'ancien nom pour la compatibilité
export const AdaptiveGrid = Grid;
