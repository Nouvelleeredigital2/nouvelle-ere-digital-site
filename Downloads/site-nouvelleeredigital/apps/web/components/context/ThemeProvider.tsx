// apps/web/components/context/ThemeProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { personas } from '@/personas';
import type { CreativePersona, PersonaId } from '@/shared/theme.types';

interface CreativePersonaContextType {
  persona: CreativePersona;
  setPersona: (personaId: PersonaId) => void;
  personas: readonly CreativePersona[];
}

const CreativePersonaContext = createContext<CreativePersonaContextType | undefined>(undefined);

export function CreativePersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<CreativePersona>(personas[0]); // Artiste par défaut

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
    root.style.setProperty('--typography-scale', settings.typography.scale);
    root.style.setProperty('--line-height', settings.typography.lineHeight);

    // Appliquer les styles
    root.style.setProperty('--border-radius', settings.styles.borderRadius);
    root.style.setProperty('--card-shadow', settings.styles.cardShadow);
    root.style.setProperty('--spacing', settings.styles.spacing);

    // Appliquer les layouts
    Object.entries(settings.layouts).forEach(([key, value]) => {
      root.style.setProperty(`--layout-${key}`, value);
    });

    // Appliquer les animations
    root.style.setProperty('--animation-intensity', settings.animations.intensity);
    root.style.setProperty('--animation-transitions', settings.animations.transitions);

    // Classe CSS pour le persona actif
    root.classList.remove(...personas.map(p => `persona-${p.id}`));
    root.classList.add(`persona-${activePersona.id}`);

    // Sauvegarder le persona choisi
    localStorage.setItem('creative-persona', activePersona.id);

  }, [activePersona]);

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

export const useCreativePersona = () => {
  const context = useContext(CreativePersonaContext);
  if (!context) {
    throw new Error('useCreativePersona must be used within a CreativePersonaProvider');
  }
  return context;
};

// Alias pour compatibilité avec l'ancien système
export const useTheme = useCreativePersona;
export const ThemeProvider = CreativePersonaProvider;
