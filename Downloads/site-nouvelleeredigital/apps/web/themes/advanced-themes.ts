// Thèmes avancés avec variations visuelles étendues

export type ThemeVariant = 'default' | 'neon' | 'pastel' | 'monochrome' | 'retro' | 'nature' | 'cyberpunk' | 'minimalist' | 'luxury';

export interface AdvancedTheme {
  id: string;
  name: string;
  description: string;
  colorOverrides: Partial<{
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  }>;
  effects: {
    gradientOverlays: boolean;
    glassMorphism: boolean;
    animatedBorders: boolean;
    particleEffects: boolean;
    neonGlow: boolean;
  };
  typography: {
    fontWeight: 'normal' | 'bold' | 'light';
    letterSpacing: 'tight' | 'normal' | 'wide';
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  };
}

// Thème Neon Cyberpunk
export const neonTheme: AdvancedTheme = {
  id: 'neon',
  name: 'Neon Cyberpunk',
  description: 'Thème futuriste avec des couleurs néon éclatantes et des effets de glow',
  colorOverrides: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    background: '#0a0a0a',
    foreground: '#ffffff',
    muted: '#1a1a2e',
    border: '#00ffff'
  },
  effects: {
    gradientOverlays: true,
    glassMorphism: false,
    animatedBorders: true,
    particleEffects: false,
    neonGlow: true
  },
  typography: {
    fontWeight: 'bold',
    letterSpacing: 'wide',
    textTransform: 'uppercase'
  }
};

// Thème Pastel Doux
export const pastelTheme: AdvancedTheme = {
  id: 'pastel',
  name: 'Pastel Doux',
  description: 'Thème tendre avec des couleurs pastel apaisantes',
  colorOverrides: {
    primary: '#ffb3ba',
    secondary: '#bae1ff',
    accent: '#baffc9',
    background: '#fff5f5',
    foreground: '#4a4a4a',
    muted: '#f0f0f0',
    border: '#e0e0e0'
  },
  effects: {
    gradientOverlays: false,
    glassMorphism: true,
    animatedBorders: false,
    particleEffects: false,
    neonGlow: false
  },
  typography: {
    fontWeight: 'light',
    letterSpacing: 'normal',
    textTransform: 'none'
  }
};

// Thème Monochrome Élégant
export const monochromeTheme: AdvancedTheme = {
  id: 'monochrome',
  name: 'Monochrome Élégant',
  description: 'Thème sophistiqué en noir et blanc avec des nuances de gris',
  colorOverrides: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#999999',
    background: '#ffffff',
    foreground: '#000000',
    muted: '#f5f5f5',
    border: '#cccccc'
  },
  effects: {
    gradientOverlays: false,
    glassMorphism: false,
    animatedBorders: false,
    particleEffects: false,
    neonGlow: false
  },
  typography: {
    fontWeight: 'normal',
    letterSpacing: 'tight',
    textTransform: 'none'
  }
};

// Thème Rétro Vintage
export const retroTheme: AdvancedTheme = {
  id: 'retro',
  name: 'Rétro Vintage',
  description: 'Thème inspiré des années 80-90 avec des couleurs chaudes et des motifs géométriques',
  colorOverrides: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#00a8e8',
    background: '#fff8dc',
    foreground: '#8b4513',
    muted: '#f5deb3',
    border: '#daa520'
  },
  effects: {
    gradientOverlays: true,
    glassMorphism: false,
    animatedBorders: false,
    particleEffects: false,
    neonGlow: false
  },
  typography: {
    fontWeight: 'bold',
    letterSpacing: 'wide',
    textTransform: 'uppercase'
  }
};

// Thème Nature Organique
export const natureTheme: AdvancedTheme = {
  id: 'nature',
  name: 'Nature Organique',
  description: 'Thème inspiré de la nature avec des verts apaisants et des textures organiques',
  colorOverrides: {
    primary: '#2d5016',
    secondary: '#4a7c59',
    accent: '#a4de02',
    background: '#f7fff7',
    foreground: '#1a3a1a',
    muted: '#e8f5e8',
    border: '#90ee90'
  },
  effects: {
    gradientOverlays: false,
    glassMorphism: true,
    animatedBorders: false,
    particleEffects: true,
    neonGlow: false
  },
  typography: {
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textTransform: 'none'
  }
};

// Fonction utilitaire pour appliquer un thème avancé à un persona
export function applyAdvancedTheme(persona: any, theme: AdvancedTheme) {
  return {
    ...persona,
    settings: {
      ...persona.settings,
      colors: {
        ...persona.settings.colors,
        ...theme.colorOverrides
      },
      styles: {
        ...persona.settings.styles,
        // Appliquer les effets du thème
        ...(theme.effects.glassMorphism && {
          cardShadow: 'lg',
          borderRadius: 'xl'
        }),
        ...(theme.effects.animatedBorders && {
          borderRadius: 'lg'
        })
      },
      typography: {
        ...persona.settings.typography,
        ...theme.typography
      }
    },
    // Ajouter les effets du thème
    themeEffects: theme.effects
  };
}

// Générateur de variations de couleurs pour un thème
export function generateColorVariations(baseColors: Record<string, string>) {
  const variations = {};

  Object.entries(baseColors).forEach(([key, color]) => {
    // Générer des variantes plus claires et plus foncées
    variations[`${key}Light`] = adjustColorBrightness(color, 0.3);
    variations[`${key}Dark`] = adjustColorBrightness(color, -0.3);
    variations[`${key}Alpha50`] = addAlphaToColor(color, 0.5);
    variations[`${key}Alpha20`] = addAlphaToColor(color, 0.2);
  });

  return variations;
}

// Utilitaires pour manipuler les couleurs
function adjustColorBrightness(hexColor: string, amount: number): string {
  // Convertir hex en RGB, ajuster la luminosité, reconvertir en hex
  const num = parseInt(hexColor.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount * 100);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function addAlphaToColor(hexColor: string, alpha: number): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
