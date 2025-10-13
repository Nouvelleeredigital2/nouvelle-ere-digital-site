"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "accent" | "neutre";

export const Badge = ({
  children,
  tone = "primary",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) => {
  const toneClasses: Record<Tone, string> = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    neutre: "bg-muted text-muted-foreground",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium text-xs px-2.5 py-0.5",
      toneClasses[tone],
      className
    )}>
      {children}
    </span>
  );
};
