// apps/web/themes/ocean.ts
import type { Theme } from '@/shared/theme.types';

export const oceanTheme: Theme = {
  name: 'Océan',
  colors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#14b8a6',
    background: '#f0f9ff',
    foreground: '#0c4a6e',
    card: '#ffffff',
    border: '#bae6fd',
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
