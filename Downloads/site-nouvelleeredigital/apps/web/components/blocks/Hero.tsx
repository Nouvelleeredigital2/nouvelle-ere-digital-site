"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image?: string;
  align?: "left" | "right" | "center";
  dark?: boolean;
}

/** Bloc Hero principal (texte + visuel) */
export const Hero = ({
  eyebrow,
  title,
  subtitle,
  cta,
  image,
  align = "left",
  dark = false,
}: HeroProps) => {
  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <section
      className={cn(
        "py-24 md:py-32",
        dark
          ? "bg-[var(--couleur-dark)] text-[var(--couleur-light)]"
          : "bg-[var(--couleur-light)] text-[var(--couleur-texte-base)]"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex flex-col items-center gap-12 px-4 md:flex-row",
          isRight && "md:flex-row-reverse",
          isCenter && "md:flex-col"
        )}
      >
        <div className={cn("flex-1 text-center md:text-left", isCenter && "text-center")}> 
          {eyebrow && (
            <div className="mb-3 text-sm font-medium text-[var(--couleur-secondaire)] uppercase tracking-wide">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-[var(--couleur-texte-secondaire)] mb-6 max-w-xl mx-auto md:mx-0">
              {subtitle}
            </p>
          )}
          {cta && (
            <Button asChild>
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </div>

        {image && (
          <div className="flex-1 relative w-full h-64 md:h-96 rounded-[var(--border-radius-large)] overflow-hidden shadow-[var(--box-shadow-subtil)]">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
};
