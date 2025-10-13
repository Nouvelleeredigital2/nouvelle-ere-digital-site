// apps/web/themes/forest.ts
import type { Theme } from '@/shared/theme.types';

export const forestTheme: Theme = {
  name: 'Forêt',
  colors: {
    primary: '#16a34a',     // Vert naturel équilibré
    secondary: '#059669',   // Vert émeraude pour le contraste
    accent: '#65a30d',      // Vert lime pour l'accent
    background: '#f8fafc',  // Gris très clair avec une touche de vert
    foreground: '#14532d',  // Vert très foncé pour le texte
    card: '#ffffff',        // Blanc pur pour les cartes
    border: '#d1d5db',      // Gris neutre pour les bordures
  },
  typography: {
    fontFamily: {
      sans: '"Inter", sans-serif',
      serif: '"Playfair Display", serif',
    },
    fontSize: {
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
  },
  styles: {
    borderRadius: '0.5rem',
    cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    buttonPadding: '0.5rem 1rem',
  },
};
