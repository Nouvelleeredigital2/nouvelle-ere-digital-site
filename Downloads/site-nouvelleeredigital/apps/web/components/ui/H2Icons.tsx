"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "default" | "outlined" | "filled";
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

interface H2IconsProps {
  icons: Array<{ id: string; label: string; icon: string; level: number }>;
  selectedIds?: string[];
  variant?: Variant;
  size?: Size;
  maxVisible?: number;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onNavigate?: (id: string) => void;
  className?: string;
}

export const H2Icons: React.FC<H2IconsProps> = ({
  icons,
  selectedIds = [],
  variant = "default",
  size = "md",
  maxVisible,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onNavigate,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleSelect = (id: string) => {
    if (state === "disabled") return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const variants: Record<Variant, string> = {
    default: "text-[var(--color-primary)]",
    outlined: "border border-[var(--color-primary)] bg-transparent",
    filled: "bg-[var(--color-primary)] text-card-foreground",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "opacity-75",
    active: "scale-110",
    focus: "ring-2 ring-[var(--color-primary)]",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "ring-2 ring-yellow-400",
    invalid: "text-error",
    dragging: "cursor-grabbing",
  };

  const visibleIcons = maxVisible ? icons.slice(0, maxVisible) : icons;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]",
        stateClasses[state],
        className,
      )}
      role="list"
      aria-label="Icônes H2"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {visibleIcons.map((icon) => (
        <div
          key={icon.id}
          className={cn(
            "flex items-center gap-1 cursor-pointer transition-transform",
            sizes[size],
            variants[variant],
            selectedIds.includes(icon.id) && "ring-2 ring-yellow-400",
            stateClasses[selectedIds.includes(icon.id) ? "selected" : "default"],
          )}
          onClick={() => handleSelect(icon.id)}
          role="listitem"
          aria-level={icon.level}
          aria-label={`Icône ${icon.level}: ${icon.label}`}
        >
          <Icon name={icon.icon} className={cn(sizes[size])} />
          <span className="text-sm">{icon.label}</span>
        </div>
      ))}
    </div>
  );
};
