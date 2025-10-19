import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Récupérer toutes les pages publiées
    const pages = await prisma.page.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
        updatedAt: true,
        title: true,
      },
    });

    // Générer le XML du sitemap
    const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>https://nouvelle-ere-digital.com/${page.slug}</loc>
    <lastmod>${page.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(urlset, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Erreur génération sitemap:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
