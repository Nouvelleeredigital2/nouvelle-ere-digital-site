import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ExpertisesPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">
            Nos Expertises Intégrées
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Une approche globale,
            <br />
            créative et technologique
            <br />
            au service de votre performance.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Chez Nouvelle Ère Digital, nous croyons qu'un projet réussi repose sur une vision
              unifiée.
            </p>
            <p>
              C'est pourquoi nous avons réuni, au sein d'une même agence, tous les savoir-faire
              essentiels de la communication moderne :{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                conseil stratégique, production audiovisuelle, technologie scénique, design, digital
                et intelligence artificielle.
              </strong>
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Un seul partenaire pour concevoir, produire et mesurer vos expériences de marque.
                »
              </p>
            </div>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Notre différence : la cohérence.
              </strong>
            </p>
            <p>
              Chaque pôle parle le même langage et travaille en synergie pour garantir un parcours
              fluide, du concept à la diffusion.
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Organisation modulaire */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Une organisation modulaire et complémentaire"
            title="Six pôles d'expertise interconnectés"
            align="center"
          />
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-16">
            Nos six pôles d'expertise sont indépendants mais interconnectés. Ils peuvent être
            activés séparément ou intégrés dans un dispositif global, selon votre stratégie et vos
            priorités.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: "#7C3AED" }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Pôle
                  </th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Objectif
                  </th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Résultat attendu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  {
                    pole: "Communication & Marketing Digital",
                    objectif: "Structurer, raconter et diffuser votre message.",
                    resultat: "Une visibilité accrue et une stratégie mesurable.",
                  },
                  {
                    pole: "Audiovisuel & Création Multimédia",
                    objectif: "Donner vie à l'image et à l'émotion.",
                    resultat: "Des contenus forts, cohérents et réutilisables.",
                  },
                  {
                    pole: "Événementiel & Technologie Scénique",
                    objectif: "Créer des moments immersifs et connectés.",
                    resultat: "Un engagement tangible et une data exploitable.",
                  },
                  {
                    pole: "Création Graphique & Design",
                    objectif:
                      "Construire votre identité visuelle et renforcer votre univers de marque.",
                    resultat: "Une cohérence esthétique durable.",
                  },
                  {
                    pole: "Développement Web & Numérique",
                    objectif: "Concevoir des plateformes et outils performants.",
                    resultat: "Une expérience fluide, souveraine et évolutive.",
                  },
                  {
                    pole: "Intelligence Artificielle & Formation",
                    objectif: "Automatiser, analyser et transmettre les savoirs.",
                    resultat: "Une innovation utile, responsable et humaine.",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">
                      {row.pole}
                    </td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.objectif}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.resultat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <blockquote
            className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-12 text-center max-w-3xl mx-auto"
            style={{ borderColor: "#7C3AED" }}
          >
            « Chaque univers est une brique, leur combinaison crée un écosystème. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Méthode commune */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Une méthode commune"
            title="Du sens à la mesure"
            align="center"
          />
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-16">
            Quel que soit le pôle mobilisé, nous suivons une méthodologie unique :
          </p>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { num: "1", title: "Diagnostiquer", desc: "Les besoins et les publics." },
              { num: "2", title: "Concevoir", desc: "Une stratégie créative et mesurable." },
              { num: "3", title: "Produire", desc: "Des contenus et dispositifs fiables." },
              { num: "4", title: "Diffuser", desc: "Sur les bons canaux." },
              { num: "5", title: "Mesurer", desc: "Les résultats et transférer les compétences." },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  {item.num}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            Cette approche circulaire garantit la fluidité et la performance globale des projets.
          </p>

          <blockquote
            className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8 text-center max-w-3xl mx-auto"
            style={{ borderColor: "#7C3AED" }}
          >
            « Nous concevons chaque projet comme un parcours intelligent, où chaque action nourrit
            la suivante. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Force du modèle intégré */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="La force d'un modèle intégré"
            title="Une maîtrise complète de la chaîne de valeur"
            align="center"
          />

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 mb-12">
            <p className="text-center">Ce modèle intégré permet à Nouvelle Ère Digital de :</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Maîtriser toute la chaîne de valeur, du concept au déploiement",
              "Éviter les frictions entre prestataires",
              "Garantir une qualité homogène",
              "Assurer une traçabilité totale des données et des indicateurs de succès",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  ✓
                </div>
                <p className="flex-1 font-medium text-zinc-900 dark:text-zinc-100">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            Nos équipes partagent la même culture :{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">
              créative, technologique et humaine.
            </strong>
          </p>
        </div>
      </ThemeSection>

      {/* Expertises ancrées dans l'expérience */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Des expertises ancrées dans l'expérience"
            title="Des professionnels aguerris"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nos pôles sont portés par des professionnels aguerris :{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                créatifs, ingénieurs, réalisateurs, designers, développeurs, formateurs et
                techniciens événementiels.
              </strong>
            </p>
            <p>
              Tous animés par une exigence commune : faire de chaque projet une expérience fluide,
              inspirante et mesurable.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8"
              style={{ borderColor: "#7C3AED" }}
            >
              « L'excellence n'est pas un hasard, c'est une discipline. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Cohérence transversale */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Une cohérence transversale"
            title="Un langage commun, une vision partagée"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Direction artistique commune",
                desc: "Pour maintenir la continuité visuelle.",
              },
              {
                title: "Stratégie IA & data transversale",
                desc: "Pour optimiser la performance.",
              },
              {
                title: "Pilotage projet unifié",
                desc: "Pour garantir la fluidité entre pôles.",
              },
              {
                title: "Mesure d'impact partagée",
                desc: "Tous nos outils parlent le même langage (KPI, analytics, reporting IA).",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Solutions évolutives */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Des solutions évolutives"
            title="Une approche modulaire adaptée à vos besoins"
            align="center"
          />
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-16">
            Notre approche modulaire s'adapte à la taille, au rythme et à la maturité numérique de
            chaque client :
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "🔹",
                title: "Accompagnement express",
                desc: "Pour des besoins ciblés ou temporaires.",
              },
              {
                icon: "🔹",
                title: "Programme global",
                desc: "Pour une transformation complète.",
              },
              {
                icon: "🔹",
                title: "Copilotage IA",
                desc: "Pour une évolution continue et mesurée.",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Citation manifeste */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « Nous faisons converger stratégie, design, technologie et IA pour créer un impact
            durable. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Visuel panoramique */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Six univers interconnectés
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              De l'audiovisuel au digital, de la scène aux données IA, nous créons des synergies qui
              amplifient votre impact.
            </p>
          </div>

          {/* Grille hexagonale symbolique */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Communication & Marketing", icon: "📢" },
              { title: "Audiovisuel & Multimédia", icon: "🎥" },
              { title: "Événementiel & Scénique", icon: "🎭" },
              { title: "Création Graphique", icon: "🎨" },
              { title: "Développement Web", icon: "💻" },
              { title: "Intelligence Artificielle", icon: "🤖" },
            ].map((item, i) => (
              <div
                key={i}
                className="card text-center group hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Interconnexion & Synergie
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
            Explorez nos univers en détail
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez comment chaque pôle peut transformer votre communication et composez votre
            parcours sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/univers">Découvrir nos univers en détail</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/journey-composer">Explorer l&apos;application IA — Journey Composer</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
