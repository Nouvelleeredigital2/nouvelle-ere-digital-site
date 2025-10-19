// Moniteur de performance simplifié

export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  startTimer(name: string): () => void {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      
      this.metrics.get(name)!.push(duration);
    };
  }

  getMetrics(name?: string): any {
    if (name) {
      const values = this.metrics.get(name) || [];
      return {
        name,
        count: values.length,
        average: values.reduce((a, b) => a + b, 0) / values.length || 0,
        min: Math.min(...values) || 0,
        max: Math.max(...values) || 0,
      };
    }

    const allMetrics: any = {};
    for (const [key] of this.metrics) {
      allMetrics[key] = this.getMetrics(key);
    }
    return allMetrics;
  }
}

// Instance globale
export const performanceMonitor = new PerformanceMonitor();

// Fonctions utilitaires
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  const stopTimer = performanceMonitor.startTimer(name);
  try {
    const result = fn();
    stopTimer();
    return result;
  } catch (error) {
    stopTimer();
    throw error;
  }
}

export async function measureFunction<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const stopTimer = performanceMonitor.startTimer(name);
  try {
    const result = await fn();
    stopTimer();
    return result;
  } catch (error) {
    stopTimer();
    throw error;
  }
}
