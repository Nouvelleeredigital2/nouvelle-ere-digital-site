import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureList = ({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: Feature[];
  columns?: 2 | 3;
  align?: "left" | "center";
}) => {
  const colCls = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const alignCls = align === "center" ? "text-center" : "text-left";

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mb-12"
        />

        <div className={cn("grid gap-10", colCls)}>
          {items.map((item, i) => (
            <div key={i} className={cn("flex flex-col items-start", alignCls)}>
              <div
                className={cn(
                  "mb-4 inline-flex items-center justify-center rounded-full p-3",
                  "bg-primary/10 text-primary"
                )}
              >
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
