// apps/web/themes/forest.ts
import type { Theme } from '@/shared/theme.types';

export const forestTheme: Theme = {
  name: 'Forêt',
  colors: {
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#84cc16',
    background: '#f0fdf4',
    foreground: '#14532d',
    card: '#ffffff',
    border: '#bbf7d0',
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
