import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Responsive media (image/video) with optional aspect ratio */
export function Media({
  type,
  src,
  alt,
  ratio,
  className,
}: {
  type: "image" | "video";
  src: string;
  alt?: string;
  ratio?: "16:9" | "4:3" | "1:1" | "auto";
  className?: string;
}) {
  const ratioClass =
    ratio === "16:9"
      ? "aspect-[16/9]"
      : ratio === "4:3"
        ? "aspect-[4/3]"
        : ratio === "1:1"
          ? "aspect-square"
          : undefined;

  if (type === "image") {
    const isSvg = src.endsWith(".svg");
    return (
      <div className={cn("w-full overflow-hidden rounded-lg", ratioClass, className)}>
        {isSvg ? (
          // For SVG, use a normal img to avoid Next optimization issues
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || "image"} className="w-full h-full object-cover" />
        ) : (
          <Image src={src} alt={alt || "image"} fill className="object-cover" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-lg", ratioClass, className)}>
      <video src={src} className="w-full h-full object-cover" controls />
    </div>
  );
}
