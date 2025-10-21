"use client";

import { ButtonHTMLAttributes, ReactElement, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "secondaire" | "destructive";
type Size = "sm" | "md" | "lg" | "xl";

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
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondaire: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
    xl: "h-12 px-10 text-xl",
  };

  const buttonClasses = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      className: cn(buttonClasses, (children as any).props?.className),
      ...props,
    });
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
