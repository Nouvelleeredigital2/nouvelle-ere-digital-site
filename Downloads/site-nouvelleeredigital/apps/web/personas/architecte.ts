// apps/web/personas/architecte.ts
import type { CreativePersona } from "@/shared/theme.types";

export const architectePersona: CreativePersona = {
  id: "architecte",
  name: "L'Architecte",
  description:
    "Structure, précision et fonctionnalité. Pour ceux qui construisent des expériences solides.",
  archetype: "Le Maître Constructeur",
  visualIdentity: {
    mood: "light",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#f8fafc", // Gris très clair moderne
      foreground: "#0f172a", // Gris très foncé
      primary: "#1e40af", // Bleu plus moderne et professionnel
      "primary-foreground": "#ffffff", // Blanc pour contraste optimal
      secondary: "#64748b", // Gris ardoise plus doux
      "secondary-foreground": "#ffffff", // Blanc pour contraste optimal
      accent: "#0d9488", // Bleu sarcelle moderne au lieu du bleu ciel
      "accent-foreground": "#ffffff", // Blanc pour contraste optimal
      card: "#ffffff", // Blanc pur
      "card-foreground": "#0f172a", // Gris très foncé pour contraste optimal
      border: "#e2e8f0", // Gris clair
      muted: "rgba(148, 163, 184, 0.3)",
      "muted-foreground": "#64748b", // Gris ardoise pour contraste
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
    },
    typography: {
      fontFamilySans: '"Inter", "system-ui", sans-serif',
      fontFamilySerif: '"Source Serif Pro", serif', // Plus moderne que Roboto
      fontFamilyMono: '"JetBrains Mono", "Fira Code", monospace',
      scale: "comfortable",
      lineHeight: "normal",
    },
    styles: {
      borderRadius: "md",
      cardShadow: "sm",
      spacing: "normal",
    },
    layouts: {
      gallery: "symmetrical-grid",
      heroStyle: "split-text-image",
      heroTextAlign: "text-left",
      sections: "symmetrical-grid",
      navigation: "horizontal",
    },
    animations: {
      intensity: "subtle",
      transitions: "smooth",
    },
  },
};
