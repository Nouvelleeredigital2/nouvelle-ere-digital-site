import { cn } from "@/lib/utils";

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) => {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={cn("max-w-3xl mb-8", alignCls, className)}>
      {eyebrow && (
        <div className="mb-3 text-sm uppercase tracking-wide font-medium text-brand">{eyebrow}</div>
      )}
      <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-prose">{subtitle}</p>}
    </div>
  );
};
