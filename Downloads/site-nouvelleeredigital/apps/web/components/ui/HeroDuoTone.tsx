"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

type Variant = "overlay" | "blend" | "filter";
type State =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "selected"
  | "invalid"
  | "dragging";

interface HeroDuoToneProps {
  src: string;
  alt: string;
  primaryColor?: string;
  secondaryColor?: string;
  variant?: Variant;
  animated?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onChangeColor?: (color: string) => void;
  onToggle?: () => void;
  className?: string;
}

export const HeroDuoTone: React.FC<HeroDuoToneProps> = ({
  src,
  alt,
  primaryColor = "#ff0000",
  secondaryColor = "#0000ff",
  variant = "filter",
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onChangeColor,
  onToggle,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const variants: Record<Variant, string> = {
    overlay: "relative",
    blend: "mix-blend-multiply",
    filter: "filter",
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
        "relative bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] overflow-hidden",
        stateClasses[state],
        className,
      )}
      role="img"
      aria-label={alt}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      <Media type="image" src={src} alt={alt} className="w-full h-96 object-cover" />
      <div
        className={cn(
          "absolute inset-0",
          variant === "overlay" &&
            `bg-gradient-to-b from-[${primaryColor}] to-[${secondaryColor}] opacity-50`,
          variant === "filter" && `filter hue-rotate-90 saturate-150`,
        )}
      />
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 bg-[var(--color-primary)] text-card-foreground px-3 py-1 rounded"
      >
        Toggle
      </button>
    </div>
  );
};
