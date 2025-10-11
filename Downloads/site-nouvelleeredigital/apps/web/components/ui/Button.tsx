import { ButtonHTMLAttributes, ReactElement, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";

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

  const classes = cn(variants[variant], sizes[size], className);

  if (asChild && isValidElement(children as ReactElement)) {
    return cloneElement(children as ReactElement, {
      className: cn((children as any).props?.className, classes),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
