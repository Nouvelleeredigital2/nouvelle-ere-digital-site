"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./Text";

type Variant = "badge" | "bar" | "icon";
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

interface CompatibilityIndicatorProps {
  compatibility: number | { score: number; status: "high" | "medium" | "low" };
  label?: string;
  variant?: Variant;
  size?: Size;
  showValue?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onDetails?: (id: string) => void;
  onImprove?: (id: string) => void;
  className?: string;
}

export const CompatibilityIndicator: React.FC<CompatibilityIndicatorProps> = ({
  compatibility,
  label,
  variant = "badge",
  size = "md",
  showValue = false,
  dataModel,
  onSelect,
  onAdd,
  onDetails,
  onImprove,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const score = typeof compatibility === "number" ? compatibility : compatibility.score;
  const status =
    typeof compatibility === "object"
      ? compatibility.status
      : score > 70
        ? "high"
        : score > 40
          ? "medium"
          : "low";

  const handleSelect = () => {
    if (state === "disabled") return;
    if (onSelect) onSelect("compatibility");
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm p-1",
    md: "text-base p-2",
    lg: "text-lg p-3",
  };

  const variants: Record<Variant, string> = {
    badge: "inline-flex items-center gap-2 rounded-full border",
    bar: "w-full h-2 rounded-full overflow-hidden",
    icon: "w-6 h-6 rounded-full",
  };

  const statusColors: Record<string, string> = {
    high: "bg-success border-green-500",
    medium: "bg-warning border-yellow-500",
    low: "bg-error border-red-500",
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
        sizes[size],
        statusColors[status],
        stateClasses[state],
        className,
      )}
      role="status"
      aria-label={`${label || "Compatibilité"}: ${status} (${score}%)`}
      aria-valuenow={score}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
      onClick={handleSelect}
      tabIndex={0}
    >
      {variant === "badge" && (
        <>
          <div className={`w-3 h-3 rounded-full ${statusColors[status].split(" ")[0]}`} />
          <Text size={size === "sm" ? "sm" : "base"}>
            {label || status} {showValue && `(${score}%)`}
          </Text>
        </>
      )}
      {variant === "bar" && (
        <div
          className={`h-full ${statusColors[status].split(" ")[0]}`}
          style={{ width: `${score}%` }}
        />
      )}
      {variant === "icon" && (
        <div className={`w-full h-full ${statusColors[status].split(" ")[0]}`} />
      )}
    </div>
  );
};
