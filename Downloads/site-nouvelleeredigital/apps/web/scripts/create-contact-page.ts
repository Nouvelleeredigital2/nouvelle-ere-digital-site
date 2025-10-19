import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createContactPage() {
  console.log('📞 Création de la page de contact...');

  const contactPage = await prisma.page.upsert({
    where: {
      slug: 'contact',
    },
    update: {},
    create: {
      slug: 'contact',
      title: 'Contact - Nouvelle Ère Digital',
      content: {
        blocks: [
          {
            id: 'hero-contact',
            type: 'hero',
            data: {
              title: 'Contactez-Nous',
              subtitle: 'Parlons de Votre Projet',
              description: 'Notre équipe est à votre disposition pour discuter de vos besoins et vous accompagner dans votre transformation digitale.',
              ctaText: 'Prendre rendez-vous',
              ctaLink: '#contact-form',
              alignment: 'center',
            },
          },
          {
            id: 'text-contact-info',
            type: 'text',
            data: {
              content: '<h2 class="text-3xl font-bold mb-6">Nos Coordonnées</h2><div class="grid md:grid-cols-2 gap-8"><div><h3 class="text-xl font-semibold mb-4">📧 Email</h3><p>contact@nouvelleeredigital.com</p><p class="text-sm text-gray-600 mt-2">Réponse sous 24h</p></div><div><h3 class="text-xl font-semibold mb-4">📱 Téléphone</h3><p>+33 1 23 45 67 89</p><p class="text-sm text-gray-600 mt-2">Lun-Ven 9h-18h</p></div><div><h3 class="text-xl font-semibold mb-4">📍 Adresse</h3><p>123 Avenue des Champs-Élysées<br>75008 Paris, France</p></div><div><h3 class="text-xl font-semibold mb-4">💼 Horaires</h3><p>Lundi - Vendredi<br>9h00 - 18h00</p></div></div>',
              alignment: 'left',
              maxWidth: 'xl',
              paddingY: 'lg',
            },
          },
          {
            id: 'contact-form',
            type: 'form',
            data: {
              title: 'Formulaire de Contact',
              description: 'Remplissez ce formulaire et nous vous recontacterons rapidement.',
              fields: [
                {
                  id: 'name',
                  type: 'text',
                  label: 'Nom complet',
                  placeholder: 'Votre nom et prénom',
                  required: true,
                },
                {
                  id: 'email',
                  type: 'email',
                  label: 'Email',
                  placeholder: 'votre@email.com',
                  required: true,
                },
                {
                  id: 'company',
                  type: 'text',
                  label: 'Entreprise',
                  placeholder: 'Nom de votre entreprise',
                  required: false,
                },
                {
                  id: 'phone',
                  type: 'tel',
                  label: 'Téléphone',
                  placeholder: '+33 1 23 45 67 89',
                  required: false,
                },
                {
                  id: 'service',
                  type: 'select',
                  label: 'Service souhaité',
                  options: [
                    { value: 'developpement-web', label: 'Développement Web' },
                    { value: 'design-ux-ui', label: 'Design UX/UI' },
                    { value: 'marketing-digital', label: 'Marketing Digital' },
                    { value: 'applications-mobiles', label: 'Applications Mobiles' },
                    { value: 'conseil', label: 'Conseil & Stratégie' },
                    { value: 'autre', label: 'Autre' },
                  ],
                  required: true,
                },
                {
                  id: 'budget',
                  type: 'select',
                  label: 'Budget estimé',
                  options: [
                    { value: 'moins-5k', label: 'Moins de 5 000€' },
                    { value: '5k-15k', label: '5 000€ - 15 000€' },
                    { value: '15k-50k', label: '15 000€ - 50 000€' },
                    { value: 'plus-50k', label: 'Plus de 50 000€' },
                    { value: 'a-definir', label: 'À définir' },
                  ],
                  required: false,
                },
                {
                  id: 'message',
                  type: 'textarea',
                  label: 'Message',
                  placeholder: 'Décrivez votre projet, vos objectifs et toute information utile...',
                  required: true,
                  rows: 6,
                },
              ],
              submitText: 'Envoyer le message',
              successMessage: 'Merci ! Votre message a été envoyé. Nous vous recontacterons rapidement.',
              errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
              actionUrl: '/api/contact',
              method: 'POST',
            },
          },
          {
            id: 'cta-contact',
            type: 'cta',
            data: {
              title: 'Prêt à Démarrer ?',
              description: 'Notre équipe d\'experts est prête à transformer vos idées en réalité digitale.',
              primaryButtonText: 'Voir nos réalisations',
              primaryButtonLink: '/portfolio',
              secondaryButtonText: 'Découvrir nos services',
              secondaryButtonLink: '/services',
              backgroundColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
              textColor: 'text-white',
            },
          },
        ],
      },
      status: 'PUBLISHED',
      authorId: 'default-user', // Utiliser l'ID de l'utilisateur admin créé
    },
  });

  console.log('✅ Page de contact créée:', contactPage.slug);
  console.log('🌐 Accédez à: http://localhost:3001/contact');
}

createContactPage()
  .catch((e) => {
    console.error('❌ Erreur lors de la création de la page contact:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
