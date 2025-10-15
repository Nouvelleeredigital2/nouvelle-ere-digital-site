'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { personas } from '@/personas';
import { applyPersonaStyles } from '@/lib/persona-styles';
import type { CreativePersona } from '@/shared/theme.types';

const COOKIE_KEY = 'creative-persona-v1';

// Fonction pour obtenir le persona initial UNIQUEMENT côté client
const getInitialPersona = (): CreativePersona => {
  // Ce code ne s'exécutera que dans le navigateur
  if (typeof window !== 'undefined') {
    try {
      const savedPersonaId = Cookies.get(COOKIE_KEY);
      if (savedPersonaId) {
        const savedPersona = personas.find(p => p.id === savedPersonaId);
        if (savedPersona) {
          return savedPersona;
        }
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du cookie persona:', error);
    }
  }
  // Fallback pour le serveur et en cas d'erreur
  return personas[0];
};

interface PersonaContextType {
  persona: CreativePersona;
  setPersona: (personaId: string) => void;
  personas: readonly CreativePersona[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  // Utiliser la fonction pour initialiser le state.
  // React garantit que cette fonction ne s'exécute qu'une fois.
  const [activePersona, setActivePersona] = useState<CreativePersona>(getInitialPersona);

  // Cet effet applique les styles et garantit que les variables CSS sont
  // à jour, même si les classes sont déjà appliquées par le serveur.
  useEffect(() => {
    applyPersonaStyles(activePersona);
    console.log('✅ Styles appliqués pour le persona:', activePersona.name);
  }, [activePersona]);

  const setPersona = useCallback((personaId: string) => {
    console.log('🔄 Tentative de changement vers le persona:', personaId);
    const newPersona = personas.find(p => p.id === personaId);
    if (newPersona) {
      setActivePersona(newPersona);
      try {
        Cookies.set(COOKIE_KEY, personaId, {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
        console.log('✅ Persona sauvegardé dans cookie:', newPersona.name);
      } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde du persona dans cookie:', error);
      }
    } else {
      console.error(`❌ Persona avec id "${personaId}" non trouvé.`);
    }
  }, []);

  const contextValue = {
    persona: activePersona,
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
