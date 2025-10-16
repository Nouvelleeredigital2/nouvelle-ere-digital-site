import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function publishSnapshot() {
  console.log('📸 Création d\'un nouveau snapshot...');
  console.log('');

  try {
    // Récupérer toutes les pages publiées
    const pages = await prisma.page.findMany({
      where: {
        status: 'PUBLISHED',
        locale: 'fr',
      },
    });

    console.log(`📄 Pages trouvées: ${pages.length}`);
    pages.forEach(page => {
      console.log(`   - ${page.slug} (${page.title})`);
    });
    console.log('');

    if (pages.length === 0) {
      console.log('⚠️  Attention: Aucune page publiée trouvée!');
      console.log('   Assurez-vous d\'avoir des pages avec status="PUBLISHED"');
      console.log('');
      return;
    }

    // Créer le snapshot
    const siteJson = {
      pages: pages.map(page => ({
        id: page.id,
        slug: page.slug,
        title: page.title,
        layout: JSON.parse(page.layout),
      })),
      publishedAt: new Date().toISOString(),
    };

    // Désactiver tous les anciens snapshots
    await prisma.publishSnapshot.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    console.log('🔄 Anciens snapshots désactivés');

    // Créer le nouveau snapshot actif
    const snapshot = await prisma.publishSnapshot.create({
      data: {
        siteJson: JSON.stringify(siteJson),
        isActive: true,
      },
    });

    console.log('✅ Nouveau snapshot créé avec succès!');
    console.log('');
    console.log('📊 Résumé:');
    console.log(`   - ID du snapshot: ${snapshot.id}`);
    console.log(`   - Date de création: ${snapshot.createdAt.toLocaleString('fr-FR')}`);
    console.log(`   - Nombre de pages: ${pages.length}`);
    console.log('');
    console.log('🌐 Pages publiées:');
    pages.forEach(page => {
      console.log(`   - http://localhost:3001/${page.slug}`);
    });
    console.log('');
    console.log('🎉 Publication terminée!');
  } catch (error) {
    console.error('❌ Erreur lors de la publication:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

publishSnapshot();
