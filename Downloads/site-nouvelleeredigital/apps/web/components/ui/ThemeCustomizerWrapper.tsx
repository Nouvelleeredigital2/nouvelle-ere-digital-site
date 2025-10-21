"use client";

import React from "react";
import { ThemeCustomizer } from "@/components/ui/ThemeCustomizer";

// Composant client pour gérer l'état du personnaliseur
export function ThemeCustomizerWrapper() {
  const [open, setOpen] = React.useState(false);
  return <ThemeCustomizer isOpen={open} onClose={() => setOpen(false)} />;
}
