// Optimisations pour les réponses API

import { NextResponse } from 'next/server';
import { gzip, deflate } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const deflateAsync = promisify(deflate);

// Types pour les options d'optimisation
interface OptimizationOptions {
  compress?: boolean;
  cache?: {
    maxAge?: number;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    mustRevalidate?: boolean;
  };
  etag?: boolean;
  preload?: string[];
  prefetch?: string[];
}

// Fonction pour créer une réponse optimisée
export function createOptimizedResponse(
  data: any,
  status: number = 200,
  options: OptimizationOptions = {}
): NextResponse {
  const {
    compress = true,
    cache = { maxAge: 3600 },
    etag = true,
    preload = [],
    prefetch = [],
  } = options;

  // Sérialiser les données
  const jsonString = JSON.stringify(data);
  const buffer = Buffer.from(jsonString, 'utf8');

  // Créer la réponse
  const response = new NextResponse(new Uint8Array(buffer), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': buffer.length.toString(),
    },
  });

  // Ajouter les headers de cache
  if (cache.maxAge) {
    response.headers.set('Cache-Control', `public, max-age=${cache.maxAge}`);
  }
  
  if (cache.sMaxAge) {
    response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, s-maxage=${cache.sMaxAge}`);
  }
  
  if (cache.staleWhileRevalidate) {
    response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, stale-while-revalidate=${cache.staleWhileRevalidate}`);
  }
  
  if (cache.mustRevalidate) {
    response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, must-revalidate`);
  }

  // Ajouter ETag pour la validation de cache
  if (etag) {
    const etagValue = `"${Buffer.from(jsonString).toString('base64')}"`;
    response.headers.set('ETag', etagValue);
  }

  // Ajouter les headers de préchargement
  if (preload.length > 0) {
    response.headers.set('Link', preload.map(url => `<${url}>; rel=preload`).join(', '));
  }
  
  if (prefetch.length > 0) {
    response.headers.set('Link', `${response.headers.get('Link') || ''}, ${prefetch.map(url => `<${url}>; rel=prefetch`).join(', ')}`);
  }

  // Ajouter les headers de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Fonction pour créer une réponse compressée
export async function createCompressedResponse(
  data: any,
  status: number = 200,
  options: OptimizationOptions = {}
): Promise<NextResponse> {
  const { compress = true, ...otherOptions } = options;
  
  if (!compress) {
    return createOptimizedResponse(data, status, options);
  }

  const jsonString = JSON.stringify(data);
  const buffer = Buffer.from(jsonString, 'utf8');

  // Compresser avec gzip
  const compressed = await gzipAsync(buffer);
  
  const response = new NextResponse(new Uint8Array(compressed), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Encoding': 'gzip',
      'Content-Length': compressed.length.toString(),
    },
  });

  // Ajouter les autres options d'optimisation
  if (otherOptions.cache) {
    const { maxAge, sMaxAge, staleWhileRevalidate, mustRevalidate } = otherOptions.cache;
    
    if (maxAge) {
      response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
    }
    
    if (sMaxAge) {
      response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, s-maxage=${sMaxAge}`);
    }
    
    if (staleWhileRevalidate) {
      response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, stale-while-revalidate=${staleWhileRevalidate}`);
    }
    
    if (mustRevalidate) {
      response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, must-revalidate`);
    }
  }

  // Ajouter ETag
  if (otherOptions.etag) {
    const etagValue = `"${Buffer.from(jsonString).toString('base64')}"`;
    response.headers.set('ETag', etagValue);
  }

  // Ajouter les headers de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Fonction pour créer une réponse avec pagination
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  },
  options: OptimizationOptions = {}
): NextResponse {
  const response = {
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: pagination.totalPages,
      hasNext: pagination.page < pagination.totalPages,
      hasPrev: pagination.page > 1,
    },
  };

  return createOptimizedResponse(response, 200, options);
}

// Fonction pour créer une réponse d'erreur optimisée
export function createErrorResponse(
  message: string,
  status: number = 500,
  details?: any,
  options: OptimizationOptions = {}
): NextResponse {
  const response = {
    error: message,
    status,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
  };

  return createOptimizedResponse(response, status, options);
}

// Fonction pour créer une réponse de succès
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  options: OptimizationOptions = {}
): NextResponse {
  const response = {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  };

  return createOptimizedResponse(response, 200, options);
}

// Fonction pour valider les headers de cache
export function validateCacheHeaders(request: Request): {
  ifNoneMatch?: string;
  ifModifiedSince?: string;
  cacheControl?: string;
} {
  const ifNoneMatch = request.headers.get('if-none-match');
  const ifModifiedSince = request.headers.get('if-modified-since');
  const cacheControl = request.headers.get('cache-control');

  return {
    ifNoneMatch: ifNoneMatch || undefined,
    ifModifiedSince: ifModifiedSince || undefined,
    cacheControl: cacheControl || undefined,
  };
}

// Fonction pour créer une réponse 304 Not Modified
export function createNotModifiedResponse(
  etag: string,
  lastModified?: string
): NextResponse {
  const response = new NextResponse(null, { status: 304 });
  
  response.headers.set('ETag', etag);
  
  if (lastModified) {
    response.headers.set('Last-Modified', lastModified);
  }
  
  return response;
}

// Fonction pour créer une réponse avec des headers de préchargement
export function createPreloadResponse<T>(
  data: T,
  preloadUrls: string[],
  options: OptimizationOptions = {}
): NextResponse {
  const response = createOptimizedResponse(data, 200, {
    ...options,
    preload: preloadUrls,
  });

  return response;
}

// Fonction pour créer une réponse avec des headers de préfetch
export function createPrefetchResponse<T>(
  data: T,
  prefetchUrls: string[],
  options: OptimizationOptions = {}
): NextResponse {
  const response = createOptimizedResponse(data, 200, {
    ...options,
    prefetch: prefetchUrls,
  });

  return response;
}

// Fonction pour créer une réponse avec des headers de cache avancés
export function createAdvancedCacheResponse<T>(
  data: T,
  cacheOptions: {
    maxAge: number;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    mustRevalidate?: boolean;
    immutable?: boolean;
  },
  options: OptimizationOptions = {}
): NextResponse {
  const response = createOptimizedResponse(data, 200, {
    ...options,
    cache: cacheOptions,
  });

  // Ajouter des headers de cache avancés
  if (cacheOptions.immutable) {
    response.headers.set('Cache-Control', `${response.headers.get('Cache-Control')}, immutable`);
  }

  return response;
}

// Fonction pour créer une réponse avec des headers de sécurité
export function createSecureResponse<T>(
  data: T,
  options: OptimizationOptions = {}
): NextResponse {
  const response = createOptimizedResponse(data, 200, options);

  // Ajouter des headers de sécurité supplémentaires
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

// Fonction pour créer une réponse avec des headers de performance
export function createPerformanceResponse<T>(
  data: T,
  options: OptimizationOptions = {}
): NextResponse {
  const response = createOptimizedResponse(data, 200, options);

  // Ajouter des headers de performance
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

// Export des types et fonctions
export type { OptimizationOptions };
