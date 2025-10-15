import { PersonaNavSelector } from "@/components/ui/PersonaNavSelector";
import { ThemeIndicator } from "@/components/debug/ThemeIndicator";

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
        {/* Hero Section avec thème visible */}
        <div className="text-center py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-b border-border/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 drop-shadow-sm">
              Nouvelle Ère Digital
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Simplifier, innover et valoriser l'humain dans chaque projet numérique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#services"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 transform hover:scale-105"
              >
                Découvrir Nos Services
              </a>
              <div className="text-sm text-muted-foreground font-medium">
                🎨 Changez de thème avec le sélecteur en haut à droite
              </div>
            </div>
          </div>
        </div>

        {/* Section Services avec thème visible */}
        <div className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Nos Services</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Découvrez comment nous transformons vos idées en expériences digitales exceptionnelles
            </p>

            {/* Indicateurs de couleur du thème actuel */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <span className="text-sm text-muted-foreground">Primaire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary"></div>
                <span className="text-sm text-muted-foreground">Secondaire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <span className="text-sm text-muted-foreground">Accent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Communication Digitale</h3>
                <p className="text-muted-foreground mb-4">
                  Stratégies digitales innovantes pour amplifier votre présence en ligne.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SEO/SEA</li>
                  <li>• Réseaux sociaux</li>
                  <li>• Content marketing</li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Audiovisuel</h3>
                <p className="text-muted-foreground mb-4">
                  Production audiovisuelle professionnelle pour captiver votre audience.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vidéo corporate</li>
                  <li>• Motion design</li>
                  <li>• Post-production</li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Développement Web</h3>
                <p className="text-muted-foreground mb-4">
                  Sites web modernes avec une attention particulière à l'expérience utilisateur.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sites vitrine</li>
                  <li>• E-commerce</li>
                  <li>• Applications web</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section avec thème visible */}
        <div className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Prêt à Démarrer ?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transformons vos idées en expériences digitales exceptionnelles.
            </p>

            {/* Indicateur du thème actuel */}
            <div className="mb-8 p-4 bg-card/50 rounded-lg border border-border/50 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                🎨 <strong>Thème actuel :</strong> Les couleurs changent automatiquement selon votre sélection
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 transform hover:scale-105"
              >
                Nous Contacter
              </a>
              <a
                href="/expertises"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                En Savoir Plus
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de thème visible */}
      <ThemeIndicator />
    </div>
  );
}
