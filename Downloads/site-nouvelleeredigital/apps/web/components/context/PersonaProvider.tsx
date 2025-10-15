'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personas } from '@/personas';
import { applyPersonaStyles, getPersonaClasses } from '@/lib/persona-styles';
import type { CreativePersona } from '@/shared/theme.types';

// La clé localStorage unique que nous allons utiliser
const STORAGE_KEY = 'creative-persona-v1';

interface PersonaContextType {
  persona: CreativePersona;
  setPersona: (personaId: string) => void;
  personas: readonly CreativePersona[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<CreativePersona>(personas[0]);

  // Effet pour charger le persona depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedPersonaId = window.localStorage.getItem(STORAGE_KEY);
      if (savedPersonaId) {
        const savedPersona = personas.find(p => p.id === savedPersonaId);
        if (savedPersona) {
          setActivePersona(savedPersona);
        }
      }
    } catch (error) {
      console.warn('Failed to read persona from localStorage:', error);
    }
  }, []);

  // Effet pour appliquer les variables CSS quand le persona change
  useEffect(() => {
    if (activePersona) {
      applyPersonaStyles(activePersona);
    }
  }, [activePersona]);

  // Fonction pour changer le persona et le sauvegarder
  const setPersona = useCallback((personaId: string) => {
    const newPersona = personas.find(p => p.id === personaId);
    if (newPersona) {
      setActivePersona(newPersona);
      try {
        window.localStorage.setItem(STORAGE_KEY, personaId);
      } catch (error) {
        console.warn('Failed to save persona to localStorage:', error);
      }
    } else {
      console.warn(`Persona with id "${personaId}" not found.`);
    }
  }, []);

  return (
    <PersonaContext.Provider value={{ persona: activePersona, setPersona, personas }}>
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona doit être utilisé à l\'intérieur d\'un PersonaProvider');
  }
  return context;
};
