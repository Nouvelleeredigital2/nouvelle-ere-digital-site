import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function DeveloppementPage() {
  return (
    <>
      {/* Héro */}
      <ThemeSection variant="gradient" className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-4">Développement Web & Expériences Numériques</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            Des plateformes performantes,<br />évolutives et souveraines.
          </h1>
        </div>
      </ThemeSection>

      {/* Introduction */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
            <p>
              Nous concevons et développons des expériences numériques sur mesure, alliant performance, design et sécurité.
            </p>
            <p>
              Notre pôle Développement Web & Numérique transforme vos besoins en solutions concrètes : sites, applications, outils métiers ou expériences interactives.
            </p>
            <div className="text-center py-6">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                « Un code propre, un design clair, une expérience fluide : le trio gagnant. »
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
            title="Créer des outils digitaux générateurs de valeur"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-zinc-700 dark:text-zinc-300 text-center">
            <p>
              Créer des outils digitaux capables de renforcer votre image, fluidifier vos processus et générer de la valeur mesurable.
            </p>
            <p>
              Chaque projet est pensé comme une expérience : intuitive pour l'utilisateur, robuste pour vos équipes, et souveraine pour vos données.
            </p>
            <blockquote className="border-l-4 pl-6 py-4 text-zinc-600 dark:text-zinc-400 italic text-xl mt-8" style={{ borderColor: '#7C3AED' }}>
              « La technologie n'a de sens que lorsqu'elle simplifie et relie. »
            </blockquote>
          </div>
        </div>
      </ThemeSection>

      {/* Expertises principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos expertises principales"
            title="Cinq domaines de développement"
            align="center"
          />

          <div className="space-y-16">
            {/* 1. Sites web & plateformes métiers */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Sites web & plateformes métiers</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Conception de sites vitrines, institutionnels, e-commerce et portails métiers. Création de plateformes interactives (simulateurs, configurateurs, extranets). UX/UI design intégré à chaque étape. Optimisation des performances (chargement, accessibilité, SEO). Maintenance et évolutivité garanties.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Un site n'est pas une vitrine : c'est un point de contact vivant. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 2. Applications sur mesure */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Applications sur mesure</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Développement d'outils internes (CRM, intranet, gestion de contenus). Solutions spécifiques à vos métiers : simulateurs, plateformes événementielles, portails de formation. Interfaçage avec vos systèmes existants (ERP, CRM, API tierces). Développement d'applications mobiles (React Native, Flutter). Gestion de projets agiles : du prototype à la mise en production.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Nous traduisons vos besoins métier en solutions fonctionnelles. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3. Automatisations & intégrations intelligentes */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Automatisations & intégrations intelligentes</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Connexion d'outils marketing et data (HubSpot, Notion, Airtable, Zapier). Automatisation de flux (emails, devis, formulaires, CRM). Synchronisation de bases de données et suivi d'interactions. Intégration de copilotes IA pour la gestion, l'analyse et le reporting. Scripts d'automatisation sur mesure, optimisant temps et fiabilité.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Automatiser, c'est libérer du temps pour créer plus de valeur. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 4. Hébergement souverain & sécurité */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Hébergement souverain & sécurité</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Hébergements RGPD conformes, serveurs européens certifiés. Solutions cloud hybrides : sécurité, redondance, scalabilité. Sauvegardes automatiques et surveillance 24/7. Protocoles HTTPS, authentification multi-facteur, chiffrement. Tableaux de bord de sécurité et suivi en temps réel.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « Vos données sont précieuses : nous les hébergeons avec exigence. »
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 5. Expériences numériques & innovation */}
            <div className="card group hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Expériences numériques & innovation</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Interfaces immersives : webGL, 3D, vidéo interactive. Outils d'interactivité événementielle et gamification. Parcours IA-guidés (formulaires intelligents, chatbots, recommandation). Dashboards interactifs et visualisations de données. Connexion directe avec le pôle audiovisuel et IA pour expériences mixtes.
                  </p>
                  <blockquote className="border-l-2 pl-4 py-2 italic text-zinc-600 dark:text-zinc-400" style={{ borderColor: '#7C3AED' }}>
                    « De l'interaction à la relation : nous créons des expériences vivantes. »
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
            title="5 étapes pour votre succès digital"
            align="center"
          />

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { num: "1", title: "Cadrage", desc: "Analyse fonctionnelle et UX, définition des objectifs." },
              { num: "2", title: "Design & Prototype", desc: "Wireframes, UI, validation parcours utilisateur." },
              { num: "3", title: "Développement", desc: "Intégration front/back, connecteurs et API." },
              { num: "4", title: "Tests & Sécurité", desc: "QA, RGPD, performances, compatibilités." },
              { num: "5", title: "Déploiement & Suivi", desc: "Mise en ligne, maintenance, analytics." },
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
            « Notre exigence technique s'allie à la rigueur créative du design. »
          </p>
        </div>
      </ThemeSection>

      {/* Technologies principales */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos technologies principales"
            title="Les outils de votre performance"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { category: "Frontend", items: "React, Next.js, Tailwind, TypeScript" },
              { category: "Backend", items: "Node.js, Express, Laravel, Python FastAPI" },
              { category: "Bases de données", items: "PostgreSQL, MySQL, SQLite" },
              { category: "Mobile & WebApp", items: "Flutter, React Native" },
              { category: "Automatisation / IA", items: "OpenAI, Gemini, Zapier, n8n" },
              { category: "Hébergement", items: "OVH Cloud, Scaleway, Infomaniak, serveurs souverains UE" },
            ].map((item, i) => (
              <div key={i} className="card group hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{item.category}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.items}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mt-12">
            « Nous choisissons les technologies les plus adaptées à votre besoin, pas les plus à la mode. »
          </p>
        </div>
      </ThemeSection>

      {/* Réalisations récentes */}
      <ThemeSection variant="light" className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos réalisations récentes"
            title="Des projets qui performent"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Portail digital interactif",
                desc: "10 000 utilisateurs / KPI +85 % d'engagement.",
              },
              {
                title: "Intranet IA",
                desc: "Automatisation de reporting RH, -60 % de temps de saisie.",
              },
              {
                title: "Plateforme e-commerce modulaire",
                desc: "Multi-devices, IA de recommandation, ROI ×2,4.",
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
        </div>
      </ThemeSection>

      {/* Points forts */}
      <ThemeSection variant="light" className="py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nos points forts"
            title="Ce qui fait notre différence technique"
            align="center"
          />

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#7C3AED' }}>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Atout clé</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Bénéfice client</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {[
                  { atout: "Développement agile & sur mesure", benefice: "Solutions parfaitement adaptées." },
                  { atout: "Design + technologie intégrés", benefice: "Expérience fluide, cohérence UX/UI." },
                  { atout: "Hébergement souverain", benefice: "Sécurité et conformité RGPD garanties." },
                  { atout: "Automatisation intelligente", benefice: "Gain de temps et reporting constant." },
                  { atout: "Support humain & suivi IA", benefice: "Assistance réactive, optimisations continues." },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100">{row.atout}</td>
                    <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.benefice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ThemeSection>

      {/* Philosophie */}
      <ThemeSection variant="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            « La performance est notre matière, l'humain notre architecture. »
          </blockquote>
          <p className="mt-8 text-zinc-300 max-w-2xl mx-auto">
            Nous voyons le web comme une expérience vivante et évolutive. Nos développeurs, designers et stratèges travaillent ensemble pour que chaque ligne de code serve une idée, chaque interaction serve une émotion, et chaque donnée serve une décision.
          </p>
        </div>
      </ThemeSection>

      {/* Visuel recommandé */}
      <ThemeSection variant="gradient" className="py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
              Concevoir. Connecter. Performer.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
              Une interface web en pleine création : code à gauche, maquette design à droite, une équipe collaborant sur grand écran.
            </p>
          </div>

          {/* Grille des 5 domaines */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🌐", title: "Sites web" },
              { icon: "📱", title: "Applications" },
              { icon: "🤖", title: "Automatisations" },
              { icon: "🔐", title: "Hébergement" },
              { icon: "🚀", title: "Innovation" },
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
            Prêt à digitaliser votre vision ?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Découvrez nos réalisations digitales et demandez un audit technique ou UX pour votre prochain projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/realisations-digitales">Découvrir nos réalisations digitales</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/audit-technique">Demander un audit technique ou UX</a>
            </Button>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
