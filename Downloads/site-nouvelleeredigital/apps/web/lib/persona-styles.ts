// apps/web/lib/persona-styles.ts
import type { CreativePersona } from "@/shared/theme.types";

/**
 * Convertit une couleur hexadécimale en HSL
 */
function hexToHsl(hex: string): string {
  // Supprimer le # si présent
  hex = hex.replace('#', '');
  
  // Convertir en RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Applique les styles CSS personnalisés d'un persona (côté serveur ou client)
 */
export function applyPersonaStyles(persona: CreativePersona): void {
  // Vérification si on est côté serveur ou client
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Côté serveur - on applique les styles directement sur les variables CSS globales
    // Cette fonction sera appelée depuis le serveur pour pré-rendu
    return;
  }

  // Côté client - logique existante
  const root = document.documentElement;
  
  console.log("🎨 applyPersonaStyles appelé pour:", persona.name);
  console.log("🎨 Persona settings:", persona.settings);

  if (!persona?.settings) return;

  const { colors, typography, styles, layouts, animations } = persona.settings;

  // Appliquer les couleurs avec mapping explicite vers Tailwind
  if (colors) {
    console.log("🎨 Couleurs disponibles:", colors);
    // Mapping explicite des clés attendues par Tailwind
    const tailwindColorKeys = ['background', 'foreground', 'primary', 'secondary', 'card', 'border'] as const;

    tailwindColorKeys.forEach(key => {
      if (colors[key]) {
        const value = colors[key];
        // Convertir les couleurs hex en HSL pour Tailwind
        if (typeof value === 'string' && value.startsWith('#')) {
          const hsl = hexToHsl(value);
          console.log(`🎨 Applique --${key}: ${value} -> ${hsl}`);
          root.style.setProperty(`--${key}`, hsl);
        } else {
          console.log(`🎨 Applique --${key}: ${value}`);
          root.style.setProperty(`--${key}`, value);
        }
      }
    });

    // Gérer les couleurs spécifiques comme primary-foreground
    if (colors.primary && colors.foreground) {
      // Générer primary-foreground automatiquement si pas défini
      if (!colors['primary-foreground']) {
        const primaryHsl = typeof colors.primary === 'string' && colors.primary.startsWith('#') 
          ? hexToHsl(colors.primary) 
          : colors.primary;
        // Logique simple : utiliser foreground ou calculer un contraste
        root.style.setProperty('--primary-foreground', 'hsl(0 0% 98%)'); // Blanc par défaut
      }
    }

    // Gérer secondary-foreground
    if (colors.secondary && !colors['secondary-foreground']) {
      root.style.setProperty('--secondary-foreground', 'hsl(0 0% 98%)'); // Blanc par défaut
    }

    // Gérer card-foreground
    if (colors.card && !colors['card-foreground']) {
      root.style.setProperty('--card-foreground', colors.foreground || 'hsl(0 0% 98%)');
    }

    // Gérer les autres couleurs (accent, muted, etc.) via des variables CSS dédiées
    if (colors.accent) {
      const accentHsl = typeof colors.accent === 'string' && colors.accent.startsWith('#') 
        ? hexToHsl(colors.accent) 
        : colors.accent;
      root.style.setProperty('--accent', accentHsl);
    }

    if (colors.muted) {
      const mutedHsl = typeof colors.muted === 'string' && colors.muted.startsWith('#') 
        ? hexToHsl(colors.muted) 
        : colors.muted;
      root.style.setProperty('--muted', mutedHsl);
    }
  }

  // Appliquer la typographie avec mapping explicite vers Tailwind
  if (typography) {
    if (typography.fontFamilySans) {
      root.style.setProperty('--font-sans', typography.fontFamilySans as string);
    }
    if (typography.fontFamilySerif) {
      root.style.setProperty('--font-serif', typography.fontFamilySerif as string);
    }
    if (typography.fontFamilyMono) {
      root.style.setProperty('--font-mono', typography.fontFamilyMono as string);
    }
  }

  // Appliquer les styles avec mapping explicite et conversion des valeurs
  if (styles) {
    // Gérer le radius avec conversion des valeurs sm/md/lg
    if (styles.borderRadius) {
      const radiusValue = styles.borderRadius === 'lg' ? '0.75rem' : 
                         styles.borderRadius === 'md' ? '0.5rem' : 
                         styles.borderRadius === 'sm' ? '0.25rem' : 
                         styles.borderRadius === 'xl' ? '1rem' : 
                         styles.borderRadius === '2xl' ? '1.5rem' :
                         styles.borderRadius === 'none' ? '0' :
                         styles.borderRadius; // Valeur directe si pas une taille standard
      root.style.setProperty('--radius', radiusValue);
    }

    // Gérer les ombres si définies
    if (styles.cardShadow) {
      const shadowValue = styles.cardShadow === 'lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' :
                         styles.cardShadow === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' :
                         styles.cardShadow === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
                         styles.cardShadow; // Valeur directe
      root.style.setProperty('--card-shadow', shadowValue);
    }

    // Gérer les espacements si définis
    if (styles.spacing) {
      const spacingValue = styles.spacing === 'lg' ? '1rem' :
                          styles.spacing === 'md' ? '0.75rem' :
                          styles.spacing === 'sm' ? '0.5rem' :
                          styles.spacing; // Valeur directe
      root.style.setProperty('--spacing-unit', spacingValue);
    }
  }

  // Ajouter la classe du persona actif
  root.classList.remove(...Array.from(root.classList).filter((cls) => cls.startsWith("persona-")));
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

  // Appliquer les couleurs avec mapping explicite vers Tailwind
  if (colors) {
    // Mapping explicite des clés attendues par Tailwind
    const tailwindColorKeys = ['background', 'foreground', 'primary', 'secondary', 'card', 'border'] as const;
    
    tailwindColorKeys.forEach(key => {
      if (colors[key]) {
        const value = colors[key];
        // Convertir les couleurs hex en HSL pour Tailwind
        if (typeof value === 'string' && value.startsWith('#')) {
          const hsl = hexToHsl(value);
          cssVariables[`--${key}`] = hsl;
        } else {
          cssVariables[`--${key}`] = value;
        }
      }
    });

    // Gérer les couleurs spécifiques
    if (colors.primary && !colors['primary-foreground']) {
      cssVariables['--primary-foreground'] = 'hsl(0 0% 98%)';
    }
    if (colors.secondary && !colors['secondary-foreground']) {
      cssVariables['--secondary-foreground'] = 'hsl(0 0% 98%)';
    }
    if (colors.card && !colors['card-foreground']) {
      cssVariables['--card-foreground'] = colors.foreground || 'hsl(0 0% 98%)';
    }

    // Gérer les autres couleurs
    if (colors.accent) {
      const accentHsl = typeof colors.accent === 'string' && colors.accent.startsWith('#') 
        ? hexToHsl(colors.accent) 
        : colors.accent;
      cssVariables['--accent'] = accentHsl;
    }
    if (colors.muted) {
      const mutedHsl = typeof colors.muted === 'string' && colors.muted.startsWith('#') 
        ? hexToHsl(colors.muted) 
        : colors.muted;
      cssVariables['--muted'] = mutedHsl;
    }
  }

  // Appliquer la typographie avec mapping explicite vers Tailwind
  if (typography) {
    if (typography.fontFamilySans) {
      cssVariables['--font-sans'] = typography.fontFamilySans as string;
    }
    if (typography.fontFamilySerif) {
      cssVariables['--font-serif'] = typography.fontFamilySerif as string;
    }
    if (typography.fontFamilyMono) {
      cssVariables['--font-mono'] = typography.fontFamilyMono as string;
    }
  }

  // Appliquer les styles avec mapping explicite et conversion des valeurs
  if (styles) {
    if (styles.borderRadius) {
      const radiusValue = styles.borderRadius === 'lg' ? '0.75rem' : 
                         styles.borderRadius === 'md' ? '0.5rem' : 
                         styles.borderRadius === 'sm' ? '0.25rem' : 
                         styles.borderRadius === 'xl' ? '1rem' : 
                         styles.borderRadius === '2xl' ? '1.5rem' :
                         styles.borderRadius === 'none' ? '0' :
                         styles.borderRadius;
      cssVariables['--radius'] = radiusValue;
    }

    if (styles.cardShadow) {
      const shadowValue = styles.cardShadow === 'lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' :
                         styles.cardShadow === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' :
                         styles.cardShadow === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
                         styles.cardShadow;
      cssVariables['--card-shadow'] = shadowValue;
    }

    if (styles.spacing) {
      const spacingValue = styles.spacing === 'lg' ? '1rem' :
                          styles.spacing === 'md' ? '0.75rem' :
                          styles.spacing === 'sm' ? '0.5rem' :
                          styles.spacing;
      cssVariables['--spacing-unit'] = spacingValue;
    }
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
      color: "",
      typography: "",
      layout: "",
      animation: "",
    };
  }

  const { colors, typography, layouts, animations } = persona.settings;

  // Classes de couleur basées sur le schéma du persona
  const colorClasses = colors
    ? `
    text-[var(--color-foreground)]
    bg-[var(--color-background)]
  `.trim()
    : "";

  // Classes de typographie
  const typographyClasses = typography ? "font-persona-sans" : "";

  // Classes de layout basées sur la configuration
  const layoutClasses = layouts ? "layout-persona-gallery" : "";

  // Classes d'animation basées sur l'intensité
  const animationIntensity = animations?.intensity || "subtle";
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
  throw new Error(
    "usePersonaClasses doit être utilisé dans un composant React avec le contexte PersonaProvider",
  );
}
