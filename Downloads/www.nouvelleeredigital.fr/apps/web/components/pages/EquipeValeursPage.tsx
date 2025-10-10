import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function EquipeValeursPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">L'Équipe & Les Valeurs</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Une équipe humaine,<br />créative et exigeante.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Chez Nouvelle Ère Digital, l'excellence n'est pas un hasard, c'est une discipline.
            </p>
            <p>
              Notre agence réunit des créatifs, ingénieurs, réalisateurs, designers, développeurs et formateurs animés par une conviction commune : allier la puissance de la technologie à la beauté de l'humain.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Nous sommes artisans d'émotions et d'expériences numériques. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre culture */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre culture"
            title="La force du collectif et des talents pluriels"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous croyons en la force du collectif et en la richesse des talents pluriels.
            </p>
            <p>
              Chaque projet est une aventure humaine, où la rigueur technique s'accorde à la sensibilité artistique.
            </p>
            <p>
              Notre équipe partage une même philosophie : créer des expériences cohérentes, mesurables et inspirantes.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Chez nous, la créativité s'organise, la technologie s'humanise. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Pôles et expertises */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos pôles et expertises"
            title="Une équipe pluridisciplinaire organisée"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              {
                title: "Direction & Stratégie",
                desc: "Vision globale, pilotage client, coordination inter-pôles.",
                profiles: "Directeurs de projet, stratèges, consultants.",
              },
              {
                title: "Création & Design",
                desc: "Direction artistique, graphisme, UX/UI, identité de marque.",
                profiles: "Directeurs artistiques, graphistes, webdesigners.",
              },
              {
                title: "Audiovisuel & Technique",
                desc: "Captation, régie live, streaming, scénographie.",
                profiles: "Réalisateurs, ingénieurs son/lumière, techniciens vidéo.",
              },
              {
                title: "Développement & IA",
                desc: "Web, mobile, automatisation, copilotes intelligents.",
                profiles: "Développeurs full stack, data engineers, IA designers.",
              },
              {
                title: "Communication & Marketing",
                desc: "Stratégie de diffusion, storytelling, performance.",
                profiles: "Community managers, copywriters, media planners.",
              },
              {
                title: "Formation & Pédagogie",
                desc: "Transmission et accompagnement au changement.",
                profiles: "Formateurs certifiés, coachs, ingénieurs pédagogiques.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">{item.desc}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">{item.profiles}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Une équipe pluridisciplinaire, un langage commun : l'exigence. »
          </p>
        </div>
      </ThemeSection>

      {/* Modèle de travail */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre modèle de travail"
            title="Une structure fluide et connectée"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous fonctionnons comme une structure fluide et connectée, où chaque pôle interagit avec les autres via un système de projets transversaux.
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Collaboration en temps réel (Notion, ClickUp, Miro, IA interne). Réunions de co-création et validations partagées. Culture du feedback et de la documentation ouverte. Intégration IA dans les process internes (planification, veille, QA).
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Notre intelligence collective est augmentée, pas automatisée. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Valeurs fondamentales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos valeurs fondamentales"
            title="Six principes qui guident nos actions"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              {
                title: "Simplicité",
                desc: "Rendre la technologie lisible, fluide et accessible. Chaque projet doit être clair pour le client comme pour l'utilisateur final.",
                icon: "🔹",
              },
              {
                title: "Créativité",
                desc: "Transformer les idées en expériences qui marquent les esprits. Nous faisons du design, du son, de la lumière et du code des matières vivantes.",
                icon: "🔹",
              },
              {
                title: "Transparence",
                desc: "Cultiver la confiance à travers la clarté : des process ouverts, des tarifs justes, des rapports mesurables.",
                icon: "🔹",
              },
              {
                title: "Souveraineté numérique",
                desc: "Protéger les données et garantir la maîtrise des outils. Nos infrastructures sont hébergées en Europe, nos IA sont explicables et nos solutions, auditées.",
                icon: "🔹",
              },
              {
                title: "Excellence",
                desc: "Rechercher la précision et la cohérence à chaque étape. Du brief au rendu, rien n'est laissé au hasard.",
                icon: "🔹",
              },
              {
                title: "Accompagnement humain",
                desc: "Placer la relation avant la transaction. Nous écoutons, formons, expliquons et co-construisons chaque réussite.",
                icon: "🔹",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « La transparence n'est pas une option, c'est une promesse. »
          </p>
        </div>
      </ThemeSection>

      {/* État d'esprit */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre état d'esprit"
            title="Une culture collaborative et responsable"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Esprit de collaboration : l'écoute avant l'égo.",
              "Culture du partage : documentation et transparence interne.",
              "Curiosité constante : veille, expérimentation et innovation continue.",
              "Responsabilité : éthique, inclusion et impact durable.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous travaillons avec passion, précision et humilité. »
          </p>
        </div>
      </ThemeSection>

      {/* Témoignages internes */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Témoignages internes"
            title="La voix de notre équipe"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Ici, chacun a une voix, et chaque idée peut devenir un projet.",
                author: "Sophie, directrice artistique",
              },
              {
                quote: "Nous sommes une équipe hybride : humaine, créative et augmentée.",
                author: "Lucas, développeur IA",
              },
              {
                quote: "Ce que j'aime le plus, c'est la cohérence entre nos valeurs et nos actions.",
                author: "Léa, chef de projet digital",
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

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Une équipe humaine pour des projets technologiques.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Photo d'équipe captée sur un plateau ou en réunion de co-création. Fond lumineux bleu nuit, accents dorés.
            </p>
          </div>

          {/* Grille des 6 pôles */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "🎯", title: "Stratégie" },
              { icon: "🎨", title: "Création" },
              { icon: "🎬", title: "Audiovisuel" },
              { icon: "💻", title: "Développement" },
              { icon: "📢", title: "Communication" },
              { icon: "🎓", title: "Formation" },
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
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Équipe Pluridisciplinaire</span>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Découvrez qui nous sommes
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Explorez l'agence et nos pôles d'expertise, ou rejoignez notre équipe pour participer à l'aventure Nouvelle Ère Digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/agence-poles">Découvrir l'agence & nos pôles</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/rejoindre-equipe">Rejoindre l'équipe Nouvelle Ère Digital</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
