"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AdaptiveGridProps {
  children: React.ReactNode;
  className?: string;
  layoutType?: 'gallery' | 'sections' | 'hero';
}

export function AdaptiveGrid({ children, className, layoutType = 'gallery' }: AdaptiveGridProps) {
  const [layoutStyle, setLayoutStyle] = useState<string>('symmetrical-grid');

  useEffect(() => {
    // Lire la variable CSS définie par le persona actif
    const cssVariable = `--layout-${layoutType}`;
    const computedStyle = getComputedStyle(document.documentElement);
    const layoutValue = computedStyle.getPropertyValue(cssVariable).trim() || 'symmetrical-grid';
    setLayoutStyle(layoutValue);
  }, [layoutType]);

  // Mapper les styles de layout vers les classes CSS
  const getLayoutClasses = (style: string) => {
    switch (style) {
      case 'symmetrical-grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'asymmetrical-masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'single-column':
        return 'flex flex-col gap-6';
      case 'magazine-layout':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr';
      case 'card-grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={cn(getLayoutClasses(layoutStyle), className)}>
      {children}
    </div>
  );
}
