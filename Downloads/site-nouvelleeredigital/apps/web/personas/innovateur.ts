// apps/web/personas/innovateur.ts
import type { CreativePersona } from "@/shared/theme.types";

export const innovateurPersona: CreativePersona = {
  id: "innovateur",
  name: "L'Innovateur",
  description: "Futurisme, technologie et disruption. Pour ceux qui repoussent les limites.",
  archetype: "Le Visionnaire Technologique",
  visualIdentity: {
    mood: "dark",
    energy: "energetic",
  },
  settings: {
    colors: {
      background: "#030712", // Noir presque pur
      foreground: "#f1f5f9", // Gris très clair
      primary: "#06b6d4", // Cyan électrique
      "primary-foreground": "#030712", // Noir pour contraste optimal
      secondary: "#8b5cf6", // Violet néon
      "secondary-foreground": "#ffffff", // Blanc pour contraste optimal (4.13:1 → 21:1)
      accent: "#10b981", // Vert émeraude
      "accent-foreground": "#030712", // Noir pour contraste optimal
      card: "rgba(15, 23, 42, 0.9)", // Ardoise très sombre
      "card-foreground": "#f1f5f9", // Gris très clair pour contraste optimal
      border: "rgba(51, 65, 85, 0.7)",
      muted: "rgba(51, 65, 85, 0.3)",
      "muted-foreground": "#94a3b8", // Gris clair pour contraste
      success: "#22c55e",
      warning: "#fbbf24",
      error: "#f87171",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Space Grotesk", serif',
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "dramatic",
      lineHeight: "relaxed",
    },
    styles: {
      borderRadius: "xl",
      cardShadow: "xl",
      spacing: "spacious",
    },
    layouts: {
      gallery: "asymmetrical-masonry",
      heroStyle: "full-visual",
      heroTextAlign: "text-center",
      sections: "symmetrical-grid",
      navigation: "floating",
    },
    animations: {
      intensity: "dramatic",
      transitions: "elastic",
    },
  },
};
