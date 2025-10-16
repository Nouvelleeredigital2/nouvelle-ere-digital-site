// apps/web/hooks/useKeyboardShortcuts.ts
"use client";

import { useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { trackPersonaAction } from "@/lib/analytics";

/**
 * Hook pour gérer les raccourcis clavier du système de personas
 */
export function useKeyboardShortcuts() {
  const { personas, setPersona, persona } = usePersona();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Vérifier si Alt est pressé
      if (!event.altKey) return;

      const key = event.key.toLowerCase();

      switch (key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5": {
          event.preventDefault();
          const personaIndex = parseInt(key) - 1;
          if (personaIndex < personas.length) {
            const targetPersona = personas[personaIndex];
            if (targetPersona.id !== persona.id) {
              setPersona(targetPersona.id);
              trackPersonaAction(targetPersona.id, "select");
              console.log(`🎹 Raccourci clavier : Changé vers ${targetPersona.name}`);
            }
          }
          break;
        }

        case "r": {
          event.preventDefault();
          // Réinitialiser au premier persona (par défaut)
          if (personas.length > 0 && personas[0].id !== persona.id) {
            setPersona(personas[0].id);
            trackPersonaAction(personas[0].id, "select");
            console.log(`🎹 Raccourci clavier : Réinitialisé à ${personas[0].name}`);
          }
          break;
        }

        case "p": {
          event.preventDefault();
          // Ouvrir la palette de personas (si elle existe)
          console.log("🎹 Raccourci clavier : Ouvrir palette de personas");
          // Ici on pourrait ouvrir un modal ou dropdown
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [personas, setPersona, persona]);

  // Retourner les raccourcis disponibles pour affichage
  return {
    shortcuts: [
      { key: "Alt + 1-5", description: "Sélectionner un persona" },
      { key: "Alt + R", description: "Réinitialiser au thème par défaut" },
      { key: "Alt + P", description: "Ouvrir la palette de personas" },
    ],
  };
}
