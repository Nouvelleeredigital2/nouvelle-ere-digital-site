// apps/web/components/accessibility/PersonaAccessibility.tsx
"use client";

import { usePersona } from "@/components/context/PersonaProvider";
import { useEffect, useState } from "react";

export function PersonaAccessibility() {
  const { persona, personas } = usePersona();
  const [announceChanges, setAnnounceChanges] = useState(false);

  // Annoncer les changements de persona aux screen readers
  useEffect(() => {
    if (announceChanges && persona) {
      const announcement = `Thème changé pour ${persona.name}. ${persona.description}`;
      announceToScreenReader(announcement);
    }
  }, [persona, announceChanges]);

  // Fonction pour annoncer aux screen readers
  const announceToScreenReader = (message: string) => {
    // Vérifier que document.body existe (côté client uniquement)
    if (typeof document === "undefined" || !document.body) {
      return;
    }

    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.overflow = "hidden";

    document.body.appendChild(announcement);
    announcement.textContent = message;

    // Fonction de nettoyage sécurisée
    const cleanup = () => {
      try {
        if (document.body && document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      } catch (error) {
        // Ignorer les erreurs de nettoyage si l'élément n'existe plus
        console.warn("Erreur lors du nettoyage de l'annonce d'accessibilité:", error);
      }
    };

    setTimeout(cleanup, 1000);
  };

  if (!persona) return null;

  return (
    <div className="sr-only">
      {/* Informations d'accessibilité pour les screen readers */}
      <div role="status" aria-live="polite" aria-label="Informations du thème actuel">
        <p>Thème actif : {persona.name}</p>
        <p>Description : {persona.description}</p>
        <p>Énergie : {persona.visualIdentity.energy}</p>
        <p>Humeur : {persona.visualIdentity.mood}</p>
      </div>

      {/* Contrôles d'accessibilité */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Contrôles d'accessibilité</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={announceChanges}
            onChange={(e) => setAnnounceChanges(e.target.checked)}
            className="rounded"
          />
          <span>Annoncer les changements de thème</span>
        </label>
      </div>

      {/* Navigation par raccourcis clavier */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Raccourcis clavier</h3>
        <div className="text-sm space-y-1">
          <p>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + 1-5</kbd> : Sélectionner un
            persona
          </p>
          <p>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + R</kbd> : Réinitialiser au
            thème par défaut
          </p>
        </div>
      </div>
    </div>
  );
}
