import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
// Importer tous les composants UI
import { AISummaryPanel } from "@/components/ui/AISummaryPanel";
import { AnalyticsTracker } from "@/components/ui/AnalyticsTracker";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { BundleCard } from "@/components/ui/BundleCard";
import { BundleSelector } from "@/components/ui/BundleSelector";
import { Button } from "@/components/ui/Button";
import { Canvas3D_NED } from "@/components/ui/Canvas3D_NED";
import { Card } from "@/components/ui/Card";
import { Carousel3DBundles } from "@/components/ui/Carousel3DBundles";
import { CategoryFilterChips } from "@/components/ui/CategoryFilterChips";
import { ColorLegend } from "@/components/ui/ColorLegend";
import { CompatibilityIndicator } from "@/components/ui/CompatibilityIndicator";
import { ConsentManager } from "@/components/ui/ConsentManager";
import { DragCanvas } from "@/components/ui/DragCanvas";
import { ExportPanel } from "@/components/ui/ExportPanel";
import { FocusRing } from "@/components/ui/FocusRing";
import { Grid } from "@/components/ui/Grid";
import { GridLayout } from "@/components/ui/GridLayout";
import { H2Chips } from "@/components/ui/H2Chips";
import { H2Dots } from "@/components/ui/H2Dots";
import { H2Icons } from "@/components/ui/H2Icons";
import { H2Metrics } from "@/components/ui/H2Metrics";
import { H2Steps } from "@/components/ui/H2Steps";
import { HeroBeforeAfter } from "@/components/ui/HeroBeforeAfter";
import { HeroCinemagraph } from "@/components/ui/HeroCinemagraph";
import { HeroCollage } from "@/components/ui/HeroCollage";
import { HeroDuoTone } from "@/components/ui/HeroDuoTone";
import { HeroGradientMap } from "@/components/ui/HeroGradientMap";
import { HeroIsometric } from "@/components/ui/HeroIsometric";
import { HeroOrbitMask } from "@/components/ui/HeroOrbitMask";
import { HeroSection } from "@/components/ui/HeroSection";
import { HeroSectionWithBreadcrumbs } from "@/components/ui/HeroSectionWithBreadcrumbs";
import { I18nText } from "@/components/ui/I18nText";
import { Icon } from "@/components/ui/Icon";
import { JourneyComposer } from "@/components/ui/JourneyComposer";
import { KPI } from "@/components/ui/KPI";
import { LazyUniverse3DWrapper } from "@/components/ui/LazyUniverse3D";
import { Media } from "@/components/ui/Media";
import { MiniConstellation } from "@/components/ui/MiniConstellation";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { NeedCaptureForm } from "@/components/ui/NeedCaptureForm";
import { OrbitBreadcrumbs } from "@/components/ui/OrbitBreadcrumbs";
import { PlanetBadge } from "@/components/ui/PlanetBadge";
import { SearchBox } from "@/components/ui/SearchBox";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceDetailSheet } from "@/components/ui/ServiceDetailSheet";
import { ServiceList } from "@/components/ui/ServiceList";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkipLink } from "@/components/ui/SkipLink";
import { Testimonials } from "@/components/ui/Testimonials";
import { Text } from "@/components/ui/Text";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { Toast } from "@/components/ui/Toast";
import { TrajectoireIAOverlay } from "@/components/ui/TrajectoireIAOverlay";
import { Universe3D } from "@/components/ui/Universe3D";
// Importer les données
import categoriesData from "@/data/categories.json";
import modulesData from "@/data/modules.json";
import bundlesData from "@/data/bundles.json";

export const metadata: Metadata = generatePageMetadata({
  title:
    "Catalogue          <p className='text-muted-foreground'>Aperçu complet de tous les composants UI personnalisés.</p>",
});

