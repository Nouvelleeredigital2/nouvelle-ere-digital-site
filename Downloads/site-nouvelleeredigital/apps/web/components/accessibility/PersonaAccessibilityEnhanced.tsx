// apps/web/components/accessibility/PersonaAccessibility.tsx
"use client";

import { usePersona } from "@/components/context/PersonaProvider";
import { useEffect, useState, useRef } from "react";

export function PersonaAccessibility() {
  const { persona, personas } = usePersona();
  const [announceChanges, setAnnounceChanges] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const previousPersonaRef = useRef<string>("");

  // Détecter l'utilisation du clavier vs souris
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key === "Enter" || e.key === " ") {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Annoncer les changements de persona aux screen readers (amélioré)
  useEffect(() => {
    if (
      announceChanges &&
      persona &&
      previousPersonaRef.current &&
      previousPersonaRef.current !== persona.id
    ) {
      const announcement = `Thème changé pour ${persona.name}. ${persona.description}`;
      announceToScreenReader(announcement);
    }
    previousPersonaRef.current = persona?.id || "";
  }, [persona, announceChanges]);

  // Fonction pour annoncer aux screen readers (améliorée)
  const announceToScreenReader = (message: string) => {
    if (typeof document === "undefined" || !document.body) {
      return;
    }

    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.setAttribute("role", "status");
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
      <div role="region" aria-label="Informations du thème actuel">
        <h2 className="sr-only">Thème actif</h2>
        <div role="status" aria-live="polite" aria-label="Informations du thème actuel">
          <p>Thème actif : {persona.name}</p>
          <p>Description : {persona.description}</p>
          <p>Énergie : {persona.visualIdentity.energy}</p>
          <p>Humeur : {persona.visualIdentity.mood}</p>
        </div>
      </div>

      {/* Contrôles d'accessibilité améliorés */}
      <div className="mt-4" role="region" aria-label="Contrôles d'accessibilité">
        <h3 className="sr-only">Contrôles d'accessibilité</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={announceChanges}
            onChange={(e) => setAnnounceChanges(e.target.checked)}
            className="rounded"
            aria-describedby="announce-changes-description"
          />
          <span>Annoncer les changements de thème</span>
        </label>
        <div id="announce-changes-description" className="sr-only">
          Active les annonces vocales pour les changements de thème
        </div>

        {/* Indicateur de mode de navigation */}
        <div className="mt-2" role="status" aria-live="polite">
          {isKeyboardUser && <span className="sr-only">Mode navigation au clavier activé</span>}
        </div>
      </div>

      {/* Navigation par raccourcis clavier améliorée */}
      <div className="mt-4" role="region" aria-label="Raccourcis clavier">
        <h3 className="sr-only">Raccourcis clavier disponibles</h3>
        <div className="text-sm space-y-1">
          <p>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs" aria-label="Alt plus 1 à 5">
              Alt + 1-5
            </kbd>
            <span className="sr-only"> : Sélectionner un persona</span>
          </p>
          <p>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs" aria-label="Alt plus R">
              Alt + R
            </kbd>
            <span className="sr-only"> : Réinitialiser au thème par défaut</span>
          </p>
        </div>
      </div>

      {/* Liste des personas disponibles pour les screen readers */}
      <div className="mt-4" role="region" aria-label="Liste des thèmes disponibles">
        <h3 className="sr-only">Thèmes disponibles</h3>
        <ul className="space-y-1">
          {personas.map((p) => (
            <li key={p.id}>
              <span className="sr-only">
                {p.name} : {p.description}
                {p.id === persona.id && " (actuellement sélectionné)"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
