"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { personas } from "@/personas";
import { applyPersonaStyles } from "@/lib/persona-styles";
import type { CreativePersona } from "@/shared/theme.types";

const COOKIE_KEY = "creative-persona-v1";

// Cette fonction s'exécute UNE SEULE FOIS à l'initialisation du composant.
const getInitialPersona = (): CreativePersona => {
  // IMPORTANT : Ce code ne s'exécute que côté client, car 'window' n'existe pas sur le serveur.
  // Lors du rendu serveur, cette partie est ignorée, et la fonction renvoie le persona par défaut,
  // ce qui est acceptable car le serveur applique déjà la classe via layout.tsx.
  if (typeof window !== "undefined") {
    try {
      const savedPersonaId = Cookies.get(COOKIE_KEY);
      if (savedPersonaId) {
        const savedPersona = personas.find((p) => p.id === savedPersonaId);
        // Si un persona valide est trouvé dans les cookies, il devient l'état initial.
        if (savedPersona) {
          console.log("✅ Persona initialisé depuis le cookie:", savedPersona.name);
          return savedPersona;
        }
      }
    } catch (error) {
      console.error("❌ Erreur lors de la lecture initiale du cookie persona:", error);
    }
  }

  // Fallback : Si nous sommes sur le serveur, ou si aucun cookie valide n'est trouvé,
  // on utilise le premier persona de la liste.
  console.log("ℹ️ Aucun persona valide dans le cookie, initialisation avec le persona par défaut.");
  return personas[0];
};

interface PersonaContextType {
  persona: CreativePersona;
  setPersona: (personaId: string) => void;
  personas: readonly CreativePersona[];
  isHydrated: boolean;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  // État d'hydratation pour éviter les problèmes côté serveur
  const [isHydrated, setIsHydrated] = useState(false);

  // On utilise la fonction d'initialisation. React garantit qu'elle ne s'exécute qu'une seule fois.
  // Côté client, `activePersona` aura la bonne valeur DÈS LE DÉPART.
  const [activePersona, setActivePersona] = useState<CreativePersona>(() => {
    // Ne pas accéder aux cookies côté serveur
    if (typeof window === "undefined") {
      return personas[0]; // Persona par défaut côté serveur
    }
    return getInitialPersona();
  });

  // Marquer comme hydraté après le montage côté client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Cet effet est maintenant simplifié. Il ne sert plus à charger la valeur initiale,
  // mais seulement à appliquer les styles lorsque `activePersona` change.
  useEffect(() => {
    // Cette fonction applique les variables CSS. C'est le "coup de pinceau final"
    // qui assure que même si la classe est déjà là grâce au serveur, les variables
    // --color-primary, etc., sont bien injectées dans le DOM.
    if (activePersona && isHydrated) {
      applyPersonaStyles(activePersona);
    }
  }, [activePersona, isHydrated]);

  const setPersona = useCallback((personaId: string) => {
    const newPersona = personas.find((p) => p.id === personaId);
    if (newPersona) {
      setActivePersona(newPersona);
      try {
        Cookies.set(COOKIE_KEY, personaId, { expires: 365, path: "/", sameSite: "lax" });
      } catch (error) {
        console.error("❌ Erreur lors de la sauvegarde du persona dans le cookie:", error);
      }
    } else {
      console.error(`❌ Persona avec id "${personaId}" non trouvé.`);
    }
  }, []);

  // Plus besoin de gérer un état `null`, car `getInitialPersona` garantit
  // qu'on a toujours un persona valide.
  const contextValue = {
    persona: activePersona,
    setPersona,
    personas,
    isHydrated,
  };

  return <PersonaContext.Provider value={contextValue}>{children}</PersonaContext.Provider>;
}

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona doit être utilisé à l'intérieur d'un PersonaProvider");
  }
  return context;
};
