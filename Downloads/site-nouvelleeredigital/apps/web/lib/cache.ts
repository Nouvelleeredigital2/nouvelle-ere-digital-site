// Système de cache robuste avec support Redis et mémoire

interface CacheOptions {
  ttl?: number; // Time to live en secondes
  tags?: string[]; // Tags pour l'invalidation groupée
  serialize?: boolean; // Sérialisation automatique
}

interface CacheItem<T = any> {
  value: T;
  expiresAt: number;
  tags: string[];
  createdAt: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem>();
  private timers = new Map<string, NodeJS.Timeout>();

  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    const { ttl = 3600, tags = [] } = options;
    
    // Nettoyer l'ancien timer s'il existe
    const existingTimer = this.timers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const expiresAt = Date.now() + (ttl * 1000);
    this.cache.set(key, {
      value,
      expiresAt,
      tags,
      createdAt: Date.now(),
    });

    // Programmer la suppression automatique
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl * 1000);
    
    this.timers.set(key, timer);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      this.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key: string): boolean {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
    
    return this.cache.delete(key);
  }

  invalidateByTags(tags: string[]): void {
    for (const [key, item] of this.cache.entries()) {
      if (tags.some(tag => item.tags.includes(tag))) {
        this.delete(key);
      }
    }
  }

  clear(): void {
    // Nettoyer tous les timers
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  stats(): {
    size: number;
    hitRate: number;
    keys: string[];
  } {
    return {
      size: this.cache.size,
      hitRate: 0, // TODO: Implémenter le tracking des hits
      keys: this.keys(),
    };
  }
}

// Instance globale du cache mémoire
const memoryCache = new MemoryCache();

// Interface pour les adaptateurs de cache
interface CacheAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  delete(key: string): Promise<boolean>;
  invalidateByTags(tags: string[]): Promise<void>;
  clear(): Promise<void>;
}

// Adaptateur Redis (à implémenter avec Redis)
class RedisCacheAdapter implements CacheAdapter {
  private redis: any; // Redis client

  constructor(redisClient: any) {
    this.redis = redisClient;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erreur Redis get:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    try {
      const { ttl = 3600, tags = [] } = options;
      
      // Stocker la valeur avec TTL
      await this.redis.setex(key, ttl, JSON.stringify(value));
      
      // Gérer les tags pour l'invalidation
      if (tags.length > 0) {
        const tagKey = `tags:${key}`;
        await this.redis.setex(tagKey, ttl, JSON.stringify(tags));
      }
    } catch (error) {
      console.error('Erreur Redis set:', error);
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(key);
      await this.redis.del(`tags:${key}`);
      return result > 0;
    } catch (error) {
      console.error('Erreur Redis delete:', error);
      return false;
    }
  }

  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      // Rechercher toutes les clés avec ces tags
      const keys = await this.redis.keys('tags:*');
      
      for (const key of keys) {
        const keyTags = await this.redis.get(key);
        if (keyTags) {
          const parsedTags = JSON.parse(keyTags);
          if (tags.some(tag => parsedTags.includes(tag))) {
            const originalKey = key.replace('tags:', '');
            await this.delete(originalKey);
          }
        }
      }
    } catch (error) {
      console.error('Erreur Redis invalidateByTags:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushdb();
    } catch (error) {
      console.error('Erreur Redis clear:', error);
    }
  }
}

// Gestionnaire de cache principal
class CacheManager {
  private adapters: CacheAdapter[] = [];
  private fallbackToMemory = true;

  constructor() {
    // Toujours utiliser le cache mémoire comme fallback
    this.adapters.push({
      get: async (key: string) => memoryCache.get(key),
      set: async (key: string, value: any, options?: CacheOptions) => memoryCache.set(key, value, options),
      delete: async (key: string) => memoryCache.delete(key),
      invalidateByTags: async (tags: string[]) => memoryCache.invalidateByTags(tags),
      clear: async () => memoryCache.clear(),
    });
  }

