"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Button } from "./Button";

type Type = "success" | "error" | "warning" | "info";
type Variant = "default" | "compact" | "detailed";
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

interface ToastProps {
  message: string;
  type?: Type;
  duration?: number;
  variant?: Variant;
  size?: Size;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onClose?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 5000,
  variant = "default",
  size = "md",
  dataModel,
  onSelect,
  onAdd,
  onClose,
  onDismiss,
  className,
}) => {
  const [state, setState] = useState<State>("default");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const types: Record<Type, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  const sizes: Record<Size, string> = {
    sm: "p-2 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg",
  };

  const variants: Record<Variant, string> = {
    default: "fixed bottom-4 right-4 max-w-sm",
    compact: "fixed bottom-4 right-4 max-w-xs",
    detailed: "fixed bottom-4 left-4 right-4",
  };

  const stateClasses: Record<State, string> = {
    default: "",
    hover: "opacity-90",
    active: "scale-95",
    focus: "ring-2 ring-yellow-400",
    disabled: "opacity-50 cursor-not-allowed",
    selected: "border-2 border-yellow-400",
    invalid: "border-2 border-red-500",
    dragging: "cursor-grabbing",
  };

  return (
    <div
      className={cn(
        "rounded-[var(--border-radius-large)] shadow-lg transition-all duration-300",
        types[type],
        sizes[size],
        variants[variant],
        stateClasses[state],
        className,
      )}
      role="alert"
      aria-live="assertive"
      aria-label={`Notification: ${message}`}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
    >
      <div className="flex items-center justify-between">
        <Text>{message}</Text>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          aria-label="Fermer la notification"
        >
          ×
        </Button>
      </div>
    </div>
  );
};
