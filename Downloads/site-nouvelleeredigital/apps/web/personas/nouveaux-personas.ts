// Nouveaux personas basés sur les retours utilisateurs et l'analyse des données

import type { CreativePersona } from "@/shared/theme.types";

// Persona temporairement simplifié pour débogage
export const minimalistePersona: CreativePersona = {
  id: "minimaliste",
  name: "Le Minimaliste",
  description: "Vous appréciez la clarté et l'efficacité.",
  archetype: "Le Designer Épuré",
  visualIdentity: {
    mood: "light",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      primary: "#007bff",
      secondary: "#6c757d",
      accent: "#28a745",
      card: "#ffffff",
      border: "#dee2e6",
      muted: "#f8f9fa",
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
    },
    typography: {
      fontFamilySans: '"Inter", sans-serif',
      fontFamilySerif: '"Georgia", serif',
      fontFamilyMono: '"Monaco", monospace',
      scale: "comfortable",
      lineHeight: "normal",
    },
    styles: {
      borderRadius: "sm",
      cardShadow: "sm",
      spacing: "normal",
    },
    layouts: {
      gallery: "symmetrical-grid",
      heroStyle: "minimalist",
      heroTextAlign: "text-left",
      sections: "single-column",
      navigation: "horizontal",
    },
    animations: {
      intensity: "subtle",
      transitions: "smooth",
    },
  },
};

// Persona 7: Le Coloré - Pour les utilisateurs qui aiment les couleurs vives
export const colorePersona: CreativePersona = {
  id: "colore",
  name: "Le Coloré",
  description: "Vous êtes attiré par les couleurs vives et les éléments visuels expressifs.",
  archetype: "L'Artiste Chromatique",
  visualIdentity: {
    mood: "colorful",
    energy: "energetic",
  },
  settings: {
    colors: {
      background: "#f8f9fa",
      foreground: "#212529",
      primary: "#e91e63",
      secondary: "#2196f3",
      accent: "#ff9800",
      card: "#ffffff",
      border: "#dee2e6",
      muted: "#e9ecef",
      success: "#4caf50",
      warning: "#ff5722",
      error: "#f44336",
    },
    typography: {
      fontFamilySans: '"Poppins", "Segoe UI", sans-serif',
      fontFamilySerif: '"Playfair Display", serif',
      fontFamilyMono: '"Fira Code", monospace',
      scale: "comfortable",
      lineHeight: "normal",
    },
    styles: {
      borderRadius: "lg",
      cardShadow: "lg",
      spacing: "normal",
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

// Persona 8: Le Professionnel - Pour un usage corporate/business
export const professionnelPersona: CreativePersona = {
  id: "professionnel",
  name: "Le Professionnel",
  description:
    "Vous recherchez une interface sérieuse, structurée et adaptée aux environnements professionnels.",
  archetype: "Le Manager Organisé",
  visualIdentity: {
    mood: "cool",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#f8f9fa",
      foreground: "#495057",
      primary: "#007bff",
      secondary: "#6c757d",
      accent: "#28a745",
      card: "#ffffff",
      border: "#dee2e6",
      muted: "#e9ecef",
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
    },
    typography: {
      fontFamilySans: '"Segoe UI", "Roboto", sans-serif',
      fontFamilySerif: '"Times New Roman", serif',
      fontFamilyMono: '"Consolas", monospace',
      scale: "comfortable",
      lineHeight: "normal",
    },
    styles: {
      borderRadius: "sm",
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

// Persona 9: Le Gamer - Pour les utilisateurs qui aiment les interfaces dynamiques
export const gamerPersona: CreativePersona = {
  id: "gamer",
  name: "Le Gamer",
  description: "Vous appréciez les interfaces réactives et une expérience interactive engageante.",
  archetype: "Le Joueur Stratégique",
  visualIdentity: {
    mood: "dark",
    energy: "energetic",
  },
  settings: {
    colors: {
      background: "#0f172a",
      foreground: "#f1f5f9",
      primary: "#06b6d4",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      card: "#1e293b",
      border: "#334155",
      muted: "#475569",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    typography: {
      fontFamilySans: '"Orbitron", "Rajdhani", sans-serif',
      fontFamilySerif: '"Crimson Text", serif',
      fontFamilyMono: '"JetBrains Mono", monospace',
      scale: "comfortable",
      lineHeight: "normal",
    },
    styles: {
      borderRadius: "md",
      cardShadow: "xl",
      spacing: "normal",
    },
    layouts: {
      gallery: "symmetrical-grid",
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

// Persona 10: L'Artisan - Pour les créateurs et makers
export const artisanPersona: CreativePersona = {
  id: "artisan",
  name: "L'Artisan",
  description: "Vous créez et appréciez les détails fins avec une approche tactile et authentique.",
  archetype: "L'Artisan Créateur",
  visualIdentity: {
    mood: "warm",
    energy: "calm",
  },
  settings: {
    colors: {
      background: "#fef7ed",
      foreground: "#92400e",
      primary: "#d97706",
      secondary: "#a16207",
      accent: "#dc2626",
      card: "#ffffff",
      border: "#fed7aa",
      muted: "#fef3c7",
      success: "#16a34a",
      warning: "#d97706",
      error: "#dc2626",
    },
    typography: {
      fontFamilySans: '"Inter", sans-serif',
      fontFamilySerif: '"Crimson Text", serif',
      fontFamilyMono: '"JetBrains Mono", monospace',
      scale: "spacious",
      lineHeight: "relaxed",
    },
    styles: {
      borderRadius: "xl",
      cardShadow: "lg",
      spacing: "spacious",
    },
    layouts: {
      gallery: "asymmetrical-masonry",
      heroStyle: "split-text-image",
      heroTextAlign: "text-center",
      sections: "asymmetrical-masonry",
      navigation: "horizontal",
    },
    animations: {
      intensity: "moderate",
      transitions: "smooth",
    },
  },
};
