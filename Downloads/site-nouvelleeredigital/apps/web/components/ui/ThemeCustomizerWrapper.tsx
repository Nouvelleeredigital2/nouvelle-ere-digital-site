"use client";

import { useTheme } from "@/components/context/PersonaProvider";
import { ThemeCustomizer } from "@/components/ui/ThemeCustomizer";

// Composant client pour gérer l'état du personnaliseur
export function ThemeCustomizerWrapper() {
  const { isCustomizerOpen, closeCustomizer } = useTheme();

  return <ThemeCustomizer isOpen={isCustomizerOpen} onClose={closeCustomizer} />;
}
