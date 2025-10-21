// Optimisations Prisma pour les performances

import { prisma } from './prisma';
import { withPrismaCache } from './cache';

// Types pour les sélections optimisées
export const PageSelect = {
  id: true,
  slug: true,
  title: true,
  status: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  metaTitle: true,
  metaDescription: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} as const;

export const ServiceSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  icon: true,
  image: true,
  features: true,
  status: true,
  order: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const MediaSelect = {
  id: true,
  filename: true,
  originalName: true,
  mimeType: true,
  size: true,
  path: true,
  alt: true,
  caption: true,
  createdAt: true,
  uploadedBy: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

export const UserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

// Fonctions optimisées pour les pages
export const optimizedPageQueries = {
  // Récupérer une page avec cache
  async findUnique(slug: string) {
    return withPrismaCache(
      'page',
      'findUnique',
      () => prisma.page.findUnique({
        where: { slug },
        select: PageSelect,
      }),
      { ttl: 3600, tags: ['pages'] }
    );
  },

  // Récupérer toutes les pages publiées
  async findManyPublished(options: {
    limit?: number;
    offset?: number;
    orderBy?: 'createdAt' | 'updatedAt' | 'publishedAt';
    order?: 'asc' | 'desc';
  } = {}) {
    const { limit = 20, offset = 0, orderBy = 'publishedAt', order = 'desc' } = options;
    
    return withPrismaCache(
      'page',
      'findManyPublished',
      () => prisma.page.findMany({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
        },
        select: PageSelect,
        take: limit,
        skip: offset,
        orderBy: { [orderBy]: order },
      }),
      { ttl: 1800, tags: ['pages'] }
    );
  },

  // Compter les pages publiées
  async countPublished() {
    return withPrismaCache(
      'page',
      'countPublished',
      () => prisma.page.count({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
        },
      }),
      { ttl: 3600, tags: ['pages'] }
    );
  },

  // Rechercher des pages
  async search(query: string, options: {
    limit?: number;
    offset?: number;
  } = {}) {
    const { limit = 20, offset = 0 } = options;
    
    return withPrismaCache(
      'page',
      'search',
      () => prisma.page.findMany({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
          OR: [
            { title: { contains: query } },
            { metaDescription: { contains: query } },
          ],
        },
        select: PageSelect,
        take: limit,
        skip: offset,
        orderBy: { publishedAt: 'desc' },
      }),
      { ttl: 1800, tags: ['pages'] }
    );
  },
};

// Fonctions optimisées pour les services
export const optimizedServiceQueries = {
  // Récupérer tous les services actifs
  async findManyActive(options: {
    limit?: number;
    offset?: number;
    orderBy?: 'order' | 'createdAt' | 'title';
    order?: 'asc' | 'desc';
  } = {}) {
    const { limit = 50, offset = 0, orderBy = 'order', order = 'asc' } = options;
    
    return withPrismaCache(
      'service',
      'findManyActive',
      () => prisma.service.findMany({
        where: { status: 'ACTIVE' },
        select: ServiceSelect,
        take: limit,
        skip: offset,
        orderBy: { [orderBy]: order },
      }),
      { ttl: 3600, tags: ['services'] }
    );
  },

  // Récupérer un service par slug
  async findUniqueBySlug(slug: string) {
    return withPrismaCache(
      'service',
      'findUniqueBySlug',
      () => prisma.service.findUnique({
        where: { slug },
        select: ServiceSelect,
      }),
      { ttl: 3600, tags: ['services'] }
    );
  },

  // Compter les services actifs
  async countActive() {
    return withPrismaCache(
      'service',
      'countActive',
      () => prisma.service.count({
        where: { status: 'ACTIVE' },
      }),
      { ttl: 3600, tags: ['services'] }
    );
  },
};

