import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createServices() {
  console.log('🚀 Création des services d\'exemple...');

  const services = [
    {
      slug: 'developpement-web',
      title: 'Développement Web',
      description: 'Création de sites web modernes, performants et évolutifs avec les dernières technologies.',
      icon: 'Code',
      features: [
        'Sites web responsive',
        'Applications web complexes',
        'E-commerce sur mesure',
        'API et intégrations',
        'Optimisation SEO',
        'Maintenance et support'
      ],
      order: 1
    },
    {
      slug: 'design-ux-ui',
      title: 'Design UX/UI',
      description: 'Conception d\'interfaces utilisateur intuitives et engageantes pour une expérience optimale.',
      icon: 'Palette',
      features: [
        'Audit UX existant',
        'Wireframes et prototypes',
        'Design system complet',
        'Tests utilisateurs',
        'Interface responsive',
        'Accessibilité web'
      ],
      order: 2
    },
    {
      slug: 'marketing-digital',
      title: 'Marketing Digital',
      description: 'Stratégies digitales complètes pour augmenter votre visibilité et générer des leads qualifiés.',
      icon: 'TrendingUp',
      features: [
        'Stratégie digitale',
        'SEO et référencement',
        'Publicité en ligne',
        'Réseaux sociaux',
        'Email marketing',
        'Analytics et reporting'
      ],
      order: 3
    },
    {
      slug: 'applications-mobiles',
      title: 'Applications Mobiles',
      description: 'Développement d\'applications mobiles natives et cross-platform pour iOS et Android.',
      icon: 'Smartphone',
      features: [
        'Apps iOS et Android',
        'Applications hybrides',
        'PWA (Progressive Web App)',
        'Intégration API',
        'Tests et déploiement',
        'Maintenance continue'
      ],
      order: 4
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        status: 'ACTIVE'
      }
    });
    console.log(`✅ Service créé: ${service.title}`);
  }

  console.log('🎉 Tous les services ont été créés!');
}

createServices()
  .catch((e) => {
    console.error('❌ Erreur lors de la création des services:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
