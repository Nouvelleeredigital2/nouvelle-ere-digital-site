"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "masonry" | "flex";
type State =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "selected"
  | "invalid"
  | "dragging";

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string | number;
  variant?: Variant;
  responsive?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRearrange?: () => void;
  onResize?: () => void;
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 3,
  gap = "1rem",
  variant = "default",
  responsive = true,
  dataModel,
  onSelect,
  onAdd,
  onRearrange,
  onResize,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const variants: Record<Variant, string> = {
    default: "grid",
    masonry: "grid",
    flex: "flex flex-wrap",
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

  return (
    <div
      className={cn(
        variants[variant],
        responsive && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        stateClasses[state],
        className,
      )}
      style={{
        gridTemplateColumns: variant !== "flex" ? `repeat(${columns}, 1fr)` : undefined,
        gap,
      }}
      role="grid"
      aria-label="Layout en grille"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="grid-cell"
          role="gridcell"
          onClick={() => onSelect?.(`item-${index}`)}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
