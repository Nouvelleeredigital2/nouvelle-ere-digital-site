'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '@/themes';
import type { Theme } from '@/shared/theme.types';

interface PersonaContextType {
  persona: Theme;
  setPersona: (personaId: string) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<Theme>(themes[0]); // 'artiste' par défaut

  useEffect(() => {
    const root = document.documentElement;
    // Injecte toutes les variables CSS du persona actif
    const settings = activePersona.settings;
    Object.entries(settings.colors).forEach(([key, value]) => root.style.setProperty(`--color-${key}`, value));
    // ... faire de même pour typography et styles
  }, [activePersona]);

  const setPersona = (personaId: string) => {
    // Logique pour changer de persona
  };

  return (
    <PersonaContext.Provider value={{ persona: activePersona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) throw new Error('usePersona doit être utilisé dans un PersonaProvider');
  return context;
};