export default function ComponentShowcase() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Container className="py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Catalogue des Composants Graphiques
        </h1>

        {/* Section A - Structure & Navigation */}
        <SectionHeader title="A - Structure & Navigation" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Container</h3>
          <Container className="border border-border p-4">Exemple de Container</Container>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Grid</h3>
          <Grid className="grid-cols-3 gap-4">
            <div className="bg-muted p-4">Item 1</div>
            <div className="bg-muted p-4">Item 2</div>
            <div className="bg-muted p-4">Item 3</div>
          </Grid>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: OrbitBreadcrumbs</h3>
          <OrbitBreadcrumbs
            items={[
              { id: "1", label: "Home", href: "/", level: 1 },
              { id: "2", label: "Sandbox", href: "/sandbox", level: 2 },
            ]}
          />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section B - Content Principal */}
        <SectionHeader title="B - Contenu Principal" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Text</h3>
          <Text>Exemple de texte</Text>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: SectionHeading</h3>
          <SectionHeading title="Titre de Section" subtitle="Sous-titre" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: SectionHeader</h3>
          <SectionHeader title="Titre Header" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Media</h3>
          <Media type="image" src="/og-image.svg" alt="Exemple media" className="w-32 h-32" />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section C - Cards & Modules */}
        <SectionHeader title="C - Cards & Modules" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Card</h3>
          <Card>
            <h4 className="text-lg font-semibold">Carte exemple</h4>
            <p>Description de la carte</p>
          </Card>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ModuleCard</h3>
          {modulesData.modules.slice(0, 2).map((module) => (
            <ModuleCard
              key={module.id}
              module={{
                id: module.id,
                title: module.name,
                description: module.description,
                status: "active",
              }}
            />
          ))}
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: BundleCard</h3>
          {bundlesData.bundles.slice(0, 2).map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={{
                id: bundle.id,
                title: bundle.name,
                description: bundle.description,
                items: bundle.modules.map((m: string) => ({ id: m, name: m })),
              }}
            />
          ))}
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ServiceCard</h3>
          <ServiceCard title="Service Example" description="Description du service" />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section D - Buttons & Interactions */}
        <SectionHeader title="D - Buttons & Interactions" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Button</h3>
          <div className="flex gap-4 items-center">
            <Button>Bouton Primaire</Button>
            <Button variant="secondaire">Secondaire</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Badge</h3>
          <div className="flex gap-2">
            <Badge>Violet</Badge>
            <Badge tone="accent">Turquoise</Badge>
            <Badge tone="neutre">Neutre</Badge>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Icon</h3>
          <Icon name="star" className="w-8 h-8" />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section E - Forms & Inputs */}
        <SectionHeader title="E - Forms & Inputs" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: SearchBox</h3>
          <SearchBox placeholder="Rechercher..." />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: NeedCaptureForm</h3>
          <NeedCaptureForm
            fields={[
              { id: "name", label: "Nom", type: "text", required: true },
              { id: "email", label: "Email", type: "email", required: true },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: BundleSelector</h3>
          <BundleSelector
            bundles={bundlesData.bundles
              .slice(0, 2)
              .map((b) => ({ id: b.id, title: b.name, description: b.description }))}
          />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section F - Visual Effects & Animations */}
        <SectionHeader title="F - Visual Effects & Animations" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: AnimatedSection</h3>
          <AnimatedSection>
            <p>Contenu animé</p>
          </AnimatedSection>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: FocusRing</h3>
          <FocusRing>
            <Button>Avec Focus Ring</Button>
          </FocusRing>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Skeleton</h3>
          <Skeleton variant="rect" className="w-32 h-8" />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section G - 3D & Interactive */}
        <SectionHeader title="G - 3D & Interactive" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Canvas3D_NED</h3>
          {/* Temporarily disabled due to React Three Fiber issues */}
          <div className="bg-muted p-8 text-center">
            <p>Canvas3D_NED component disabled due to runtime errors</p>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Universe3D</h3>
          {/* Temporarily disabled due to React Three Fiber issues */}
          <div className="bg-muted p-8 text-center">
            <p>Universe3D component disabled due to runtime errors</p>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: LazyUniverse3DWrapper</h3>
          {/* Temporarily disabled due to React Three Fiber issues */}
          <div className="bg-muted p-8 text-center">
            <p>LazyUniverse3DWrapper component disabled due to runtime errors</p>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: MiniConstellation</h3>
          <MiniConstellation
            stars={[
              { id: "1", x: 10, y: 10, size: 2, color: "white" },
              { id: "2", x: 50, y: 20, size: 3, color: "blue" },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: DragCanvas</h3>
          <DragCanvas
            items={[
              {
                id: "1",
                x: 100,
                y: 100,
                content: <div className="w-16 h-16 bg-blue-500 rounded"></div>,
              },
            ]}
            width={400}
            height={300}
          />
        </div>
        <hr className="mt-8 border-border" />

        {/* Section H - Advanced Components */}
        <SectionHeader title="H - Advanced Components" />
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: JourneyComposer</h3>
          <JourneyComposer modules={modulesData.modules.slice(0, 3)} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: CategoryFilterChips</h3>
          <CategoryFilterChips
            categories={categoriesData.categories.map((c) => ({ id: c.id, label: c.name }))}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Carousel3DBundles</h3>
          <div className="w-full h-64 rounded-2xl bg-card border border-border">me errors</div>
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ServiceDetailSheet</h3>
          <ServiceDetailSheet
            service={{
              id: "1",
              title: "Service Example",
              description: "Description",
              features: ["Feature 1"],
            }}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Testimonials</h3>
          <Testimonials
            testimonials={[
              {
                id: 1,
                name: "John Doe",
                role: "CEO",
                company: "Example Corp",
                content: "Great service!",
                rating: 5,
              },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ThemeSwitch</h3>
          <ThemeSwitch
            themes={[
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: Toast</h3>
          <Toast message="Exemple de toast" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: SkipLink</h3>
          <SkipLink href="#main" label="Aller au contenu principal" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: I18nText</h3>
          <I18nText key="example" fallback="Example text" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ConsentManager</h3>
          <ConsentManager
            categories={[
              { id: "analytics", label: "Analytics", description: "Collecte de données" },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: AnalyticsTracker</h3>
          <AnalyticsTracker data={[{ id: "1", label: "Page Views", value: 1000 }]} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ExportPanel</h3>
          <ExportPanel formats={[{ id: "pdf", label: "PDF", extension: ".pdf" }]} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ServiceList</h3>
          <ServiceList
            services={[
              { id: "1", title: "Service 1", description: "Description", status: "active" },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: KPI</h3>
          <KPI items={[{ value: 100, label: "Exemple KPI" }]} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: AISummaryPanel</h3>
          <AISummaryPanel summary="Résumé généré par IA" />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: TrajectoireIAOverlay</h3>
          <TrajectoireIAOverlay
            trajectories={[
              {
                id: "1",
                points: [
                  { x: 0, y: 0 },
                  { x: 100, y: 100 },
                ],
                color: "blue",
              },
            ]}
          />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: ColorLegend</h3>
          <ColorLegend items={[{ id: "1", label: "Category 1", color: "red" }]} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: CompatibilityIndicator</h3>
          <CompatibilityIndicator compatibility={85} />
        </div>
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Composant: PlanetBadge</h3>
          <PlanetBadge label="Planet" planet={{ name: "Earth", color: "blue", size: 12 }} />
        </div>
      </Container>
    </div>
  );
}
