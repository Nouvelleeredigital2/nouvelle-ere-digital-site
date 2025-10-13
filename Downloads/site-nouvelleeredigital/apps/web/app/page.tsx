import { CreativeProfileSelector } from '@/components/ui/CreativeProfileSelector';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Nouvelle Ère Digital</h1>
        <p className="text-lg text-center text-muted-foreground mb-8">
          Système de Creative Personas - Fonctionnalités avancées disponibles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">🎨 10 Personas Créatifs</h3>
            <p className="text-muted-foreground">
              Personnalités uniques avec animations fluides et transitions sophistiquées
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">📊 Analytics Intégrés</h3>
            <p className="text-muted-foreground">
              Suivi détaillé de l'utilisation et des préférences utilisateurs
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">☁️ Sauvegarde Cloud</h3>
            <p className="text-muted-foreground">
              Synchronisation automatique des préférences multi-appareils
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <a
            href="/demo"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 mr-4"
          >
            Voir la Démo
          </a>
          <a
            href="/analytics"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Analytics
          </a>
        </div>

        <CreativeProfileSelector />
      </div>
    </div>
  );
}
