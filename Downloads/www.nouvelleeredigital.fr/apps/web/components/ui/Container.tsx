import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Contrainte de largeur maximale + padding horizontal
 */
export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("container mx-auto px-4", className)}>{children}</div>
);
