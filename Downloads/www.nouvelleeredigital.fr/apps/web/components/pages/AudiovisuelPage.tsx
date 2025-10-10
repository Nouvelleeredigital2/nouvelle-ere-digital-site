import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function AudiovisuelPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Audiovisuel & Création Multimédia</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Donner vie à l'image,<br />amplifier les émotions.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              L'image est le langage le plus universel.
            </p>
            <p>
              Chez Nouvelle Ère Digital, nous la mettons au service du sens, de la stratégie et de l'émotion.
            </p>
            <p>
              Notre pôle Audiovisuel & Création Multimédia conçoit et produit des contenus visuels à fort impact, pensés pour capter, engager et prolonger l'expérience de marque — sur scène, à l'écran et sur le web.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Nous ne filmons pas des images. Nous racontons des histoires qui engagent. »
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
            title="Faire de l'audiovisuel un levier de communication"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Faire de l'audiovisuel un levier de communication, de performance et de mémorisation.
            </p>
            <p>
              Chaque projet est abordé comme un récit : un scénario clair, une émotion à transmettre, une trace à laisser.
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Nous combinons la précision technique, la rigueur du storytelling et la maîtrise des nouveaux formats numériques.
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Expertises principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos expertises principales"
            title="Cinq domaines d'excellence"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Captation & régie live */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Captation & régie live</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Captation multicaméras (4K / 8K / drones). Régies live professionnelles : Blackmagic, ATEM, Barco, NovaStar. Diffusion multi-plateformes : YouTube, LinkedIn, Teams, Twitch, Zoom. Streaming hybride : simultané site / live / social. Supervision IA : suivi automatique, cadrage intelligent, synchronisation audio-vidéo.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Du terrain au réseau, chaque pixel compte. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Production & post-production */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Production & post-production</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Montage, étalonnage, colorimétrie, mixage sonore. Génériques, habillages, sous-titres et motion design. Création sonore, musiques originales, sound design immersif. Adaptation multi-formats : corporate, réseaux sociaux, documentaire, publicité. Livraison rapide (48–72 h) pour diffusion optimisée.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Chaque image a une mission : informer, émouvoir ou inspirer. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Création de films & contenus premium */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Création de films & contenus premium</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Films corporate et institutionnels. Reportages, interviews, teasers et aftermovies. Capsules thématiques pour réseaux sociaux. Vidéos événementielles hybrides : plateau, mur LED, scène IA. Animation et motion design 2D/3D pour enrichir la narration.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Le fond et la forme doivent frapper juste, ensemble. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Studio photo & contenus visuels */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Studio photo & contenus visuels</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Portraits corporate et équipes dirigeantes. Shooting produits, packshots, reportages terrain. Intégration photo + vidéo pour storytelling global. Photogrammétrie, VR 360°, mini-sets modulaires.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Une image juste vaut mille mots, mais bien placée, elle en vaut mille clics. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Audiovisuel augmenté & IA */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Audiovisuel augmenté & IA</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Caméras IA (tracking automatique, cadrage intelligent). Tri et retouche automatiques via apprentissage supervisé. Génération de clips et déclinaisons formatées pour chaque plateforme. Copilote IA pour la post-production assistée et le titrage intelligent. Analyse automatique du rythme et de l'engagement visuel.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « L'IA ne remplace pas le regard, elle l'amplifie. »
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
            title="5 étapes pour un récit visuel réussi"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Brief & storytelling", desc: "Comprendre le message, définir l'émotion à transmettre." },
              { num: "2", title: "Pré-production", desc: "Repérage, écriture, storyboard et plan technique." },
              { num: "3", title: "Production & tournage", desc: "Captation fluide, encadrée par des techniciens certifiés." },
              { num: "4", title: "Post-production & diffusion", desc: "Montage, colorimétrie, motion, sous-titres." },
              { num: "5", title: "Mesure d'impact", desc: "Reporting, engagement, diffusion optimisée IA." },
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
            « Un récit visuel réussi est un projet où la technique s'efface derrière l'émotion. »
          </p>
        </div>
      </ThemeSection>

      {/* Équipements et technologies */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos équipements et technologies"
            title="La précision technique au service de la créativité"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { category: "Caméras", items: "Sony FX / Blackmagic URSA / Canon C70 / PTZ motorisées." },
              { category: "Régies vidéo", items: "ATEM Mini Extreme, Barco E2, NovaStar VX6." },
              { category: "Sonorisation", items: "Shure, L-Acoustics, Yamaha CL." },
              { category: "Éclairage", items: "Projecteurs LED, Fresnel, beam, RGB programmable." },
              { category: "Post-prod", items: "DaVinci Resolve, Adobe Premiere, After Effects, Audition." },
              { category: "Intégrations IA", items: "Suivi automatique, stabilisation, repérage visuel, auto-captioning." },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.category}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.items}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Atouts différenciateurs */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos atouts différenciateurs"
            title="Ce qui fait notre différence"
            align="center"
          />

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#7C3AED' }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Atout clé</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ce que cela vous apporte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  { atout: "Expertise technique", apporte: "Qualité d'image et fiabilité en toute condition." },
                  { atout: "Culture du direct", apporte: "Réactivité, fluidité et zéro friction." },
                  { atout: "Storytelling maîtrisé", apporte: "Cohérence entre forme et message." },
                  { atout: "Production IA-assistée", apporte: "Rapidité, constance et mesure d'impact." },
                  { atout: "Contenus modulaires", apporte: "Réutilisables sur tous les canaux." },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">{row.atout}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.apporte}</td>
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
            title="Nos projets en action"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Conference Pro",
                desc: "Captation live + régie multicam + habillage graphique, diffusion YouTube & LinkedIn.",
              },
              {
                title: "Corporate 360",
                desc: "Film institutionnel + motion design + capsules sociales, KPI +220 % de portée.",
              },
              {
                title: "Aftermovie Impact Stage",
                desc: "Show IA + captation LED + son spatial, 50K vues organiques.",
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
            « Chaque projet est une expérience mesurable, pas un simple tournage. »
          </p>
        </div>
      </ThemeSection>

      {/* Philosophie visuelle */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « L'art de la technologie scénique, au service de l'émotion. »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              De la scène à l'écran : captez, engagez, mesurez.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Nous considérons la lumière, le son et le mouvement comme des langages émotionnels. Chaque projet raconte une histoire unique.
            </p>
          </div>

          {/* Grille d'équipements */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🎥", title: "Captation" },
              { icon: "🎬", title: "Production" },
              { icon: "🎨", title: "Post-prod" },
              { icon: "📸", title: "Studio" },
              { icon: "🤖", title: "IA" },
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
            Prêt à donner vie à votre vision ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos réalisations audiovisuelles et explorez l'univers Nouvelle Ère Event pour vos prochains projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/realisations-audiovisuelles">Découvrir nos réalisations audiovisuelles</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/nouvelle-ere-event">Explorer l'univers Nouvelle Ère Event</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
