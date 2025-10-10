import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function CommunicationPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Communication & Marketing Digital</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Faire briller les marques<br />dans l'univers numérique.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Dans un monde où tout le monde communique, nous aidons les marques à être comprises, visibles et désirées.
            </p>
            <p>
              Notre pôle Communication & Marketing Digital conçoit des stratégies puissantes, incarnées et mesurables.
            </p>
            <p>
              De la définition du positionnement à la production de contenus, nous orchestrons la visibilité de votre marque sur tous les canaux.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « L'impact se mesure. La créativité s'orchestre. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre rôle */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre rôle"
            title="Transformer vos objectifs en actions concrètes"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Transformer vos objectifs de communication en actions concrètes et mesurables.
            </p>
            <p>
              Nous intervenons sur l'ensemble de la chaîne stratégique et éditoriale :
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              de la réflexion à la diffusion, en passant par la data, le design et la performance.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Nous ne lançons pas de campagnes : nous créons des écosystèmes d'attention. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Expertises principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos expertises principales"
            title="Quatre piliers pour votre succès"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Stratégie & Conseil */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Stratégie & Conseil</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Audit de communication et diagnostic de marque. Storytelling et identité narrative. Élaboration de stratégies multicanales (SEO, SEA, social media, emailing, print). Planning éditorial et plan de diffusion IA-assisté. Positionnement de marque et accompagnement d'image.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Racontez mieux, dépensez moins, touchez plus. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Campagnes digitales & social media */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Campagnes digitales & social media</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Création, pilotage et diffusion de campagnes sur Meta, Google, LinkedIn, TikTok. Gestion complète des réseaux sociaux : stratégie, contenus, publication, reporting. Publicités dynamiques et ciblées (B2B / B2C / institutionnel). Intégration de solutions IA pour l'analyse prédictive des performances. Création de contenus natifs : vidéos, carrousels, motion design, podcasts, infographies.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Votre audience n'a pas besoin de plus de messages, mais de plus de sens. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Contenus & storytelling */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Contenus & storytelling</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Rédaction éditoriale et conception de brand stories. Production de vidéos et visuels optimisés pour les plateformes sociales. Podcasts, articles, newsletters et livres blancs. Alignement entre message, ton et stratégie de marque. Intégration IA pour la cohérence sémantique et la déclinaison multilingue.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Nous racontons votre marque à travers la donnée et l'émotion. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Optimisation & data marketing */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Optimisation & data marketing</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    SEO/SEA de performance : audit, refonte, netlinking, analytics. Tracking des conversions et tableaux de bord personnalisés. Automatisations marketing (CRM, nurturing, triggers). Analyse comportementale et segmentation IA. Mesure des indicateurs d'engagement et de ROI.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Chaque clic, chaque vue, chaque interaction doit avoir un sens. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Méthodologie */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre méthodologie"
            title="5 étapes pour votre succès"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Diagnostiquer", desc: "Vos besoins et audiences." },
              { num: "2", title: "Concevoir", desc: "Une stratégie sur mesure et multicanale." },
              { num: "3", title: "Produire", desc: "Les contenus et campagnes cohérents." },
              { num: "4", title: "Diffuser", desc: "& automatiser sur les bons leviers." },
              { num: "5", title: "Mesurer", desc: "Analyser, optimiser." },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                  {item.num}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous pensons globalement, agissons localement et mesurons en temps réel. »
          </p>
        </div>
      </ThemeSection>

      {/* Outils et technologies */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Nos outils et technologies"
            title="La technologie au service de votre performance"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {[
              "Suites professionnelles (Adobe, Google, Meta Business, HubSpot, Notion, Semrush).",
              "Automatisations IA : génération de rapports, recommandations de publication, A/B testing intelligent.",
              "Tableaux de bord personnalisés et reporting visuel.",
              "Intégration avec vos CRM et outils d'analyse existants.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl text-center max-w-3xl mx-auto" style={{ borderColor: '#7C3AED' }}>
            « Les données guident nos décisions, mais l'humain reste au centre. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Bénéfices pour nos clients */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Bénéfices pour nos clients"
            title="L'impact concret de notre approche"
            align="center"
          />

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#7C3AED' }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Bénéfice</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  { benefice: "Stratégie claire et pilotée", impact: "Vision unifiée, cohérence éditoriale." },
                  { benefice: "Création de contenu ciblée", impact: "Engagement accru et meilleure conversion." },
                  { benefice: "Campagnes mesurables", impact: "Indicateurs clairs et reporting transparent." },
                  { benefice: "Automatisation intelligente", impact: "Gain de temps et optimisation continue." },
                  { benefice: "Équipe intégrée", impact: "Un interlocuteur unique, réactif et expert." },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">{row.benefice}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ThemeSection>

      {/* Exemples de réalisations */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Exemples de réalisations"
            title="Nos succès en action"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Campagne Recrutement & Marque Employeur",
                desc: "Storytelling vidéo + activation LinkedIn, +300 % de reach.",
              },
              {
                title: "Stratégie de contenu B2B institutionnelle",
                desc: "Audit + brand book + social média, +40 % d'engagement qualifié.",
              },
              {
                title: "Automatisation CRM / marketing IA",
                desc: "Intégration HubSpot + reporting IA → division par 2 du temps de suivi.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Notre promesse */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « Nous vous aidons à faire entendre votre marque dans le bruit numérique — avec cohérence, créativité et mesure. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Stratégie, créativité, data — en un seul mouvement.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              De la stratégie à la mesure, nous orchestrons votre présence digitale avec précision et créativité.
            </p>
          </div>

          {/* Mosaïque d'illustrations */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "📱", title: "Social Media" },
              { icon: "🎬", title: "Production Vidéo" },
              { icon: "📊", title: "Analytics" },
              { icon: "👥", title: "Équipe Créative" },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Prêt à faire briller votre marque ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos réalisations et explorez nos solutions IA pour révolutionner votre marketing digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/realisations">Découvrir nos réalisations en communication</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/solutions-ia">Explorer nos solutions IA pour le marketing</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
