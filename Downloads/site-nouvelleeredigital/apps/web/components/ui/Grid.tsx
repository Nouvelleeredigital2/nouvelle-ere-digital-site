import { cn } from "@/lib/utils";

export const Grid = ({
  children,
  className,
}: { children: React.ReactNode; className?: string }) => (
  <div className={cn("grid gap-6 md:gap-8", className)}>{children}</div>
);
