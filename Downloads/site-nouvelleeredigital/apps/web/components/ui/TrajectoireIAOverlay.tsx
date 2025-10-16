"use client";

import React, { useState, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

// Lazy load the heavy SVG component
const TrajectoireSVG = lazy(() =>
  import("./TrajectoireSVG").then((module) => ({ default: module.TrajectoireSVG })),
);

type Variant = "line" | "path" | "animated";
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

interface TrajectoireIAOverlayProps {
  trajectories: Array<{ id: string; points: Array<{ x: number; y: number }>; color: string }>;
  variant?: Variant;
  opacity?: number;
  size?: Size;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onAnimate?: () => void;
  onReset?: () => void;
  className?: string;
}

export const TrajectoireIAOverlay: React.FC<TrajectoireIAOverlayProps> = ({
  trajectories,
  variant = "line",
  opacity = 0.7,
  size = "md",
  dataModel,
  onSelect,
  onAdd,
  onAnimate,
  onReset,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleSelect = (id: string) => {
    if (state === "disabled") return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: "w-full h-32",
    md: "w-full h-48",
    lg: "w-full h-64",
  };

  const variants: Record<Variant, string> = {
    line: "absolute inset-0 pointer-events-none",
    path: "absolute inset-0 pointer-events-auto",
    animated: "absolute inset-0 animate-pulse",
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
        "relative bg-transparent",
        sizes[size],
        variants[variant],
        stateClasses[state],
        className,
      )}
      style={{ opacity }}
      role="img"
      aria-label="Overlay de trajectoire IA"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded" />}>
        <TrajectoireSVG trajectories={trajectories} variant={variant} onSelect={handleSelect} />
      </Suspense>
      {onAnimate && (
        <button
          onClick={onAnimate}
          className="absolute top-2 left-2 bg-[var(--color-primary)] text-white px-2 py-1 rounded"
        >
          Animer
        </button>
      )}
      {onReset && (
        <button
          onClick={onReset}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
};
