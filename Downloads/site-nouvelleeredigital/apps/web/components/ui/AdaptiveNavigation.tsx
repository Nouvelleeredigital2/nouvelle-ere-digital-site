"use client";

import React from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AdaptiveNavigationProps {
  className?: string;
}

export function AdaptiveNavigation({ className }: AdaptiveNavigationProps) {
  const { persona } = usePersona();

  // Adapter la navigation selon le layout choisi par le persona
  const navigationStyle = persona.settings.layouts.navigation;

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/demo", label: "Démo" },
    { href: "/services", label: "Services" },
    { href: "/vision", label: "Vision" },
    { href: "/philosophie", label: "Philosophie" },
  ];

  const getNavigationClasses = () => {
    switch (navigationStyle) {
      case "horizontal":
        return "flex flex-row gap-2 p-4 bg-background/80 backdrop-blur-md border-b border-border";
      case "vertical":
        return "flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-md border-r border-border w-64 h-screen fixed left-0 top-0";
      case "floating":
        return "flex flex-row gap-2 p-4 bg-background/90 backdrop-blur-lg border border-border rounded-full shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50";
      case "minimal":
        return "flex flex-row gap-2 p-2 bg-transparent";
      default:
        return "flex flex-row gap-2 p-4 bg-background/80 backdrop-blur-md border-b border-border";
    }
  };

  const getLinkClasses = () => {
    const baseClasses = "transition-all duration-200 hover:scale-105";

    switch (navigationStyle) {
      case "horizontal":
        return cn(baseClasses, "px-3 py-2 rounded-md hover:bg-muted");
      case "vertical":
        return cn(baseClasses, "px-3 py-2 rounded-md hover:bg-muted w-full text-left");
      case "floating":
        return cn(baseClasses, "px-2 py-1 rounded-full hover:bg-muted text-sm");
      case "minimal":
        return cn(baseClasses, "px-2 py-1 text-sm hover:underline");
      default:
        return cn(baseClasses, "px-3 py-2 rounded-md hover:bg-muted");
    }
  };

  return (
    <nav className={cn(getNavigationClasses(), className)}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={getLinkClasses()}>
          {item.label}
        </Link>
      ))}

      {/* Indicateur du style de navigation actif */}
      <div className="ml-auto text-xs text-muted-foreground opacity-50">
        Style: {navigationStyle}
      </div>
    </nav>
  );
}
