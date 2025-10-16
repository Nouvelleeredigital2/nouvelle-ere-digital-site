"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "dashed" | "dotted";
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

interface FocusRingProps {
  children: React.ReactNode;
  color?: string;
  size?: Size;
  variant?: Variant;
  animated?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const FocusRing: React.FC<FocusRingProps> = ({
  children,
  color = "blue",
  size = "md",
  variant = "solid",
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onFocus,
  onBlur,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const sizes: Record<Size, string> = {
    sm: "ring-1",
    md: "ring-2",
    lg: "ring-4",
  };

  const variants: Record<Variant, string> = {
    solid: "ring-solid",
    dashed: "ring-dashed",
    dotted: "ring-dotted",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "ring-opacity-50",
    active: "ring-opacity-75",
    focus: `ring-${color}-500 ${animated ? "animate-pulse" : ""}`,
    disabled: "opacity-50 cursor-not-allowed",
    selected: "ring-offset-2",
    invalid: "ring-red-500",
    dragging: "cursor-grabbing",
  };

  return (
    <div
      className={cn(
        "relative inline-block",
        sizes[size],
        variants[variant],
        stateClasses[state],
        className,
      )}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => {
        setState("focus");
        onFocus?.();
      }}
      onBlur={() => {
        setState("default");
        onBlur?.();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
