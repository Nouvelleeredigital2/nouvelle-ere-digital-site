import { CreativeProfileSelector } from '@/components/ui/CreativeProfileSelector';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Section Hero améliorée */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Nouvelle Ère Digital
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Système de Creative Personas - Personnalisez votre expérience digitale selon votre personnalité créative
          </p>

          {/* Fonctionnalités principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/80 transition-all duration-300">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold mb-2">10 Personas Créatifs</h3>
              <p className="text-sm text-muted-foreground">
                Personnalités uniques avec animations fluides et transitions sophistiquées
              </p>
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/80 transition-all duration-300">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Analytics Intégrés</h3>
              <p className="text-sm text-muted-foreground">
                Suivi détaillé de l'utilisation et des préférences utilisateurs
              </p>
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card/80 transition-all duration-300">
              <div className="text-3xl mb-3">☁️</div>
              <h3 className="text-lg font-semibold mb-2">Sauvegarde Cloud</h3>
              <p className="text-sm text-muted-foreground">
                Synchronisation automatique des préférences multi-appareils
              </p>
            </div>
          </div>

          {/* Actions principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Voir la Démo
            </a>
            <a
              href="/analytics"
              className="inline-flex items-center justify-center px-8 py-3 border border-border bg-background/80 backdrop-blur-sm rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Analytics
            </a>
          </div>
        </div>
      </section>

      {/* Sélecteur de profil créatif intégré */}
      <CreativeProfileSelector compact={true} />
    </div>
  );
}
