import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ConclusionPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Conclusion & Remerciements</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Nouvelle Ère Digital,<br />c&apos;est la rencontre<br />de la créativité,<br />de la technologie<br />et de l'humain.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Merci d'avoir pris le temps de découvrir notre univers.
            </p>
            <p>
              Chaque page, chaque image, chaque mot de ce site est une invitation : celle d'explorer une nouvelle manière de penser, créer et mesurer la communication.
            </p>
            <p>
              Une ère où la technologie amplifie, mais où l'humain reste le cœur du projet.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Nous créons des expériences qui inspirent, engagent et transforment. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre conviction */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre conviction"
            title="L'innovation comme chemin, pas comme course"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              L'innovation n'est pas une course, c'est un chemin.
            </p>
            <p>
              Nous croyons qu'il est possible de bâtir un futur digital plus clair, plus éthique, plus émotionnel.
            </p>
            <p>
              C'est ce que nous faisons chaque jour : relier les idées aux émotions, les outils aux talents, les marques aux publics.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Simplifier. Innover. Valoriser l'humain. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Message du fondateur */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Message du fondateur"
            title="Les origines de notre vision"
            align="center"
          />

          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed text-center">
              « Nouvelle Ère Digital est née d'une idée simple : replacer le sens au centre de la technologie.<br /><br />
              Nous avons voulu prouver qu'il est possible d'être à la fois créatif et rigoureux, technologique et humain.<br /><br />
              Aujourd'hui, nous avançons avec celles et ceux qui partagent cette conviction : que la vraie modernité, c'est la cohérence. »
            </blockquote>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">— La direction Nouvelle Ère Digital</p>
          </div>
        </div>
      </ThemeSection>

      {/* Engagement pour demain */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre engagement pour demain"
            title="Vers un modèle d'agence responsable"
            align="center"
          />

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Nous continuerons à imaginer des solutions qui respectent la planète, les utilisateurs et la vérité des marques.
            </p>
            <p>
              Notre promesse reste la même : offrir un impact mesurable, durable et émotionnel.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Innover sans renier le sens, progresser sans perdre l'humain. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Remerciements */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Remerciements"
            title="Une œuvre collective"
            align="center"
          />

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Merci à toutes celles et ceux qui participent à cette aventure :
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              nos clients, nos partenaires, nos équipes, nos formateurs, nos collaborateurs et nos amis.
            </p>
            <p>
              Chaque réussite est une œuvre collective.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « Nous avançons ensemble, dans une même direction : vers une communication plus claire, plus juste et plus belle. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Merci.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Un fond bleu nuit profond traversé d'une lumière dorée — symbole de la transition vers une « nouvelle ère ». De l'idée à l'impact.
            </p>
          </div>

          {/* Design symbolique */}
          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-64 h-32 mx-auto rounded-xl" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <div className="text-3xl mb-2">✨</div>
                    <h3 className="text-xl font-bold">Merci</h3>
                    <p className="text-sm opacity-90">De l&apos;idée à l&apos;impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))' }}>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Nouvelle Ère</span>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#7C3AED' }}></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA de clôture */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Merci pour votre intérêt
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Revenez à l'accueil, téléchargez notre plaquette complète ou découvrez notre application IA pour continuer l'exploration de notre univers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" asChild>
              <a href="/">Revenir à l&apos;accueil</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/plaquette-complete">Télécharger la plaquette PDF complète</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <Button size="md" variant="ghost" asChild>
              <a href="/journey-composer">Découvrir notre application IA — Journey Composer</a>
            </Button>
          </div>
        </div>
      </ThemeSection>

      {/* Footer final */}
      <ThemeSection variant="dark" className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">© 2025 Nouvelle Ère Digital</h3>
              <p className="text-zinc-400">Tous droits réservés.</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Informations légales</h3>
              <div className="space-y-2 text-zinc-400">
                <p><a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a></p>
                <p><a href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a></p>
                <p><a href="/charte-rse-ia" className="hover:text-white transition-colors">Charte RSE & IA éthique</a></p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Engagements techniques</h3>
              <div className="space-y-2 text-zinc-400">
                <p>🌐 Hébergement souverain européen</p>
                <p>🧠 IA responsable certifiée</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-8">
            <p className="text-zinc-500">
              Conçu avec ❤️ par Nouvelle Ère Digital — Innovation responsable depuis 2010
            </p>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
