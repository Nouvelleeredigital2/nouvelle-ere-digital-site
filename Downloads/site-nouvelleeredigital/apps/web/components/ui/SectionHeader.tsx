"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Badge } from "./Badge";

type Variant = "default" | "hero" | "minimal";
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

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: Array<{ id: string; label: string; icon?: string }>;
  variant?: Variant;
  size?: Size;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onEdit?: () => void;
  onCollapse?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions = [],
  variant = "default",
  size = "md",
  dataModel,
  onSelect,
  onAdd,
  onEdit,
  onCollapse,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleAction = (id: string) => {
    if (state === "disabled") return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm p-2",
    md: "text-base p-4",
    lg: "text-lg p-6",
  };

  const variants: Record<Variant, string> = {
    default: "bg-[var(--couleur-light)] border-b border-border",
    hero: "bg-gradient-to-r from-blue-500 to-purple-600 text-card-foreground",
    minimal: "bg-transparent border-b border-gray-100",
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
    <header
      className={cn(
        "flex items-center justify-between",
        sizes[size],
        variants[variant],
        stateClasses[state],
        className,
      )}
      role="banner"
      aria-label={`En-tête de section: ${title}`}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      <div>
        <Text size={size === "sm" ? "lg" : "lg"} className="font-bold">
          {title}
        </Text>
        {subtitle && (
          <Text size="sm" className="text-muted mt-1">
            {subtitle}
          </Text>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions.map((action) => (
          <span
            key={action.id}
            className="cursor-pointer inline-block"
            onClick={() => handleAction(action.id)}
          >
            <Badge>{action.label}</Badge>
          </span>
        ))}
        {onCollapse && (
          <button onClick={onCollapse} className="text-muted-foreground0">
            −
          </button>
        )}
      </div>
    </header>
  );
};
