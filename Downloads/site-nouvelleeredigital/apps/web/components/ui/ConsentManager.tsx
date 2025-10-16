"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Text } from "./Text";

type Variant = "modal" | "panel" | "inline";
type State =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "selected"
  | "invalid"
  | "dragging";

interface ConsentManagerProps {
  categories: Array<{ id: string; label: string; description: string; required?: boolean }>;
  selectedIds?: string[];
  title?: string;
  variant?: Variant;
  isOpen?: boolean;
  dataModel?: "need" | "module" | "bundle";
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onToggleAll?: () => void;
  className?: string;
}

export const ConsentManager: React.FC<ConsentManagerProps> = ({
  categories,
  selectedIds = [],
  title = "Gestion des consentements",
  variant = "panel",
  isOpen = true,
  dataModel,
  onSelect,
  onAdd,
  onSave,
  onCancel,
  onToggleAll,
  className,
}) => {
  const [state, setState] = useState<State>("default");

  const handleSelect = (id: string) => {
    if (state === "disabled") return;
    if (onSelect) onSelect(id);
  };

  const variants: Record<Variant, string> = {
    modal: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
    panel: "w-full max-w-md p-6",
    inline: "w-full p-4",
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
    <div className={cn(variants[variant], className)}>
      {variant === "modal" && !isOpen ? null : (
        <div
          className={cn(
            "bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6",
            variant === "modal" && "relative",
            stateClasses[state],
          )}
          role="dialog"
          aria-label={title}
          onMouseEnter={() => setState("hover")}
          onMouseLeave={() => setState("default")}
          onFocus={() => setState("focus")}
          onBlur={() => setState("default")}
        >
          <Text size="lg" className="font-medium mb-4">
            {title}
          </Text>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id={category.id}
                  checked={selectedIds.includes(category.id)}
                  onChange={() => handleSelect(category.id)}
                  className="mt-1"
                  disabled={category.required}
                />
                <div>
                  <Text size="base" className="font-medium">
                    {category.label}
                  </Text>
                  <Text size="sm" className="text-muted">
                    {category.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={onSave}>Sauvegarder</Button>
            <Button variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            {onToggleAll && (
              <Button variant="ghost" onClick={onToggleAll}>
                Tout sélectionner
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
