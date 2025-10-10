import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function EvenementielPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Événementiel & Technologie Scénique</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Transformer la technique<br />en émotion, la scène<br />en expérience.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Sous la marque <strong className="text-zinc-900 dark:text-zinc-100">Nouvelle Ère Event</strong>, nous faisons converger ingénierie, créativité et innovation numérique pour bâtir des événements immersifs, spectaculaires et mesurables.
            </p>
            <p>
              Chaque faisceau lumineux, chaque son, chaque image devient un vecteur d'émotion et de sens.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « De la scène à l'écran : captez, engagez, mesurez. »
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
            title="Créer des expériences scéniques mémorables"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Créer des expériences scéniques où la technologie sublime le message, et où chaque détail – lumière, son, vidéo, IA – parle le langage de la marque.
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Nous allions excellence technique, design immersif et intelligence digitale pour transformer vos événements en moments vivants et data-driven.
            </p>
          </div>
        </div>
      </ThemeSection>

      {/* Piliers d'excellence */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos piliers d'excellence"
            title="Quatre fondations solides"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                title: "Excellence technique",
                desc: "Matériel haut de gamme, équipes certifiées, processus qualité rigoureux.",
              },
              {
                title: "Innovation",
                desc: "IA intégrée, automatisation, synchronisation lumière/son/vidéo.",
              },
              {
                title: "Éco-responsabilité",
                desc: "LED basse consommation, gestion énergétique optimisée, transport mutualisé.",
              },
              {
                title: "Accompagnement humain",
                desc: "Écoute, pédagogie, sécurité, réactivité.",
              },
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

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Chaque événement est un terrain d'expression et de précision. »
          </p>
        </div>
      </ThemeSection>

      {/* Domaines d'expertise technique */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos domaines d'expertise technique"
            title="Six spécialités complémentaires"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Sonorisation professionnelle */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Sonorisation professionnelle</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Systèmes Line Array (L-Acoustics, d&b Audiotechnik, Adamson). Régies numériques Yamaha CL / Midas M32 / Allen & Heath dLive. Micro HF, oreillettes, pupitres et liaisons sans fil sécurisées. Études acoustiques, calibration multi-zones, diffusion spatialisée. Intégration dans des régies broadcast ou streaming.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Un son pur, équilibré et puissant, quel que soit le lieu. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Éclairage & scénographie */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Éclairage & scénographie</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Projecteurs LED à haut rendement, spots, beam, Fresnel, découpe. Design lumière 2D/3D, shows timecodés et simulation d'ambiance. Éclairages architecturaux et branding lumineux. Synchronisation lumière/son/vidéo en temps réel (DMX / Art-Net / W-DMX). Logiciels : grandMA3, Chamsys MQ500, Avolites.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « La lumière sculpte l'espace. Elle raconte avant qu'on ne parle. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Structures, ponts & scènes */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Structures, ponts & scènes</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Structures aluminium certifiées Litec / Prolyte / ASD. Ponts motorisés CM Lodestar / Liftket, conformité ERP & CTS. Scènes modulaires StageDex, estrades, catwalks et scènes tournantes. Solutions extérieures : toitures, barnums techniques, abris scéniques. Accessibilité PMR, sécurité incendie et conformité totale.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Chaque installation repose sur la stabilité, la sécurité et la beauté du geste. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Murs LED, vidéo & affichage */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Murs LED, vidéo & affichage</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Dalles LED haute définition (pitch 2.6 à 3.9 mm, indoor/outdoor). Écrans incurvés, totems verticaux, surfaces modulaires et mapping 3D. Régies vidéo : Analog Way, Barco E2, NovaStar, Resolume Arena. Diffusion multi-cam et scénographie dynamique. Signal SDI / HDMI / NDI, distribution fibre optique et backups redondants.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Des images qui captivent, un rendu saisissant et émotionnellement fort. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Captation, streaming & post-production */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Captation, streaming & post-production</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Multi-caméras 4K / PTZ motorisées / drones. Régies Blackmagic ATEM et diffusion simultanée multi-plateforme. Overlays personnalisés, titres, incrustations et motion design live. Aftermovies, interviews, teasers, reels et capsules réseaux sociaux. Intégration directe avec le pôle audiovisuel et les équipes digitales.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Amplifier la portée de l'événement, prolonger son impact digital. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 6. Animations & interactivité IA */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Animations & interactivité IA</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Selfie Box IA : borne photo intelligente, filtres automatiques, collecte de leads. Photobooth 360° : vidéos slow motion et partage instantané. Miroir digital & réalité augmentée : expériences immersives. Jeux & quiz IA connectés au CRM : data qualifiée en temps réel. Mapping interactif & diffusion en direct des créations visiteurs.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Quand le public devient acteur, l'émotion devient mesurable. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Méthodologie */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre méthodologie"
            title="5 étapes pour une exécution parfaite"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Brief & conception", desc: "Analyse des besoins, repérage technique, budget et storyboard." },
              { num: "2", title: "Pré-production", desc: "Validation sécurité, électricité, accrochage, logistique, plan 3D." },
              { num: "3", title: "Installation & exploitation", desc: "Montage sécurisé, coordination équipes, répétitions, supervision live." },
              { num: "4", title: "Diffusion & mesure", desc: "Collecte de data, streaming, reporting et indicateurs d'engagement." },
              { num: "5", title: "Post-événement", desc: "Débrief technique, restitution visuelle, plan d'amélioration continue." },
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
            « Du brief à la scène, tout est calibré pour l'excellence. »
          </p>
        </div>
      </ThemeSection>

      {/* Packs signatures */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos packs signatures"
            title="Des solutions adaptées à vos besoins"
            align="center"
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "Conference Pro",
                contenu: "Sonorisation + Scène + Éclairage fixe",
                ideal: "Séminaires, conférences",
              },
              {
                title: "Live Show",
                contenu: "Mur LED + Pont motorisé + Lumière dynamique",
                ideal: "Concerts, festivals",
              },
              {
                title: "Corporate 360",
                contenu: "Captation + Diffusion live + Branding digital",
                ideal: "Événements hybrides",
              },
              {
                title: "Impact Stage",
                contenu: "Scénographie + IA + Streaming + Animation",
                ideal: "Lancements produits",
              },
              {
                title: "Event Base",
                contenu: "Son + Lumière + Structure modulaire",
                ideal: "Événements itinérants",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-all hover:scale-105">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{item.contenu}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">{item.ideal}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « De la scène à l'écran, nous orchestrons votre impact. »
          </p>
        </div>
      </ThemeSection>

      {/* Engagements */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « La technologie responsable, c'est celle qui éclaire sans éblouir. »
          </blockquote>
          <div className="mt-8 space-y-4 text-zinc-300">
            <p>✓ Respect strict des normes CTS, ERP, électriques et sécurité incendie</p>
            <p>✓ Réduction de l'empreinte carbone : matériel LED, mutualisation des transports</p>
            <p>✓ Équipe interne formée en continu, innovation et planification numérique</p>
            <p>✓ Hébergements de données souverains et sécurisés pour les activations IA</p>
          </div>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              L'art de la technologie scénique.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Un plan large de scène : mur LED monumental, faisceau de lumière, public captivé.
            </p>
          </div>

          {/* Grille des 6 domaines */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "🔊", title: "Sonorisation" },
              { icon: "💡", title: "Éclairage" },
              { icon: "🏗️", title: "Structures" },
              { icon: "📺", title: "Murs LED" },
              { icon: "📹", title: "Captation" },
              { icon: "🤖", title: "IA Interactive" },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-xl transition-all hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
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
            Prêt à créer l'événement ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos packs signatures et explorez nos solutions IA interactives pour des expériences scéniques inoubliables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/packs-signatures">Découvrir nos packs signatures</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/solutions-ia-interactives">Explorer nos solutions IA interactives</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
