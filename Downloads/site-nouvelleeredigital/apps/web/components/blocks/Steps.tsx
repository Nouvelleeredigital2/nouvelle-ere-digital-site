import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Step {
  title: string;
  description: string;
}

export const Steps = ({
  eyebrow,
  title,
  subtitle,
  steps,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: Step[];
  align?: "left" | "center";
}) => {
  return (
    <section className="py-20 bg-[var(--couleur-surface)]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mb-12"
        />
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "text-center md:text-left",
                "relative bg-[var(--couleur-light)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)]"
              )}
            >
              <div className="text-[var(--couleur-primaire)] font-bold text-3xl mb-3">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-[var(--couleur-texte-secondaire)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
