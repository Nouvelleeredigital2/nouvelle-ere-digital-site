import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Carte neutre, fond clair + ombre douce, radius 16px */
export const Card = ({ children, className, ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-8 overflow-hidden",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
