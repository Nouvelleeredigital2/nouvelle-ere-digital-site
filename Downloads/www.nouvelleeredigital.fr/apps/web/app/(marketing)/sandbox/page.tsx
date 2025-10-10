import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ThemeSection } from "@/components/layout/ThemeSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { KPI } from "@/components/ui/KPI";
import { Hero } from "@/components/blocks/Hero";
import { Split } from "@/components/blocks/Split";
import { FeatureList } from "@/components/blocks/FeatureList";
import { Steps } from "@/components/blocks/Steps";
import { CTA } from "@/components/blocks/CTA";
import { CaseList } from "@/components/blocks/CaseList";
import { Testimonials } from "@/components/blocks/Testimonials";
import { Sparkles, Video, Brain, Layout as LayoutIcon, PanelTop, SquareStack } from "lucide-react";
import { OpenDemoServiceButton } from "@/components/demo/OpenDemoServiceButton";
import { DemoServiceCard } from "@/components/demo/DemoServiceCard";

export const metadata: Metadata = generatePageMetadata({
  title: "Sandbox",
  description: "Catalogue visuel des composants.",
});

export default function SandboxPage() {
  return (
    <>
      <ThemeSection variant="light">
        <Hero
          eyebrow="Sandbox"
          title="Catalogue des composants"
          subtitle="Aperçu rapide des primitives UI et blocs."
          cta={{ label: "Retour accueil", href: "/" }}
          align="left"
        />
      </ThemeSection>

      <ThemeSection variant="light">
        <Container>
          <SectionHeading eyebrow="UI" title="Primitives" subtitle="Variantes et états" />
          <div className="flex flex-wrap gap-3 py-4">
            <Button>Primaire</Button>
            <Button variant="secondaire">Secondaire</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="py-2">
            <OpenDemoServiceButton />
          </div>
          <div className="flex flex-wrap gap-2 py-4 items-center">
            <Badge>Violet</Badge>
            <Badge tone="turquoise">Turquoise</Badge>
            <Badge tone="neutre">Neutre</Badge>
          </div>
          <div className="py-4">
            <SectionHeading eyebrow="Démo" title="Double‑clic carte" subtitle="Ouvre la fiche service" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DemoServiceCard />
            </div>
          </div>
          <Grid className="py-4 gap-4 grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <h3 className="text-xl font-semibold mb-2">Carte {i}</h3>
                <p className="text-[var(--couleur-texte-secondaire)]">Composant neutre pouvant contenir n'importe quel contenu.</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </ThemeSection>

      <ThemeSection variant="light">
        <FeatureList
          eyebrow="Primitives"
          title="Visuels et maillages"
          subtitle="lucide-react pour les icônes"
          items={[
            { icon: LayoutIcon, title: "Container", description: "Gestions des largeurs" },
            { icon: PanelTop, title: "Grid", description: "Colonnes responsives" },
            { icon: SquareStack, title: "Cards", description: "Surfaces et ombres" },
          ]}
        />
      </ThemeSection>

      <ThemeSection variant="light">
        <Split>
          <div>
            <SectionHeading title="Split" subtitle="2 colonnes responsive" />
            <p className="text-[var(--couleur-texte-secondaire)]">
              Utilisez <code>Split</code> pour juxtaposer du contenu texte et un média.
            </p>
          </div>
          <div className="w-full h-64 rounded-[var(--border-radius-large)] bg-[var(--couleur-surface)] border border-[var(--couleur-gris-clair)]" />
        </Split>
      </ThemeSection>

      <ThemeSection variant="light">
        <Steps
          eyebrow="Méthode"
          title="Étapes"
          subtitle="De l’idée au live"
          steps={[
            { title: "Init", description: "Créer une page et configurer la route" },
            { title: "Composer", description: "Assembler les blocs" },
            { title: "Lancer", description: "Publier" },
            { title: "Mesurer", description: "Analyser et optimiser" },
          ]}
        />
      </ThemeSection>

      {/* Assemblage blocs — Réalisations (CaseList) */}
      <CaseList
        eyebrow="Réalisations"
        title="Sélection de projets"
        subtitle="Chaque projet est piloté par la mesure et l’impact."
        items={[
          {
            title: "Lancement produit – Live & social",
            summary: "Dispositif 360 : teaser, live multi-cam, assets paid & UGC.",
            imageUrl: "/og-image.svg",
            tags: ["Événementiel", "Audiovisuel", "Social"],
            kpis: [
              { value: 3.2, unit: "M", label: "vues" },
              { value: 42, unit: "%", label: "engagement" },
              { value: 18, unit: "%", label: "conv." },
            ],
            href: "/realisations/lancement-produit",
          },
          {
            title: "Refonte site — B2B SaaS",
            summary: "Nouvelle identité, UX optimisée et génération de leads qualifiés.",
            imageUrl: "/og-image.svg",
            tags: ["Design", "Web"],
            kpis: [
              { value: 2.4, unit: "x", label: "leads" },
              { value: 38, unit: "%", label: "SEO" },
            ],
          },
          {
            title: "Campagne brand content",
            summary: "Série vidéo + influence pour installer la préférence de marque.",
            imageUrl: "/og-image.svg",
            tags: ["Communication", "Audiovisuel"],
            kpis: [{ value: 120, unit: "%", label: "reach" }],
          },
        ]}
      />

      {/* Assemblage blocs — Témoignages */}
      <Testimonials
        eyebrow="Ils témoignent"
        title="La confiance de nos clients"
        subtitle="Des collaborations durables, des résultats concrets."
        items={[
          {
            quote: "Une équipe créative et réactive — notre lancement a dépassé nos objectifs.",
            author: "Camille D.",
            role: "CMO",
            company: "TechWay",
            avatarUrl: "/og-image.svg",
          },
          {
            quote: "Production millimétrée, mesure transparente, on avance vite et bien.",
            author: "Yanis M.",
            role: "Head of Growth",
            company: "Flowly",
            avatarUrl: "/og-image.svg",
          },
          {
            quote: "Ils ont simplifié la complexité et nous ont accompagnés de bout en bout.",
            author: "Sarah K.",
            role: "Directrice de marque",
            company: "Nova",
            avatarUrl: "/og-image.svg",
          },
        ]}
      />

      <ThemeSection variant="dark">
        <Container>
          <KPI
            items={[
              { value: 14, unit: "+", label: "Next.js" },
              { value: 100, unit: "%", label: "AA Contrast" },
              { value: 0, label: "Backend calls" },
              { value: 3, label: "Themes" },
            ]}
          />
        </Container>
        <CTA
          eyebrow="Prêt à avancer ?"
          title="Construisons votre prochaine réussite"
          subtitle="Parlez-nous de vos objectifs — plan concret et mesurable."
          primary={{ label: "Créer une page", href: "/" }}
          secondary={{ label: "Voir la home", href: "/" }}
          dark
        />
      </ThemeSection>
    </>
  );
}
