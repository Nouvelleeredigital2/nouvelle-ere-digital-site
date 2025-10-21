"use client";

import React, { useState } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Palette, Eye, Sun, Moon, Monitor, Contrast } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeSelectorProps {
  onThemeChange?: (theme: string | null) => void;
}

// Thèmes prédéfinis avec contraste amélioré
const contrastThemes = {
  light: {
    name: "Clair",
    description: "Thème lumineux avec contraste élevé",
    icon: Sun,
    colors: {
      background: "#ffffff",
      foreground: "#1f2937",
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#10b981",
      card: "#f9fafb",
      border: "#e5e7eb",
      muted: "#f3f4f6",
    },
  },
  dark: {
    name: "Sombre",
    description: "Thème sombre avec contraste élevé",
    icon: Moon,
    colors: {
      background: "#111827",
      foreground: "#f9fafb",
      primary: "#60a5fa",
      secondary: "#9ca3af",
      accent: "#34d399",
      card: "#1f2937",
      border: "#374151",
      muted: "#374151",
    },
  },
  highContrast: {
    name: "Contraste Élevé",
    description: "Contraste maximal pour une meilleure lisibilité",
    icon: Contrast,
    colors: {
      background: "#000000",
      foreground: "#ffffff",
      primary: "#ffff00",
      secondary: "#ffffff",
      accent: "#00ff00",
      card: "#000000",
      border: "#ffffff",
      muted: "#333333",
    },
  },
  system: {
    name: "Système",
    description: "Suit les préférences de votre système",
    icon: Monitor,
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
      card: "hsl(var(--card))",
      border: "hsl(var(--border))",
      muted: "hsl(var(--muted))",
    },
  },
};

export function AdvancedThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const { persona, setPersona } = usePersona();
  const [selectedTheme, setSelectedTheme] = useState<string>("system");
  const [previewMode, setPreviewMode] = useState<string | null>(null);

  const applyThemeColors = (themeKey: string) => {
    const theme = contrastThemes[themeKey as keyof typeof contrastThemes];
    if (!theme) return;

    const root = document.documentElement;

    // Appliquer les couleurs du thème
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Sauvegarder le thème choisi
    localStorage.setItem("selected-theme", themeKey);
    setSelectedTheme(themeKey);
    onThemeChange?.(themeKey);
  };

  const previewTheme = (themeKey: string) => {
    setPreviewMode(themeKey);
    applyThemeColors(themeKey);

    // Remettre le thème précédent après 5 secondes
    setTimeout(() => {
      setPreviewMode(null);
      const savedTheme = localStorage.getItem("selected-theme") || "system";
      applyThemeColors(savedTheme);
    }, 5000);
  };

  const resetToPersonaTheme = () => {
    // Restaurer les couleurs du persona actif
    const root = document.documentElement;
    Object.entries(persona.settings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    localStorage.removeItem("selected-theme");
    setSelectedTheme("system");
    onThemeChange?.(null);
  };

  // Restaurer le thème sauvegardé au chargement
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    if (savedTheme && savedTheme !== "system") {
      applyThemeColors(savedTheme);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Header avec informations sur le thème actuel */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Gestion des Thèmes</h2>
        </div>
        <p className="text-muted-foreground text-lg mb-4">
          Choisissez votre style visuel préféré pour une meilleure expérience
        </p>

        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-muted-foreground">Thème actuel:</span>
          <Badge className="font-medium" variant="default">
            {contrastThemes[selectedTheme as keyof typeof contrastThemes]?.name || "Personnalisé"}
          </Badge>
          {selectedTheme !== "system" && (
            <Button size="sm" variant="ghost" onClick={resetToPersonaTheme}>
              Restaurer le thème du persona
            </Button>
          )}
        </div>
      </div>

      {/* Grille des thèmes avec prévisualisation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(contrastThemes).map(([key, theme]) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === key;
          const isPreviewing = previewMode === key;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 border-2",
                  isSelected && "border-primary bg-primary/5",
                  isPreviewing && "ring-2 ring-accent",
                )}
                onClick={() => applyThemeColors(key)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>

                {/* Palette de couleurs */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Object.entries(theme.colors)
                    .slice(0, 8)
                    .map(([colorKey, colorValue]) => (
                      <div
                        key={colorKey}
                        className="h-8 rounded border border-border/20"
                        style={{ backgroundColor: colorValue }}
                        title={`${colorKey}: ${colorValue}`}
                      />
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isSelected ? "primary" : "outline"}
                    className="flex-1"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      if (isSelected) {
                        resetToPersonaTheme();
                      } else {
                        previewTheme(key);
                      }
                    }}
                  >
                    {isPreviewing ? "Aperçu..." : isSelected ? "Actif" : "Aperçu 5s"}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="px-3"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      applyThemeColors(key);
                    }}
                  >
                    Appliquer
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Section d'aide et conseils */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Conseils pour une meilleure lisibilité</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                • <strong>Contraste Élevé</strong> : Idéal pour les présentations ou les
                environnements très lumineux
              </li>
              <li>
                • <strong>Clair</strong> : Parfait pour une utilisation quotidienne avec une
                excellente lisibilité
              </li>
              <li>
                • <strong>Sombre</strong> : Agréable pour les yeux en soirée ou dans des
                environnements sombres
              </li>
              <li>
                • <strong>Système</strong> : S'adapte automatiquement aux préférences de votre
                appareil
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Indicateur de prévisualisation */}
      <AnimatePresence>
        {previewMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Aperçu du thème {contrastThemes[previewMode as keyof typeof contrastThemes]?.name} -{" "}
            {5 - Math.floor((Date.now() % 5000) / 1000)}s restantes
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
