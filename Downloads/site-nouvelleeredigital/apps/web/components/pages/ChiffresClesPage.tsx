import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ChiffresClesPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Chiffres Clés</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Notre performance<br />en quelques repères.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Chaque chiffre que nous présentons n'est pas un indicateur de vanité, mais une mesure d'engagement, de constance et de confiance.
            </p>
            <p>
              Nos résultats traduisent une exigence : celle de l'impact réel, au service de nos clients, de nos équipes et de la créativité.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « La performance n'est pas une finalité, c'est une culture. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Indicateurs principaux */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos indicateurs principaux"
            title="Des chiffres qui racontent notre histoire"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            {[
              {
                number: "+15",
                label: "ans d'expérience",
                desc: "Communication, digital, audiovisuel et événementiel. Expertise et vision long terme.",
              },
              {
                number: "+300",
                label: "projets livrés",
                desc: "Entreprises, institutions et marques. Réussite mesurable et diversité sectorielle.",
              },
              {
                number: "6",
                label: "pôles intégrés",
                desc: "Du conseil à la production. Cohérence et maîtrise globale.",
              },
              {
                number: "+60",
                label: "clients actifs",
                desc: "Accompagnements B2B, B2C, public et privé. Fidélité et confiance durable.",
              },
              {
                number: "96%",
                label: "de satisfaction",
                desc: "Moyenne sur 3 ans. Transparence et écoute client.",
              },
              {
                number: "100%",
                label: "souveraineté des données",
                desc: "Hébergement européen conforme RGPD & AI Act. Sécurité et éthique numérique.",
              },
              {
                number: "20",
                label: "experts internes",
                desc: "Créatifs, ingénieurs, techniciens et formateurs. Synergie humaine et pluridisciplinarité.",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.number}</div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.label}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Chaque donnée raconte une histoire de collaboration et de confiance. »
          </p>
        </div>
      </ThemeSection>

      {/* Repères de croissance */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos repères de croissance"
            title="Une évolution constante et maîtrisée"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "+42%",
                label: "progression annuelle",
                desc: "Sur les projets IA & automation.",
                icon: "📈",
              },
              {
                number: "+70%",
                label: "demande audiovisuelle",
                desc: "Hybride depuis 2022.",
                icon: "🎥",
              },
              {
                number: "+55%",
                label: "projets inter-pôles",
                desc: "Stratégie, digital, événementiel, formation.",
                icon: "🧩",
              },
              {
                number: "1",
                label: "innovation IA",
                desc: "Chaque trimestre (copilotes, outils, modules).",
                icon: "💡",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.number}</div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.label}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Notre croissance repose sur la cohérence, pas la course. »
          </p>
        </div>
      </ThemeSection>

      {/* Points d'impact */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos points d'impact"
            title="L'efficacité prouvée de notre approche"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {[
              {
                title: "Communication & marketing digital",
                desc: "+300 % de reach moyen sur campagnes clients.",
              },
              {
                title: "Audiovisuel & événementiel",
                desc: "98 % de taux de satisfaction spectateur post-événement.",
              },
              {
                title: "Formation & IA",
                desc: "92 % de taux d'adoption des outils IA après formation.",
              },
              {
                title: "Design & identité visuelle",
                desc: "100 % des refontes déployées cross-supports.",
              },
              {
                title: "Développement web & numérique",
                desc: "0 incident de sécurité majeur depuis 2018.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Ce que révèlent nos chiffres */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Ce que révèlent nos chiffres"
            title="Une approche globale et responsable"
            align="center"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[
              "Une structure stable et agile, capable d'évoluer avec les besoins des marques.",
              "Des équipes intégrées, réduisant les coûts de coordination et les frictions.",
              "Une mesure d'impact IA systématique sur chaque projet.",
              "Une politique RSE et souveraine, auditable et transparente.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start card">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Mesurer, c'est comprendre. Comprendre, c'est progresser. »
          </p>
        </div>
      </ThemeSection>

      {/* Philosophie de la donnée */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « La donnée éclaire, l'humain décide. »
          </blockquote>
          <p className="mt-8 text-zinc-300 max-w-2xl mx-auto">
            Nous considérons la donnée comme un outil de dialogue et d'amélioration, pas comme une fin en soi. Elle nous aide à prendre de meilleures décisions, à documenter nos progrès, et à faire évoluer notre vision sans jamais trahir nos valeurs.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Notre croissance repose sur la confiance.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Un design infographique clair et élégant : icônes dorées sur fond bleu nuit, chiffres animés ou interactifs, repères visuels (années, projets, satisfaction, IA).
            </p>
          </div>

          {/* Grille des indicateurs clés */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "📊", title: "+15 ans", desc: "Expérience" },
              { icon: "🚀", title: "+300 projets", desc: "Livrés" },
              { icon: "⭐", title: "96%", desc: "Satisfaction" },
              { icon: "🤖", title: "100%", desc: "Souveraineté" },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Croissance Responsable</span>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Découvrez l'impact derrière les chiffres
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Explorez nos réalisations en chiffres et téléchargez notre dossier d'impact PDF pour comprendre comment notre approche transforme les projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/realisations-chiffres">Voir nos réalisations en chiffres</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/dossier-impact">Télécharger notre dossier d&apos;impact PDF</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
