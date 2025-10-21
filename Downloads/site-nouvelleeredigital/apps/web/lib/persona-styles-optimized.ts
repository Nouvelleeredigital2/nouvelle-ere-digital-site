// Système de styles optimisé pour les personas
// Utilise des variables CSS au lieu de classes JavaScript pour de meilleures performances

import { useState, useEffect } from 'react';

export interface PersonaTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const personaThemes: Record<string, PersonaTheme> = {
  innovateur: {
    name: 'Innovateur',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  architecte: {
    name: 'Architecte',
    colors: {
      primary: '#6366F1',
      secondary: '#4338CA',
      accent: '#EC4899',
      background: '#FAFAFA',
      surface: '#F5F5F5',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#D1D5DB',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
    },
    typography: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem',
      xl: '0.5rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  artiste: {
    name: 'Artiste',
    colors: {
      primary: '#EC4899',
      secondary: '#BE185D',
      accent: '#F59E0B',
      background: '#FEFEFE',
      surface: '#F9FAFB',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    typography: {
      fontFamily: 'Playfair Display, serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  connecteur: {
    name: 'Connecteur',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#3B82F6',
      background: '#FFFFFF',
      surface: '#F0FDF4',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#D1FAE5',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    typography: {
      fontFamily: 'Poppins, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  stratege: {
    name: 'Stratège',
    colors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#FAF5FF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E9D5FF',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    typography: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
};

// Fonction pour appliquer un thème de persona
export function applyPersonaTheme(personaId: string) {
  const theme = personaThemes[personaId];
  if (!theme) return;

  const root = document.documentElement;
  
  // Appliquer les couleurs
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Appliquer la typographie
  root.style.setProperty('--font-family', theme.typography.fontFamily);
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-weight-${key}`, value.toString());
  });
  
  // Appliquer l'espacement
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Appliquer les rayons de bordure
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--border-radius-${key}`, value);
  });
  
  // Appliquer les ombres
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
  
  // Ajouter l'attribut data-persona pour le CSS
  root.setAttribute('data-persona', personaId);
}

// Fonction pour obtenir les classes CSS d'un thème
export function getPersonaClasses(personaId: string) {
  const theme = personaThemes[personaId];
  if (!theme) return {};

  return {
    colors: {
      primary: `text-[var(--color-primary)]`,
      secondary: `text-[var(--color-secondary)]`,
      accent: `text-[var(--color-accent)]`,
      background: `bg-[var(--color-background)]`,
      surface: `bg-[var(--color-surface)]`,
      text: `text-[var(--color-text)]`,
      textSecondary: `text-[var(--color-textSecondary)]`,
      border: `border-[var(--color-border)]`,
      success: `text-[var(--color-success)]`,
      warning: `text-[var(--color-warning)]`,
      error: `text-[var(--color-error)]`,
    },
    typography: {
      fontFamily: `font-[var(--font-family)]`,
      fontSize: {
        xs: `text-[var(--font-size-xs)]`,
        sm: `text-[var(--font-size-sm)]`,
        base: `text-[var(--font-size-base)]`,
        lg: `text-[var(--font-size-lg)]`,
        xl: `text-[var(--font-size-xl)]`,
        '2xl': `text-[var(--font-size-2xl)]`,
        '3xl': `text-[var(--font-size-3xl)]`,
      },
      fontWeight: {
        normal: `font-[var(--font-weight-normal)]`,
        medium: `font-[var(--font-weight-medium)]`,
        semibold: `font-[var(--font-weight-semibold)]`,
        bold: `font-[var(--font-weight-bold)]`,
      },
    },
    spacing: {
      xs: `p-[var(--spacing-xs)]`,
      sm: `p-[var(--spacing-sm)]`,
      md: `p-[var(--spacing-md)]`,
      lg: `p-[var(--spacing-lg)]`,
      xl: `p-[var(--spacing-xl)]`,
      '2xl': `p-[var(--spacing-2xl)]`,
    },
    borderRadius: {
      sm: `rounded-[var(--border-radius-sm)]`,
      md: `rounded-[var(--border-radius-md)]`,
      lg: `rounded-[var(--border-radius-lg)]`,
      xl: `rounded-[var(--border-radius-xl)]`,
    },
    shadows: {
      sm: `shadow-[var(--shadow-sm)]`,
      md: `shadow-[var(--shadow-md)]`,
      lg: `shadow-[var(--shadow-lg)]`,
      xl: `shadow-[var(--shadow-xl)]`,
    },
  };
}

// Hook pour utiliser le thème de persona
export function usePersonaTheme(personaId: string) {
  const [theme, setTheme] = useState<PersonaTheme | null>(null);
  const [classes, setClasses] = useState<ReturnType<typeof getPersonaClasses>>({});

  useEffect(() => {
    const personaTheme = personaThemes[personaId];
    if (personaTheme) {
      setTheme(personaTheme);
      setClasses(getPersonaClasses(personaId));
      applyPersonaTheme(personaId);
    }
  }, [personaId]);

  return { theme, classes };
}