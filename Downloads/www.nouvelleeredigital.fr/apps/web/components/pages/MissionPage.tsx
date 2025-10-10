import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function MissionPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Mission & Promesse</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Un partenaire unique,<br />une vision globale,<br />un impact mesurable.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Chez Nouvelle Ère Digital, notre mission est d'accompagner la transformation créative, digitale et humaine des organisations.
            </p>
            <p>
              Nous concevons des solutions qui unissent stratégie, création et technologie, pour que chaque action ait du sens, chaque expérience laisse une trace et chaque résultat soit mesurable.
            </p>
            <blockquote className="border-l-4 border-brand pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Nous ne faisons pas seulement de la communication : nous créons des expériences de marque qui durent. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Notre mission */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            eyebrow="Notre mission" 
            title="Transformer votre vision en expérience mesurable"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 mb-12">
            <p className="text-center">
              Nous aidons les entreprises, institutions et créateurs à :
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              "Repenser leur communication dans un monde saturé de messages",
              "Renforcer leur image à travers des expériences immersives et émotionnelles",
              "Intégrer l'intelligence artificielle de manière éthique, utile et souveraine",
              "Mesurer la valeur réelle de chaque projet grâce à des indicateurs précis et transparents",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold mt-1" style={{ backgroundColor: '#7C3AED' }}>
                  ✓
                </div>
                <p className="flex-1">{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 mb-8">
              Notre accompagnement repose sur trois promesses fondamentales :
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "1", text: "Simplifier la complexité numérique." },
                { num: "2", text: "Innover avec cohérence et responsabilité." },
                { num: "3", text: "Valoriser l'humain comme moteur de toute expérience." },
              ].map((item, i) => (
                <div key={i} className="card text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    {item.num}
                  </div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.text}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-12 text-center" style={{ borderColor: '#7C3AED' }}>
              « De l'idée à l'impact, nous transformons votre vision en expérience mesurable. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Notre approche */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre approche" 
            title="La cohérence avant tout"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous rassemblons des expertises souvent séparées : <strong className="text-zinc-900 dark:text-zinc-100">communication, audiovisuel, marketing, événementiel, design, web et IA.</strong>
            </p>
            <p>
              Cette transversalité est notre force.
            </p>
            <p>
              Elle nous permet de concevoir des projets fluides, sans rupture entre le terrain et le digital, avec un seul fil conducteur : votre objectif.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Un seul partenaire, une seule vision, une expérience continue. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Notre méthode - 4 étapes */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            eyebrow="Notre méthode" 
            title="Une démarche intégrée et modulaire"
            align="center"
          />
          <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-16">
            Du conseil stratégique à la production, puis à la diffusion et à la mesure.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                num: "1",
                title: "Conseil & Design d'expérience",
                desc: "Diagnostic, storytelling, plan multicanal et calendrier éditorial.",
              },
              {
                num: "2",
                title: "Production & Événement",
                desc: "Captation, régie live, animations IA et dispositifs immersifs.",
              },
              {
                num: "3",
                title: "Activation & Croissance",
                desc: "Diffusion, social media, SEO/SEA, campagnes d'amplification.",
              },
              {
                num: "4",
                title: "IA & Compétences",
                desc: "Formations, automatisations et copilotes métiers sur mesure.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                      {item.num}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 mt-12 max-w-3xl mx-auto">
            Chaque étape est autonome, mais leur combinaison crée l'effet <strong className="text-zinc-900 dark:text-zinc-100">"clé en main"</strong> : une stratégie complète, lisible et mesurable.
          </p>
        </div>
      </ThemeSection>

      {/* Notre promesse de résultat */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            eyebrow="Notre promesse de résultat" 
            title="Plus d'impact, moins de frictions"
            align="center"
          />
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#7C3AED' }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ce que vous gagnez</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ce que nous garantissons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  { gain: "Temps", garantie: "Moins d'intermédiaires, plus de clarté et de fluidité." },
                  { gain: "Qualité", garantie: "Image, son, design et narration maîtrisés de bout en bout." },
                  { gain: "Portée", garantie: "Une stratégie de diffusion pensée dès la conception." },
                  { gain: "Maîtrise", garantie: "Formation et documentation pour poursuivre en autonomie." },
                  { gain: "Mesure", garantie: "Des indicateurs concrets : vues, engagement, leads, satisfaction." },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">{row.gain}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.garantie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-12 text-center max-w-3xl mx-auto" style={{ borderColor: '#7C3AED' }}>
            « Nous prenons la responsabilité du résultat — qualité, fluidité, pertinence et performance. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Notre différence */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            eyebrow="Notre différence" 
            title="La capacité à assembler"
            align="center"
          />
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-12">
            Ce qui nous distingue, ce n'est pas une technologie isolée, mais notre capacité à assembler.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Vue d'ensemble", desc: "Nous parlons le langage des équipes événementielles, créatives et marketing." },
              { title: "Innovation pragmatique", desc: "L'IA est utilisée là où elle simplifie vraiment." },
              { title: "Pédagogie", desc: "Nous formons, documentons et transmettons." },
              { title: "Culture du terrain", desc: "Héritée de l'audiovisuel live, fiable et réactive." },
            ].map((item, i) => (
              <div key={i} className="card text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                  <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-12 text-center max-w-3xl mx-auto" style={{ borderColor: '#7C3AED' }}>
            « Audiovisuel. Digital. IA. Un seul partenaire, un seul impact. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Notre valeur ajoutée */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            eyebrow="Notre valeur ajoutée" 
            title="Ce que nous apportons"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Une approche globale du conseil à la production.",
              "Une maîtrise complète des univers techniques, créatifs et humains.",
              "Une culture de l'excellence opérationnelle et de la transparence.",
              "Des solutions modulables selon vos enjeux et votre budget.",
              "Des outils IA responsables, au service de la performance et de la souveraineté numérique.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#7C3AED' }}></div>
                <p className="flex-1 text-zinc-700 dark:text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Notre promesse client */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « Nous concevons, produisons et optimisons vos expériences de marque grâce à l'IA.<br />
            De la scène à l'écran, captez, engagez, mesurez. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Visuel héro complémentaire */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
            Un partenaire unique.<br />
            Une vision globale.<br />
            Un impact mesurable.
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
            De l'événement hybride aux expériences digitales immersives, nous créons des moments qui marquent.
          </p>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Prêt à transformer votre vision ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Explorez nos univers intégrés et composez votre parcours IA sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/expertises">Découvrir nos univers intégrés</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/ia">Composer votre parcours IA</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
