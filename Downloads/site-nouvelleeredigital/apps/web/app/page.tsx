import { CreativeProfileSelector } from '@/components/ui/CreativeProfileSelector';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec hiérarchie typographique claire */}
      <section className="py-5xl px-4">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Titre principal avec échelle display */}
          <h1 className="text-display-lg font-serif text-text-primary mb-lg">
            Nouvelle Ère Digital
          </h1>

          {/* Sous-titre avec échelle body */}
          <p className="text-body-xl text-text-muted mb-2xl max-w-3xl mx-auto leading-relaxed">
            Système de Creative Personas - Personnalisez votre expérience digitale selon votre personnalité créative
          </p>

          {/* Fonctionnalités avec cartes cohérentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
            <div className="p-xl bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-md">🎨</div>
              <h3 className="text-heading-lg text-text-primary mb-sm font-medium">10 Personas Créatifs</h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                Personnalités uniques avec animations fluides et transitions sophistiquées
              </p>
            </div>

            <div className="p-xl bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-md">📊</div>
              <h3 className="text-heading-lg text-text-primary mb-sm font-medium">Analytics Intégrés</h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                Suivi détaillé de l'utilisation et des préférences utilisateurs
              </p>
            </div>

            <div className="p-xl bg-card rounded-lg border border-border hover:bg-card/80 transition-colors duration-300">
              <div className="text-3xl mb-md">☁️</div>
              <h3 className="text-heading-lg text-text-primary mb-sm font-medium">Sauvegarde Cloud</h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                Synchronisation automatique des préférences multi-appareils
              </p>
            </div>
          </div>

          {/* Actions principales avec boutons hiérarchisés */}
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <a
              href="/demo"
              className="btn btn-primary text-body-sm px-xl py-md font-medium"
            >
              Voir la Démo
            </a>
            <a
              href="/analytics"
              className="btn btn-secondary text-body-sm px-xl py-md"
            >
              Analytics
            </a>
          </div>
        </div>
      </section>

      {/* Sélecteur de profil créatif intégré avec espacement cohérent */}
      <CreativeProfileSelector compact={true} />
    </div>
  );
}
