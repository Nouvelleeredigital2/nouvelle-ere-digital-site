// Système de génération statique optimisé

import { prisma } from './prisma';
import { cache } from './cache';
import { performanceMonitor } from './performance-monitor';

// Types pour la génération statique
interface StaticGenerationOptions {
  force?: boolean;
  cache?: boolean;
  revalidate?: number;
  tags?: string[];
}

interface StaticPage {
  slug: string;
  content: any;
  metadata: {
    title: string;
    description?: string;
    lastModified: Date;
    priority: number;
  };
}

// Fonction pour générer les pages statiques
export async function generateStaticPages(
  options: StaticGenerationOptions = {}
): Promise<StaticPage[]> {
  const { force = false, cache: useCache = true, revalidate = 3600 } = options;

  return performanceMonitor.measureFunction('static_generation', async () => {
    // Récupérer toutes les pages publiées
    const pages = await prisma.page.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      select: {
        slug: true,
        title: true,
        content: true,
        metaTitle: true,
        metaDescription: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const staticPages: StaticPage[] = [];

    for (const page of pages) {
      const cacheKey = `static_page:${page.slug}`;
      
      if (useCache && !force) {
        const cached = await cache.get<StaticPage>(cacheKey);
        if (cached) {
          staticPages.push(cached);
          continue;
        }
      }

      const staticPage: StaticPage = {
        slug: page.slug,
        content: page.content,
        metadata: {
          title: page.metaTitle || page.title,
          description: page.metaDescription,
          lastModified: page.updatedAt,
          priority: calculatePagePriority(page),
        },
      };

      staticPages.push(staticPage);

      if (useCache) {
        await cache.set(cacheKey, staticPage, {
          ttl: revalidate,
          tags: ['static_pages', 'pages'],
        });
      }
    }

    return staticPages;
  }, { operation: 'generate_static_pages' });
}

// Fonction pour calculer la priorité d'une page
function calculatePagePriority(page: any): number {
  let priority = 0.5; // Priorité par défaut

  // Augmenter la priorité pour les pages importantes
  if (page.slug === 'accueil' || page.slug === 'home') priority = 1.0;
  if (page.slug === 'services') priority = 0.9;
  if (page.slug === 'contact') priority = 0.8;
  if (page.slug === 'a-propos') priority = 0.7;

  // Ajuster selon la date de modification
  const daysSinceUpdate = (Date.now() - page.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 7) priority += 0.1;
  if (daysSinceUpdate > 30) priority -= 0.1;

  return Math.max(0, Math.min(1, priority));
}

// Fonction pour générer le sitemap
export async function generateSitemap(
  options: StaticGenerationOptions = {}
): Promise<string> {
  const { force = false, cache: useCache = true } = options;

  return performanceMonitor.measureFunction('sitemap_generation', async () => {
    const cacheKey = 'sitemap:xml';
    
    if (useCache && !force) {
      const cached = await cache.get<string>(cacheKey);
      if (cached) return cached;
    }

    const pages = await generateStaticPages({ force, cache: false });
    const services = await prisma.service.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true, updatedAt: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Ajouter les pages
    for (const page of pages) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/${page.slug}</loc>\n`;
      sitemap += `    <lastmod>${page.metadata.lastModified.toISOString()}</lastmod>\n`;
      sitemap += `    <priority>${page.metadata.priority}</priority>\n`;
      sitemap += '  </url>\n';
    }

    // Ajouter les services
    for (const service of services) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/services/${service.slug}</loc>\n`;
      sitemap += `    <lastmod>${service.updatedAt.toISOString()}</lastmod>\n`;
      sitemap += '    <priority>0.6</priority>\n';
      sitemap += '  </url>\n';
    }

    sitemap += '</urlset>';

    if (useCache) {
      await cache.set(cacheKey, sitemap, {
        ttl: 86400, // 24 heures
        tags: ['sitemap'],
      });
    }

    return sitemap;
  }, { operation: 'generate_sitemap' });
}

