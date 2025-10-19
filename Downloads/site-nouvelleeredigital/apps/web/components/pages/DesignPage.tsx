import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function DesignPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
            Création Graphique & Design
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6">
            L'identité visuelle
            <br />
            comme langage stratégique.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground">
            <p>Chaque marque possède une voix, un rythme, un univers.</p>
            <p>Notre rôle est de le révéler.</p>
            <p>
              Le pôle Création Graphique & Design de Nouvelle Ère Digital transforme les idées en
              images cohérentes et percutantes, capables de séduire, de rassurer et de durer.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-foreground">
                « Nous dessinons la clarté. »
              </p>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Notre mission */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Notre mission"
            title="Concevoir des identités visuelles stratégiques"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground text-center">
            <p>
              Concevoir des identités visuelles fortes, esthétiques et intelligentes, capables de
              raconter une histoire avant même les mots.
            </p>
            <p className="font-medium text-foreground">
              Le design n'est pas un ornement : c'est un levier stratégique.
            </p>
            <p>
              Chaque trait, chaque couleur, chaque typographie sert une intention — celle de donner
              du sens, de la cohérence et de la confiance.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-muted-foreground italic text-xl mt-8"
              style={{ borderColor: "#7C3AED" }}
            >
              « Une identité réussie, c'est un langage visuel qui inspire la cohérence. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Expertises principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos expertises principales"
            title="Cinq domaines d'excellence créative"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Identité visuelle & branding */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Identité visuelle & branding
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Création ou refonte de logo, univers de marque et charte graphique. Définition
                    d'un ton visuel et émotionnel cohérent. Déclinaisons multi-supports (print,
                    digital, social, motion). Conception de brand books complets et modulables.
                    Harmonisation des identités existantes pour assurer la continuité visuelle.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Votre image parle avant vous. Nous la faisons vibrer au bon rythme. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Design graphique & print */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Design graphique & print
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Conception de supports de communication haut de gamme : plaquettes, catalogues,
                    affiches, flyers, PLV, signalétique, packaging. Création de kits événementiels :
                    stands, kakemonos, visuels LED, fonds de scène. Direction artistique de
                    campagnes publicitaires et d'affichage. Collaboration directe avec les pôles
                    audiovisuel et digital pour une harmonie complète.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Le papier et l'écran peuvent raconter la même histoire, s'ils parlent le même
                    langage. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Webdesign & UX/UI */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Webdesign & UX/UI
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Conception d'interfaces intuitives, esthétiques et fonctionnelles. Création de
                    maquettes interactives, wireframes et prototypes dynamiques. Intégration
                    responsive et accessibilité mobile. Optimisation de l'expérience utilisateur
                    avec logique de parcours. Collaboration avec le pôle développement pour une
                    cohérence design / technique.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Un bon design ne se voit pas, il se ressent. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Direction artistique globale */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Direction artistique globale
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Création d'univers visuels pour marques, événements ou productions
                    audiovisuelles. Définition d'un style photographique et colorimétrique
                    distinctif. Supervision de shootings et tournages (look & feel, lumière,
                    cadrage). Suivi artistique transversal sur les supports print, web et motion.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « Chaque projet est une œuvre collective : nous dessinons le lien entre l'idée
                    et la perception. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Design augmenté & IA créative */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-card-foreground"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Design augmenté & IA créative
                  </h3>
                  <p className="text-lg text-foreground mb-4">
                    Utilisation de l'IA pour la recherche visuelle, la variation d'univers, la
                    simulation 3D. Génération assistée d'ambiances, palettes et moodboards
                    interactifs. Accélération des phases de prototypage et d'inspiration. Contrôle
                    humain complet : validation, cohérence et conformité charte.
                  </p>
                  <blockquote
                    className="border-l-2 pl-4 py-2 italic text-muted-foreground"
                    style={{ borderColor: "#7C3AED" }}
                  >
                    « L'IA n'invente pas à notre place, elle élargit notre imagination. »
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Méthodologie */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Notre méthodologie"
            title="5 étapes pour une identité réussie"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Écouter", desc: "Votre histoire, vos valeurs et vos ambitions." },
              { num: "2", title: "Analyser", desc: "Vos points de contact et vos publics." },
              { num: "3", title: "Imaginer", desc: "Un univers cohérent et identifiable." },
              { num: "4", title: "Créer", desc: "Des supports impactants et évolutifs." },
              {
                num: "5",
                title: "Déployer",
                desc: "Une identité durable et déclinable sur tous les médias.",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center group hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold text-card-foreground"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                >
                  {item.num}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-foreground max-w-3xl mx-auto">
            « Nous relions le fond, la forme et le sens. »
          </p>
        </div>
      </ThemeSection>

      {/* Réalisations emblématiques */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos réalisations emblématiques"
            title="Des projets qui marquent"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Charte graphique institutionnelle",
                desc: "Refonte complète, déploiement multicanal.",
              },
              {
                title: "Univers visuel événementiel",
                desc: "Identité LED + motion + print, déclinaison live.",
              },
              {
                title: "Refonte de marque digitale",
                desc: "Logo, charte, UX/UI et supports médias, ROI visuel mesuré à +45 % d'engagement.",
              },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-all hover:scale-105">
                <div className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    <div className="w-8 h-8 bg-background/20 rounded-lg"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* Points forts */}
      <ThemeSection variant="light" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos points forts"
            title="Ce qui fait notre différence créative"
            align="center"
          />

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: "#7C3AED" }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-foreground">
                    Atout
                  </th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-foreground">
                    Impact pour vous
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  {
                    atout: "Direction artistique intégrée",
                    impact: "Une cohérence totale de marque.",
                  },
                  {
                    atout: "Approche stratégique du design",
                    impact: "Une identité utile et durable.",
                  },
                  {
                    atout: "IA créative sous contrôle humain",
                    impact: "Inspiration augmentée, respect de votre ADN.",
                  },
                  {
                    atout: "Collaboration inter-pôles",
                    impact: "Synergie entre design, audiovisuel et digital.",
                  },
                  {
                    atout: "Sens du détail",
                    impact: "Finesse, clarté et élégance à chaque support.",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-muted transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {row.atout}
                    </td>
                    <td className="py-4 px-6 text-foreground">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ThemeSection>

      {/* Philosophie du design */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-card-foreground leading-relaxed">
            « Le design n'est pas ce qu'on voit. C'est ce que l'on ressent. »
          </blockquote>
          <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
            Nous croyons que le design est un dialogue entre la raison et l'émotion. Chaque création
            est un équilibre entre beauté, clarté et fonction. Notre mission : révéler la
            singularité de votre marque à travers une signature visuelle qui inspire la confiance et
            la reconnaissance.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
              Nous dessinons la clarté.
            </h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Une composition élégante : maquettes de logo, palettes de couleurs, charte graphique
              et affiches sur une table de création.
            </p>
          </div>

          {/* Grille des 5 domaines */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🎨", title: "Identité visuelle" },
              { icon: "🖨️", title: "Design print" },
              { icon: "💻", title: "Webdesign UX/UI" },
              { icon: "🎭", title: "Direction artistique" },
              { icon: "🤖", title: "IA créative" },
            ].map((item, i) => (
              <div
                key={i}
                className="card text-center group hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      {/* CTA */}
      <ThemeSection variant="light" className="py-32 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Prêt à révéler votre identité ?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Découvrez nos réalisations graphiques et explorez notre direction artistique globale
            pour créer une identité qui vous ressemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/realisations-graphiques">Découvrir nos réalisations graphiques</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/direction-artistique">Explorer notre direction artistique globale</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
