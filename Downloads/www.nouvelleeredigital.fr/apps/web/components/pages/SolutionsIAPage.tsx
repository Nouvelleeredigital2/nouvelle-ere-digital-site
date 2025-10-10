import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function SolutionsIAPage() {
  return (
    <>
      {/* Héro Section */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Solutions IA</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-8">
              Découvrez notre<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                showroom IA interactif
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Explorez nos solutions d'intelligence artificielle à travers des démonstrations interactives.
              Découvrez comment l'IA transforme votre communication digitale.
            </p>
          </div>

          {/* CTA principaux */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="xl" asChild>
              <a href="#demos">Explorer les démos</a>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href="/contact">Demander une démo personnalisée</a>
            </Button>
          </div>
        </div>
      </ThemeSection>

      {/* Présentation des solutions */}
      <ThemeSection variant="light" className="py-32">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos solutions IA"
            title="Intelligence artificielle au service de votre communication"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                🎯
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xl">Journey Composer</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Composez automatiquement vos parcours client personnalisés avec l'IA
              </p>
              <Button size="sm" variant="outline" asChild>
                <a href="#journey-composer">Découvrir</a>
              </Button>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                📊
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xl">Analytics IA</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Analysez et optimisez vos performances avec l'intelligence prédictive
              </p>
              <Button size="sm" variant="outline" asChild>
                <a href="#analytics-ia">Découvrir</a>
              </Button>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                🎨
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xl">Content Creator IA</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Générez du contenu personnalisé et optimisé automatiquement
              </p>
              <Button size="sm" variant="outline" asChild>
                <a href="#content-creator">Découvrir</a>
              </Button>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Canvas interactif pour composer solutions */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30" id="journey-composer">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Démo interactive"
            title="Journey Composer : Composez votre parcours client"
            align="center"
          />

          <div className="mt-16">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Configurez votre parcours client idéal
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                  Utilisez notre canvas interactif pour composer visuellement le parcours de vos clients.
                  L'IA vous suggère automatiquement les meilleures optimisations.
                </p>
              </div>

              {/* Canvas interactif simulé */}
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏠</div>
                      <div className="text-xs font-medium">Site Web</div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-xs font-medium">App Mobile</div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📧</div>
                      <div className="text-xs font-medium">Email</div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-xs font-medium">Conversion</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">IA Suggestion : Optimiser le tunnel de conversion</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Automatisation</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">L'IA ajuste automatiquement vos parcours</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Performance</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Optimisation en temps réel des conversions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Personnalisation</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Adaptation IA selon le comportement utilisateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Analytics IA */}
      <ThemeSection variant="light" className="py-32" id="analytics-ia">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Analytics prédictifs"
            title="Analytics IA : Prédisez et optimisez vos performances"
            align="center"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
            <div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                Intelligence prédictive pour vos données
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    📊
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Analyse prédictive</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Anticipez les tendances et comportements de vos utilisateurs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🎯
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Optimisation automatique</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">L'IA ajuste vos stratégies en temps réel pour maximiser les résultats</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    📈
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Rapports intelligents</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Insights automatisés avec recommandations d'actions concrètes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="font-semibold">Dashboard Analytics</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">+127%</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">Taux de conversion prédit</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">-34%</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">Taux de rebond optimisé</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">+89%</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">ROI des campagnes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Content Creator IA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30" id="content-creator">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Création de contenu"
            title="Content Creator IA : Générez du contenu optimisé automatiquement"
            align="center"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                Exemple de génération de contenu
              </h3>

              <div className="space-y-4">
                <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Prompt utilisateur</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    "Créez un email de bienvenue pour nos nouveaux clients avec un ton professionnel et engageant"
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">IA en cours de génération...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse"></div>
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-3/4"></div>
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>

                <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Contenu généré</span>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="mb-2"><strong>Sujet :</strong> Bienvenue chez Nouvelle Ère Digital ! 🚀</p>
                    <p className="mb-2">Cher [Nom],</p>
                    <p>Nous sommes ravis de vous accueillir dans notre communauté...</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                Fonctionnalités avancées
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    ✍️
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Génération automatique</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Créez du contenu personnalisé en quelques secondes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🎯
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Optimisation SEO</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Intégration automatique des mots-clés et balises</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🌍
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Multilingue</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Génération de contenu dans plusieurs langues</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    📱
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Multi-formats</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Adaptation automatique pour différents canaux</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA Section */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Prêt à découvrir l'IA au service de votre communication ?
          </h2>

          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-12 max-w-2xl mx-auto">
            Réservez une démonstration personnalisée de nos solutions IA et découvrez comment elles peuvent transformer votre stratégie digitale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" asChild>
              <a href="/contact">Réserver une démo IA</a>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href="/intelligence-artificielle">En savoir plus sur notre approche IA</a>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Démonstration gratuite • Mise en place rapide • Support personnalisé
            </p>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
