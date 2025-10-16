import React from "react";
import { OrbitBreadcrumbs } from "@/components/ui/OrbitBreadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

export default function PhilosophiePage() {
  return (
    <>
      <OrbitBreadcrumbs
        items={[
          { id: "home", label: "Accueil", href: "/", level: 1 },
          { id: "philosophie", label: "Philosophie", level: 2 },
        ]}
        currentId="philosophie"
      />

      <div className="container mx-auto px-8 py-16">
        {/* Hero Section */}
        <AnimatedSection variant="gradient" className="text-center py-20">
          <StaggerContainer>
            <StaggerItem>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Notre Philosophie</h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
                Simplifier l'innovation, valoriser l'humain, créer l'exceptionnel.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>

        {/* Scroll Narrative Section 1 */}
        <AnimatedSection variant="light" className="py-16">
          <SectionHeader
            title="Simplifier l'Innovation"
            subtitle="Rendre la complexité accessible"
            description="Nous croyons que la technologie la plus avancée doit être simple à utiliser et à comprendre. Notre approche consiste à démystifier les outils complexes pour les rendre accessibles à tous."
            align="center"
            size="lg"
          />

          <FadeIn className="mt-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Démocratiser la Technologie
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Nous transformons des concepts techniques complexes en interfaces intuitives et
                  expériences utilisateur fluides. Chaque projet est conçu pour être immédiatement
                  compréhensible et utilisable.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Interfaces intuitives pour tous les niveaux d'utilisateurs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Processus simplifiés sans compromettre la puissance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Formation et accompagnement personnalisés
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  "La vraie innovation n'est pas de créer quelque chose de complexe, mais de rendre
                  le complexe simple."
                </p>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* Scroll Narrative Section 2 */}
        <AnimatedSection variant="gradient" className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <StaggerContainer>
              <StaggerItem>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Valoriser l'Humain
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Au cœur de notre philosophie se trouve la conviction que la technologie doit
                  servir l'humain, amplifier ses capacités et enrichir ses expériences. Nous plaçons
                  l'empathie et la compréhension au centre de chaque projet.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Empathie",
                      description:
                        "Comprendre profondément les besoins et les émotions des utilisateurs.",
                      icon: "❤️",
                    },
                    {
                      title: "Inclusion",
                      description: "Créer des solutions accessibles à tous, sans barrières.",
                      icon: "🤝",
                    },
                    {
                      title: "Éthique",
                      description: "Utiliser la technologie de manière responsable et bénéfique.",
                      icon: "⚖️",
                    },
                  ].map((value, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-white/80 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Scroll Narrative Section 3 */}
        <AnimatedSection variant="light" className="py-16">
          <SectionHeader
            title="Créer l'Exceptionnel"
            subtitle="Excellence dans chaque détail"
            description="Nous nous engageons à dépasser les attentes, en combinant créativité, technologie et expertise pour créer des expériences digitales qui marquent les esprits et génèrent des résultats tangibles."
            align="center"
            size="md"
          />

          <FadeIn className="mt-16">
            <div className="space-y-12">
              {[
                {
                  title: "Qualité Sans Compromis",
                  description:
                    "Chaque pixel, chaque ligne de code, chaque interaction est conçue avec une attention méticuleuse aux détails.",
                  quote: "L'excellence n'est pas un acte, mais une habitude.",
                },
                {
                  title: "Innovation Continue",
                  description:
                    "Nous restons à la pointe de la technologie pour offrir des solutions toujours plus performantes et créatives.",
                  quote: "L'innovation distingue un leader d'un suiveur.",
                },
                {
                  title: "Partenariat Durable",
                  description:
                    "Nous construisons des relations de confiance à long terme avec nos clients, basées sur la transparence et le succès mutuel.",
                  quote: "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès.",
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    <blockquote className="text-primary italic border-l-4 border-primary pl-4">
                      {item.quote}
                    </blockquote>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection variant="gradient" className="py-16 text-center">
          <StaggerContainer>
            <StaggerItem>
              <h2 className="text-4xl font-bold text-white mb-6">Prêt à Créer Ensemble ?</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Rejoignez-nous dans cette aventure où innovation, humanité et excellence se
                rencontrent.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  Nous Contacter
                </a>
                <a
                  href="/vision"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  En Savoir Plus
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </>
  );
}
