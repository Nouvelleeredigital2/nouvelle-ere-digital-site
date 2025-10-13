// apps/web/shared/theme.types.ts

export type LayoutStyle = 'symmetrical-grid' | 'asymmetrical-masonry' | 'single-column';
export type HeroStyle = 'full-visual' | 'split-text-image';
export type TextAlign = 'text-left' | 'text-center' | 'text-right';

export interface Theme {
  id: string; 
  name: string;
  description: string;
  settings: {
    colors: { 
      background: string; 
      foreground: string; 
    };
    typography: { 
      fontFamilySans: string; 
      fontFamilySerif: string; 
    };
    styles: { 
      borderRadius: string; 
    };
    layouts: {
      gallery: LayoutStyle;
      heroStyle: HeroStyle;
      heroTextAlign: TextAlign;
    };
  };
}
