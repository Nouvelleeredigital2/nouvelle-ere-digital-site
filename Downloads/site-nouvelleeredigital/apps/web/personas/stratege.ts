// apps/web/personas/stratege.ts
import type { CreativePersona } from '@/shared/theme.types';

export const strategePersona: CreativePersona = {
  id: 'stratege',
  name: 'Le Stratège',
  description: 'Analyse, stratégie et optimisation. Pour ceux qui planifient chaque détail.',
  archetype: 'Le Maître Tacticien',
  visualIdentity: {
    mood: 'minimal',
    energy: 'calm',
  },
  settings: {
    colors: {
      background: '#fafafa', // Blanc cassé minimaliste
      foreground: '#262626', // Gris très foncé
      primary: '#000000',    // Noir pur pour l'autorité
      secondary: '#737373',  // Gris moyen
      accent: '#2563eb',     // Bleu d'accent unique
      card: '#ffffff',       // Blanc pur
      border: '#f5f5f5',     // Gris très clair
      muted: 'rgba(161, 161, 170, 0.2)',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Georgia", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: 'compact',
      lineHeight: 'tight',
    },
    styles: {
      borderRadius: 'sm',
      cardShadow: 'none',
      spacing: 'compact',
    },
    layouts: {
      gallery: 'single-column',
      hero: 'minimalist',
      sections: 'single-column',
      navigation: 'minimal',
    },
    animations: {
      intensity: 'subtle',
      transitions: 'snappy',
    },
  },
};
