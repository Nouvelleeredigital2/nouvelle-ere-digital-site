"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Media } from "./Media";
import { Text } from "./Text";

type Variant = "split" | "slider" | "fade";
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

interface HeroBeforeAfterProps {
  before: { image: string; title: string; description?: string };
  after: { image: string; title: string; description?: string };
  variant?: Variant;
  size?: Size;
  animated?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onCompare?: () => void;
  onToggle?: () => void;
  className?: string;
}

export const HeroBeforeAfter: React.FC<HeroBeforeAfterProps> = ({
  before,
  after,
  variant = "split",
  size = "lg",
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onCompare,
  onToggle,
  className,
}) => {
  const [state, setState] = useState<State>("default");
  const [showAfter, setShowAfter] = useState(false);

  const sizes: Record<Size, string> = {
    sm: "h-64",
    md: "h-80",
    lg: "h-96",
  };

  const variants: Record<Variant, string> = {
    split: "grid grid-cols-2 gap-4",
    slider: "relative overflow-hidden",
    fade: "relative",
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
        "bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6",
        variants[variant],
        sizes[size],
        animated && "transition-all duration-300",
        stateClasses[state],
        className,
      )}
      role="img"
      aria-label={`Comparaison avant/après: ${before.title} vs ${after.title}`}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      <div className="relative">
        <Media
          type="image"
          src={before.image}
          alt={before.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-50">
          <Text size="lg" className="text-card-foreground font-bold">
            {before.title}
          </Text>
          {before.description && <Text className="text-card-foreground mt-2">{before.description}</Text>}
        </div>
      </div>
      <div className="relative">
        <Media
          type="image"
          src={after.image}
          alt={after.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-50">
          <Text size="lg" className="text-card-foreground font-bold">
            {after.title}
          </Text>
          {after.description && <Text className="text-card-foreground mt-2">{after.description}</Text>}
        </div>
      </div>
      <button
        onClick={onToggle}
        className="absolute top-2 right-2 bg-[var(--color-primary)] text-card-foreground px-2 py-1 rounded"
      >
        Basculer
      </button>
    </div>
  );
};