// Fonction pour générer les métadonnées SEO
export async function generateSEOMetadata(
  page: any,
  options: StaticGenerationOptions = {}
): Promise<{
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonical: string;
}> {
  const { force = false, cache: useCache = true } = options;

  return performanceMonitor.measureFunction('seo_metadata_generation', async () => {
    const cacheKey = `seo_metadata:${page.slug}`;
    
    if (useCache && !force) {
      const cached = await cache.get(cacheKey);
      if (cached) return cached;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
    
    const metadata = {
      title: page.metaTitle || page.title,
      description: page.metaDescription || generateDescription(page.content),
      keywords: generateKeywords(page),
      ogTitle: page.metaTitle || page.title,
      ogDescription: page.metaDescription || generateDescription(page.content),
      ogImage: `${baseUrl}/og-image.jpg`,
      twitterCard: 'summary_large_image',
      canonical: `${baseUrl}/${page.slug}`,
    };

    if (useCache) {
      await cache.set(cacheKey, metadata, {
        ttl: 3600,
        tags: ['seo_metadata', 'pages'],
      });
    }

    return metadata;
  }, { operation: 'generate_seo_metadata' });
}

// Fonction pour générer une description automatique
function generateDescription(content: any): string {
  if (typeof content === 'string') {
    return content.substring(0, 160);
  }
  
  if (Array.isArray(content)) {
    const textBlocks = content.filter(block => block.type === 'text');
    if (textBlocks.length > 0) {
      const text = textBlocks[0].content || '';
      return text.substring(0, 160);
    }
  }
  
  return 'Découvrez notre contenu exclusif et nos services professionnels.';
}

// Fonction pour générer des mots-clés
function generateKeywords(page: any): string[] {
  const keywords = [];
  
  // Ajouter des mots-clés basés sur le titre
  if (page.title) {
    const titleWords = page.title.toLowerCase().split(/\s+/);
    keywords.push(...titleWords.filter(word => word.length > 3));
  }
  
  // Ajouter des mots-clés basés sur le contenu
  if (page.content) {
    const contentText = extractTextFromContent(page.content);
    const contentWords = contentText.toLowerCase().split(/\s+/);
    const wordCount = contentWords.reduce((acc: Record<string, number>, word: string) => {
      if (word.length > 4) {
        acc[word] = (acc[word] || 0) + 1;
      }
      return acc;
    }, {});
    
    const topWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
    
    keywords.push(...topWords);
  }
  
  // Ajouter des mots-clés par défaut
  keywords.push('nouvelle ère digitale', 'services digitaux', 'transformation digitale');
  
  return [...new Set(keywords)].slice(0, 10);
}

// Fonction pour extraire le texte du contenu
function extractTextFromContent(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'text' && block.content) {
        return block.content;
      }
      if (block.type === 'rich_text' && block.content) {
        return block.content;
      }
      return '';
    }).join(' ');
  }
  
  return '';
}

// Fonction pour précharger les données
export async function preloadData(
  options: StaticGenerationOptions = {}
): Promise<{
  pages: any[];
  services: any[];
  media: any[];
}> {
  const { force = false, cache: useCache = true } = options;

  return performanceMonitor.measureFunction('data_preload', async () => {
    const cacheKey = 'preloaded_data';
    
    if (useCache && !force) {
      const cached = await cache.get(cacheKey);
      if (cached) return cached;
    }

    const [pages, services, media] = await Promise.all([
      prisma.page.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          metaTitle: true,
          metaDescription: true,
          updatedAt: true,
        },
      }),
      prisma.service.findMany({
        where: { status: 'ACTIVE' },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          icon: true,
          image: true,
          features: true,
          order: true,
        },
      }),
      prisma.media.findMany({
        select: {
          id: true,
          filename: true,
          originalName: true,
          mimeType: true,
          size: true,
          path: true,
          alt: true,
          caption: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
    ]);

    const data = { pages, services, media };

    if (useCache) {
      await cache.set(cacheKey, data, {
        ttl: 1800, // 30 minutes
        tags: ['preloaded_data'],
      });
    }

    return data;
  }, { operation: 'preload_data' });
}

// Fonction pour invalider le cache de génération statique
export async function invalidateStaticCache(tags: string[]): Promise<void> {
  await cache.invalidateByTags(tags);
}

// Fonction pour surveiller les performances de génération
export function monitorStaticGeneration(): void {
  setInterval(async () => {
    try {
      const start = Date.now();
      await generateStaticPages({ force: false, cache: true });
      const duration = Date.now() - start;
      
      performanceMonitor.recordMetric('static_generation_duration', duration, 'ms');
    } catch (error) {
      console.error('Erreur lors de la génération statique:', error);
    }
  }, 300000); // Toutes les 5 minutes
}

// Export des types et fonctions
export type { StaticGenerationOptions, StaticPage };
export {
  generateStaticPages,
  generateSitemap,
  generateSEOMetadata,
  preloadData,
  invalidateStaticCache,
  monitorStaticGeneration,
};
