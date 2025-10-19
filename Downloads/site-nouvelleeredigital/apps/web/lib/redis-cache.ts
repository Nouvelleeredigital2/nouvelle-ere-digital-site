// Système de cache Redis pour la production

import { Redis } from 'ioredis';
import { cache } from './cache';

// Configuration Redis
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
};

// Instance Redis
let redis: Redis | null = null;

// Fonction pour initialiser Redis
export async function initializeRedis(): Promise<Redis> {
  if (redis) {
    return redis;
  }

  try {
    redis = new Redis(redisConfig);
    
    redis.on('connect', () => {
      console.log('✅ Redis connecté avec succès');
    });

    redis.on('error', (error) => {
      console.error('❌ Erreur Redis:', error);
    });

    redis.on('close', () => {
      console.log('🔌 Connexion Redis fermée');
    });

    // Tester la connexion
    await redis.ping();
    
    // Ajouter l'adaptateur Redis au gestionnaire de cache
    const { RedisCacheAdapter } = await import('./cache');
    cache.addAdapter(new RedisCacheAdapter(redis));
    
    return redis;
  } catch (error) {
    console.error('❌ Impossible de se connecter à Redis:', error);
    throw error;
  }
}

// Fonction pour obtenir l'instance Redis
export function getRedis(): Redis | null {
  return redis;
}

// Fonction pour fermer la connexion Redis
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

// Fonctions utilitaires pour Redis
export class RedisUtils {
  private redis: Redis;

  constructor(redisInstance: Redis) {
    this.redis = redisInstance;
  }

  // Stocker une valeur avec TTL
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  // Récupérer une valeur
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  // Supprimer une clé
  async delete(key: string): Promise<boolean> {
    const result = await this.redis.del(key);
    return result > 0;
  }

  // Vérifier si une clé existe
  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  // Obtenir le TTL d'une clé
  async ttl(key: string): Promise<number> {
    return await this.redis.ttl(key);
  }

  // Incrémenter une valeur
  async increment(key: string, value: number = 1): Promise<number> {
    return await this.redis.incrby(key, value);
  }

  // Décrémenter une valeur
  async decrement(key: string, value: number = 1): Promise<number> {
    return await this.redis.decrby(key, value);
  }

  // Ajouter à une liste
  async lpush(key: string, ...values: any[]): Promise<number> {
    const serialized = values.map(v => JSON.stringify(v));
    return await this.redis.lpush(key, ...serialized);
  }

  // Récupérer des éléments d'une liste
  async lrange(key: string, start: number, stop: number): Promise<any[]> {
    const values = await this.redis.lrange(key, start, stop);
    return values.map(v => JSON.parse(v));
  }

  // Ajouter à un set
  async sadd(key: string, ...values: any[]): Promise<number> {
    const serialized = values.map(v => JSON.stringify(v));
    return await this.redis.sadd(key, ...serialized);
  }

  // Récupérer tous les éléments d'un set
  async smembers(key: string): Promise<any[]> {
    const values = await this.redis.smembers(key);
    return values.map(v => JSON.parse(v));
  }

  // Ajouter à un hash
  async hset(key: string, field: string, value: any): Promise<number> {
    const serialized = JSON.stringify(value);
    return await this.redis.hset(key, field, serialized);
  }

  // Récupérer une valeur d'un hash
  async hget<T>(key: string, field: string): Promise<T | null> {
    const value = await this.redis.hget(key, field);
    return value ? JSON.parse(value) : null;
  }

  // Récupérer toutes les valeurs d'un hash
  async hgetall(key: string): Promise<Record<string, any>> {
    const values = await this.redis.hgetall(key);
    const result: Record<string, any> = {};
    
    for (const [field, value] of Object.entries(values)) {
      result[field] = JSON.parse(value);
    }
    
    return result;
  }

  // Supprimer un champ d'un hash
  async hdel(key: string, field: string): Promise<number> {
    return await this.redis.hdel(key, field);
  }

  // Rechercher des clés
  async keys(pattern: string): Promise<string[]> {
    return await this.redis.keys(pattern);
  }

  // Supprimer des clés par pattern
  async delPattern(pattern: string): Promise<number> {
    const keys = await this.redis.keys(pattern);
    if (keys.length === 0) return 0;
    
    return await this.redis.del(...keys);
  }

  // Obtenir des informations sur Redis
  async info(): Promise<string> {
    return await this.redis.info();
  }

  // Obtenir des statistiques
  async getStats(): Promise<{
    connectedClients: number;
    usedMemory: string;
    totalConnections: number;
    keyspace: Record<string, any>;
  }> {
    const info = await this.redis.info();
    const lines = info.split('\r\n');
    
    const stats: any = {};
    
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        stats[key] = value;
      }
    }
    
    return {
      connectedClients: parseInt(stats.connected_clients || '0'),
      usedMemory: stats.used_memory_human || '0B',
      totalConnections: parseInt(stats.total_connections_received || '0'),
      keyspace: stats.keyspace || {},
    };
  }

  // Nettoyer les clés expirées
  async cleanup(): Promise<number> {
    const keys = await this.redis.keys('*');
    let cleaned = 0;
    
    for (const key of keys) {
      const ttl = await this.redis.ttl(key);
      if (ttl === -2) { // Clé expirée
        await this.redis.del(key);
        cleaned++;
      }
    }
    
    return cleaned;
  }

  // Sauvegarder les données
  async save(): Promise<void> {
    await this.redis.save();
  }

  // Vider la base de données
  async flushdb(): Promise<void> {
    await this.redis.flushdb();
  }

  // Vider toutes les bases de données
  async flushall(): Promise<void> {
    await this.redis.flushall();
  }
}

// Instance globale des utilitaires Redis
let redisUtils: RedisUtils | null = null;

export function getRedisUtils(): RedisUtils | null {
  return redisUtils;
}

// Fonction pour initialiser les utilitaires Redis
export async function initializeRedisUtils(): Promise<RedisUtils> {
  if (redisUtils) {
    return redisUtils;
  }

  const redisInstance = await initializeRedis();
  redisUtils = new RedisUtils(redisInstance);
  
  return redisUtils;
}

// Fonction pour surveiller Redis
export function monitorRedis(): void {
  if (!redis) return;

  setInterval(async () => {
    try {
      const stats = await redisUtils?.getStats();
      if (stats) {
        console.log('📊 Statistiques Redis:', stats);
      }
    } catch (error) {
      console.error('❌ Erreur monitoring Redis:', error);
    }
  }, 60000); // Toutes les minutes
}

// Fonction pour nettoyer Redis périodiquement
export function cleanupRedis(): void {
  if (!redis) return;

  setInterval(async () => {
    try {
      const cleaned = await redisUtils?.cleanup();
      if (cleaned && cleaned > 0) {
        console.log(`🧹 Nettoyage Redis: ${cleaned} clés expirées supprimées`);
      }
    } catch (error) {
      console.error('❌ Erreur nettoyage Redis:', error);
    }
  }, 300000); // Toutes les 5 minutes
}

// Export des types et fonctions
export type { Redis };
export {
  initializeRedis,
  getRedis,
  closeRedis,
  RedisUtils,
  initializeRedisUtils,
  getRedisUtils,
  monitorRedis,
  cleanupRedis,
};
