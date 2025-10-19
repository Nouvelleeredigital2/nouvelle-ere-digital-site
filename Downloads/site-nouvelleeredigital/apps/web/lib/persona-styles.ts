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
    // Mapping explicite des clés attendues par Tailwind (incluant les foreground)
    const tailwindColorKeys = [
      'background', 'foreground', 'primary', 'primary-foreground', 
      'secondary', 'secondary-foreground', 'card', 'card-foreground', 
      'accent', 'accent-foreground', 'muted', 'muted-foreground', 'border'
    ] as const;

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

    // Les couleurs foreground sont maintenant définies explicitement dans les personas
    // Plus besoin de calcul automatique - les couleurs sont déjà optimisées pour le contraste

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

    // Gérer l'échelle de typographie
    if (typography.scale) {
      const scaleRatios = {
        'compact': 1.125,
        'comfortable': 1.2,
        'normal': 1.2,
        'spacious': 1.25,
        'dramatic': 1.333
      };
      
      const ratio = scaleRatios[typography.scale as keyof typeof scaleRatios] || 1.2;
      root.style.setProperty('--text-scale-ratio', ratio.toString());
      console.log(`🎨 Appliqué typography.scale: ${typography.scale} -> ratio ${ratio}`);
    }

    // Gérer l'interligne
    if (typography.lineHeight) {
      const lineHeights = {
        'tight': 1.25,
        'normal': 1.5,
        'relaxed': 1.75,
        'loose': 2.0
      };
      
      const lineHeight = lineHeights[typography.lineHeight as keyof typeof lineHeights] || 1.5;
      root.style.setProperty('--line-height-base', lineHeight.toString());
      console.log(`🎨 Appliqué typography.lineHeight: ${typography.lineHeight} -> ${lineHeight}`);
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

    // Gérer les ombres avec variables CSS modernes
    if (styles.cardShadow) {
      const shadowVar = `var(--shadow-${styles.cardShadow})`;
      root.style.setProperty('--card-shadow-value', shadowVar);
      console.log(`🎨 Appliqué cardShadow: ${styles.cardShadow} -> ${shadowVar}`);
    }

    // Gérer les espacements avec facteur multiplicateur dynamique
    if (styles.spacing) {
      const spacingFactors = {
        'compact': 0.8,
        'normal': 1.0, 
        'spacious': 1.25,
        'lg': 1.0,
        'md': 0.75,
        'sm': 0.5,
        'xl': 1.5,
        '2xl': 2.0
      };
      
      const factor = spacingFactors[styles.spacing as keyof typeof spacingFactors] || 1.0;
      root.style.setProperty('--space-scale-factor', factor.toString());
      
      // Appliquer aussi les classes CSS correspondantes
      root.classList.remove('spacing-compact', 'spacing-normal', 'spacing-spacious');
      root.classList.add(`spacing-${styles.spacing}`);
      
      console.log(`🎨 Appliqué spacing: ${styles.spacing} -> facteur ${factor}`);
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

  // Appliquer les attributs de données pour les animations avec conversion camelCase
  if (animations) {
    Object.entries(animations).forEach(([key, value]) => {
      // Convertir kebab-case en camelCase pour les data attributes
      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      root.dataset[`animation${camelKey.charAt(0).toUpperCase() + camelKey.slice(1)}`] = value;
      console.log(`🎨 Appliqué animation.${key}: ${value} -> data-animation${camelKey.charAt(0).toUpperCase() + camelKey.slice(1)}`);
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

    // Les couleurs foreground sont maintenant définies explicitement dans les personas
    // Plus besoin de calcul automatique côté serveur - les couleurs sont déjà optimisées

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

  // Appliquer la typographie avec mapping explicite vers Tailwind (côté serveur)
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

    // Gérer l'échelle de typographie
    if (typography.scale) {
      const scaleRatios = {
        'compact': 1.125,
        'comfortable': 1.2,
        'normal': 1.2,
        'spacious': 1.25,
        'dramatic': 1.333
      };
      
      const ratio = scaleRatios[typography.scale as keyof typeof scaleRatios] || 1.2;
      cssVariables['--text-scale-ratio'] = ratio.toString();
    }

    // Gérer l'interligne
    if (typography.lineHeight) {
      const lineHeights = {
        'tight': 1.25,
        'normal': 1.5,
        'relaxed': 1.75,
        'loose': 2.0
      };
      
      const lineHeight = lineHeights[typography.lineHeight as keyof typeof lineHeights] || 1.5;
      cssVariables['--line-height-base'] = lineHeight.toString();
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
      const shadowVar = `var(--shadow-${styles.cardShadow})`;
      cssVariables['--card-shadow-value'] = shadowVar;
    }

    if (styles.spacing) {
      const spacingFactors = {
        'compact': 0.8,
        'normal': 1.0, 
        'spacious': 1.25,
        'lg': 1.0,
        'md': 0.75,
        'sm': 0.5,
        'xl': 1.5,
        '2xl': 2.0
      };
      
      const factor = spacingFactors[styles.spacing as keyof typeof spacingFactors] || 1.0;
      cssVariables['--space-scale-factor'] = factor.toString();
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
