// apps/web/personas/artiste.ts
import type { CreativePersona } from "@/shared/theme.types";

export const artistePersona: CreativePersona = {
  id: "artiste",
  name: "L'Artiste",
  description:
    "Immersion, audace et émotion. Pour ceux qui voient le monde à travers un prisme créatif.",
  archetype: "Le Visionnaire Créatif",
  visualIdentity: {
    mood: "dark",
    energy: "energetic",
  },
  settings: {
    colors: {
      background: "#0a0a2a", // Bleu nuit profond
      foreground: "#e2e8f0", // Gris clair argenté
      primary: "#8b5cf6", // Violet plus sophistiqué
      "primary-foreground": "#ffffff", // Blanc pour contraste optimal
      secondary: "#fbbf24", // Jaune doré plus chaleureux
      "secondary-foreground": "#0a0a2a", // Bleu nuit pour contraste optimal
      accent: "#06b6d4", // Cyan électrique moderne
      "accent-foreground": "#0a0a2a", // Bleu nuit pour contraste optimal
      card: "rgba(30, 41, 59, 0.8)", // Ardoise semi-transparent
      "card-foreground": "#e2e8f0", // Gris clair pour contraste optimal
      border: "rgba(51, 65, 85, 0.6)",
      muted: "rgba(51, 65, 85, 0.4)",
      "muted-foreground": "#94a3b8", // Gris clair pour contraste
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "spacious",
      lineHeight: "relaxed",
    },
    styles: {
      borderRadius: "lg",
      cardShadow: "xl",
      spacing: "spacious",
    },
    layouts: {
      gallery: "asymmetrical-masonry",
      heroStyle: "full-visual",
      heroTextAlign: "text-center",
      sections: "asymmetrical-masonry",
      navigation: "floating",
    },
    animations: {
      intensity: "dramatic",
      transitions: "elastic",
    },
  },
};
