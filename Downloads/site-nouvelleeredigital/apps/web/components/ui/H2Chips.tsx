"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

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

interface H2ChipsProps {
  chips: Array<{ id: string; label: string; level: number }>;
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

export const H2Chips: React.FC<H2ChipsProps> = ({
  chips,
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
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  const variants: Record<Variant, string> = {
    default: "bg-[var(--couleur-light)] border border-[var(--color-primary)]",
    outlined: "border border-[var(--color-primary)] bg-transparent",
    filled: "bg-[var(--color-primary)] text-white",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "bg-[var(--couleur-light-hover)]",
    active: "bg-[var(--couleur-light-active)]",
    focus: "ring-2 ring-[var(--color-primary)]",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-[var(--color-primary)]",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  const visibleChips = maxVisible ? chips.slice(0, maxVisible) : chips;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]",
        stateClasses[state],
        className,
      )}
      role="list"
      aria-label="Puces H2"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {chips.map((chip) => (
        <span
          key={chip.id}
          className={cn(
            sizes[size],
            variants[variant],
            selectedIds.includes(chip.id) && "selected",
            "cursor-pointer inline-block",
          )}
          onClick={() => handleSelect(chip.id)}
          role="listitem"
          aria-level={chip.level}
          aria-label={`Titre ${chip.level}: ${chip.label}`}
        >
          <Badge>
            H{chip.level}: {chip.label}
          </Badge>
        </span>
      ))}
    </div>
  );
};
