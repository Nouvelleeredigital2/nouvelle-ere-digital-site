'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Persona } from '@/hooks/usePersona';

interface PersonaContextType {
  currentPersona: Persona | null;
  availablePersonas: Persona[];
  switchPersona: (personaId: string) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <PersonaContext.Provider value={{
      currentPersona,
      availablePersonas,
      switchPersona,
    }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersonaContext() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersonaContext must be used within a PersonaProvider');
  }
  return context;
}
