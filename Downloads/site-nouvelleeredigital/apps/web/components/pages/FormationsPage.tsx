import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FormationsPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Formations & Accompagnement</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Transmettre les savoirs,<br />développer les talents.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Nous croyons qu'une transformation réussie commence par la compréhension et l'appropriation.
            </p>
            <p>
              Le pôle Formations & Accompagnement de Nouvelle Ère Digital aide les professionnels à comprendre, maîtriser et intégrer les outils du numérique et de l'intelligence artificielle.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Apprendre, c'est s'émanciper à l'ère digitale. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre mission */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre mission"
            title="Accompagner la montée en compétence"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Accompagner les entreprises, les institutions et les équipes dans leur montée en compétence.
            </p>
            <p>
              Notre pédagogie repose sur trois valeurs :
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              accessibilité, expérimentation et application concrète.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Nous ne formons pas à des outils, nous formons à des usages. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Domaines d'enseignement */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos domaines d'enseignement"
            title="Quatre spécialités pour votre développement"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Stratégie & marketing digital */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Stratégie & marketing digital</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Maîtriser les leviers SEO/SEA, social media et campagnes omnicanales. Élaborer une stratégie éditoriale performante. Comprendre l'analyse de données et la mesure d'impact. Automatiser ses campagnes et gérer son CRM.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « De la stratégie à la pratique : des outils concrets, des résultats visibles. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Communication audiovisuelle & événementielle */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Communication audiovisuelle & événementielle</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Maîtriser les fondamentaux du tournage et du live. Organiser un événement hybride (présentiel + digital). Découvrir les outils techniques : régie, son, lumière, captation. Produire des contenus percutants avec les bons formats.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Quand la communication devient une expérience scénique. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Intelligence artificielle appliquée */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Intelligence artificielle appliquée</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Introduction à l'IA et compréhension des modèles. Utiliser les copilotes IA dans les métiers du marketing, de la communication ou de la production. Initiation au prompt design et à la génération créative. Automatisations intelligentes et cas pratiques réels. Atelier "IA éthique et souveraine" (RGPD, AI Act, gouvernance).
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'IA utile, accessible et responsable. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Créativité, leadership & innovation */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Créativité, leadership & innovation</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Booster la créativité en équipe à l'ère des technologies émergentes. Prendre la parole en public, pitcher et convaincre. Design thinking et prototypage rapide. Leadership positif et communication d'équipe. Formation à la collaboration IA + humain.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'humain reste le premier moteur de toute innovation. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Formats disponibles */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Formats disponibles"
            title="Des modalités adaptées à vos besoins"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Ateliers sur mesure",
                desc: "Adaptés à vos besoins et métiers, en présentiel ou distanciel.",
              },
              {
                title: "Formations inter-entreprises",
                desc: "Sessions partagées, networking et cas concrets.",
              },
              {
                title: "Programmes hybrides",
                desc: "Présentiel + digital + suivi asynchrone.",
              },
              {
                title: "Coaching individuel / collectif",
                desc: "Accompagnement personnalisé et plan de progression.",
              },
              {
                title: "Modules certifiants",
                desc: "Formations validées par évaluation finale et attestation de compétences.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Une formation ne doit pas informer, elle doit transformer. »
          </p>
        </div>
      </ThemeSection>

      {/* Approche pédagogique */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre approche pédagogique"
            title="5 étapes pour une formation réussie"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Écouter", desc: "Identifier vos besoins, vos niveaux et vos objectifs." },
              { num: "2", title: "Adapter", desc: "Concevoir des contenus et exercices concrets." },
              { num: "3", title: "Transmettre", desc: "Associer théorie, pratique et cas réels." },
              { num: "4", title: "Accompagner", desc: "Suivi personnalisé et coaching post-formation." },
              { num: "5", title: "Mesurer", desc: "Évaluer les acquis et les progrès sur la durée." },
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
            « Nous formons à la maîtrise, pas à la dépendance. »
          </p>
        </div>
      </ThemeSection>

      {/* Outils et innovations pédagogiques */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos outils et innovations pédagogiques"
            title="La technologie au service de l'apprentissage"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Plateforme d'apprentissage hybride et cloud souverain.",
              "Espace de suivi personnalisé avec IA pédagogique intégrée.",
              "Tableaux de bord d'évolution et certification de compétences.",
              "Génération automatique de supports et de cas d'application.",
              "Copilote formateur IA : suivi, rappel et aide à la révision.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Quand l'apprentissage devient une expérience interactive et mesurable. »
          </p>
        </div>
      </ThemeSection>

      {/* Exemples de formations récentes */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Exemples de formations récentes"
            title="Des résultats concrets et mesurables"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Formation 'IA & Communication'",
                desc: "5 modules — 100 % de satisfaction.",
              },
              {
                title: "Atelier 'Leadership créatif'",
                desc: "3 jours — +40 % de confiance mesurée post-session.",
              },
              {
                title: "Parcours 'Digital Expert PME'",
                desc: "4 semaines — +200 % d'efficacité marketing observée.",
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

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Former, c'est donner les moyens de s'adapter et d'innover. »
          </p>
        </div>
      </ThemeSection>

      {/* Valeurs pédagogiques */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos valeurs pédagogiques"
            title="Les principes qui guident notre approche"
            align="center"
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Simplicité", desc: "Des contenus clairs, des exemples concrets." },
              { title: "Créativité", desc: "Des exercices vivants, inspirants et collaboratifs." },
              { title: "Proximité", desc: "Des formateurs disponibles et humains." },
              { title: "Exigence", desc: "Une qualité constante, quel que soit le niveau." },
              { title: "Souveraineté", desc: "Aucune donnée exploitée, toutes protégées." },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Vision de la formation */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « Apprendre à maîtriser la technologie, c'est retrouver la liberté d'innover. »
          </blockquote>
          <p className="mt-8 text-zinc-300 max-w-2xl mx-auto">
            Nous voulons que chaque participant reparte autonome, inspiré et capable d'agir. Nos formations ne se limitent pas à transmettre un savoir : elles construisent une culture numérique et humaine. Elles donnent le pouvoir de créer, diriger et comprendre dans un monde en transformation.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Former, accompagner, faire grandir.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Un formateur face à un groupe, projection d'un écran IA en arrière-plan, lumière chaleureuse.
            </p>
          </div>

          {/* Grille des 4 domaines */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "📈", title: "Stratégie & Marketing" },
              { icon: "🎬", title: "Audiovisuel & Événementiel" },
              { icon: "🤖", title: "Intelligence Artificielle" },
              { icon: "💡", title: "Créativité & Leadership" },
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
            Prêt à développer vos talents ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos programmes de formation et demandez un audit compétences pour identifier vos besoins en formation IA et digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/programmes-formation">Découvrir nos programmes de formation</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/audit-competences">Demander un audit compétences & IA</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
