// apps/web/themes/galaxy.ts
import type { Theme } from '@/shared/theme.types';

export const galaxyTheme: Theme = {
  name: 'Galaxie',
  colors: {
    primary: '#818cf8', // IA
    secondary: '#fde047', // Événementiel
    accent: '#34d399', // Web
    background: '#0a0a2a',
    foreground: '#e2e8f0',
    card: '#1e293b',
    border: '#334155',
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
