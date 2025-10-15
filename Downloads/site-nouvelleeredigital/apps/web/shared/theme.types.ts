// apps/web/shared/theme.types.ts

export type LayoutStyle = 'symmetrical-grid' | 'asymmetrical-masonry' | 'single-column';
export type HeroStyle = 'full-visual' | 'split-text-image' | 'minimalist';
export type TextAlign = 'text-left' | 'text-center' | 'text-right';
export type Mood = 'dark' | 'light' | 'minimal' | 'colorful' | 'warm' | 'cool';
export type Energy = 'calm' | 'energetic' | 'dynamic' | 'subtle' | 'intense';

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

export interface CreativePersona {
  id: string;
  name: string;
  description: string;
  archetype: string;
  visualIdentity: {
    mood: Mood;
    energy: Energy;
  };
  settings: {
    colors: {
      background: string;
      foreground: string;
      primary: string;
      secondary: string;
      accent: string;
      card: string;
      border: string;
      muted: string;
      success: string;
      warning: string;
      error: string;
    };
    typography: {
      fontFamilySans: string;
      fontFamilySerif: string;
      fontFamilyMono: string;
      scale?: string;
      lineHeight?: string;
    };
    styles: {
      borderRadius: string;
      cardShadow?: string;
      spacing?: string;
    };
    layouts: {
      gallery: LayoutStyle;
      heroStyle: HeroStyle;
      heroTextAlign: TextAlign;
      sections?: LayoutStyle;
      navigation?: string;
    };
    animations: {
      intensity: string;
      transitions?: string;
    };
  };
}
