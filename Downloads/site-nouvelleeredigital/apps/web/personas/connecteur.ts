// apps/web/personas/connecteur.ts
import type { CreativePersona } from '@/shared/theme.types';

export const connecteurPersona: CreativePersona = {
  id: 'connecteur',
  name: 'Le Connecteur',
  description: 'Harmonie, collaboration et chaleur humaine. Pour ceux qui unissent les idées.',
  archetype: 'Le Tisseur de Liens',
  visualIdentity: {
    mood: 'warm',
    energy: 'playful',
  },
  settings: {
    colors: {
      background: '#fef7ed', // Beige chaud
      foreground: '#92400e', // Marron foncé
      primary: '#ea580c',    // Orange terre cuite
      secondary: '#f59e0b',  // Orange doré
      accent: '#ec4899',     // Rose dynamique
      card: '#ffffff',       // Blanc pur
      border: '#fed7aa',     // Orange très clair
      muted: 'rgba(251, 191, 36, 0.2)',
      success: '#16a34a',
      warning: '#d97706',
      error: '#dc2626',
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Crimson Text", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: 'comfortable',
      lineHeight: 'relaxed',
    },
    styles: {
      borderRadius: 'lg',
      cardShadow: 'md',
      spacing: 'spacious',
    },
    layouts: {
      gallery: 'card-grid',
      hero: 'classic',
      sections: 'symmetrical-grid',
      navigation: 'horizontal',
    },
    animations: {
      intensity: 'moderate',
      transitions: 'smooth',
    },
  },
};
