"use client";

import { LazyUniverse3DWrapper } from "@/components/ui/LazyUniverse3D";
import { ThemeSection } from "@/components/layout/ThemeSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroSection } from "@/components/ui/HeroSection";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { ServiceCard, ServiceGrid } from "@/components/ui/ServiceCard";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";
import {
  Camera,
  Palette,
  Users,
  Code,
  Brain,
  BookOpen,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

export function AccueilPage() {
  const services = [
    {
      title: "Communication & Marketing Digital",
      description: "Stratégies digitales innovantes pour amplifier votre présence en ligne et engager votre audience.",
      icon: <TrendingUp size={24} />,
      image: "/images/communication.svg",
      features: ["SEO/SEA", "Réseaux sociaux", "Content marketing", "Analytics"]
    },
    {
      title: "Audiovisuel & Création Multimédia",
      description: "Production audiovisuelle professionnelle pour captiver votre audience avec des contenus visuels impactants.",
      icon: <Camera size={24} />,
      image: "/images/audiovisuel.svg",
      features: ["Vidéo corporate", "Motion design", "Photographie", "Post-production"]
    },
    {
      title: "Événementiel & Technologie Scénique",
      description: "Événements hybrides et scénographies technologiques pour créer des expériences mémorables.",
      icon: <Users size={24} />,
      image: "/images/evenementiel.svg",
      features: ["Événements hybrides", "Scénographie", "Live streaming", "Interaction"]
    },
    {
      title: "Création Graphique & Design",
      description: "Identité visuelle et design graphique créatif pour renforcer votre image de marque.",
      icon: <Palette size={24} />,
      image: "/images/design.svg",
      features: ["Identité visuelle", "Print", "Web design", "UX/UI"]
    },
    {
      title: "Développement Web & Expériences Numériques",
      description: "Sites web et applications modernes avec une attention particulière à l'expérience utilisateur.",
      icon: <Code size={24} />,
      image: "/images/developpement.svg",
      features: ["Sites vitrine", "E-commerce", "Applications web", "Maintenance"]
    },
    {
      title: "Intelligence Artificielle & Innovation",
      description: "Solutions IA sur mesure pour optimiser vos processus et créer de nouvelles opportunités.",
      icon: <Brain size={24} />,
      image: "/images/ia.svg",
      features: ["Chatbots", "Analyse prédictive", "Automatisation", "Machine Learning"]
    }
  ];

  const stats = [
    { number: "150+", label: "Projets réalisés" },
    { number: "50+", label: "Clients satisfaits" },
    { number: "8", label: "Années d'expérience" },
    { number: "24/7", label: "Support technique" }
  ];

  // Convertir les services existants pour le composant 3D
  const universeServices = [
    {
      name: "Communication",
      color: 0xf87171,
      colorHex: "#f87171",
      desc: "Stratégies créatives & storytelling digital",
      position: [0, 10, 0] as [number, number, number],
      features: ["SEO/SEA", "Réseaux sociaux", "Content marketing", "Analytics"]
    },
    {
      name: "Audiovisuel",
      color: 0x60a5fa,
      colorHex: "#60a5fa",
      desc: "Production vidéo & contenus immersifs",
      position: [8.7, 5, -5] as [number, number, number],
      features: ["Vidéo corporate", "Motion design", "Photographie", "Post-production"]
    },
    {
      name: "Événementiel",
      color: 0xfde047,
      colorHex: "#fde047",
      desc: "Expériences mémorables & activation de marque",
      position: [8.7, -5, 5] as [number, number, number],
      features: ["Événements hybrides", "Scénographie", "Live streaming", "Interaction"]
    },
    {
      name: "Design",
      color: 0xfb923c,
      colorHex: "#fb923c",
      desc: "Identité visuelle & design thinking",
      position: [0, -10, 0] as [number, number, number],
      features: ["Identité visuelle", "Print", "Web design", "UX/UI"]
    },
    {
      name: "Web",
      color: 0x34d399,
      colorHex: "#34d399",
      desc: "Développement web & applications sur mesure",
      position: [-8.7, -5, -5] as [number, number, number],
      features: ["Sites vitrine", "E-commerce", "Applications web", "Maintenance"]
    },
    {
      name: "IA",
      color: 0x818cf8,
      colorHex: "#818cf8",
      desc: "Intelligence artificielle & automatisation",
      position: [-8.7, 5, 5] as [number, number, number],
      features: ["Chatbots", "Analyse prédictive", "Automatisation", "Machine Learning"]
    }
  ];

  return (
    <>
      {console.log('AccueilPage: Rendering AccueilPage')}
      {/* Universe 3D Section */}
      <div className="relative">
        <LazyUniverse3DWrapper services={universeServices} />
      </div>

      {/* Rest of the page content... */}

      {/* Subtitle Section */}
      <AnimatedSection variant="light" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <StaggerContainer>
            <StaggerItem>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Agence créative & technologique
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Simplifier, innover et valoriser l'humain dans chaque projet numérique.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-wrap justify-center gap-3">
                {["Communication", "Audiovisuel", "Événementiel", "Design", "Web", "IA", "Formation"].map((tag, index) => (
                  <StaggerItem key={tag}>
                    <span className="px-6 py-3 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-medium hover:bg-brand-100 dark:hover:bg-brand-800/30 transition-all duration-300 cursor-default">
                      {tag}
                    </span>
                  </StaggerItem>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Hero Image Section */}
      <AnimatedSection variant="light" className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    N
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Innovation & Créativité</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    L'alliance parfaite entre technologie de pointe et approche humaine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection variant="gradient" className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection
        variant="animated"
        className="py-24"
        showFloatingElements={true}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Nos Expertises Intégrées"
            subtitle="Une approche globale"
            description="Découvrez nos six pôles d'expertise interconnectés pour une stratégie digitale complète et performante."
            align="center"
            size="lg"
          />

          <FadeIn className="mt-16">
            <ServiceGrid services={services} columns={3} />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection variant="light" className="py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Pourquoi Nous Choisir ?"
            subtitle="Nos valeurs"
            description="Une approche humaine et innovante pour des résultats exceptionnels."
            align="center"
            size="md"
          />

          <StaggerContainer className="mt-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Expertise Reconnue",
                  description: "Plus de 8 années d'expérience dans le digital avec des résultats mesurables."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Approche Humaine",
                  description: "Nous plaçons l'humain au cœur de chaque projet pour des solutions authentiques."
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Innovation Continue",
                  description: "Veille technologique permanente pour vous proposer les meilleures solutions."
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-700">
                  <div className="w-16 h-16 bg-brand-600 dark:bg-brand-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection variant="gradient" className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#8B5CF6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Transformons vos idées en expériences digitales exceptionnelles.
            Contactez-nous dès aujourd'hui pour un devis gratuit.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-4 shadow-xl">
              <a href="/contact">Démarrer Maintenant</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
              <a href="/expertises">En Savoir Plus</a>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
