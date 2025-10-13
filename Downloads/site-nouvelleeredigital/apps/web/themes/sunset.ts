// apps/web/themes/sunset.ts
import type { Theme } from '@/shared/theme.types';

export const sunsetTheme: Theme = {
  name: 'Coucher de Soleil',
  colors: {
    primary: '#f97316',
    secondary: '#fb7185',
    accent: '#eab308',
    background: '#fff7ed',
    foreground: '#9a3412',
    card: '#ffffff',
    border: '#fed7aa',
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
    borderRadius: '0.75rem',
    cardShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    buttonPadding: '0.5rem 1rem',
  },
};
