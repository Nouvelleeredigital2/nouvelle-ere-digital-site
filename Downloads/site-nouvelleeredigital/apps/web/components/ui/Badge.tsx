import React from "react";
import { cn } from "@/lib/utils";

type Tone = "violet" | "turquoise" | "neutre";

export const Badge = ({
  children,
  tone = "violet",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) => {
  const tones: Record<Tone, string> = {
    violet: "bg-[var(--couleur-primaire)] text-[var(--couleur-light)]",
    turquoise: "bg-[var(--couleur-secondaire)] text-[var(--couleur-light)]",
    neutre: "bg-[var(--couleur-gris-clair)] text-[var(--couleur-texte-base)]",
  };
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-sm font-medium rounded-full",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
};
