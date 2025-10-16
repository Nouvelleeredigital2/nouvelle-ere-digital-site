"use client";
import { usePersona } from "@/components/context/PersonaProvider";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function HeroSection({ title, subtitle, className }: HeroSectionProps) {
  const { persona } = usePersona();
  const { heroStyle, heroTextAlign } = persona.settings.layouts;

  if (heroStyle === "split-text-image") {
    // Rendu pour le style split
    return (
      <div className={cn("grid md:grid-cols-2 gap-8 items-center", className)}>
        <div className={cn("text-center md:text-left", heroTextAlign)}>
          <h1 className="text-display-lg font-serif text-text-primary mb-lg">{title}</h1>
          <p className="text-body-xl text-text-muted leading-relaxed">{subtitle}</p>
        </div>
        <div className="relative">
          {/* Placeholder pour l'image - à remplacer par l'image réelle */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center">
            <span className="text-muted-foreground">Image placeholder</span>
          </div>
        </div>
      </div>
    );
  }

  // Rendu pour le style full-visual
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <h1 className="text-display-lg font-serif text-text-primary mb-lg">{title}</h1>
      <p className="text-body-xl text-text-muted max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
}
