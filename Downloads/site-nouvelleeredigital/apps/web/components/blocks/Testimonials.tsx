import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
}

export const Testimonials = ({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: Testimonial[];
}) => {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          className="mb-12"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((t, i) => (
            <Card key={i} className="flex flex-col h-full">
              <p className="text-lg leading-relaxed">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                {t.avatarUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={t.avatarUrl} alt="" fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{t.author}</div>
                  {(t.role || t.company) && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
