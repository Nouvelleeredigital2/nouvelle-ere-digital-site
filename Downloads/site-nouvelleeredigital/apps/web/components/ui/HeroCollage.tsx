"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

type Layout = "grid" | "masonry" | "free";
type Variant = "static" | "interactive" | "animated";
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

interface HeroCollageProps {
  items: Array<{ id: string; src: string; alt: string; position?: { x: number; y: number } }>;
  layout?: Layout;
  variant?: Variant;
  size?: Size;
  animated?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRearrange?: () => void;
  onZoom?: (id: string) => void;
  className?: string;
}

export const HeroCollage: React.FC<HeroCollageProps> = ({
  items,
  layout = "grid",
  variant = "static",
  size = "lg",
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onRearrange,
  onZoom,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const layouts: Record<Layout, string> = {
    grid: "grid grid-cols-3 gap-2",
    masonry: "columns-3 gap-2",
    free: "relative",
  };

  const sizes: Record<Size, string> = {
    sm: "h-64",
    md: "h-80",
    lg: "h-96",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "opacity-90",
    active: "scale-105",
    focus: "ring-2 ring-[var(--color-primary)]",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-[var(--color-primary)]",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  return (
    <div
      className={cn(
        "bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-4",
        layouts[layout],
        sizes[size],
        animated && "transition-all duration-300",
        stateClasses[state],
        className,
      )}
      role="img"
      aria-label="Collage héroïque"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "w-full h-auto object-cover rounded cursor-pointer",
            item.position && `absolute left-${item.position.x} top-${item.position.y}`,
          )}
          onClick={() => onSelect?.(item.id)}
        >
          <Media type="image" src={item.src} alt={item.alt} />
        </div>
      ))}
    </div>
  );
};
