// apps/web/themes/ocean.ts
import type { Theme } from '@/shared/theme.types';

export const oceanTheme: Theme = {
  name: 'Océan',
  colors: {
    primary: '#0284c7',      // Bleu océan plus foncé pour le contraste
    secondary: '#0891b2',   // Cyan plus contrasté
    accent: '#0e7490',      // Turquoise équilibré
    background: '#f8fafc',  // Gris bleuté très clair
    foreground: '#0f172a',  // Gris très foncé pour le texte
    card: '#ffffff',        // Blanc pur pour les cartes
    border: '#cbd5e1',      // Gris moyen pour les bordures
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
