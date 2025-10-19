"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

type Variant = "toggle" | "dropdown" | "button";
type Size = "sm" | "md" | "lg";
type State =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "selected"
  | "invalid"
  | "dragging";

interface ThemeSwitchProps {
  themes: Array<{ id: string; label: string; icon?: string }>;
  currentTheme?: string;
  variant?: Variant;
  size?: Size;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onToggle?: (themeId: string) => void;
  onChange?: (themeId: string) => void;
  className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  themes,
  currentTheme,
  variant = "toggle",
  size = "md",
  dataModel,
  onSelect,
  onAdd,
  onToggle,
  onChange,
  className,
}) => {
  const [state, setState] = useState<State>("default");
  const [theme, setTheme] = useState(currentTheme || "light");

  // Persistance locale pour le thème
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggle = (themeId: string) => {
    if (state === "disabled") return;
    setTheme(themeId);
    localStorage.setItem("theme", themeId); // Sauvegarder dans localStorage
    if (onToggle) onToggle(themeId);
    if (onChange) onChange(themeId);
  };

  const sizes: Record<Size, string> = {
    sm: "w-8 h-4",
    md: "w-12 h-6",
    lg: "w-16 h-8",
  };

  const variants: Record<Variant, string> = {
    toggle: "relative inline-flex items-center rounded-full transition-colors",
    dropdown: "relative",
    button: "flex gap-2",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "opacity-90",
    active: "scale-95",
    focus: "ring-2 ring-[var(--color-primary)]",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-[var(--color-primary)]",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  if (variant === "toggle") {
    return (
      <button
        className={cn(
          "relative inline-flex items-center rounded-full transition-colors",
          sizes[size],
          theme === "dark" ? "bg-muted" : "bg-muted",
          stateClasses[state],
          className,
        )}
        onMouseEnter={() => setState("hover")}
        onMouseLeave={() => setState("default")}
        onFocus={() => setState("focus")}
        onBlur={() => setState("default")}
        onClick={() => handleToggle(theme === "dark" ? "light" : "dark")}
        role="switch"
        aria-checked={theme === "dark"}
        aria-label={`Basculer vers le thème ${theme === "dark" ? "clair" : "sombre"}`}
      >
        <span
          className={cn(
            "inline-block rounded-full bg-card shadow transform transition-transform",
            size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-7 h-7",
            theme === "dark" ? "translate-x-full" : "translate-x-0",
          )}
        />
      </button>
    );
  }

  if (variant === "dropdown") {
    return (
      <select
        value={theme}
        onChange={(e) => handleToggle(e.target.value)}
        className={cn(
          "border rounded p-2 bg-[var(--couleur-light)]",
          stateClasses[state],
          className,
        )}
        onMouseEnter={() => setState("hover")}
        onMouseLeave={() => setState("default")}
        onFocus={() => setState("focus")}
        onBlur={() => setState("default")}
        aria-label="Sélectionner un thème"
      >
        {themes.map((themeOption) => (
          <option key={themeOption.id} value={themeOption.id}>
            {themeOption.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {themes.map((themeOption) => (
        <Button
          key={themeOption.id}
          size="sm"
          variant={theme === themeOption.id ? "primary" : "outline"}
          onClick={() => handleToggle(themeOption.id)}
          onMouseEnter={() => setState("hover")}
          onMouseLeave={() => setState("default")}
          onFocus={() => setState("focus")}
          onBlur={() => setState("default")}
          aria-pressed={theme === themeOption.id}
        >
          {themeOption.icon && <span>{themeOption.icon}</span>} {themeOption.label}
        </Button>
      ))}
    </div>
  );
};
