'use client';

import { useState, useEffect } from 'react';
import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name?: string;
    email: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts?status=PUBLISHED&limit=6');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des articles');
      }
      
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
      setError('Impossible de charger les articles');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAuthorInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'A';
  };
  return (
    <>
      {/* Héro Section */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
              <span className="text-sm font-medium text-foreground">
                Blog & Actualités
              </span>
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05] mb-8">
              Insights & Tendances
              <br />
              de la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                communication digitale
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Découvrez nos analyses, études de cas et réflexions sur l'évolution de la
              communication, l'intelligence artificielle et les stratégies digitales qui façonnent
              l'avenir.
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

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-error mb-4">{error}</p>
              <Button onClick={loadPosts}>Réessayer</Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Aucun article publié pour le moment</p>
              <p className="text-sm text-muted-foreground">Revenez bientôt pour découvrir nos derniers insights !</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 mt-16">
              {/* Article principal */}
              {posts[0] && (
                <div className="lg:col-span-2">
                  <article className="bg-card rounded-3xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                      <div className="text-6xl">🚀</div>
                    </div>
                    <div className="p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        {posts[0].tags.length > 0 && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
                              color: "#7C3AED",
                            }}
                          >
                            {posts[0].tags[0].name}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatDate(posts[0].publishedAt || posts[0].createdAt)}
                        </span>
                      </div>

                      <h2 className="text-3xl font-semibold text-foreground mb-4 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                        {posts[0].title}
                      </h2>

                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {posts[0].excerpt || posts[0].content.substring(0, 200) + '...'}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-card-foreground font-semibold">
                            {getAuthorInitials(posts[0].author.name, posts[0].author.email)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {posts[0].author.name || posts[0].author.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Auteur
                            </div>
                          </div>
                        </div>

                        <Button size="sm" variant="outline" asChild>
                          <a href={`/blog/${posts[0].slug}`}>Lire l'article</a>
                        </Button>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Articles secondaires */}
              {posts.slice(1, 3).map((post, index) => (
                <article key={post.id} className="bg-card rounded-3xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center">
                    <div className="text-4xl">{index === 0 ? '📊' : '🎬'}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.length > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {post.tags[0].name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {post.excerpt || post.content.substring(0, 120) + '...'}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-card-foreground font-semibold text-xs">
                        {getAuthorInitials(post.author.name, post.author.email)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {post.author.name || post.author.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Auteur
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </ThemeSection>

      {/* Catégories d'articles */}
      <ThemeSection variant="light" className="py-32 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Explorer par catégorie"
            title="Thématiques abordées"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center group cursor-pointer">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                🤖
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Intelligence Artificielle
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                IA appliquée au marketing, automatisation, personnalisation
              </p>
              <div className="text-xs text-muted-foreground">12 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                📈
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Analytics & Data
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mesure de performance, ROI, optimisation data-driven
              </p>
              <div className="text-xs text-muted-foreground">18 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                🎬
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Audiovisuel & Contenu
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Production vidéo, storytelling, formats innovants
              </p>
              <div className="text-xs text-muted-foreground">15 articles</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                🎯
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Stratégie Digitale
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tendances, best practices, études de cas
              </p>
              <div className="text-xs text-muted-foreground">20 articles</div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Newsletter signup */}
      <ThemeSection variant="gradient" className="py-32" id="newsletter">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Restez à la pointe de l'innovation digitale
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Recevez chaque semaine nos derniers articles, tendances et insights directement dans
            votre boîte mail. Pas de spam, que du contenu de qualité.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <input
                type="email"
                placeholder="votre.email@exemple.com"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button size="lg">S'abonner</Button>
            </div>

            <p className="text-sm text-muted-foreground">
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
            <Button size="sm" variant="outline">
              Tous les articles
            </Button>
            <Button size="sm" variant="ghost">
              Intelligence Artificielle
            </Button>
            <Button size="sm" variant="ghost">
              Analytics & Data
            </Button>
            <Button size="sm" variant="ghost">
              Audiovisuel & Contenu
            </Button>
            <Button size="sm" variant="ghost">
              Stratégie Digitale
            </Button>
          </div>

          {/* Grille d'articles */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-error mb-4">{error}</p>
              <Button onClick={loadPosts}>Réessayer</Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Aucun article publié pour le moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <div className="text-3xl">📄</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.length > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {post.tags[0].name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent dark:group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-card-foreground font-semibold text-xs">
                          {getAuthorInitials(post.author.name, post.author.email)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {post.author.name || post.author.email}
                        </span>
                      </div>

                      <Button size="sm" variant="ghost" className="text-xs" asChild>
                        <a href={`/blog/${post.slug}`}>Lire →</a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

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
