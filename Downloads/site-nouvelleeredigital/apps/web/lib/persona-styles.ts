// apps/web/lib/persona-styles.ts
import type { CreativePersona } from '@/shared/theme.types';

/**
 * Applique les styles CSS personnalisés d'un persona (côté serveur ou client)
 */
export function applyPersonaStyles(persona: CreativePersona): void {
  // Vérification si on est côté serveur ou client
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // Côté serveur - on applique les styles directement sur les variables CSS globales
    // Cette fonction sera appelée depuis le serveur pour pré-rendu
    return;
  }

  // Côté client - logique existante
  const root = document.documentElement;

  if (!persona?.settings) return;

  const { colors, typography, styles, layouts, animations } = persona.settings;

  // Appliquer les couleurs
  if (colors) {
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  // Appliquer la typographie
  if (typography) {
    Object.entries(typography).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value as string);
    });
  }

  // Appliquer les styles
  if (styles) {
    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(`--style-${key}`, value as string);
    });
  }

  // Ajouter la classe du persona actif
  root.classList.remove(...Array.from(root.classList).filter(cls => cls.startsWith('persona-')));
  root.classList.add(`persona-${persona.id}`);

  // Appliquer les attributs de données pour les layouts
  if (layouts) {
    Object.entries(layouts).forEach(([key, value]) => {
      root.dataset[key] = value;
    });
  }

  // Appliquer les attributs de données pour les animations
  if (animations) {
    Object.entries(animations).forEach(([key, value]) => {
      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      root.dataset[`animation${camelKey.charAt(0).toUpperCase() + camelKey.slice(1)}`] = value;
    });
  }
}

/**
 * Applique les styles d'un persona côté serveur en modifiant les variables CSS
 * Cette fonction est utilisée pour le pré-rendu côté serveur
 */
export function applyPersonaStylesServer(persona: CreativePersona): Record<string, string> {
  if (!persona?.settings) return {};

  const { colors, typography, styles } = persona.settings;
  const cssVariables: Record<string, string> = {};

  // Appliquer les couleurs
  if (colors) {
    Object.entries(colors).forEach(([key, value]) => {
      cssVariables[`--color-${key}`] = value;
    });
  }

  // Appliquer la typographie
  if (typography) {
    Object.entries(typography).forEach(([key, value]) => {
      cssVariables[`--font-${key}`] = value as string;
    });
  }

  // Appliquer les styles
  if (styles) {
    Object.entries(styles).forEach(([key, value]) => {
      cssVariables[`--style-${key}`] = value as string;
    });
  }

  return cssVariables;
}

/**
 * Obtient les classes CSS à appliquer selon les paramètres du persona
 */
export function getPersonaClasses(persona: CreativePersona): {
  color: string;
  typography: string;
  layout: string;
  animation: string;
} {
  if (!persona?.settings) {
    return {
      color: '',
      typography: '',
      layout: '',
      animation: '',
    };
  }

  const { colors, typography, layouts, animations } = persona.settings;

  // Classes de couleur basées sur le schéma du persona
  const colorClasses = colors ? `
    text-[var(--color-foreground)]
    bg-[var(--color-background)]
  `.trim() : '';

  // Classes de typographie
  const typographyClasses = typography ? 'font-persona-sans' : '';

  // Classes de layout basées sur la configuration
  const layoutClasses = layouts ? 'layout-persona-gallery' : '';

  // Classes d'animation basées sur l'intensité
  const animationIntensity = animations?.intensity || 'subtle';
  const animationClasses = `animation-persona-${animationIntensity}`;

  return {
    color: colorClasses,
    typography: typographyClasses,
    layout: layoutClasses,
    animation: animationClasses,
  };
}

/**
 * Hook pour utiliser les classes CSS du persona actif
 * NOTE: Ce hook doit être utilisé dans un composant React, pas dans un fichier utilitaire
 */
export function usePersonaClasses() {
  // Cette fonction sera définie dans un fichier de hooks approprié
  throw new Error('usePersonaClasses doit être utilisé dans un composant React avec le contexte PersonaProvider');
}
