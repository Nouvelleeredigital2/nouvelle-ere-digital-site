import { CreativeProfileSelector } from '@/components/ui/CreativeProfileSelector';
import { PersonaDebugger } from '@/components/debug/PersonaDebugger';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec hiérarchie typographique claire */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Titre principal avec échelle display */}
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6">
            Nouvelle Ère Digital
          </h1>

          {/* Sous-titre avec échelle body */}
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Système de Creative Personas - Personnalisez votre expérience digitale selon votre personnalité créative
          </p>

          {/* Fonctionnalités avec cartes cohérentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl text-foreground mb-2 font-medium">10 Personas Créatifs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Personnalités uniques avec animations fluides et transitions sophistiquées
              </p>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl text-foreground mb-2 font-medium">Analytics Intégrés</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Suivi détaillé de l'utilisation et des préférences utilisateurs
              </p>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-4">☁️</div>
              <h3 className="text-xl text-foreground mb-2 font-medium">Sauvegarde Cloud</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Synchronisation automatique des préférences multi-appareils
              </p>
            </div>
          </div>

          {/* Actions principales avec boutons hiérarchisés */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/demo"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6 py-3 font-medium rounded-lg transition-colors"
            >
              Voir la Démo
            </a>
            <a
              href="/analytics"
              className="inline-flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 text-sm px-6 py-3 rounded-lg border border-border transition-colors"
            >
              Analytics
            </a>
          </div>
        </div>
      </section>

      {/* Sélecteur de profil créatif intégré avec espacement cohérent */}
      <CreativeProfileSelector compact={true} />

      {/* Débogueur pour vérifier le système de personas */}
      <PersonaDebugger />
    </div>
  );
}
