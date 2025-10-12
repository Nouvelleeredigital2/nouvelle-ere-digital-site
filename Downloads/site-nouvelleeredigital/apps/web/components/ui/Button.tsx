"use client";

import { ButtonHTMLAttributes, ReactElement, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { useStyle } from "@/contexts/StyleContext";

type Variant = "primary" | "outline" | "ghost" | "secondaire";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  asChild,
  children,
  ...props
}: ButtonProps) => {
  const { config } = useStyle();

  const variants: Record<Variant, string> = {
    primary: "btn-primary",
    outline: "btn-neutral",
    ghost: "btn-ghost",
    secondaire: "btn-neutral", // alias pour compatibilité
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  // Styles dynamiques basés sur le contexte
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: config.borderRadius === 'none' ? '0' :
                   config.borderRadius === 'small' ? '0.25rem' :
                   config.borderRadius === 'medium' ? '0.5rem' :
                   config.borderRadius === 'large' ? '0.75rem' : '1rem',
      fontFamily: config.bodyFont === 'inter' ? 'Inter, sans-serif' :
                 config.bodyFont === 'roboto' ? 'Roboto, sans-serif' :
                 config.bodyFont === 'playfair' ? 'Playfair Display, serif' : 'JetBrains Mono, monospace',
      transition: 'all 0.3s ease',
    };

    switch(variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: config.primaryColor,
          color: '#ffffff',
          border: 'none',
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: config.primaryColor,
          border: `2px solid ${config.primaryColor}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: config.primaryColor,
          border: 'none',
        };
      case 'secondaire':
        return {
          ...baseStyles,
          backgroundColor: config.secondaryColor,
          color: '#ffffff',
          border: 'none',
        };
      default:
        return baseStyles;
    }
  };

  const classes = cn(variants[variant], sizes[size], className);

  if (asChild && isValidElement(children as ReactElement)) {
    return cloneElement(children as ReactElement, {
      className: cn((children as any).props?.className, classes),
      style: { ...getButtonStyles(), ...(children as any).props?.style },
    });
  }

  return (
    <button className={classes} style={getButtonStyles()} {...props}>
      {children}
    </button>
  );
};
