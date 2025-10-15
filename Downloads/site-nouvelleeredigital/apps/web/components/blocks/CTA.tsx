import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface CTAProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: { label: string; onClick?: () => void; href?: string };
  secondary?: { label: string; onClick?: () => void; href?: string };
  dark?: boolean;
}

export const CTA = ({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  dark = false,
}: CTAProps) => {
  return (
    <section
      className={
        dark
          ? "py-20 bg-card text-card-foreground"
          : "py-20 bg-background text-foreground"
      }
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          align="center"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          className="max-w-2xl"
        />
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          {primary.href ? (
            <a
              href={primary.href}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 text-base px-5 py-2.5"
            >
              {primary.label}
            </a>
          ) : (
            <Button onClick={primary.onClick}>{primary.label}</Button>
          )}

          {secondary &&
            (secondary.href ? (
              <a
                href={secondary.href}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-border text-foreground hover:bg-accent hover:text-accent-foreground text-base px-5 py-2.5"
              >
                {secondary.label}
              </a>
            ) : (
              <Button variant="secondaire" onClick={secondary.onClick}>
                {secondary.label}
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
};
