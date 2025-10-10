import React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName = keyof typeof Icons;

/** Wrapper for lucide-react icons */
export function Icon({ name, size = 20, className }: { name: IconName | string; size?: number; className?: string }) {
  const LucideIcon = (Icons as any)[name as string] as React.ComponentType<{ size?: number; className?: string }>;
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={cn(className)} />;
}
