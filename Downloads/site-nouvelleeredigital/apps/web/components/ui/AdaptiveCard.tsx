"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface AdaptiveCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function AdaptiveCard({ children, className, hover = false }: AdaptiveCardProps) {
  const [borderRadius, setBorderRadius] = useState<string>("0.5rem");
  const [shadow, setShadow] = useState<string>("0 1px 3px 0 rgba(0, 0, 0, 0.1)");

  useEffect(() => {
    // Lire les variables CSS définies par le persona actif
    const computedStyle = getComputedStyle(document.documentElement);
    const radiusValue = computedStyle.getPropertyValue("--border-radius").trim() || "0.5rem";
    const shadowValue =
      computedStyle.getPropertyValue("--card-shadow").trim() ||
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";

    setBorderRadius(radiusValue);
    setShadow(shadowValue);
  }, []);

  // Mapper les valeurs vers les classes Tailwind
  const getBorderRadiusClass = (radius: string) => {
    switch (radius) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  };

  const getShadowClass = (shadowValue: string) => {
    if (shadowValue.includes("xl")) return "shadow-xl";
    if (shadowValue.includes("lg")) return "shadow-lg";
    if (shadowValue.includes("md")) return "shadow-md";
    if (shadowValue === "none") return "shadow-none";
    return "shadow";
  };

  return (
    <Card
      className={cn(
        getBorderRadiusClass(borderRadius),
        getShadowClass(shadow),
        hover && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Card>
  );
}
