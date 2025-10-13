// apps/web/themes/midnight.ts
import type { Theme } from '@/shared/theme.types';

export const midnightTheme: Theme = {
  name: 'Minuit',
  colors: {
    primary: '#1e1b4b',
    secondary: '#312e81',
    accent: '#6366f1',
    background: '#0f0f23',
    foreground: '#e0e7ff',
    card: '#1e1b4b',
    border: '#4338ca',
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
    cardShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    buttonPadding: '0.5rem 1rem',
  },
};
