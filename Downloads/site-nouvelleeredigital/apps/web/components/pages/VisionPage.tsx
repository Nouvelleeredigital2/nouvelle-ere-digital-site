import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function VisionPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Vision & Philosophie</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            VISION &<br />PHILOSOPHIE
          </h1>
          <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Replacer le sens et l'humain au cœur de la transformation numérique.
          </p>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Le monde numérique évolue à une vitesse vertigineuse. Technologies, usages, attentes : tout change.
            </p>
            <p>
              Mais au milieu de cette accélération, une conviction demeure : <strong className="text-zinc-900 dark:text-zinc-100">la technologie n&apos;a de valeur que si elle sert la créativité, la performance et la relation humaine.</strong>
            </p>
            <p>
              C'est dans cet esprit que Nouvelle Ère Digital est née : une agence qui unit la puissance de l'innovation à la sensibilité du design, à la rigueur du conseil et à l'émotion de l'audiovisuel.
            </p>
            <blockquote className="border-l-4 border-brand pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Simplifier, innover et valoriser l'humain dans chaque projet numérique. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Notre vision */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre vision" 
            title="Une nouvelle génération d'agences"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous incarnons une nouvelle génération d'agences : <strong className="text-zinc-900 dark:text-zinc-100">transversales, responsables, créatives et augmentées par l&apos;intelligence artificielle.</strong>
            </p>
            <p>
              Notre ambition est simple : transformer les idées en expériences de marque engageantes, mesurables et durables.
            </p>
            <div className="pt-6">
              <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">Nous croyons qu&apos;un projet réussi est celui qui :</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                  </div>
                  <p className="text-sm">Rapproche les publics au lieu de les disperser</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                  </div>
                  <p className="text-sm">Éclaire au lieu de complexifier</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                  </div>
                  <p className="text-sm">Inspire autant qu&apos;il performe</p>
                </div>
              </div>
            </div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl pt-8">
              De l'idée à l'impact : créer des expériences qui inspirent, engagent et transforment.
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Notre philosophie - 3 piliers */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            eyebrow="Notre philosophie" 
            title="Trois piliers qui nous guident"
            align="center"
          />
          <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-16">
            De la stratégie à la production, chaque décision s'appuie sur ces fondations.
          </p>
          
          <div className="space-y-12">
            {/* Pilier 1 - Simplifier */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Simplifier</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Rendre la technologie accessible, lisible et utile. Nous concevons des dispositifs où la technique s'efface derrière l'expérience utilisateur.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Notre approche : clarté, fluidité et pédagogie — pour que l'innovation soit un levier, pas un labyrinthe.
                  </p>
                  <blockquote className="mt-4 pl-4 border-l-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Simplifier, c'est traduire la complexité en impact mesurable. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Pilier 2 - Innover */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Innover</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Explorer de nouvelles formes d'expression et d'interaction. Chaque projet est un laboratoire d'idées, nourri par la veille technologique, la créativité collective et la recherche de sens.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Nous expérimentons les nouveaux usages de l'IA, du digital et de la data pour créer de la valeur réelle, pas des effets de mode.
                  </p>
                  <blockquote className="mt-4 pl-4 border-l-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'innovation n'est pas un gadget : c'est la capacité à imaginer mieux, ensemble. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Pilier 3 - Valoriser l'humain */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Valoriser l&apos;humain</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Chaque projet commence par une écoute et se construit dans la confiance. Nous mettons la technologie au service des talents, des émotions et des histoires qui rapprochent.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Car derrière chaque écran, il y a des regards, des voix, des équipes — et c'est là que se trouve notre véritable moteur.
                  </p>
                  <blockquote className="mt-4 pl-4 border-l-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'IA doit augmenter l'humain, pas le remplacer. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre rôle */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre rôle" 
            title="Le partenaire unique de votre transformation"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Être le partenaire unique capable de relier la stratégie, la créativité et la technologie pour bâtir des expériences de communication qui ont du sens.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "La rigueur du conseil",
                "La force du design",
                "La puissance de la data",
                "La magie du storytelling audiovisuel",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center justify-center">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl pt-6">
              En un mot : la cohérence.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Nous sommes artisans d'émotions et d'expériences numériques. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Notre vision de l'IA */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre vision de l'IA" 
            title="Une force d'amplification créative"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p className="text-center">
              Chez Nouvelle Ère Digital, l'intelligence artificielle est une force d'amplification créative et opérationnelle.
            </p>
            <p className="text-center">
              Nous l'intégrons là où elle simplifie, automatise ou enrichit — jamais là où elle déshumanise.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Accélérer", desc: "La production sans sacrifier la qualité" },
                { title: "Analyser", desc: "L'impact pour ajuster les actions" },
                { title: "Personnaliser", desc: "Les expériences sans perdre la sincérité" },
              ].map((item, i) => (
                <div key={i} className="card text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-center pt-6">
              Une IA souveraine, utile et responsable.
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Engagement éthique */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre engagement éthique" 
            title="Transparence et souveraineté numérique"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Notre démarche s'appuie sur la transparence, la pédagogie et la souveraineté numérique.
            </p>
            <p>
              Chaque solution respecte le <strong className="text-zinc-900 dark:text-zinc-100">RGPD, l&apos;AI Act</strong> et les normes de sécurité les plus exigeantes.
            </p>
            <p>
              Nos infrastructures sont hébergées en Europe, nos données maîtrisées, nos processus documentés.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Innover, oui — mais toujours de manière responsable. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Citation manifeste */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
            « Nous croyons qu'un projet numérique n'a de sens que s'il éclaire, relie et valorise les personnes qui le portent. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="dark" className="py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Découvrez notre approche
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Explorez nos missions, nos promesses et nos expertises intégrées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/mission">Découvrir notre mission</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/expertises">Explorer nos expertises</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
