import React from "react";
import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg";

/** Simple text component for consistency */
export function Text({
  size = "base",
  muted,
  className,
  children,
}: {
  size?: TextSize;
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const sizes: Record<TextSize, string> = { sm: "text-sm", base: "text-base", lg: "text-lg" };
  return <p className={cn(sizes[size], muted && "text-muted", className)}>{children}</p>;
}
