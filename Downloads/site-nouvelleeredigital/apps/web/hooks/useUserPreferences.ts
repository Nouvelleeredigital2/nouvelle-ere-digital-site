"use client";

import { useEffect, useCallback } from "react";
import { usePersona } from "@/components/context/PersonaProvider";

interface UserPreferences {
  personaId: string;
  onboardingCompleted: boolean;
  lastUpdated: string;
  version: string;
}

const STORAGE_KEY = "nouvelle-ere-user-preferences";
const CURRENT_VERSION = "1.0.0";

export function useUserPreferences() {
  const { persona, setPersona } = usePersona();

  // Charger les préférences depuis le localStorage
  const loadPreferences = useCallback((): UserPreferences | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const preferences: UserPreferences = JSON.parse(stored);

      // Vérifier la compatibilité de version
      if (preferences.version !== CURRENT_VERSION) {
        console.warn("Version des préférences obsolète, réinitialisation");
        clearPreferences();
        return null;
      }

      return preferences;
    } catch (error) {
      console.error("Erreur lors du chargement des préférences:", error);
      return null;
    }
  }, []);

  // Sauvegarder les préférences dans le localStorage
  const savePreferences = useCallback(
    (preferences: Partial<UserPreferences>) => {
      try {
        const currentPrefs = loadPreferences() || {
          personaId: persona.id,
          onboardingCompleted: false,
          lastUpdated: new Date().toISOString(),
          version: CURRENT_VERSION,
        };

        const updatedPrefs: UserPreferences = {
          ...currentPrefs,
          ...preferences,
          lastUpdated: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrefs));

        // Émettre un événement personnalisé pour notifier les autres composants
        window.dispatchEvent(
          new CustomEvent("userPreferencesChanged", {
            detail: updatedPrefs,
          }),
        );

        return updatedPrefs;
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des préférences:", error);
        return null;
      }
    },
    [persona.id, loadPreferences],
  );

  // Effacer toutes les préférences
  const clearPreferences = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("userPreferencesCleared"));
    } catch (error) {
      console.error("Erreur lors de la suppression des préférences:", error);
    }
  }, []);

  // Restaurer les préférences au démarrage
  useEffect(() => {
    const preferences = loadPreferences();
    if (preferences) {
      // Restaurer le persona si différent du current
      if (preferences.personaId && preferences.personaId !== persona.id) {
        setPersona(preferences.personaId);
      }

      // Émettre un événement pour notifier que les préférences ont été restaurées
      window.dispatchEvent(
        new CustomEvent("userPreferencesRestored", {
          detail: preferences,
        }),
      );
    }
  }, [loadPreferences, setPersona, persona.id]);

  // Sauvegarder automatiquement les changements de persona
  useEffect(() => {
    savePreferences({ personaId: persona.id });
  }, [persona.id, savePreferences]);

  // Sauvegarder automatiquement quand l'utilisateur quitte la page
  useEffect(() => {
    const handleBeforeUnload = () => {
      savePreferences({ personaId: persona.id });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [persona.id, savePreferences]);

  // Écouter les événements de changement de préférences
  useEffect(() => {
    const handlePreferencesChanged = (event: CustomEvent) => {
      console.log("Préférences utilisateur mises à jour:", event.detail);
    };

    const handlePreferencesRestored = (event: CustomEvent) => {
      console.log("Préférences utilisateur restaurées:", event.detail);
    };

    window.addEventListener("userPreferencesChanged", handlePreferencesChanged as EventListener);
    window.addEventListener("userPreferencesRestored", handlePreferencesRestored as EventListener);

    return () => {
      window.removeEventListener(
        "userPreferencesChanged",
        handlePreferencesChanged as EventListener,
      );
      window.removeEventListener(
        "userPreferencesRestored",
        handlePreferencesRestored as EventListener,
      );
    };
  }, []);

  return {
    preferences: loadPreferences(),
    savePreferences,
    clearPreferences,
    isLoaded: true, // Indique que le hook est prêt
  };
}
