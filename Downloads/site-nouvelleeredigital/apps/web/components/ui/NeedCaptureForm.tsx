"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Text } from "./Text";

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

interface NeedCaptureFormProps {
  fields: Array<{
    id: string;
    label: string;
    type: "text" | "email" | "select" | "textarea";
    required?: boolean;
    options?: string[];
  }>;
  initialValues?: Record<string, any>;
  variant?: Variant;
  size?: Size;
  submitLabel?: string;
  dataModel?: "need" | "module" | "bundle";
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (fieldId: string, value: any) => void;
  onValidate?: (errors: Record<string, string>) => void;
  onCancel?: () => void;
  className?: string;
}

export const NeedCaptureForm: React.FC<NeedCaptureFormProps> = ({
  fields,
  initialValues = {},
  variant = "default",
  size = "md",
  submitLabel = "Soumettre",
  dataModel,
  onSubmit,
  onChange,
  onValidate,
  onCancel,
  className,
}) => {
  const [state, setState] = useState<State>("default");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    onChange?.(fieldId, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
  };

  const variants: Record<Variant, string> = {
    default: "w-full max-w-md",
    compact: "w-full max-w-sm p-2",
    detailed: "w-full max-w-lg p-6",
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
    <form
      className={cn(
        "bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6",
        variants[variant],
        stateClasses[state],
        className,
      )}
      role="form"
      aria-label="Formulaire de capture de besoins"
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onFocus={() => setState("focus")}
      onBlur={() => setState("default")}
      onSubmit={handleSubmit}
    >
      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium mb-1">
            {field.label} {field.required && "*"}
          </label>
          {field.type === "select" ? (
            <select
              id={field.id}
              value={values[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={cn("w-full border rounded p-2", errors[field.id] && "border-red-500")}
              aria-required={field.required}
              aria-invalid={!!errors[field.id]}
            >
              <option value="">Sélectionnez...</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.id}
              value={values[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={cn("w-full border rounded p-2", errors[field.id] && "border-red-500")}
              aria-required={field.required}
              aria-invalid={!!errors[field.id]}
            />
          )}
          {errors[field.id] && <Text className="text-error text-sm">{errors[field.id]}</Text>}
        </div>
      ))}
      <div className="flex gap-2">
        <Button type="submit">{submitLabel}</Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
};