// Fonctions optimisées pour les médias
export const optimizedMediaQueries = {
  // Récupérer les médias avec pagination
  async findMany(options: {
    limit?: number;
    offset?: number;
    mimeType?: string;
    search?: string;
    orderBy?: 'createdAt' | 'size' | 'originalName';
    order?: 'asc' | 'desc';
  } = {}) {
    const { 
      limit = 20, 
      offset = 0, 
      mimeType, 
      search, 
      orderBy = 'createdAt', 
      order = 'desc' 
    } = options;
    
    const where: any = {};
    
    if (mimeType) {
      where.mimeType = { startsWith: mimeType };
    }
    
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    return withPrismaCache(
      'media',
      'findMany',
      () => prisma.media.findMany({
        where,
        select: MediaSelect,
        take: limit,
        skip: offset,
        orderBy: { [orderBy]: order },
      }),
      { ttl: 1800, tags: ['media'] }
    );
  },

  // Compter les médias
  async count(options: {
    mimeType?: string;
    search?: string;
  } = {}) {
    const { mimeType, search } = options;
    
    const where: any = {};
    
    if (mimeType) {
      where.mimeType = { startsWith: mimeType };
    }
    
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    return withPrismaCache(
      'media',
      'count',
      () => prisma.media.count({ where }),
      { ttl: 1800, tags: ['media'] }
    );
  },

  // Récupérer un média par ID
  async findUnique(id: string) {
    return withPrismaCache(
      'media',
      'findUnique',
      () => prisma.media.findUnique({
        where: { id },
        select: MediaSelect,
      }),
      { ttl: 3600, tags: ['media'] }
    );
  },
};

// Fonctions optimisées pour les utilisateurs
export const optimizedUserQueries = {
  // Récupérer un utilisateur par email
  async findUniqueByEmail(email: string) {
    return withPrismaCache(
      'user',
      'findUniqueByEmail',
      () => prisma.user.findUnique({
        where: { email },
        select: UserSelect,
      }),
      { ttl: 1800, tags: ['users'] }
    );
  },

  // Récupérer les utilisateurs avec pagination
  async findMany(options: {
    limit?: number;
    offset?: number;
    role?: string;
    search?: string;
  } = {}) {
    const { limit = 20, offset = 0, role, search } = options;
    
    const where: any = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    return withPrismaCache(
      'user',
      'findMany',
      () => prisma.user.findMany({
        where,
        select: UserSelect,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      { ttl: 1800, tags: ['users'] }
    );
  },
};

// Fonctions pour les statistiques
export const optimizedStatsQueries = {
  // Statistiques générales
  async getGeneralStats() {
    return withPrismaCache(
      'stats',
      'general',
      async () => {
        const [pagesCount, servicesCount, mediaCount, usersCount] = await Promise.all([
          prisma.page.count(),
          prisma.service.count(),
          prisma.media.count(),
          prisma.user.count(),
        ]);

        return {
          pages: pagesCount,
          services: servicesCount,
          media: mediaCount,
          users: usersCount,
        };
      },
      { ttl: 3600, tags: ['stats'] }
    );
  },

  // Statistiques des pages par statut
  async getPageStats() {
    return withPrismaCache(
      'stats',
      'pages',
      async () => {
        const [draft, review, scheduled, published, archived] = await Promise.all([
          prisma.page.count({ where: { status: 'DRAFT' } }),
          prisma.page.count({ where: { status: 'REVIEW' } }),
          prisma.page.count({ where: { status: 'SCHEDULED' } }),
          prisma.page.count({ where: { status: 'PUBLISHED' } }),
          prisma.page.count({ where: { status: 'ARCHIVED' } }),
        ]);

        return {
          draft,
          review,
          scheduled,
          published,
          archived,
          total: draft + review + scheduled + published + archived,
        };
      },
      { ttl: 3600, tags: ['stats', 'pages'] }
    );
  },

  // Statistiques des services par statut
  async getServiceStats() {
    return withPrismaCache(
      'stats',
      'services',
      async () => {
        const [active, inactive] = await Promise.all([
          prisma.service.count({ where: { status: 'ACTIVE' } }),
          prisma.service.count({ where: { status: 'INACTIVE' } }),
        ]);

        return {
          active,
          inactive,
          total: active + inactive,
        };
      },
      { ttl: 3600, tags: ['stats', 'services'] }
    );
  },
};

// Fonction pour les requêtes en lot (batch)
export async function batchQueries<T>(
  queries: Array<() => Promise<T>>
): Promise<T[]> {
  return Promise.all(queries.map(query => query()));
}

// Fonction pour les requêtes avec retry
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) {
        throw lastError;
      }
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError!;
}

// Fonction pour les requêtes avec timeout
export async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number = 5000
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });
  
  return Promise.race([operation, timeoutPromise]);
}
