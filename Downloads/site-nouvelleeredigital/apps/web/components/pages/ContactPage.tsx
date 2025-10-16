import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ContactPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">
            Contact & QR Code
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Rencontrons-nous,
            <br />
            construisons ensemble
            <br />
            la prochaine expérience.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>Une idée, un projet, un défi à relever ?</p>
            <p>
              Nos équipes vous accompagnent de la réflexion à la réalisation, pour donner vie à vos
              ambitions numériques, audiovisuelles et événementielles.
            </p>
            <p>Nous croyons que les plus belles collaborations commencent par une conversation.</p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Chaque projet naît d'une rencontre. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Contact principal */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Contact principal"
            title="Toujours proches, toujours disponibles"
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Email</h3>
              <p className="text-zinc-600 dark:text-zinc-400">contact@nouvelleeredigital.fr</p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Site web</h3>
              <p className="text-zinc-600 dark:text-zinc-400">www.nouvelleeredigital.fr</p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Téléphone</h3>
              <p className="text-zinc-600 dark:text-zinc-400">+33 (0)X XX XX XX XX</p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🕓</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Horaires</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Lundi au vendredi — 9h à 18h</p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Agences</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Paris · Lyon · Nantes</p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Siège</h3>
              <p className="text-zinc-600 dark:text-zinc-400">[adresse complète]</p>
            </div>
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Toujours proches, toujours disponibles. »
          </p>
        </div>
      </ThemeSection>

      {/* Formulaire intelligent */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Formulaire intelligent"
            title="Un espace de contact pensé pour la fluidité"
            align="center"
          />

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>Un espace de contact pensé pour la fluidité et la pertinence :</p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Informations de contact
                </h3>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <li>• Nom / entreprise / e-mail / téléphone</li>
                  <li>
                    • Objectif du projet : Attirer · Former · Convertir · Automatiser · Émerveiller
                  </li>
                  <li>• Message : vos besoins, vos idées, vos enjeux</li>
                  <li>• Pièce jointe : possibilité d&apos;ajouter un brief ou un fichier</li>
                </ul>
              </div>

              <div className="card group hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  IA d&apos;assistance intégrée
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Propose des services complémentaires selon le message.
                </p>
              </div>
            </div>

            <blockquote
              className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl"
              style={{ borderColor: "#7C3AED" }}
            >
              « Un formulaire qui comprend vos besoins avant même de les formuler. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Actions principales */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos actions principales"
            title="Cinq objectifs pour votre succès"
            align="center"
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mb-12">
            {[
              { title: "Informer", desc: "Présenter vos solutions de façon claire et mesurable." },
              { title: "Captiver", desc: "Créer des expériences engageantes et différenciantes." },
              { title: "Former", desc: "Développer la culture numérique de vos équipes." },
              { title: "Automatiser", desc: "Gagner du temps et fiabiliser vos processus." },
              { title: "Mesurer", desc: "Optimiser vos performances en continu." },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « De l'idée à l'impact, nous avançons ensemble. »
          </p>
        </div>
      </ThemeSection>

      {/* QR Code interactif */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="QR Code interactif"
            title="L'innovation commence par un geste simple"
            align="center"
          />

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center mb-12">
            <p>
              📱 Scannez le QR code pour découvrir nos démonstrations IA, nos références vidéo et
              nos expériences immersives en ligne.
            </p>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              « L'innovation commence par un geste simple. »
            </p>
          </div>

          {/* Fonctionnalités du QR */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="card group hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Fonctionnalités du QR :
              </h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li>
                  • Accès direct à l&apos;application Journey Composer (version web interactive)
                </li>
                <li>• Vidéos de présentation de projets (événementiel, IA, audiovisuel)</li>
                <li>• Catalogue de services connectés (PDF + démonstration tactile)</li>
                <li>• Fiches IA téléchargeables (copilotes, bundles, modules)</li>
                <li>• Contact direct via messagerie ou visio intégrée</li>
              </ul>
            </div>

            <div className="card text-center group hover:shadow-lg transition-all hover:scale-105">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">QR Code</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">Scannez pour explorer</p>
              <div className="w-32 h-32 mx-auto bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs font-bold">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Réseaux sociaux */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Réseaux sociaux"
            title="Suivez notre actualité et nos coulisses"
            align="center"
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { name: "LinkedIn", icon: "🔗", desc: "Actualité professionnelle" },
              { name: "YouTube", icon: "🎥", desc: "Réalisations vidéo" },
              { name: "Instagram", icon: "📸", desc: "Coulisses créatives" },
              { name: "X (ex-Twitter)", icon: "🧠", desc: "Veille IA & tendances" },
              { name: "Vimeo", icon: "🎧", desc: "Portfolio audiovisuel" },
            ].map((item, i) => (
              <div
                key={i}
                className="card text-center group hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            « Découvrez les histoires derrière nos réalisations. »
          </p>
        </div>
      </ThemeSection>

      {/* Message final */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « Nouvelle Ère Digital, c'est la rencontre de la créativité, de la technologie et de
            l'humain.
            <br />
            Ensemble, faisons de vos idées des expériences qui inspirent, engagent et transforment.
            »
          </blockquote>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              De l'idée à l'impact.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Un fond bleu profond, texture lumineuse dorée, avec un halo symbolisant la connexion
              humaine et numérique.
            </p>
          </div>

          {/* QR Code central */}
          <div className="text-center">
            <div
              className="inline-block p-8 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              }}
            >
              <div className="text-6xl mb-4">📱</div>
              <div className="w-48 h-48 mx-auto bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="w-40 h-40 bg-black rounded-xl flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">QR</div>
                </div>
              </div>
              <p className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Scannez pour découvrir
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">notre univers IA</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Innovation Accessible
              </span>
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "#7C3AED" }}
              ></div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* CTA final */}
      <ThemeSection variant="light" className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Prêt à donner vie à votre vision ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Demandez une démo IA personnalisée, prenez rendez-vous avec un expert ou téléchargez
            notre plaquette complète pour découvrir comment nous pouvons transformer vos idées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/demo-ia">Demander une démo IA personnalisée</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/rendez-vous-expert">Prendre rendez-vous avec un expert</a>
            </Button>
          </div>
          <div className="mt-6">
            <Button size="md" variant="ghost" asChild>
              <a href="/plaquette-complete">Télécharger la plaquette complète</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
