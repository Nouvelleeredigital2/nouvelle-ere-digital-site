import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/LoadingStates';

// Composants 3D lourds avec import dynamique
export const Universe3D = dynamic(
  () => import('@/components/ui/Universe3D').then(mod => ({ default: mod.Universe3D })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement de l'univers 3D...</span>
      </div>
    ),
  }
);

export const TestThree = dynamic(
  () => import('@/components/ui/TestThree').then(mod => ({ default: mod.TestThree })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement de la scène 3D...</span>
      </div>
    ),
  }
);

export const Canvas3D_NED = dynamic(
  () => import('@/components/ui/Canvas3D_NED').then(mod => ({ default: mod.Canvas3D_NED })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement du canvas 3D...</span>
      </div>
    ),
  }
);

// Composants de visualisation complexes
export const TrajectoireIAOverlay = dynamic(
  () => import('@/components/ui/TrajectoireIAOverlay').then(mod => ({ default: mod.TrajectoireIAOverlay })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
        <span className="ml-2">Chargement de la visualisation...</span>
      </div>
    ),
  }
);

export const TrajectoireSVG = dynamic(
  () => import('@/components/ui/TrajectoireSVG').then(mod => ({ default: mod.TrajectoireSVG })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
        <span className="ml-2">Chargement du SVG...</span>
      </div>
    ),
  }
);

// Composants d'administration lourds
export const PersonaAnalyticsDashboard = dynamic(
  () => import('@/components/ui/PersonaAnalyticsDashboard').then(mod => ({ default: mod.PersonaAnalyticsDashboard })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement du tableau de bord...</span>
      </div>
    ),
  }
);

export const UserTestingPage = dynamic(
  () => import('@/components/ui/UserTestingPage').then(mod => ({ default: mod.UserTestingPage })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement des tests utilisateur...</span>
      </div>
    ),
  }
);

// Composants de configuration avancée
export const AnimationCustomizer = dynamic(
  () => import('@/components/ui/AnimationCustomizer').then(mod => ({ default: mod.AnimationCustomizer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement du customiseur...</span>
      </div>
    ),
  }
);

export const ThemeCustomizer = dynamic(
  () => import('@/components/ui/ThemeCustomizer').then(mod => ({ default: mod.ThemeCustomizer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement du thème...</span>
      </div>
    ),
  }
);

// Composants de studio avancés
export const AdvancedThemeSelector = dynamic(
  () => import('@/components/ui/AdvancedThemeSelector').then(mod => ({ default: mod.AdvancedThemeSelector })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
        <span className="ml-2">Chargement du sélecteur...</span>
      </div>
    ),
  }
);

export const JourneyComposer = dynamic(
  () => import('@/components/ui/JourneyComposer').then(mod => ({ default: mod.JourneyComposer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement du compositeur...</span>
      </div>
    ),
  }
);

// Composants de médias complexes
export const MediaLibrary = dynamic(
  () => import('@/components/media/MediaLibrary').then(mod => ({ default: mod.MediaLibrary })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Chargement de la bibliothèque...</span>
      </div>
    ),
  }
);

// Composants de preview
export const PreviewModal = dynamic(
  () => import('@/components/studio/PreviewModal').then(mod => ({ default: mod.PreviewModal })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
        <span className="ml-2">Chargement de l'aperçu...</span>
      </div>
    ),
  }
);
