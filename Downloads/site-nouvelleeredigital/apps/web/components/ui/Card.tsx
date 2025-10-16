"use client";

import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Carte adaptative utilisant les variables CSS du système de personas */
export const Card = ({
  children,
  className,
  hover = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const cardClasses = cn(
    "bg-card text-card-foreground rounded-md border border-border shadow-sm transition-all duration-300",
    hover && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
    className,
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};
