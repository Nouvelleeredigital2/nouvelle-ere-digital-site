import { lazy, Suspense, ComponentType, useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingStates';

// Interface pour les options de lazy loading
interface LazyLoadingOptions {
  fallback?: React.ReactNode;
  delay?: number;
  ssr?: boolean;
}

// Composant de fallback par défaut
const DefaultFallback = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' } = {}) => (
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner size={size} />
  </div>
);

// Fonction utilitaire pour créer des composants lazy avec fallback personnalisé
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: LazyLoadingOptions = {}
): ComponentType<React.ComponentProps<T>> {
  const { fallback = <DefaultFallback />, delay = 0, ssr = false } = options;

  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Composants lazy pré-configurés avec des fallbacks spécifiques
export const LazyUniverse3D = createLazyComponent(
  () => import('@/components/ui/Universe3D').then(mod => ({ default: mod.Universe3D })),
  {
    fallback: (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Chargement de l'univers 3D...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazyPersonaAnalytics = createLazyComponent(
  () => import('@/components/ui/PersonaAnalyticsDashboard').then(mod => ({ default: mod.PersonaAnalyticsDashboard })),
  {
    fallback: (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Chargement des analytics...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazyMediaLibrary = createLazyComponent(
  () => import('@/components/media/MediaLibrary').then(mod => ({ default: mod.MediaLibrary })),
  {
    fallback: (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Chargement de la bibliothèque...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazyJourneyComposer = createLazyComponent(
  () => import('@/components/ui/JourneyComposer').then(mod => ({ default: mod.JourneyComposer })),
  {
    fallback: (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Chargement du compositeur...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazyAnimationCustomizer = createLazyComponent(
  () => import('@/components/ui/AnimationCustomizer').then(mod => ({ default: mod.AnimationCustomizer })),
  {
    fallback: (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Chargement du customiseur...</span>
      </div>
    ),
    ssr: false,
  }
);

// Hook pour le lazy loading avec intersection observer
export function useLazyLoading<T>(
  importFunc: () => Promise<T>,
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.1, rootMargin = '50px' } = options;

  const [abstract, setAbstract] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !abstract && !isLoading) {
          setIsLoading(true);
          importFunc()
            .then((module) => {
              setAbstract(module);
              setError(null);
            })
            .catch((err) => {
              setError(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [abstract, isLoading, threshold, rootMargin]);

  return { ref, abstract, isLoading, error };
}

// Composant wrapper pour le lazy loading avec intersection observer
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazyWrapper({ 
  children, 
  fallback = <DefaultFallback />, 
  threshold = 0.1, 
  rootMargin = '50px' 
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
}
