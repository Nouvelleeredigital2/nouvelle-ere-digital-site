// apps/web/shared/theme.types.ts

export type LayoutStyle = 'symmetrical-grid' | 'asymmetrical-masonry' | 'single-column' | 'magazine-layout' | 'card-grid';
export type HeroStyle = 'full-visual' | 'split-text-image' | 'minimalist' | 'immersive' | 'classic';
export type TypographyScale = 'compact' | 'comfortable' | 'spacious' | 'dramatic';

export interface CreativePersona {
  id: string;
  name: string;
  description: string;
  archetype: string;
  visualIdentity: {
    mood: 'dark' | 'light' | 'vibrant' | 'minimal' | 'warm' | 'cool';
    energy: 'calm' | 'energetic' | 'sophisticated' | 'playful' | 'bold';
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
      scale: TypographyScale;
      lineHeight: 'tight' | 'normal' | 'relaxed';
    };
    styles: {
      borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
      cardShadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
      spacing: 'compact' | 'normal' | 'spacious';
    };
    layouts: {
      gallery: LayoutStyle;
      hero: HeroStyle;
      sections: LayoutStyle;
      navigation: 'horizontal' | 'vertical' | 'floating' | 'minimal';
    };
    animations: {
      intensity: 'subtle' | 'moderate' | 'dramatic';
      transitions: 'smooth' | 'snappy' | 'elastic';
    };
  };
}

export type PersonaId = CreativePersona['id'];
