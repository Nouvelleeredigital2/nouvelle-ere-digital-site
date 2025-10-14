'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { themes } from '@/themes'; // Assurez-vous que ce chemin est correct
import type { Theme } from '@/shared/theme.types';

// La clé localStorage unique que nous allons utiliser
const STORAGE_KEY = 'creative-persona-v1';

interface PersonaContextType {
  persona: Theme;
  setPersona: (personaId: string) => void;
  personas: readonly Theme[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<Theme>(themes[0]);

  // Effet pour charger le persona depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedPersonaId = window.localStorage.getItem(STORAGE_KEY);
      if (savedPersonaId) {
        const savedPersona = themes.find(p => p.id === savedPersonaId);
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
    const root = document.documentElement;
    if (activePersona) {
      const { colors, typography, styles, layouts } = activePersona.settings;

      // Injection des variables CSS
      Object.entries(colors).forEach(([key, value]) => root.style.setProperty(`--color-${key}`, value));
      Object.entries(typography).forEach(([key, value]) => root.style.setProperty(`--font-${key}`, value as string)); // Adapter si nécessaire
      Object.entries(styles).forEach(([key, value]) => root.style.setProperty(`--style-${key}`, value as string)); // Adapter si nécessaire

      // Vous pouvez aussi ajouter des attributs de données pour les layouts
      if (layouts) {
        Object.entries(layouts).forEach(([key, value]) => root.dataset[key] = value);
      }
    }
  }, [activePersona]);

  // Fonction pour changer le persona et le sauvegarder
  const setPersona = useCallback((personaId: string) => {
    const newPersona = themes.find(p => p.id === personaId);
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
    <PersonaContext.Provider value={{ persona: activePersona, setPersona, personas: themes }}>
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
