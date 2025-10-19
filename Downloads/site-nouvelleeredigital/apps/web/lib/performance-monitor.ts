// Système de monitoring des performances

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  tags?: Record<string, string>;
}

interface PerformanceReport {
  metrics: PerformanceMetric[];
  summary: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
  };
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private requestCount = 0;
  private errorCount = 0;
  private cacheHits = 0;
  private cacheMisses = 0;
  private totalResponseTime = 0;

  // Enregistrer une métrique de performance
  recordMetric(name: string, value: number, unit: string, tags?: Record<string, string>): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      tags,
    };

    this.metrics.push(metric);

    // Garder seulement les 1000 dernières métriques
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // Enregistrer le temps de réponse d'une requête
  recordRequest(duration: number, success: boolean = true): void {
    this.requestCount++;
    this.totalResponseTime += duration;

    if (!success) {
      this.errorCount++;
    }

    this.recordMetric('request_duration', duration, 'ms', {
      success: success.toString(),
    });
  }

  // Enregistrer un hit de cache
  recordCacheHit(): void {
    this.cacheHits++;
    this.recordMetric('cache_hit', 1, 'count');
  }

  // Enregistrer un miss de cache
  recordCacheMiss(): void {
    this.cacheMisses++;
    this.recordMetric('cache_miss', 1, 'count');
  }

  // Enregistrer l'utilisation mémoire
  recordMemoryUsage(): void {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      
      this.recordMetric('memory_heap_used', memUsage.heapUsed, 'bytes');
      this.recordMetric('memory_heap_total', memUsage.heapTotal, 'bytes');
      this.recordMetric('memory_external', memUsage.external, 'bytes');
      this.recordMetric('memory_rss', memUsage.rss, 'bytes');
    }
  }

  // Enregistrer l'utilisation CPU
  recordCPUUsage(): void {
    if (typeof process !== 'undefined' && process.cpuUsage) {
      const cpuUsage = process.cpuUsage();
      const totalCpuTime = cpuUsage.user + cpuUsage.system;
      
      this.recordMetric('cpu_user', cpuUsage.user, 'microseconds');
      this.recordMetric('cpu_system', cpuUsage.system, 'microseconds');
      this.recordMetric('cpu_total', totalCpuTime, 'microseconds');
    }
  }

  // Enregistrer les métriques de base de données
  recordDatabaseQuery(duration: number, query: string, success: boolean = true): void {
    this.recordMetric('database_query_duration', duration, 'ms', {
      query: query.substring(0, 50), // Limiter la longueur
      success: success.toString(),
    });
  }

  // Enregistrer les métriques de cache
  recordCacheOperation(operation: string, duration: number, success: boolean = true): void {
    this.recordMetric('cache_operation_duration', duration, 'ms', {
      operation,
      success: success.toString(),
    });
  }

  // Générer un rapport de performance
  generateReport(): PerformanceReport {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 3600000); // Dernière heure

    const averageResponseTime = this.requestCount > 0 ? this.totalResponseTime / this.requestCount : 0;
    const errorRate = this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;
    const cacheHitRate = (this.cacheHits + this.cacheMisses) > 0 ? 
      (this.cacheHits / (this.cacheHits + this.cacheMisses)) * 100 : 0;

    return {
      metrics: recentMetrics,
      summary: {
        totalRequests: this.requestCount,
        averageResponseTime,
        errorRate,
        cacheHitRate,
      },
      timestamp: now,
    };
  }

  // Obtenir les métriques par nom
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.name === name);
  }

  // Obtenir les métriques par tag
  getMetricsByTag(tag: string, value: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.tags?.[tag] === value);
  }

  // Obtenir les métriques récentes
  getRecentMetrics(minutes: number = 60): PerformanceMetric[] {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.metrics.filter(m => m.timestamp >= cutoff);
  }

  // Calculer les statistiques pour une métrique
  getMetricStats(name: string): {
    count: number;
    min: number;
    max: number;
    average: number;
    p95: number;
    p99: number;
  } | null {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return null;

    const values = metrics.map(m => m.value).sort((a, b) => a - b);
    const count = values.length;
    const min = values[0];
    const max = values[count - 1];
    const average = values.reduce((sum, val) => sum + val, 0) / count;
    const p95Index = Math.floor(count * 0.95);
    const p99Index = Math.floor(count * 0.99);

    return {
      count,
      min,
      max,
      average,
      p95: values[p95Index],
      p99: values[p99Index],
    };
  }

  // Réinitialiser les métriques
  reset(): void {
    this.metrics = [];
    this.requestCount = 0;
    this.errorCount = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.totalResponseTime = 0;
  }

  // Exporter les métriques
  exportMetrics(): string {
    return JSON.stringify(this.generateReport(), null, 2);
  }

  // Importer les métriques
  importMetrics(data: string): void {
    try {
      const report = JSON.parse(data) as PerformanceReport;
      this.metrics = report.metrics;
      this.requestCount = report.summary.totalRequests;
      this.errorCount = Math.floor((report.summary.errorRate / 100) * this.requestCount);
      this.totalResponseTime = report.summary.averageResponseTime * this.requestCount;
    } catch (error) {
      console.error('Erreur lors de l\'import des métriques:', error);
    }
  }
}

