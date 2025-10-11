import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function EngagementsRSEPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Engagements & RSE</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Innover, oui —<br />mais toujours<br />de manière responsable.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Notre vision du numérique repose sur un équilibre : créer, innover et mesurer sans jamais compromettre l'humain ni l'environnement.
            </p>
            <p>
              Chez Nouvelle Ère Digital, chaque projet s'inscrit dans une démarche éthique, durable et souveraine.
            </p>
            <p>
              Parce que l'innovation n'a de valeur que lorsqu'elle respecte le vivant, la planète et la confiance.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « La responsabilité n'est pas une contrainte : c'est notre boussole. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Philosophie RSE */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre philosophie RSE"
            title="Un équilibre entre innovation et responsabilité"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous concevons des solutions écologiques, inclusives et transparentes, en alignant nos engagements avec les piliers de notre marque : simplicité, créativité, transparence, souveraineté, excellence et accompagnement humain.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Notre impact se mesure en émissions évitées autant qu'en émotions créées. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Engagement environnemental */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Engagement environnemental"
            title="Réduire notre empreinte pour amplifier votre impact"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              "Utilisation d'équipements à faible consommation énergétique (LED, serveurs green).",
              "Mutualisation des transports pour limiter l'empreinte carbone des tournages et événements.",
              "Recyclage et réutilisation des matériaux scéniques et supports visuels.",
              "Réduction du papier et adoption du tout numérique certifié éco-conçu.",
              "Hébergements numériques bas carbone avec énergie renouvelable.",
              "Optimisation énergétique des workflows de production IA et audiovisuelle.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous réduisons notre empreinte pour amplifier la vôtre. »
          </p>
        </div>
      </ThemeSection>

      {/* Engagement social & humain */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Engagement social & humain"
            title="La performance durable est avant tout humaine"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              "Formation continue des équipes et veille active sur les nouvelles technologies.",
              "Politique d'inclusion et d'égalité des chances : diversité, accessibilité, respect.",
              "Collaboration avec des partenaires locaux, indépendants et éthiques.",
              "Soutien à la montée en compétences des jeunes créatifs et techniciens.",
              "Intégration d'une charte éthique de la collaboration et du management.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « La performance durable est avant tout humaine. »
          </p>
        </div>
      </ThemeSection>

      {/* Engagement éthique & numérique */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Engagement éthique & numérique"
            title="Une IA souveraine, responsable et centrée sur l'humain"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              "Respect absolu du RGPD et de l'AI Act.",
              "Traçabilité complète des outils IA utilisés et documentation claire.",
              "Aucune revente ni exploitation de données clients.",
              "Conception d'IA explicables, supervisées et pédagogiques.",
              "Priorité aux infrastructures souveraines et européennes.",
              "Sécurité renforcée : hébergement en cloud français (OVH, Scaleway, Infomaniak).",
              "Éthique de l'automatisation : la technologie comme soutien, pas comme remplacement.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Une IA souveraine, responsable et centrée sur l'humain. »
          </p>
        </div>
      </ThemeSection>

      {/* Gouvernance & transparence */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Gouvernance & transparence"
            title="Nous mesurons ce que nous promettons"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Politique interne documentée sur les usages IA et données.",
              "Suivi RSE et audit environnemental annuel.",
              "Publication d'indicateurs de durabilité dans notre rapport d'impact.",
              "Gestion transparente des budgets et processus clients.",
              "Sensibilisation des collaborateurs à la cybersécurité et à l'éco-responsabilité.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous mesurons ce que nous promettons. »
          </p>
        </div>
      </ThemeSection>

      {/* Engagements concrets */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos engagements concrets"
            title="Des objectifs mesurables et ambitieux"
            align="center"
          />

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#7C3AED' }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Axe</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Objectif</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Résultat attendu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  { axe: "Empreinte carbone", objectif: "Réduction de 30 % d'ici 2026", resultat: "Production et hébergement optimisés" },
                  { axe: "Accessibilité numérique", objectif: "100 % des sites web conformes WCAG 2.1", resultat: "Inclusion et ergonomie universelle" },
                  { axe: "Énergie verte", objectif: "100 % d'électricité issue de sources renouvelables", resultat: "Partenaires éco-certifiés" },
                  { axe: "Transparence IA", objectif: "Documentation publique des outils utilisés", resultat: "Confiance client renforcée" },
                  { axe: "Formation interne", objectif: "+50 h de formation IA & RSE par an", resultat: "Veille et compétences actualisées" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">{row.axe}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.objectif}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.resultat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Notre responsabilité, c'est d'anticiper et d'accompagner durablement. »
          </p>
        </div>
      </ThemeSection>

      {/* Témoignages */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Témoignages"
            title="La voix de notre engagement"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Chez Nouvelle Ère Digital, la durabilité est intégrée dans chaque projet, pas ajoutée à la fin.",
                author: "Claire, cheffe de projet événementiel",
              },
              {
                quote: "Nous avons remplacé la course à la performance par une recherche d'équilibre.",
                author: "Maxime, responsable technique audiovisuel",
              },
              {
                quote: "Notre souveraineté numérique, c'est la garantie de l'indépendance et de la confiance.",
                author: "Elena, data & IA manager",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <blockquote className="text-zinc-700 dark:text-zinc-300 mb-4 italic">
                  "{item.quote}"
                </blockquote>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">— {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Vision de l'avenir */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « L'avenir sera digital, mais il sera aussi conscient. »
          </blockquote>
          <p className="mt-8 text-zinc-300 max-w-2xl mx-auto">
            Nous avançons vers un modèle d'agence éthique, verte et augmentée, où chaque action — créative, technique ou technologique — est alignée avec nos responsabilités sociales et environnementales. Notre ambition : prouver que la modernité peut être durable et l'innovation, humaine.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Innover sans renier le sens.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Photographie lumineuse d'une équipe en pleine installation scénique dans un lieu naturel, symbolisant équilibre et technologie.
            </p>
          </div>

          {/* Grille des 4 piliers RSE */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🌿", title: "Environnemental" },
              { icon: "🤝", title: "Social & Humain" },
              { icon: "🧩", title: "Éthique & Numérique" },
              { icon: "🧠", title: "Gouvernance" },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">RSE Intégrée</span>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Découvrez nos engagements en action
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Téléchargez notre charte RSE & IA éthique et découvrez nos initiatives durables pour comprendre comment nous intégrons la responsabilité dans chaque projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/charte-rse">Télécharger notre charte RSE & IA éthique</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/initiatives-durables">Découvrir nos initiatives durables en action</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
