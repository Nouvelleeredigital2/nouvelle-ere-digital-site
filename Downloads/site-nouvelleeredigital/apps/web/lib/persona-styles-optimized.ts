// apps/web/lib/persona-styles.ts
import type { CreativePersona } from "@/shared/theme.types";

/**
 * Applique les styles CSS personnalisés d'un persona CÔTÉ CLIENT UNIQUEMENT
 */
export function applyPersonaStyles(persona: CreativePersona): void {
  // IMPORTANT : Cette fonction ne doit JAMAIS être appelée côté serveur
  if (typeof window === "undefined") {
    console.warn("applyPersonaStyles appelé côté serveur - ignoré");
    return;
  }

  const root = document.documentElement;
  if (!persona?.settings) return;

  const { colors, typography, styles, layouts, animations } = persona.settings;

  // Optimisation : Regrouper toutes les manipulations DOM
  const styleUpdates: Record<string, string> = {};
  const dataUpdates: Record<string, string> = {};

  // Collecter les couleurs
  if (colors) {
    Object.entries(colors).forEach(([key, value]) => {
      styleUpdates[`--color-${key}`] = value;
    });
  }

  // Collecter la typographie
  if (typography) {
    Object.entries(typography).forEach(([key, value]) => {
      styleUpdates[`--font-${key}`] = value as string;
    });
  }

  // Collecter les styles
  if (styles) {
    Object.entries(styles).forEach(([key, value]) => {
      styleUpdates[`--style-${key}`] = value as string;
    });
  }

  // Collecter les layouts
  if (layouts) {
    Object.entries(layouts).forEach(([key, value]) => {
      dataUpdates[key] = value;
    });
  }

  // Collecter les animations
  if (animations) {
    Object.entries(animations).forEach(([key, value]) => {
      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      dataUpdates[`animation${camelKey.charAt(0).toUpperCase() + camelKey.slice(1)}`] = value;
    });
  }

  // Appliquer les classes CSS
  root.classList.remove(...Array.from(root.classList).filter((cls) => cls.startsWith("persona-")));
  root.classList.add(`persona-${persona.id}`);

  // Appliquer les styles en une seule fois (optimisation performance)
  Object.entries(styleUpdates).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Appliquer les attributs de données
  Object.entries(dataUpdates).forEach(([key, value]) => {
    root.dataset[key] = value;
  });
}

/**
 * Hook pour utiliser les classes CSS du persona actif
 * NOTE: Ce hook doit être utilisé dans un composant React, pas dans un fichier utilitaire
 */
export function usePersonaClasses() {
  // Cette fonction sera définie dans un fichier de hooks approprié
  throw new Error(
    "usePersonaClasses doit être utilisé dans un composant React avec le contexte PersonaProvider",
  );
}
