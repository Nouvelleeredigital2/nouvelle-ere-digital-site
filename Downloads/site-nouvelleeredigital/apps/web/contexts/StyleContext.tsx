"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface StyleConfig {
  headingVariant: "default" | "underlined" | "shadow" | "fade" | "slide" | "bold" | "minimal";
  bodyFont: "inter" | "roboto" | "playfair" | "mono";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: "none" | "small" | "medium" | "large" | "xl";
  spacing: "compact" | "comfortable" | "spacious";
  mode: "light" | "dark";
}

const StyleContext = createContext<{
  config: StyleConfig;
  saveConfig: (config: StyleConfig) => void;
  resetConfig: () => void;
} | null>(null);

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<StyleConfig>({
    headingVariant: "underlined",
    bodyFont: "inter",
    primaryColor: "#8b5cf6",
    secondaryColor: "#3b82f6",
    accentColor: "#ec4899",
    borderRadius: "medium",
    spacing: "comfortable",
    mode: "light",
  });

  // Injection des variables CSS au montage et à chaque changement
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", config.primaryColor);
    document.documentElement.style.setProperty("--secondary-color", config.secondaryColor);
    document.documentElement.style.setProperty("--accent-color", config.accentColor);
    document.documentElement.style.setProperty(
      "--border-radius",
      getBorderRadiusValue(config.borderRadius),
    );
    document.documentElement.style.setProperty("--spacing", getSpacingValue(config.spacing));
    document.documentElement.style.setProperty(
      "--bg-color",
      config.mode === "dark" ? "#1a1a1a" : "#ffffff",
    );
    document.documentElement.style.setProperty(
      "--text-color",
      config.mode === "dark" ? "#ffffff" : "#000000",
    );

    // Appliquer la police globale
    document.body.style.fontFamily =
      config.bodyFont === "playfair"
        ? "Playfair Display, serif"
        : config.bodyFont === "mono"
          ? "JetBrains Mono, monospace"
          : config.bodyFont === "roboto"
            ? "Roboto, sans-serif"
            : "Inter, sans-serif";

    // Appliquer le mode sombre/clair
    document.documentElement.classList.toggle("dark", config.mode === "dark");
  }, [config]);

  const getBorderRadiusValue = (radius: string) => {
    switch (radius) {
      case "none":
        return "0";
      case "small":
        return "0.25rem";
      case "medium":
        return "0.5rem";
      case "large":
        return "0.75rem";
      case "xl":
        return "1rem";
      default:
        return "0.5rem";
    }
  };

  const getSpacingValue = (spacing: string) => {
    switch (spacing) {
      case "compact":
        return "0.5rem";
      case "comfortable":
        return "1rem";
      case "spacious":
        return "1.5rem";
      default:
        return "1rem";
    }
  };

  const saveConfig = (newConfig: StyleConfig) => {
    setConfig(newConfig);
    localStorage.setItem("site-style-config", JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    const defaultConfig: StyleConfig = {
      headingVariant: "underlined",
      bodyFont: "inter",
      primaryColor: "#8b5cf6",
      secondaryColor: "#3b82f6",
      accentColor: "#ec4899",
      borderRadius: "medium",
      spacing: "comfortable",
      mode: "light",
    };
    saveConfig(defaultConfig);
  };

  return (
    <StyleContext.Provider value={{ config, saveConfig, resetConfig }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStyle must be used within StyleProvider");
  }
  return context;
};
