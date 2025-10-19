// apps/web/personas/naturel.ts
import type { CreativePersona } from "@/shared/theme.types";

export const naturelPersona: CreativePersona = {
  id: "naturel",
  name: "Le Naturel",
  description:
    "Harmonie, authenticité et bien-être. Pour ceux qui cherchent la connexion avec la nature.",
  archetype: "Le Gardien de la Terre",
  visualIdentity: {
    mood: "light",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#fefdf8", // Blanc cassé chaud
      foreground: "#2d3748", // Gris-vert naturel
      primary: "#38a169", // Vert nature profond
      "primary-foreground": "#ffffff", // Blanc pour contraste optimal
      secondary: "#68d391", // Vert nature clair
      "secondary-foreground": "#2d3748", // Gris-vert pour contraste optimal
      accent: "#d69e2e", // Or naturel
      "accent-foreground": "#ffffff", // Blanc pour contraste optimal
      card: "#ffffff", // Blanc pur
      "card-foreground": "#2d3748", // Gris-vert pour contraste optimal
      border: "#e2e8f0", // Gris clair naturel
      muted: "rgba(56, 161, 105, 0.1)", // Vert très subtil
      "muted-foreground": "#4a5568", // Gris-vert moyen pour contraste
      success: "#38a169",
      warning: "#d69e2e",
      error: "#e53e3e",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Merriweather", serif', // Police naturelle et lisible
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "comfortable", // Échelle confortable pour la lecture
      lineHeight: "relaxed", // Interligne détendu pour le bien-être
    },
    styles: {
      borderRadius: "lg", // Arrondis généreux pour la douceur
      cardShadow: "sm", // Ombres douces
      spacing: "spacious", // Espacement généreux pour la respiration
    },
    layouts: {
      gallery: "symmetrical-grid", // Grille symétrique pour l'harmonie
      heroStyle: "split-text-image", // Style équilibré
      heroTextAlign: "text-center", // Centré pour l'harmonie
      sections: "symmetrical-grid", // Grille symétrique
      navigation: "horizontal", // Navigation horizontale classique
    },
    animations: {
      intensity: "subtle", // Animations douces comme la nature
      transitions: "smooth", // Transitions fluides
    },
  },
};
