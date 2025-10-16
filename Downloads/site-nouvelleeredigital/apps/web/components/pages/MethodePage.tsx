import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function MethodePage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">
            Méthode & Expérience Client
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Une approche fondée
            <br />
            sur l&apos;écoute, la clarté
            <br />
            et la mesure.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Chaque projet que nous menons repose sur une méthode éprouvée : clarté, rigueur et
              accompagnement humain.
            </p>
            <p>
              Chez Nouvelle Ère Digital, nous avons transformé l'expérience client en un parcours
              fluide et mesurable, conçu pour garantir la qualité, la réactivité et la transparence
              à chaque étape.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Un interlocuteur unique, une vision claire, des résultats tangibles. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre promesse */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre promesse"
            title="Un accompagnement complet et transparent"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Vous offrir un accompagnement complet, de la réflexion à la performance, en passant
              par la production et la transmission.
            </p>
            <p>
              Notre mission : rendre vos projets plus simples à piloter, plus cohérents à déployer
              et plus efficaces à mesurer.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8"
              style={{ borderColor: "#7C3AED" }}
            >
              « Chaque étape est pensée pour créer de la valeur, pas de la complexité. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Les 5 étapes de notre approche */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Les 5 étapes de notre approche"
            title="Un parcours méthodique et transparent"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Diagnostic & écoute */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Diagnostic & écoute
                  </h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Tout commence par la compréhension. Nous analysons vos enjeux, vos audiences et
                    vos objectifs pour construire un plan sur mesure. Audit stratégique et
                    technique. Analyse des canaux et points de contact. Identification des KPI
                    pertinents. Workshop collaboratif : immersion dans votre univers.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Avant de produire, nous écoutons. Avant d'agir, nous comprenons. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Concept & stratégie */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Concept & stratégie
                  </h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Une fois vos besoins définis, nous concevons un plan clair et cohérent.
                    Storytelling et design d'expérience. Scénarisation et planification multicanale.
                    Budgétisation agile et validation des livrables. Intégration IA pour modéliser
                    les scénarios et anticiper les performances.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Nous traduisons vos objectifs en expériences mesurables. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Production & mise en œuvre */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Production & mise en œuvre
                  </h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Nos pôles internes travaillent en synergie pour produire vos dispositifs et
                    contenus. Audiovisuel, digital, design, événementiel, IA et formation.
                    Coordination centralisée, pilotage transparent. Qualité et cohérence garanties
                    sur toute la chaîne de valeur. Validation continue et reporting projet.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « De l'idée à la scène, du concept à l'écran : tout est orchestré. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Diffusion & mesure */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Diffusion & mesure
                  </h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Nous assurons la diffusion sur les bons canaux et la collecte de données en
                    temps réel. Publication et activation multicanale. Tracking, analytics et
                    tableaux de bord personnalisés. Suivi des KPI : audience, engagement, ROI,
                    satisfaction. Rapports IA automatiques et recommandations d'ajustement.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Nous mesurons pour comprendre, et comprenons pour progresser. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Transmission & autonomie */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Transmission & autonomie
                  </h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Une fois le projet livré, nous vous transmettons les outils, les données et les
                    bonnes pratiques. Documentation claire et partagée. Formations et sessions de
                    transfert de compétences. Accompagnement post-projet et mise à jour continue.
                    Support réactif et suivi humain.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Nous restons à vos côtés pour que vous restiez autonomes. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Outils de pilotage */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos outils de pilotage"
            title="La transparence au cœur du projet"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                title: "Tableaux de bord personnalisés",
                desc: "Visualiser vos indicateurs clés en temps réel.",
              },
              { title: "Reporting visuel", desc: "Lire vos performances en un coup d'œil." },
              {
                title: "Analyses IA",
                desc: "Identifier les points forts et les axes d'amélioration.",
              },
              {
                title: "Suivi collaboratif Notion / ClickUp",
                desc: "Partage de l'avancement et validation en ligne.",
              },
              {
                title: "Automatisations de reporting",
                desc: "Export hebdomadaire vers votre CRM ou vos dashboards.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « La transparence est notre standard, pas une option. »
          </p>
        </div>
      </ThemeSection>

      {/* Philosophie projet */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre philosophie projet"
            title="Un partenariat de co-création"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>Chaque projet est un partenariat.</p>
            <p>
              Nous considérons nos clients comme des co-créateurs : nous avançons ensemble, dans un
              climat de confiance et d'écoute.
            </p>
            <p>
              Notre objectif est d'assurer la fluidité, la lisibilité et la performance globale de
              votre communication.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8"
              style={{ borderColor: "#7C3AED" }}
            >
              « Notre méthode n'est pas figée, elle s'adapte à chaque client — parce que chaque
              histoire est unique. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Clés de notre accompagnement */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Les clés de notre accompagnement"
            title="Cinq piliers pour votre succès"
            align="center"
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Vision globale", desc: "Cohérence du conseil à la production." },
              {
                title: "Pilotage centralisé",
                desc: "Un interlocuteur unique, des délais maîtrisés.",
              },
              { title: "Transparence totale", desc: "Reporting clair et suivi à chaque phase." },
              { title: "Innovation continue", desc: "IA, automatisation et veille stratégique." },
              { title: "Approche humaine", desc: "Écoute, pédagogie, accompagnement." },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Notre valeur ajoutée : conjuguer rigueur, créativité et proximité. »
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Méthode, mesure et maîtrise au service de l'expérience.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Une frise horizontale illustrant les 5 étapes de la méthode : Écoute → Stratégie →
              Production → Diffusion → Transmission, avec des pictogrammes minimalistes reliés par
              un fil lumineux symbolisant la cohérence.
            </p>
          </div>

          {/* Frise des 5 étapes */}
          <div className="grid md:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { num: "1", title: "Écoute", icon: "👂" },
              { num: "2", title: "Stratégie", icon: "🎯" },
              { num: "3", title: "Production", icon: "⚙️" },
              { num: "4", title: "Diffusion", icon: "📢" },
              { num: "5", title: "Transmission", icon: "📚" },
            ].map((item, i) => (
              <div
                key={i}
                className="card text-center group hover:shadow-xl transition-all hover:scale-105"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Étape {item.num}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Cohérence & Fluidité
              </span>
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Prêt à vivre l'expérience Nouvelle Ère Digital ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos outils de pilotage IA et planifiez un diagnostic gratuit pour explorer
            comment notre méthode peut transformer vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/outils-pilotage">Découvrir nos outils de pilotage IA</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/diagnostic-gratuit">Planifier un diagnostic gratuit</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
