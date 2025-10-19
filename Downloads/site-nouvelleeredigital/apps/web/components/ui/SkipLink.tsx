"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "hidden" | "visible";
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

interface SkipLinkProps {
  href: string;
  label: string;
  variant?: Variant;
  size?: Size;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  label,
  variant = "default",
  size = "md",
  dataModel,
  onSelect,
  onAdd,
  onClick,
  onFocus,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleClick = () => {
    if (onClick) onClick();
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  const variants: Record<Variant, string> = {
    default:
      "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[var(--color-primary)] text-card-foreground",
    hidden: "sr-only",
    visible: "inline-block bg-[var(--color-primary)] text-card-foreground rounded",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "bg-[var(--color-primary-hover)]",
    active: "bg-[var(--color-primary-active)]",
    focus: "ring-2 ring-yellow-400",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-yellow-400",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  return (
    <a
      href={href}
      className={cn(
        "transition-all duration-200",
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
      onBlur={() => setState("default")}
      onClick={handleClick}
      role="link"
      aria-label={`Sauter à ${label}`}
    >
      {label}
    </a>
  );
};
