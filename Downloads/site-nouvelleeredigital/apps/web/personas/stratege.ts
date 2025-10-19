// apps/web/personas/stratege.ts
import type { CreativePersona } from "@/shared/theme.types";

export const strategePersona: CreativePersona = {
  id: "stratege",
  name: "Le Stratège",
  description: "Analyse, stratégie et optimisation. Pour ceux qui planifient chaque détail.",
  archetype: "Le Maître Tacticien",
  visualIdentity: {
    mood: "minimal",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#fafafa", // Blanc cassé minimaliste
      foreground: "#262626", // Gris très foncé
      primary: "#171717", // Gris très foncé au lieu du noir pur
      "primary-foreground": "#ffffff", // Blanc pour contraste optimal
      secondary: "#525252", // Gris plus foncé pour meilleur contraste (5.9:1)
      "secondary-foreground": "#ffffff", // Blanc pour contraste optimal
      accent: "#3b82f6", // Bleu moderne et accessible
      "accent-foreground": "#ffffff", // Blanc pour contraste optimal
      card: "#ffffff", // Blanc pur
      "card-foreground": "#262626", // Gris très foncé pour contraste optimal
      border: "#f5f5f5", // Gris très clair
      muted: "rgba(161, 161, 170, 0.2)",
      "muted-foreground": "#525252", // Gris foncé pour contraste
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Lora", serif', // Plus moderne que Georgia
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "compact",
      lineHeight: "tight",
    },
    styles: {
      borderRadius: "sm",
      cardShadow: "none",
      spacing: "compact",
    },
    layouts: {
      gallery: "single-column",
      heroStyle: "minimalist",
      heroTextAlign: "text-center",
      sections: "single-column",
      navigation: "minimal",
    },
    animations: {
      intensity: "subtle",
      transitions: "snappy",
    },
  },
};
