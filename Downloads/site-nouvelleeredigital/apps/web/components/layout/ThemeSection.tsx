import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Wrapper de section avec variantes light/dark selon charte violet/zinc
 */
export const ThemeSection = ({
  variant = "light",
  className,
  children,
}: {
  variant?: "light" | "dark" | "gradient";
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={clsx(
        "py-24 transition-colors duration-300",
        variant === "dark" && "bg-zinc-950 text-zinc-100 dark:bg-zinc-950",
        variant === "light" && "bg-card text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
        variant === "gradient" &&
          "bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
};
