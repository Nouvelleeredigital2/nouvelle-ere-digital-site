import { Metadata } from 'next';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  canonical?: string;
}

/**
 * Génère les meta-données par défaut pour le site
 */
export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      default: 'Nouvelle Ère Digital - Créateur de Sites Web',
      template: '%s | Nouvelle Ère Digital',
    },
    description: 'Créez des sites web professionnels avec notre éditeur visuel intuitif. Design moderne, optimisation SEO et performances exceptionnelles.',
    keywords: [
      'créateur de sites web',
      'éditeur visuel',
      'design web',
      'CMS moderne',
      'Next.js',
      'SEO',
      'responsive design',
      'site professionnel',
    ],
    authors: [{ name: 'Nouvelle Ère Digital' }],
    creator: 'Nouvelle Ère Digital',
    publisher: 'Nouvelle Ère Digital',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://nouvelle-ere-digital.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://nouvelle-ere-digital.com',
      title: 'Nouvelle Ère Digital - Créateur de Sites Web',
      description: 'Créez des sites web professionnels avec notre éditeur visuel intuitif.',
      siteName: 'Nouvelle Ère Digital',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Nouvelle Ère Digital - Éditeur visuel',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nouvelle Ère Digital - Créateur de Sites Web',
      description: 'Créez des sites web professionnels avec notre éditeur visuel intuitif.',
      images: ['/og-image.jpg'],
      creator: '@nouvelleeredigital',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Génère les meta-données pour une page spécifique
 */
export function generatePageMetadata(
  pageData: {
    title: string;
    slug: string;
    description?: string;
    ogImage?: string;
  },
  customSEO?: SEOData
): Metadata {
  const baseUrl = 'https://nouvelle-ere-digital.com';
  const pageUrl = `${baseUrl}/${pageData.slug}`;

  // Description par défaut basée sur le titre
  const defaultDescription = `Découvrez ${pageData.title} sur Nouvelle Ère Digital. ${customSEO?.description || 'Contenu professionnel créé avec notre éditeur visuel.'}`;

  // Générer automatiquement une description si pas fournie
  const description = customSEO?.description || generateAutoDescription(pageData.title);

  return {
    title: pageData.title,
    description,
    keywords: customSEO?.keywords || generateKeywords(pageData.title),
    alternates: {
      canonical: customSEO?.canonical || pageUrl,
    },
    openGraph: {
      title: pageData.title,
      description,
      url: pageUrl,
      siteName: 'Nouvelle Ère Digital',
      images: [
        {
          url: customSEO?.ogImage || pageData.ogImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${pageData.title} - Nouvelle Ère Digital`,
        },
      ],
      locale: 'fr_FR',
      type: (customSEO?.ogType || 'website') as 'website' | 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description,
      images: [customSEO?.ogImage || pageData.ogImage || '/og-image.jpg'],
      creator: '@nouvelleeredigital',
    },
    robots: customSEO?.noindex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Génère automatiquement une description basée sur le titre
 */
function generateAutoDescription(title: string): string {
  // Liste de templates de description
  const templates = [
    `Découvrez ${title} - contenu professionnel créé avec Nouvelle Ère Digital.`,
    `${title} - Créé avec l'éditeur visuel Nouvelle Ère Digital pour des résultats exceptionnels.`,
    `Explorez ${title} sur Nouvelle Ère Digital - design moderne et optimisation SEO.`,
    `${title} - Une création Nouvelle Ère Digital avec notre outil de création de sites web.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Génère des mots-clés automatiquement basés sur le titre
 */
function generateKeywords(title: string): string[] {
  // Mots-clés de base
  const baseKeywords = [
    'site web',
    'création site',
    'design web',
    'éditeur visuel',
    'Nouvelle Ère Digital',
  ];

  // Ajouter des mots du titre (nettoyés)
  const titleWords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 3); // Max 3 mots du titre

  return [...titleWords, ...baseKeywords];
}

/**
 * Génère le JSON-LD pour le fil d'Ariane
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Génère le JSON-LD pour une organisation
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nouvelle Ère Digital',
    url: 'https://nouvelle-ere-digital.com',
    logo: 'https://nouvelle-ere-digital.com/logo.png',
    description: 'Créateur de sites web professionnels avec éditeur visuel intuitif.',
    sameAs: [
      'https://twitter.com/nouvelleeredigital',
      'https://linkedin.com/company/nouvelle-ere-digital',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-XX-XX-XX-XX',
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  };
}

/**
 * Génère le JSON-LD pour un article/page
 */
export function generateArticleJsonLd(pageData: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageData.title,
    description: pageData.description,
    url: pageData.url,
    datePublished: pageData.datePublished,
    dateModified: pageData.dateModified,
    author: {
      '@type': 'Person',
      name: pageData.author || 'Nouvelle Ère Digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nouvelle Ère Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nouvelle-ere-digital.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageData.url,
    },
    ...(pageData.image && {
      image: {
        '@type': 'ImageObject',
        url: pageData.image,
        width: 1200,
        height: 630,
      },
    }),
  };
}

/**
 * Génère le JSON-LD pour un site web
 */
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nouvelle Ère Digital',
    url: 'https://nouvelle-ere-digital.com',
    description: 'Plateforme de création de sites web avec éditeur visuel.',
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nouvelle-ere-digital.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
