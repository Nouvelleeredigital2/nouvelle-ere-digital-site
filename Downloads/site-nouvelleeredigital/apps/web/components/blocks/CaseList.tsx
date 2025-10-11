import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface KPI {
  value: string | number;
  unit?: string;
  label: string;
}

interface CaseItem {
  title: string;
  summary: string;
  imageUrl: string;
  href?: string;
  tags?: string[];
  kpis?: KPI[];
}

export const CaseList = ({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: CaseItem[];
}) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="left"
          className="mb-10"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((c, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <div className="relative w-full h-56">
                <Image src={c.imageUrl} alt={c.title} fill className="object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-[var(--couleur-texte-secondaire)]">{c.summary}</p>

                {c.tags && c.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((tag, idx) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>
                )}

                {c.kpis && c.kpis.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {c.kpis.slice(0, 3).map((k, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-[var(--couleur-primaire)] font-bold text-xl">
                          {k.value}
                          {k.unit && <span className="text-sm align-super ml-0.5">{k.unit}</span>}
                        </div>
                        <div className="text-xs text-[var(--couleur-texte-secondaire)]">{k.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {c.href && (
                  <a
                    href={c.href}
                    className="mt-6 inline-block text-[var(--couleur-primaire)] hover:underline"
                  >
                    Voir le projet →
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
