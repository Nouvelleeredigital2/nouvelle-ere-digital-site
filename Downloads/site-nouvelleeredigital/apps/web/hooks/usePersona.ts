'use client';

import { useState, useEffect } from 'react';

export interface Persona {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
  };
  styles: {
    borderRadius: string;
    shadow: string;
    transition: string;
  };
  layouts: {
    container: string;
    grid: string;
    spacing: string;
  };
  animations: {
    fadeIn: string;
    slideUp: string;
    bounce: string;
  };
}

export function usePersona() {
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const [availablePersonas, setAvailablePersonas] = useState<Persona[]>([]);

  useEffect(() => {
    // Charger les personas disponibles
    const personas: Persona[] = [
      {
        id: 'naturel',
        name: 'Le Naturel',
        description: 'Design épuré et naturel',
        colors: {
          primary: '#10b981',
          secondary: '#059669',
          accent: '#34d399',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#111827',
          textSecondary: '#6b7280',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          headingFont: 'Inter, sans-serif',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
          },
        },
        styles: {
          borderRadius: '0.5rem',
          shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
        },
        layouts: {
          container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          spacing: 'space-y-6',
        },
        animations: {
          fadeIn: 'animate-fade-in',
          slideUp: 'animate-slide-up',
          bounce: 'animate-bounce',
        },
      },
    ];

    setAvailablePersonas(personas);
    setCurrentPersona(personas[0]);
  }, []);

  const switchPersona = (personaId: string) => {
    const persona = availablePersonas.find(p => p.id === personaId);
    if (persona) {
      setCurrentPersona(persona);
    }
  };

  return {
    currentPersona,
    availablePersonas,
    switchPersona,
  };
}
