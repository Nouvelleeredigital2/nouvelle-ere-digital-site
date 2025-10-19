// apps/web/personas/minimaliste.ts
import type { CreativePersona } from "@/shared/theme.types";

export const minimalistePersona: CreativePersona = {
  id: "minimaliste",
  name: "Le Minimaliste",
  description:
    "Simplicité, pureté et élégance. Pour ceux qui privilégient l'essentiel et la clarté.",
  archetype: "Le Puriste Esthétique",
  visualIdentity: {
    mood: "light",
    energy: "serene",
  },
  settings: {
    colors: {
      background: "#ffffff", // Blanc pur
      foreground: "#1a1a1a", // Gris très foncé
      primary: "#000000", // Noir pur
      "primary-foreground": "#ffffff", // Blanc pour contraste optimal
      secondary: "#f5f5f5", // Gris très clair
      "secondary-foreground": "#1a1a1a", // Gris très foncé pour contraste optimal
      accent: "#6b7280", // Gris moyen sophistiqué
      "accent-foreground": "#ffffff", // Blanc pour contraste optimal
      card: "#ffffff", // Blanc pur
      "card-foreground": "#1a1a1a", // Gris très foncé pour contraste optimal
      border: "#e5e5e5", // Gris très clair
      muted: "rgba(107, 114, 128, 0.1)", // Gris très subtil
      "muted-foreground": "#6b7280", // Gris moyen pour contraste
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Crimson Text", serif', // Élégant et minimaliste
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "compact", // Plus compact pour la simplicité
      lineHeight: "tight", // Interligne serré pour l'efficacité
    },
    styles: {
      borderRadius: "none", // Pas d'arrondis pour la pureté
      cardShadow: "none", // Pas d'ombres pour la simplicité
      spacing: "compact", // Espacement réduit pour l'efficacité
    },
    layouts: {
      gallery: "single-column", // Colonne unique pour la clarté
      heroStyle: "minimalist", // Style minimaliste
      heroTextAlign: "text-left", // Alignement à gauche pour la lisibilité
      sections: "single-column", // Colonne unique
      navigation: "minimal", // Navigation minimale
    },
    animations: {
      intensity: "subtle", // Animations très subtiles
      transitions: "smooth", // Transitions douces
    },
  },
};
