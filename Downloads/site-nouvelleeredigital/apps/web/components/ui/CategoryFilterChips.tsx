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

interface CategoryFilterChipsProps {
  categories: Array<{ id: string; label: string; count?: number }>;
  selectedIds?: string[];
  multiple?: boolean;
  variant?: Variant;
  size?: Size;
  maxVisible?: number;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onClear?: () => void;
  className?: string;
}

export const CategoryFilterChips: React.FC<CategoryFilterChipsProps> = ({
  categories,
  selectedIds = [],
  multiple = true,
  variant = "default",
  size = "md",
  maxVisible,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onClear,
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

  const visibleCategories = maxVisible ? categories.slice(0, maxVisible) : categories;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]",
        stateClasses[state],
        className,
      )}
      role="group"
      aria-label="Filtres de catégories"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {visibleCategories.map((category) => (
        <span
          key={category.id}
          className={cn(
            sizes[size],
            variants[variant],
            selectedIds.includes(category.id) && "selected",
            "cursor-pointer inline-block",
          )}
          onClick={() => handleSelect(category.id)}
          role="checkbox"
          aria-checked={selectedIds.includes(category.id)}
          aria-label={`${category.label} (${category.count || 0})`}
        >
          <Badge>
            {category.label} {category.count && `(${category.count})`}
          </Badge>
        </span>
      ))}
      {onClear && (
        <button
          onClick={onClear}
          className="text-sm text-[var(--color-primary)] underline"
          aria-label="Effacer tous les filtres"
        >
          Effacer
        </button>
      )}
    </div>
  );
};
