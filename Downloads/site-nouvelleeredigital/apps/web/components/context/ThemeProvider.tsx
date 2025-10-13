'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { personas } from '@/personas';
import type { CreativePersona, PersonaId } from '@/shared/theme.types';
import { usePersonaAnalytics } from '@/hooks/usePersonaAnalytics';

interface CreativePersonaContextType {
  persona: CreativePersona;
  setPersona: (personaId: PersonaId) => void;
  personas: readonly CreativePersona[];
}

const CreativePersonaContext = createContext<CreativePersonaContextType | undefined>(undefined);

export function CreativePersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<CreativePersona>(personas[0]); // Artiste par défaut
  const { trackEngagement } = usePersonaAnalytics();

  // Sauvegarder la préférence dans localStorage
  useEffect(() => {
    const savedPersonaId = localStorage.getItem('creative-persona');
    if (savedPersonaId) {
      const savedPersona = personas.find(p => p.id === savedPersonaId);
      if (savedPersona) {
        setActivePersona(savedPersona);
      }
    }
  }, []);

  // Effet pour appliquer les variables CSS complètes au changement de persona
  useEffect(() => {
    const root = document.documentElement;
    const settings = activePersona.settings;

    // Appliquer les couleurs
    Object.entries(settings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Appliquer la typographie
    root.style.setProperty('--font-sans', settings.typography.fontFamilySans);
    root.style.setProperty('--font-serif', settings.typography.fontFamilySerif);
    root.style.setProperty('--font-mono', settings.typography.fontFamilyMono);

    // Classe CSS pour le persona actif
    root.classList.remove(...personas.map(p => `persona-${p.id}`));
    root.classList.add(`persona-${activePersona.id}`);

    // Sauvegarder le persona choisi
    localStorage.setItem('creative-persona', activePersona.id);

    // Tracker l'événement de changement de persona
    trackEngagement('persona_changed', {
      fromPersona: '', // Sera défini par le système d'analytics
      toPersona: activePersona.id,
      archetype: activePersona.name
    });

  }, [activePersona, trackEngagement]);

  const setPersona = (personaId: PersonaId) => {
    const newPersona = personas.find(p => p.id === personaId);
    if (newPersona) {
      setActivePersona(newPersona);
    }
  };

  const value = useMemo(() => ({
    persona: activePersona,
    setPersona,
    personas,
  }), [activePersona]);

  return (
    <CreativePersonaContext.Provider value={value}>
      {children}
    </CreativePersonaContext.Provider>
  );
}

export const usePersona = () => {
  const context = useContext(CreativePersonaContext);

  // Vérification robuste du contexte
  if (context === null || context === undefined) {
    // Fallback pour tous les cas où le contexte n'est pas disponible
    if (typeof window === 'undefined') {
      // Server-side rendering - retourner un objet fallback
      return {
        persona: personas[0] || {
          id: 'default',
          name: 'Default Persona',
          description: 'Default creative persona',
          archetype: 'Default',
          visualIdentity: { mood: 'neutral', energy: 'calm' },
          settings: {
            colors: { background: '#ffffff', foreground: '#000000' },
            typography: { fontFamilySans: 'Inter' },
            styles: { borderRadius: 'medium' },
            layouts: { gallery: 'grid' },
            animations: { intensity: 'subtle' }
          }
        },
        setPersona: () => {},
        personas: personas
      };
    } else {
      // Client-side - retourner un objet fallback avec warning
      console.warn('usePersona: Contexte non disponible, utilisation du fallback');
      return {
        persona: personas[0] || {
          id: 'default',
          name: 'Default Persona',
          description: 'Default creative persona',
          archetype: 'Default',
          visualIdentity: { mood: 'neutral', energy: 'calm' },
          settings: {
            colors: { background: '#ffffff', foreground: '#000000' },
            typography: { fontFamilySans: 'Inter' },
            styles: { borderRadius: 'medium' },
            layouts: { gallery: 'grid' },
            animations: { intensity: 'subtle' }
          }
        },
        setPersona: () => {},
        personas: personas
      };
    }
  }

  return context;
};

// Alias pour compatibilité avec l'ancien système
export const useTheme = usePersona;
export const ThemeProvider = CreativePersonaProvider;
