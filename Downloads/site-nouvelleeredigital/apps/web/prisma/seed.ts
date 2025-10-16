import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Créer une page d'accueil exemple
  const homePage = await prisma.page.upsert({
    where: {
      slug_locale: {
        slug: 'home',
        locale: 'fr',
      },
    },
    update: {},
    create: {
      slug: 'home',
      locale: 'fr',
      title: 'Accueil - Nouvelle Ère Digital',
      status: 'PUBLISHED',
      layout: JSON.stringify({
        blocks: [
          {
            id: 'hero-1',
            type: 'hero',
            data: {
              title: 'Transformez Votre Présence Digitale',
              subtitle: 'Innovation & Excellence',
              description: 'Nous créons des expériences digitales exceptionnelles pour propulser votre entreprise vers le succès.',
              ctaText: 'Découvrir nos services',
              ctaLink: '/services',
              alignment: 'center',
            },
          },
          {
            id: 'text-1',
            type: 'text',
            data: {
              content: '<h2 class="text-3xl font-bold mb-6">Notre Expertise</h2><p class="text-lg">Nous accompagnons les entreprises dans leur transformation digitale avec une approche centrée sur l\'innovation et les résultats.</p><ul class="mt-4 space-y-2"><li>✓ Développement Web & Mobile</li><li>✓ Design UX/UI</li><li>✓ Stratégie Digitale</li><li>✓ Marketing Digital</li></ul>',
              alignment: 'center',
              maxWidth: 'lg',
              paddingY: 'lg',
            },
          },
          {
            id: 'cta-1',
            type: 'cta',
            data: {
              title: 'Prêt à Démarrer Votre Projet ?',
              description: 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins et obtenir un devis personnalisé.',
              primaryButtonText: 'Nous Contacter',
              primaryButtonLink: '/contact',
              secondaryButtonText: 'Voir nos réalisations',
              secondaryButtonLink: '/portfolio',
              backgroundColor: 'bg-indigo-700',
              textColor: 'text-white',
            },
          },
        ],
      }),
    },
  });

  console.log('✅ Page d\'accueil créée:', homePage.slug);

  // Créer une page services exemple
  const servicesPage = await prisma.page.upsert({
    where: {
      slug_locale: {
        slug: 'services',
        locale: 'fr',
      },
    },
    update: {},
    create: {
      slug: 'services',
      locale: 'fr',
      title: 'Nos Services - Nouvelle Ère Digital',
      status: 'PUBLISHED',
      layout: JSON.stringify({
        blocks: [
          {
            id: 'hero-2',
            type: 'hero',
            data: {
              title: 'Nos Services',
              subtitle: 'Excellence & Innovation',
              description: 'Découvrez notre gamme complète de services pour votre transformation digitale.',
              ctaText: 'Demander un devis',
              ctaLink: '/contact',
              alignment: 'center',
            },
          },
          {
            id: 'text-2',
            type: 'text',
            data: {
              content: '<h2 class="text-3xl font-bold mb-6">Développement Web & Mobile</h2><p class="text-lg mb-4">Nous créons des applications web et mobile performantes, évolutives et sécurisées.</p><p>Notre expertise couvre les technologies les plus modernes : React, Next.js, React Native, et bien plus encore.</p>',
              alignment: 'left',
              maxWidth: 'lg',
              paddingY: 'md',
            },
          },
          {
            id: 'text-3',
            type: 'text',
            data: {
              content: '<h2 class="text-3xl font-bold mb-6">Design UX/UI</h2><p class="text-lg mb-4">Notre équipe de designers crée des interfaces utilisateur intuitives et engageantes.</p><p>Nous plaçons l\'expérience utilisateur au cœur de chaque projet.</p>',
              alignment: 'left',
              maxWidth: 'lg',
              paddingY: 'md',
            },
          },
          {
            id: 'cta-2',
            type: 'cta',
            data: {
              title: 'Discutons de Votre Projet',
              description: 'Nos experts sont à votre disposition pour vous accompagner.',
              primaryButtonText: 'Prendre contact',
              primaryButtonLink: '/contact',
              backgroundColor: 'bg-purple-700',
              textColor: 'text-white',
            },
          },
        ],
      }),
    },
  });

  console.log('✅ Page services créée:', servicesPage.slug);

  // Créer le premier snapshot publié
  const snapshot = await prisma.publishSnapshot.create({
    data: {
      isActive: true,
      siteJson: JSON.stringify({
        pages: [
          {
            id: homePage.id,
            slug: homePage.slug,
            title: homePage.title,
            layout: JSON.parse(homePage.layout),
          },
          {
            id: servicesPage.id,
            slug: servicesPage.slug,
            title: servicesPage.title,
            layout: JSON.parse(servicesPage.layout),
          },
        ],
        publishedAt: new Date().toISOString(),
      }),
    },
  });

  console.log('✅ Snapshot créé:', snapshot.id);
  console.log('🎉 Seed terminé avec succès!');
  console.log('');
  console.log('📝 Pages créées:');
  console.log('  - /home (Accueil)');
  console.log('  - /services (Services)');
  console.log('');
  console.log('🔑 Identifiants admin:');
  console.log('  Username: admin');
  console.log('  Password: admin123');
  console.log('');
  console.log('🌐 Accédez à:');
  console.log('  - Admin: http://localhost:3000/login');
  console.log('  - Studio: http://localhost:3000/admin/studio/home');
  console.log('  - Site: http://localhost:3000/home');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
