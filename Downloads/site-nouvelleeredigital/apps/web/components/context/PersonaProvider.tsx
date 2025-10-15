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
  // État initial avec le premier persona comme fallback
  const [activePersona, setActivePersona] = useState<CreativePersona | null>(() => {
    try {
      return personas[0] || null;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du persona par défaut:', error);
      return null;
    }
  });

  // Effet pour charger le persona depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedPersonaId = window.localStorage.getItem(STORAGE_KEY);
      if (savedPersonaId) {
        const savedPersona = personas.find(p => p.id === savedPersonaId);
        if (savedPersona) {
          setActivePersona(savedPersona);
          console.log('✅ Persona chargé depuis localStorage:', savedPersona.name);
        } else {
          console.warn(`⚠️ Persona avec id "${savedPersonaId}" non trouvé, utilisation du persona par défaut`);
          setActivePersona(personas[0]);
        }
      } else {
        console.log('ℹ️ Aucun persona sauvegardé, utilisation du persona par défaut');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement du persona depuis localStorage:', error);
      // Fallback au premier persona
      if (personas.length > 0) {
        setActivePersona(personas[0]);
      }
    }
  }, []);

  // Effet pour appliquer les variables CSS quand le persona change
  useEffect(() => {
    if (activePersona) {
      try {
        applyPersonaStyles(activePersona);
        console.log('✅ Styles appliqués pour le persona:', activePersona.name);
      } catch (error) {
        console.error('❌ Erreur lors de l\'application des styles:', error);
      }
    }
  }, [activePersona]);

  // Fonction pour changer le persona et le sauvegarder
  const setPersona = useCallback((personaId: string) => {
    console.log('🔄 Tentative de changement vers le persona:', personaId);

    const newPersona = personas.find(p => p.id === personaId);
    if (newPersona) {
      setActivePersona(newPersona);
      try {
        window.localStorage.setItem(STORAGE_KEY, personaId);
        console.log('✅ Persona sauvegardé:', newPersona.name);
      } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde du persona:', error);
      }
    } else {
      console.error(`❌ Persona avec id "${personaId}" non trouvé dans la liste:`, personas.map(p => p.id));
    }
  }, []);

  // Contexte avec gestion d'erreur
  const contextValue = activePersona ? {
    persona: activePersona,
    setPersona,
    personas
  } : {
    persona: personas[0],
    setPersona,
    personas
  };

  return (
    <PersonaContext.Provider value={contextValue}>
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
