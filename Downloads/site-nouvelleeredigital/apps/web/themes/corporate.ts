// apps/web/themes/corporate.ts
import type { Theme } from '@/shared/theme.types';

export const corporateTheme: Theme = {
  name: 'Corporate',
  colors: {
    primary: '#2563eb',
    secondary: '#475569',
    accent: '#16a34a',
    background: '#f8fafc',
    foreground: '#0f172a',
    card: '#ffffff',
    border: '#e2e8f0',
  },
  typography: {
    fontFamily: {
      sans: '"Inter", sans-serif',
      serif: '"Roboto", serif',
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
