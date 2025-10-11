import React from 'react';
import { OrbitBreadcrumbs } from '@/components/ui/OrbitBreadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animations';

export default function VisionPage() {
  return (
    <>
      <OrbitBreadcrumbs
        items={[
          { id: 'home', label: 'Accueil', href: '/', level: 1 },
          { id: 'vision', label: 'Vision', level: 2 },
        ]}
        currentId="vision"
      />

      <div className="container mx-auto px-8 py-16">
        {/* Hero Section */}
        <AnimatedSection variant="gradient" className="text-center py-20">
          <StaggerContainer>
            <StaggerItem>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Notre Vision
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
                Simplifier l'innovation, valoriser l'humain, et créer des expériences digitales exceptionnelles.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>

        {/* Scroll Narrative Section 1 */}
        <AnimatedSection variant="light" className="py-16">
          <SectionHeader
            title="L'Ère du Digital Humanisé"
            subtitle="Innovation au service de l'humain"
            description="Nous croyons que la technologie doit amplifier les capacités humaines, pas les remplacer. Chaque projet est conçu pour créer des connexions authentiques et durables."
            align="center"
            size="lg"
          />

          <FadeIn className="mt-16">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation Centrée Utilisateur",
                  description: "Chaque solution est pensée pour répondre aux besoins réels des utilisateurs.",
                  icon: "👥"
                },
                {
                  title: "Technologie Accessible",
                  description: "Nous rendons la technologie complexe simple et intuitive pour tous.",
                  icon: "🚀"
                },
                {
                  title: "Impact Mesurable",
                  description: "Nous mesurons le succès par l'impact positif sur nos clients et leurs utilisateurs.",
                  icon: "📈"
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="text-center p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-700">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* Scroll Narrative Section 2 */}
        <AnimatedSection variant="gradient" className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <StaggerContainer>
              <StaggerItem>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  L'Intelligence Artificielle au Service de la Créativité
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Nous intégrons l'IA de manière éthique et intelligente pour amplifier la créativité humaine, créer des expériences personnalisées et optimiser les processus créatifs.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                  <p className="text-white text-lg italic">
                    "L'IA n'est pas une fin en soi, mais un outil puissant pour libérer le potentiel créatif de chacun."
                  </p>
                  <p className="text-white/80 mt-4">- Nouvelle Ère Digital</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Scroll Narrative Section 3 */}
        <AnimatedSection variant="light" className="py-16">
          <SectionHeader
            title="Un Écosystème Collaboratif"
            subtitle="Synergie des expertises"
            description="Nos six pôles d'expertise travaillent en synergie pour offrir des solutions complètes et cohérentes."
            align="center"
            size="md"
          />

          <FadeIn className="mt-16">
            <div className="space-y-8">
              {[
                {
                  title: "Communication",
                  description: "Stratégies narratives qui captivent et engagent.",
                  color: "bg-red-500"
                },
                {
                  title: "Audiovisuel",
                  description: "Contenus visuels immersifs qui racontent votre histoire.",
                  color: "bg-blue-500"
                },
                {
                  title: "Événementiel",
                  description: "Expériences mémorables qui créent des liens durables.",
                  color: "bg-yellow-500"
                },
                {
                  title: "Design",
                  description: "Identités visuelles qui incarnent vos valeurs.",
                  color: "bg-orange-500"
                },
                {
                  title: "Web",
                  description: "Plateformes digitales intuitives et performantes.",
                  color: "bg-green-500"
                },
                {
                  title: "IA",
                  description: "Solutions intelligentes qui anticipent les besoins.",
                  color: "bg-purple-500"
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-6 p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </FadeIn>
        </AnimatedSection>
      </div>
    </>
  );
}