  addAdapter(adapter: CacheAdapter): void {
    this.adapters.unshift(adapter); // Ajouter en premier (priorité)
  }

  async get<T>(key: string): Promise<T | null> {
    for (const adapter of this.adapters) {
      try {
        const value = await adapter.get<T>(key);
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.error(`Erreur cache adapter get ${key}:`, error);
      }
    }
    return null;
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const promises = this.adapters.map(async (adapter) => {
      try {
        await adapter.set(key, value, options);
      } catch (error) {
        console.error(`Erreur cache adapter set ${key}:`, error);
      }
    });
    
    await Promise.allSettled(promises);
  }

  async delete(key: string): Promise<boolean> {
    const results = await Promise.allSettled(
      this.adapters.map(adapter => adapter.delete(key))
    );
    
    return results.some(result => result.status === 'fulfilled' && result.value);
  }

  async invalidateByTags(tags: string[]): Promise<void> {
    const promises = this.adapters.map(async (adapter) => {
      try {
        await adapter.invalidateByTags(tags);
      } catch (error) {
        console.error(`Erreur cache adapter invalidateByTags:`, error);
      }
    });
    
    await Promise.allSettled(promises);
  }

  async clear(): Promise<void> {
    const promises = this.adapters.map(async (adapter) => {
      try {
        await adapter.clear();
      } catch (error) {
        console.error(`Erreur cache adapter clear:`, error);
      }
    });
    
    await Promise.allSettled(promises);
  }

  // Méthodes utilitaires pour les clés de cache
  generateKey(prefix: string, ...parts: (string | number)[]): string {
    return `${prefix}:${parts.join(':')}`;
  }

  // Tags prédéfinis
  static readonly TAGS = {
    PAGES: 'pages',
    SERVICES: 'services',
    MEDIA: 'media',
    USERS: 'users',
    ANALYTICS: 'analytics',
    THEMES: 'themes',
  } as const;
}

// Instance globale du gestionnaire de cache
export const cache = new CacheManager();

// Fonctions utilitaires pour le cache
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  // Essayer de récupérer depuis le cache
  const cached = await cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Exécuter la fonction et mettre en cache
  const result = await fetcher();
  await cache.set(key, result, options);
  
  return result;
}

// Cache avec invalidation automatique
export async function withCacheInvalidation<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  // Invalider d'abord si nécessaire
  if (options.tags && options.tags.length > 0) {
    await cache.invalidateByTags(options.tags);
  }

  return withCache(key, fetcher, options);
}

// Cache pour les requêtes Prisma
export async function withPrismaCache<T>(
  model: string,
  operation: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = cache.generateKey('prisma', model, operation);
  const tags = [model, ...(options.tags || [])];
  
  return withCache(key, fetcher, { ...options, tags });
}

// Cache pour les pages statiques
export async function withPageCache<T>(
  slug: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = cache.generateKey('page', slug);
  const tags = [CacheManager.TAGS.PAGES, ...(options.tags || [])];
  
  return withCache(key, fetcher, { ...options, tags });
}

// Cache pour les services
export async function withServiceCache<T>(
  serviceId: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = cache.generateKey('service', serviceId);
  const tags = [CacheManager.TAGS.SERVICES, ...(options.tags || [])];
  
  return withCache(key, fetcher, { ...options, tags });
}

// Cache pour les médias
export async function withMediaCache<T>(
  mediaId: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = cache.generateKey('media', mediaId);
  const tags = [CacheManager.TAGS.MEDIA, ...(options.tags || [])];
  
  return withCache(key, fetcher, { ...options, tags });
}

// Fonction pour invalider le cache par modèle
export async function invalidateCacheByModel(model: string): Promise<void> {
  await cache.invalidateByTags([model]);
}

// Fonction pour invalider le cache par tags
export async function invalidateCacheByTags(tags: string[]): Promise<void> {
  await cache.invalidateByTags(tags);
}

// Export des classes pour usage avancé
export { CacheManager, MemoryCache, RedisCacheAdapter };
export type { CacheOptions, CacheAdapter };
