// apps/web/personas/artiste.ts
import type { CreativePersona } from '@/shared/theme.types';

export const artistePersona: CreativePersona = {
  id: 'artiste',
  name: 'L\'Artiste',
  description: 'Immersion, audace et émotion. Pour ceux qui voient le monde à travers un prisme créatif.',
  archetype: 'Le Visionnaire Créatif',
  visualIdentity: {
    mood: 'dark',
    energy: 'energetic',
  },
  settings: {
    colors: {
      background: '#0a0a2a', // Bleu nuit profond
      foreground: '#e2e8f0', // Gris clair argenté
      primary: '#818cf8',    // Violet IA électrique
      secondary: '#fde047',  // Jaune événementiel éclatant
      accent: '#34d399',     // Vert web dynamique
      card: 'rgba(30, 41, 59, 0.8)', // Ardoise semi-transparent
      border: 'rgba(51, 65, 85, 0.6)',
      muted: 'rgba(51, 65, 85, 0.4)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: 'spacious',
      lineHeight: 'relaxed',
    },
    styles: {
      borderRadius: 'lg',
      cardShadow: 'xl',
      spacing: 'spacious',
    },
    layouts: {
      gallery: 'asymmetrical-masonry',
      heroStyle: 'immersive',
      heroTextAlign: 'text-center',
      sections: 'magazine-layout',
      navigation: 'floating',
    },
    animations: {
      intensity: 'dramatic',
      transitions: 'elastic',
    },
  },
};
