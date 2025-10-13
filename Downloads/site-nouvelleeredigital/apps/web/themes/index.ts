import type { Theme } from '@/shared/theme.types';

// L'ARTISTE - Le Visionnaire Créatif
export const artisteTheme: Theme = {
  id: 'artiste',
  name: 'L\'Artiste',
  description: 'Immersion, audace et émotion. Pour ceux qui voient le monde à travers un prisme créatif.',
  settings: {
    colors: {
      background: '#0a0a2a', // Bleu nuit profond
      foreground: '#e2e8f0', // Gris clair argenté
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
    },
    styles: {
      borderRadius: '0.75rem',
    },
    layouts: {
      gallery: 'asymmetrical-masonry',
      heroStyle: 'full-visual',
      heroTextAlign: 'text-center',
    },
  },
};

// L'ARCHITECTE - Le Maître Constructeur
export const architecteTheme: Theme = {
  id: 'architecte',
  name: 'L\'Architecte',
  description: 'Structure, précision et fonctionnalité. Pour ceux qui construisent des expériences solides.',
  settings: {
    colors: {
      background: '#f8fafc', // Gris très clair
      foreground: '#1e293b', // Gris foncé
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
    },
    styles: {
      borderRadius: '0.5rem',
    },
    layouts: {
      gallery: 'symmetrical-grid',
      heroStyle: 'split-text-image',
      heroTextAlign: 'text-left',
    },
  },
};

// LE STRATÈGE - Le Maître Tacticien
export const strategeTheme: Theme = {
  id: 'stratege',
  name: 'Le Stratège',
  description: 'Analyse, stratégie et optimisation. Pour ceux qui planifient chaque détail.',
  settings: {
    colors: {
      background: '#1e293b', // Gris ardoise
      foreground: '#f1f5f9', // Blanc cassé
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
    },
    styles: {
      borderRadius: '0.25rem',
    },
    layouts: {
      gallery: 'single-column',
      heroStyle: 'full-visual',
      heroTextAlign: 'text-center',
    },
  },
};

// L'INNOVATEUR - Le Visionnaire Technologique
export const innovateurTheme: Theme = {
  id: 'innovateur',
  name: 'L\'Innovateur',
  description: 'Technologie, futur et disruption. Pour ceux qui repoussent les limites du possible.',
  settings: {
    colors: {
      background: '#0f172a', // Bleu très sombre
      foreground: '#f8fafc', // Blanc pur
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
    },
    styles: {
      borderRadius: '0.75rem',
    },
    layouts: {
      gallery: 'symmetrical-grid',
      heroStyle: 'full-visual',
      heroTextAlign: 'text-center',
    },
  },
};

// LE CONNECTEUR - Le Tisseur de Liens
export const connecteurTheme: Theme = {
  id: 'connecteur',
  name: 'Le Connecteur',
  description: 'Relations, communauté et collaboration. Pour ceux qui unissent les talents.',
  settings: {
    colors: {
      background: '#fef7ed', // Beige chaud
      foreground: '#1f2937', // Gris chaud
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
    },
    styles: {
      borderRadius: '1rem',
    },
    layouts: {
      gallery: 'single-column',
      heroStyle: 'split-text-image',
      heroTextAlign: 'text-center',
    },
  },
};

// Export de tous les thèmes
export const themes = [
  artisteTheme,
  architecteTheme,
  strategeTheme,
  innovateurTheme,
  connecteurTheme,
] as const;

export type ThemeId = typeof themes[number]['id'];
