"use client";

import React from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  layoutType?: "gallery" | "hero";
  fallbackLayout?: "symmetrical-grid" | "asymmetrical-masonry" | "single-column";
}

export function Grid({
  children,
  className,
  layoutType = "gallery",
  fallbackLayout = "symmetrical-grid",
}: GridProps) {
  const { persona } = usePersona();

  // Essaie d'abord d'utiliser la valeur du persona, sinon utilise le fallback
  const getLayoutFromPersona = () => {
    try {
      if (layoutType === "gallery") {
        return persona?.settings?.layouts?.gallery || fallbackLayout;
      } else if (layoutType === "hero") {
        return persona?.settings?.layouts?.heroStyle || fallbackLayout;
      }
      return fallbackLayout;
    } catch (error) {
      console.warn("Erreur lors de la lecture du layout du persona:", error);
      return fallbackLayout;
    }
  };

  const layoutStyle = getLayoutFromPersona();

  const gridClasses: Record<string, string> = {
    "symmetrical-grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
    "asymmetrical-masonry": "columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6",
    "single-column": "flex flex-col items-center space-y-6 md:space-y-8",
    "full-visual": "w-full",
    "split-text-image": "grid grid-cols-1 lg:grid-cols-2 gap-8",
    minimalist: "max-w-4xl mx-auto",
    classic: "max-w-6xl mx-auto",
  };

  // Gestion spéciale pour les layouts qui nécessitent un wrapper
  if (layoutStyle === "single-column") {
    return (
      <div className={cn(gridClasses[layoutStyle], className)}>
        {React.Children.map(children, (child) => (
          <div className="w-full max-w-3xl">{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(gridClasses[layoutStyle] || gridClasses[fallbackLayout as string], className)}
    >
      {children}
    </div>
  );
}

// Export aussi l'ancien nom pour la compatibilité
export const AdaptiveGrid = Grid;
