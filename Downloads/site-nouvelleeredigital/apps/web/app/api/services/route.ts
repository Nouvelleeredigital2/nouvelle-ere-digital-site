import { NextResponse } from 'next/server';

const services = [
  {
    id: 'communication',
    title: "Communication & Marketing Digital",
    description: "Stratégies digitales innovantes pour amplifier votre présence en ligne et engager votre audience.",
    icon: "TrendingUp",
    image: "/images/communication.svg",
    features: ["SEO/SEA", "Réseaux sociaux", "Content marketing", "Analytics"],
    status: 'active'
  },
  {
    id: 'audiovisuel',
    title: "Audiovisuel & Création Multimédia",
    description: "Production audiovisuelle professionnelle pour captiver votre audience avec des contenus visuels impactants.",
    icon: "Camera",
    image: "/images/audiovisuel.svg",
    features: ["Vidéo corporate", "Motion design", "Photographie", "Post-production"],
    status: 'active'
  },
  {
    id: 'evenementiel',
    title: "Événementiel & Technologie Scénique",
    description: "Événements hybrides et scénographies technologiques pour créer des expériences mémorables.",
    icon: "Users",
    image: "/images/evenementiel.svg",
    features: ["Événements hybrides", "Scénographie", "Live streaming", "Interaction"],
    status: 'active'
  },
  {
    id: 'design',
    title: "Création Graphique & Design",
    description: "Identité visuelle et design graphique créatif pour renforcer votre image de marque.",
    icon: "Palette",
    image: "/images/design.svg",
    features: ["Identité visuelle", "Print", "Web design", "UX/UI"],
    status: 'active'
  },
  {
    id: 'developpement',
    title: "Développement Web & Expériences Numériques",
    description: "Sites web et applications modernes avec une attention particulière à l'expérience utilisateur.",
    icon: "Code",
    image: "/images/developpement.svg",
    features: ["Sites vitrine", "E-commerce", "Applications web", "Maintenance"],
    status: 'active'
  },
  {
    id: 'ia',
    title: "Intelligence Artificielle & Innovation",
    description: "Solutions IA sur mesure pour optimiser vos processus et créer de nouvelles opportunités.",
    icon: "Brain",
    image: "/images/ia.svg",
    features: ["Chatbots", "Analyse prédictive", "Automatisation", "Machine Learning"],
    status: 'active'
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: services,
      total: services.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