// Instance globale du moniteur de performance
export const performanceMonitor = new PerformanceMonitor();

// Décorateur pour mesurer les performances des fonctions
export function measurePerformance(name: string, tags?: Record<string, string>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      let success = true;

      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        success = false;
        throw error;
      } finally {
        const duration = Date.now() - start;
        performanceMonitor.recordMetric(name, duration, 'ms', {
          ...tags,
          success: success.toString(),
        });
      }
    };

    return descriptor;
  };
}

// Fonction pour mesurer les performances d'une fonction
export async function measureFunction<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const start = Date.now();
  let success = true;

  try {
    const result = await fn();
    return result;
  } catch (error) {
    success = false;
    throw error;
  } finally {
    const duration = Date.now() - start;
    performanceMonitor.recordMetric(name, duration, 'ms', {
      ...tags,
      success: success.toString(),
    });
  }
}

// Fonction pour mesurer les performances d'une requête HTTP
export function measureRequest(req: Request, res: Response): void {
  const start = Date.now();
  const method = req.method;
  const url = req.url;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const success = res.statusCode < 400;
    
    performanceMonitor.recordRequest(duration, success);
    performanceMonitor.recordMetric('http_request', duration, 'ms', {
      method,
      url,
      status: res.statusCode.toString(),
      success: success.toString(),
    });
  });
}

// Fonction pour mesurer les performances d'une requête de base de données
export function measureDatabaseQuery<T>(
  query: string,
  operation: () => Promise<T>
): Promise<T> {
  return measureFunction('database_query', operation, {
    query: query.substring(0, 50),
  });
}

// Fonction pour mesurer les performances d'une opération de cache
export function measureCacheOperation<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  return measureFunction('cache_operation', fn, {
    operation,
  });
}

// Fonction pour obtenir les métriques en temps réel
export function getRealTimeMetrics(): {
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  memoryUsage: number;
} {
  const report = performanceMonitor.generateReport();
  const recentMetrics = performanceMonitor.getRecentMetrics(1); // Dernière minute

  const requestsPerSecond = recentMetrics.filter(m => m.name === 'request_duration').length / 60;
  const memoryStats = performanceMonitor.getMetricStats('memory_heap_used');

  return {
    requestsPerSecond,
    averageResponseTime: report.summary.averageResponseTime,
    errorRate: report.summary.errorRate,
    cacheHitRate: report.summary.cacheHitRate,
    memoryUsage: memoryStats?.average || 0,
  };
}

// Fonction pour surveiller les performances en continu
export function startPerformanceMonitoring(intervalMs: number = 60000): NodeJS.Timeout {
  return setInterval(() => {
    performanceMonitor.recordMemoryUsage();
    performanceMonitor.recordCPUUsage();
    
    // Log des métriques importantes
    const metrics = getRealTimeMetrics();
    console.log('Métriques de performance:', metrics);
  }, intervalMs);
}

// Export des types et classes
export { PerformanceMonitor, PerformanceMetric, PerformanceReport };
export { measurePerformance, measureFunction, measureRequest, measureDatabaseQuery, measureCacheOperation };
export { getRealTimeMetrics, startPerformanceMonitoring };
