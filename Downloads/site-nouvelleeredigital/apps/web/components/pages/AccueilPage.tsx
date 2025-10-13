import { PersonaNavSelector } from "@/components/ui/PersonaNavSelector";

export function AccueilPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header fixe avec sélecteur de thème */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                Nouvelle Ère Digital
              </h1>
            </div>
            <PersonaNavSelector />
          </div>
        </div>
      </div>

      {/* Contenu principal avec padding-top pour éviter le header fixe */}
      <div className="pt-16">
        {/* Hero Section simplifiée */}
        <div className="text-center py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Nouvelle Ère Digital
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Simplifier, innover et valoriser l'humain dans chaque projet numérique.
            </p>
            <a
              href="#services"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
            >
              Découvrir Nos Services
            </a>
          </div>
        </div>

        {/* Section Services simplifiée */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Communication Digitale</h3>
                <p className="text-muted-foreground mb-4">
                  Stratégies digitales innovantes pour amplifier votre présence en ligne.
                </p>
                <ul className="text-sm text-muted-foreground">
                  <li>• SEO/SEA</li>
                  <li>• Réseaux sociaux</li>
                  <li>• Content marketing</li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Audiovisuel</h3>
                <p className="text-muted-foreground mb-4">
                  Production audiovisuelle professionnelle pour captiver votre audience.
                </p>
                <ul className="text-sm text-muted-foreground">
                  <li>• Vidéo corporate</li>
                  <li>• Motion design</li>
                  <li>• Post-production</li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Développement Web</h3>
                <p className="text-muted-foreground mb-4">
                  Sites web modernes avec une attention particulière à l'expérience utilisateur.
                </p>
                <ul className="text-sm text-muted-foreground">
                  <li>• Sites vitrine</li>
                  <li>• E-commerce</li>
                  <li>• Applications web</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à Démarrer ?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transformons vos idées en expériences digitales exceptionnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
              >
                Nous Contacter
              </a>
              <a
                href="/expertises"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                En Savoir Plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
