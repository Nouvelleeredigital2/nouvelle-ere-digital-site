import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ReferencesPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Références & Réalisations</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Des expériences concrètes,<br />des résultats mesurables.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Depuis plus de quinze ans, Nouvelle Ère Digital accompagne des entreprises, institutions, marques et créateurs dans leurs projets de communication, de digitalisation et d'innovation.
            </p>
            <p>
              Chaque réalisation est une rencontre, une histoire partagée et une preuve d'impact.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « De l'idée à l'impact, chaque projet raconte une transformation. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Philosophie projet */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre philosophie projet"
            title="La valeur réelle au-delà de l'esthétique"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous croyons que la réussite ne se mesure pas uniquement à la beauté d'un rendu, mais à la valeur réelle créée pour le public, les équipes et la marque.
            </p>
            <p>
              Nos réalisations traduisent notre vision : unir créativité, technologie et humain pour produire des expériences qui inspirent et engagent.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « L'émotion attire, la mesure confirme. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Types de projets réalisés */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Types de projets réalisés"
            title="Une expertise complète et transversale"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              {
                title: "Communication & marketing digital",
                desc: "Stratégies de visibilité, storytelling, campagnes multicanales, social media.",
              },
              {
                title: "Audiovisuel & multimédia",
                desc: "Films corporate, interviews, reportages, aftermovies, podcasts, vidéos immersives.",
              },
              {
                title: "Événementiel & technologie scénique",
                desc: "Scénographies, captations live, murs LED, dispositifs interactifs IA.",
              },
              {
                title: "Design & identité visuelle",
                desc: "Chartes graphiques, univers de marque, supports print & digitaux.",
              },
              {
                title: "Développement web & numérique",
                desc: "Sites vitrines, plateformes métiers, simulateurs, CRM.",
              },
              {
                title: "Intelligence artificielle & innovation",
                desc: "Copilotes IA, automatisations, reporting intelligent.",
              },
              {
                title: "Formation & accompagnement",
                desc: "Programmes sur mesure et acculturation IA.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous concevons, produisons et mesurons l'ensemble de vos expériences. »
          </p>
        </div>
      </ThemeSection>

      {/* Réalisations marquantes */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Quelques réalisations marquantes"
            title="Cinq projets qui illustrent notre approche"
            align="center"
          />

          <div className="space-y-12">
            {/* 1. Événement hybride "Corporate 360" */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🎥
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Événement hybride "Corporate 360"</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Captation multicam + régie live + diffusion LinkedIn & YouTube. Scénographie IA + mur LED + branding digital.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    <strong className="text-zinc-900 dark:text-zinc-100">Reporting :</strong> +220 % de portée sociale, +38 % d'engagement qualifié.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « De la scène à l'écran, un storytelling sans rupture. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Stratégie de communication - Institution publique */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    💡
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Stratégie de communication – Institution publique</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Audit global et repositionnement d'image. Création d'un plan de communication intégré : print, web, audiovisuel.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    <strong className="text-zinc-900 dark:text-zinc-100">Lancement :</strong> +1,8M impressions organiques.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Une stratégie claire, des résultats transparents. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Plateforme digitale sur mesure - PME B2B */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🌐
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Plateforme digitale sur mesure – PME B2B</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Conception d'un site e-commerce + CRM intégré. Automatisation du parcours client via copilote IA.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    <strong className="text-zinc-900 dark:text-zinc-100">KPI :</strong> -60 % de saisies manuelles / +35 % de conversion.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'efficacité commence quand les outils parlent entre eux. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Formation IA & communication pour grands comptes */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🎤
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Formation IA & communication pour grands comptes</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Ateliers sur l'IA appliquée au marketing. Formation des équipes commerciales et créatives.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    <strong className="text-zinc-900 dark:text-zinc-100">Résultats :</strong> +200 % de gain de temps sur la production de contenus, 98 % de satisfaction.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Former, c'est renforcer la performance humaine. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Identité visuelle & direction artistique */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    🎨
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Identité visuelle & direction artistique</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Refonte complète d'une marque institutionnelle. Création de logo, charte graphique et univers digital. Intégration UX/UI sur le site et cohérence sur les supports événementiels.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « La cohérence visuelle est le premier signe de crédibilité. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Secteurs d'activité couverts */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Secteurs d'activité couverts"
            title="Une expertise sectorielle diversifiée"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              {
                title: "Entreprises & grands comptes",
                desc: "Communication corporate, campagnes digitales, captations live.",
              },
              {
                title: "Institutions & collectivités",
                desc: "Stratégies de visibilité, e-administration, événements publics.",
              },
              {
                title: "Marques & studios",
                desc: "Identité de marque, publicité, contenus multimédias.",
              },
              {
                title: "Éducation & formation",
                desc: "Programmes pédagogiques, e-learning, IA éducative.",
              },
              {
                title: "Culture & patrimoine",
                desc: "Digitalisation d'expositions, films immersifs, design interactif.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Notre savoir-faire s'adapte à vos univers, sans jamais dénaturer votre ADN. »
          </p>
        </div>
      </ThemeSection>

      {/* Notre différence */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre différence"
            title="Une approche intégrée et mesurable"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Une production intégrée, sans sous-traitance dispersée.",
              "Une traçabilité complète : de la captation à la diffusion.",
              "Des indicateurs de performance IA pour chaque mission.",
              "Un accompagnement humain constant.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Nous mesurons l'émotion autant que la performance. »
          </p>
        </div>
      </ThemeSection>

      {/* Témoignages clients */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Témoignages clients"
            title="La voix de nos partenaires"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Grâce à Nouvelle Ère Digital, notre événement a doublé son impact sur les réseaux sociaux et généré des leads qualifiés.",
                author: "Direction Communication, Groupe industriel",
              },
              {
                quote: "Leur approche pédagogique de l'IA a transformé notre manière de produire du contenu.",
                author: "Responsable Innovation, secteur public",
              },
              {
                quote: "Une équipe à la fois technique et créative, rigoureuse et humaine.",
                author: "Agence partenaire B2B",
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

      {/* Chiffres clés */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Chiffres clés de nos réalisations"
            title="Des résultats qui parlent d'eux-mêmes"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "+300", label: "projets livrés", desc: "Entreprises, institutions et marques" },
              { number: "+15", label: "ans d'expérience", desc: "Communication, digital & événementiel" },
              { number: "60", label: "clients actifs", desc: "B2B, public & privé" },
              { number: "96%", label: "de satisfaction client", desc: "Moyenne sur 3 ans" },
              { number: "100%", label: "souveraineté des données", desc: "Données hébergées en Europe" },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.number}</div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.label}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Notre croissance repose sur la confiance et la constance. »
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Des preuves. Pas des promesses.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Une mosaïque dynamique : tournage, scène, table de montage, interface web et formation IA.
            </p>
          </div>

          {/* Mosaïque des réalisations */}
          <div className="grid md:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "🎥", title: "Audiovisuel" },
              { icon: "💡", title: "Stratégie" },
              { icon: "🌐", title: "Digital" },
              { icon: "🎓", title: "Formation" },
              { icon: "🎨", title: "Design" },
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
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Projets Réussis</span>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Découvrez l'impact de notre approche
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Explorez nos études de cas complètes et découvrez nos chiffres d'impact pour comprendre comment nous pouvons transformer vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/etudes-de-cas">Voir nos études de cas complètes</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/chiffres-impact">Découvrir nos chiffres d'impact</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
