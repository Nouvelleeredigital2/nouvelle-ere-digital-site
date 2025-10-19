import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function IntelligenceArtificiellePage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
            Intelligence Artificielle & Innovation
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6">
            L'intelligence artificielle
            <br />
            au service de la créativité,
            <br />
            de la performance et de l'humain.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground">
            <p>
              Chez Nouvelle Ère Digital, l'intelligence artificielle n'est pas un effet de mode.
            </p>
            <p>C'est un levier d'efficacité, de créativité et de compréhension.</p>
            <p>
              Nous l'intégrons dans nos métiers comme un outil concret, éthique et souverain — pensé
              pour augmenter l'humain, jamais pour le remplacer.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-foreground">
                « L'IA doit amplifier la créativité, pas la remplacer. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre mission */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre mission"
            title="Rendre l'IA utile, accessible et responsable"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground text-center">
            <p>Rendre l'IA utile, accessible et responsable.</p>
            <p>
              Nous concevons des solutions et des copilotes qui simplifient vos processus,
              enrichissent vos contenus, et mesurent vos performances — tout en garantissant la
              sécurité et la maîtrise de vos données.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-muted-foreground italic text-xl mt-8"
              style={{ borderColor: "#7C3AED" }}
            >
              « De la scène à l'écran, du pixel à la donnée, chaque action devient intelligente. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Expertises principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos expertises principales"
            title="Cinq domaines d'application de l'IA"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. IA appliquée à la communication */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    IA appliquée à la communication
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Génération de contenus texte, image et vidéo cohérents avec la charte de marque.
                    Automatisation de publications et analyse de performances. Recommandation de
                    formats et planification éditoriale IA-assistée. IA de modération et d'analyse
                    sémantique pour réseaux sociaux. Génération de présentations et de storyboards
                    dynamiques.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Nous transformons la donnée en narration et la narration en engagement. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Copilotes métiers & automatisations */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Copilotes métiers & automatisations
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Copilotes IA sur mesure pour marketing, audiovisuel, RH et formation.
                    Automatisations de workflows et de reporting. Analyse prédictive des KPIs et
                    suggestions d'optimisation. Connecteurs intelligents entre CRM, ERP et
                    plateformes de communication. Tableaux de bord interactifs IA pour le suivi
                    d'activité.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Votre IA devient un collaborateur, pas une boîte noire. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Innovation & R&D */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Innovation & R&D
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Développement de prototypes IA internes et expérimentation continue. Exploration
                    de modèles d'analyse comportementale et de recommandation. R&D sur la création
                    visuelle augmentée (IA générative + direction artistique). Études sur la
                    souveraineté numérique et la conformité IA Act. Partenariats technologiques et
                    recherche appliquée.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Innover, oui — mais toujours de manière responsable. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Acculturation & formation IA */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Acculturation & formation IA
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Programmes d'acculturation IA pour dirigeants, communicants, formateurs.
                    Ateliers de découverte : Prompt design, automatisations, copilotes métiers.
                    Formations sur les usages concrets : marketing, audiovisuel, événementiel, RH.
                    Accompagnement au changement et documentation pratique. Approche pédagogique :
                    expliquer avant d'automatiser.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Apprendre, c'est s'émanciper à l'ère digitale. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Application phare : Journey Composer */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Application phare : Journey Composer
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Une application interactive et tactile pour composer visuellement vos parcours
                    de services, guidée par l'IA.
                  </p>
                  <div className="mb-4">
                    <p className="font-medium text-foreground mb-2">
                      Fonctionnalités clés :
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>
                          Parcours Express IA : générer une proposition de solution en 3 questions.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>
                          Compatibilité intelligente entre services (événementiel, digital,
                          formation).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>Drag & Drop intuitif sur un canvas visuel.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>Export instantané de plaquettes, devis, QR codes et PDF.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>Chat IA contextuel pour chaque service.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                        <span>Scoring automatique et suggestions d&apos;optimisation.</span>
                      </li>
                    </ul>
                  </div>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « De la brochure au jeu : on ne lit plus nos offres, on les compose. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Méthodologie d'intégration IA */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre méthodologie d'intégration IA"
            title="4 étapes pour une adoption réussie"
            align="center"
          />

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                num: "1",
                title: "Audit & cadrage",
                desc: "Identifier les besoins et usages IA pertinents.",
              },
              {
                num: "2",
                title: "Design & prototypage",
                desc: "Définir les flux et prompts optimaux.",
              },
              {
                num: "3",
                title: "Déploiement & formation",
                desc: "Installer les outils, former les équipes.",
              },
              {
                num: "4",
                title: "Mesure & amélioration continue",
                desc: "Suivi, analyse, ajustements.",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-card-foreground"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  {item.num}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-foreground max-w-3xl mx-auto">
            « Nous allions la rigueur du code, la créativité du design et la pédagogie du sens. »
          </p>
        </div>
      </ThemeSection>

      {/* Approche responsable */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre approche responsable"
            title="Éthique, transparence et souveraineté"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              "Conformité complète RGPD et AI Act.",
              "Hébergement souverain (serveurs européens).",
              "Transparence sur les modèles IA utilisés et leurs limites.",
              "Documentation claire et accessible pour chaque usage.",
              "IA explicable : chaque recommandation est justifiée.",
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  <div className="w-6 h-6 bg-background/20 rounded-lg"></div>
                </div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-foreground max-w-3xl mx-auto">
            « La confiance est la première des intelligences. »
          </p>
        </div>
      </ThemeSection>

      {/* Réalisations et cas d'usage */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos réalisations et cas d'usage"
            title="L'IA en action, des résultats concrets"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Copilote marketing IA",
                desc: "60 % de gain de temps sur la planification de campagnes.",
              },
              {
                title: "Outil de génération visuelle IA",
                desc: "4× plus de concepts créatifs présentés en avant-projet.",
              },
              {
                title: "Formation IA pour managers",
                desc: "98 % de satisfaction et adoption interne en 30 jours.",
              },
              {
                title: "Journey Composer",
                desc: "+45 % d'engagement commercial sur les démonstrations interactives.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    <div className="w-8 h-8 bg-background/20 rounded-lg"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-foreground max-w-3xl mx-auto mt-12">
            « Nous faisons de l'IA un vecteur d'impact et non de complexité. »
          </p>
        </div>
      </ThemeSection>

      {/* Philosophie */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-card-foreground leading-relaxed">
            « Nous concevons des IA à visage humain, capables d'expliquer ce qu'elles suggèrent. »
          </blockquote>
          <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
            L'intelligence artificielle n'est pas une fin, mais un moyen d'éclairer l'action
            humaine. Nous la plaçons là où elle simplifie, mesure et valorise. Son pouvoir n'est pas
            dans la vitesse, mais dans la justesse.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
              L'intelligence artificielle, concrète, souveraine et humaine.
            </h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Une interface IA épurée : à gauche, un chat intelligent avec suggestions ; à droite,
              un canvas où les services se connectent automatiquement.
            </p>
          </div>

          {/* Grille des 5 domaines */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "📝", title: "Communication" },
              { icon: "🤖", title: "Copilotes" },
              { icon: "🔬", title: "Innovation" },
              { icon: "🎓", title: "Formation" },
              { icon: "🎯", title: "Journey Composer" },
            ].map((item, i) => (
              <div
                key={i}
                className="card text-center group hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Prêt à intégrer l'IA dans votre stratégie ?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Découvrez l'application Journey Composer et explorez nos formations IA pour transformer
            votre approche digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/journey-composer">Découvrir l&apos;application Journey Composer</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/formations-ia">Explorer nos formations IA & transformation digitale</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
