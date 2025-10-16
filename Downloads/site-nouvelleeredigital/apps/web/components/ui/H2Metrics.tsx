"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { KPI } from "./KPI";

type Variant = "default" | "bar" | "badge";
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

interface H2MetricsProps {
  metrics: Array<{ id: string; label: string; value: number; unit?: string; level: number }>;
  selectedIds?: string[];
  variant?: Variant;
  size?: Size;
  maxVisible?: number;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onUpdate?: (id: string, value: number) => void;
  className?: string;
}

export const H2Metrics: React.FC<H2MetricsProps> = ({
  metrics,
  selectedIds = [],
  variant = "default",
  size = "md",
  maxVisible,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onUpdate,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleSelect = (id: string) => {
    if (state === "disabled") return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variants: Record<Variant, string> = {
    default: "flex flex-col gap-2",
    bar: "flex flex-col gap-2",
    badge: "flex flex-wrap gap-2",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "opacity-75",
    active: "scale-105",
    focus: "ring-2 ring-[var(--color-primary)]",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-[var(--color-primary)]",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  const visibleMetrics = maxVisible ? metrics.slice(0, maxVisible) : metrics;

  return (
    <div
      className={cn(
        "p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]",
        variants[variant],
        stateClasses[state],
        className,
      )}
      role="list"
      aria-label="Métriques H2"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      {visibleMetrics.map((metric) => (
        <div
          key={metric.id}
          className={cn(
            "cursor-pointer transition-transform",
            selectedIds.includes(metric.id) && "ring-2 ring-yellow-400",
            sizes[size],
          )}
          onClick={() => handleSelect(metric.id)}
          role="listitem"
          aria-level={metric.level}
          aria-label={`Métrique ${metric.level}: ${metric.label} - ${metric.value} ${metric.unit || ""}`}
        >
          <KPI
            items={[
              {
                label: `${metric.label} (H${metric.level})`,
                value: metric.value,
                unit: metric.unit,
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
};
