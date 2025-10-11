import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function BlogPage() {
  return (
    <>
      {/* Héro Section */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Blog & Actualités</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-8">
              Insights & Tendances<br />
              de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                communication digitale
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Découvrez nos analyses, études de cas et réflexions sur l'évolution de la communication,
              l'intelligence artificielle et les stratégies digitales qui façonnent l'avenir.
            </p>
          </div>

          {/* CTA principaux */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="xl" asChild>
              <a href="#articles-recents">Lire les derniers articles</a>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href="#newsletter">S&apos;abonner à la newsletter</a>
            </Button>
          </div>
        </div>
      </ThemeSection>

      {/* Articles récents en vedette */}
      <ThemeSection variant="light" className="py-32" id="articles-recents">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Articles en vedette"
            title="Nos derniers insights"
            align="center"
          />

          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            {/* Article principal */}
            <div className="lg:col-span-2">
              <article className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                  <div className="text-6xl">🚀</div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))', color: '#7C3AED' }}>
                      Intelligence Artificielle
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">15 Octobre 2025</span>
                  </div>

                  <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    L'IA au service de la personnalisation : Comment transformer l'expérience client
                  </h2>

                  <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    Découvrez comment l'intelligence artificielle révolutionne la personnalisation des parcours clients.
                    De la recommandation produit à la création de contenu sur mesure, explorez les stratégies qui fonctionnent.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                        ÉM
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">Émilie Moreau</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Directrice IA & Innovation</div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      Lire l'article
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Articles secondaires */}
            <article className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center">
                <div className="text-4xl">📊</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    Analytics
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">12 Octobre 2025</span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Mesurer l'impact réel de vos campagnes digitales : Guide complet 2025
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                  Au-delà des vanity metrics, découvrez les KPIs qui comptent vraiment pour mesurer le ROI de vos actions digitales.
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-semibold text-xs">
                    TM
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">Thomas Martin</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Head of Analytics</div>
                  </div>
                </div>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center">
                <div className="text-4xl">🎬</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    Audiovisuel
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">8 Octobre 2025</span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Les nouvelles tendances du contenu vidéo : Vertical, court et interactif
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                  TikTok, Reels, Stories : comment adapter votre stratégie vidéo aux nouveaux formats qui captivent les audiences.
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold text-xs">
                    SL
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">Sophie Leroy</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Directrice Artistique</div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </ThemeSection>

      {/* Catégories d'articles */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Explorer par catégorie"
            title="Thématiques abordées"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                🤖
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Intelligence Artificielle</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">IA appliquée au marketing, automatisation, personnalisation</p>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">12 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                📈
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Analytics & Data</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Mesure de performance, ROI, optimisation data-driven</p>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">18 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                🎬
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Audiovisuel & Contenu</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Production vidéo, storytelling, formats innovants</p>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">15 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                🎯
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Stratégie Digitale</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Tendances, best practices, études de cas</p>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">20 articles</div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Newsletter signup */}
      <ThemeSection variant="gradient" className="py-32" id="newsletter">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Restez à la pointe de l'innovation digitale
          </h2>

          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-12 max-w-2xl mx-auto">
            Recevez chaque semaine nos derniers articles, tendances et insights directement dans votre boîte mail.
            Pas de spam, que du contenu de qualité.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <input
                type="email"
                placeholder="votre.email@exemple.com"
                className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button size="lg">
                S'abonner
              </Button>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              +500 professionnels nous font déjà confiance • Désabonnement en 1 clic
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Archives et filtres */}
      <ThemeSection variant="light" className="py-32">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Explorer les archives"
            title="Tous nos articles"
            align="center"
          />

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="sm" variant="outline">Tous les articles</Button>
            <Button size="sm" variant="ghost">Intelligence Artificielle</Button>
            <Button size="sm" variant="ghost">Analytics & Data</Button>
            <Button size="sm" variant="ghost">Audiovisuel & Contenu</Button>
            <Button size="sm" variant="ghost">Stratégie Digitale</Button>
          </div>

          {/* Grille d'articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Comment l'IA transforme le marketing B2B en 2025",
                category: "Intelligence Artificielle",
                date: "5 Octobre 2025",
                author: "Émilie Moreau",
                excerpt: "Les dernières avancées en IA révolutionnent les stratégies marketing B2B..."
              },
              {
                title: "Les secrets d'un tunnel de conversion optimisé",
                category: "Analytics & Data",
                date: "2 Octobre 2025",
                author: "Thomas Martin",
                excerpt: "Découvrez les meilleures pratiques pour maximiser vos taux de conversion..."
              },
              {
                title: "Créer du contenu engageant avec les nouveaux formats",
                category: "Audiovisuel & Contenu",
                date: "28 Septembre 2025",
                author: "Sophie Leroy",
                excerpt: "Short-form, live, interactif : adaptez votre contenu aux nouvelles attentes..."
              },
              {
                title: "Data Privacy : Nouveaux enjeux RGPD 2025",
                category: "Stratégie Digitale",
                date: "25 Septembre 2025",
                author: "Marc Dubois",
                excerpt: "Les dernières évolutions réglementaires et leurs impacts sur vos stratégies..."
              },
              {
                title: "Automatisation marketing : Mythes et réalités",
                category: "Intelligence Artificielle",
                date: "20 Septembre 2025",
                author: "Émilie Moreau",
                excerpt: "Ce qui fonctionne vraiment et ce qu'il faut éviter en automatisation..."
              },
              {
                title: "Mesurer l'impact de votre présence sociale",
                category: "Analytics & Data",
                date: "18 Septembre 2025",
                author: "Thomas Martin",
                excerpt: "Au-delà des likes : les vraies métriques qui comptent sur les réseaux sociaux..."
              }
            ].map((article, index) => (
              <article key={index} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <div className="text-3xl">📄</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {article.category}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-xs">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.author}</span>
                    </div>

                    <Button size="sm" variant="ghost" className="text-xs">
                      Lire →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Charger plus d'articles
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
