// apps/web/personas/architecte.ts
import type { CreativePersona } from '@/shared/theme.types';

export const architectePersona: CreativePersona = {
  id: 'architecte',
  name: 'L\'Architecte',
  description: 'Structure, précision et fonctionnalité. Pour ceux qui construisent des expériences solides.',
  archetype: 'Le Maître Constructeur',
  visualIdentity: {
    mood: 'light',
    energy: 'sophisticated',
  },
  settings: {
    colors: {
      background: '#f8fafc', // Gris très clair
      foreground: '#0f172a', // Gris très foncé
      primary: '#2563eb',    // Bleu professionnel
      secondary: '#475569',  // Gris ardoise
      accent: '#16a34a',     // Vert succès
      card: '#ffffff',       // Blanc pur
      border: '#e2e8f0',     // Gris clair
      muted: 'rgba(148, 163, 184, 0.3)',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Roboto", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: 'comfortable',
      lineHeight: 'normal',
    },
    styles: {
      borderRadius: 'md',
      cardShadow: 'sm',
      spacing: 'normal',
    },
    layouts: {
      gallery: 'symmetrical-grid',
      heroStyle: 'split-text-image',
      heroTextAlign: 'text-left',
      sections: 'symmetrical-grid',
      navigation: 'horizontal',
    },
    animations: {
      intensity: 'subtle',
      transitions: 'smooth',
    },
  },
};
