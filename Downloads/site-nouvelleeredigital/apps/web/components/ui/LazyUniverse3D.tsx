import React, { Suspense, lazy } from "react";

// Lazy load Universe3D pour améliorer les performances
const LazyUniverse3D = lazy(() =>
  import("./Universe3D").then((module) => ({ default: module.Universe3D })),
);

interface LazyUniverse3DWrapperProps {
  services?: any[];
  className?: string;
}

export const LazyUniverse3DWrapper: React.FC<LazyUniverse3DWrapperProps> = ({
  services,
  className = "",
}) => {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-screen bg-background flex items-center justify-center ${className}`}>
          <div className="text-card-foreground text-xl animate-pulse">Chargement de l'Univers 3D...</div>
        </div>
      }
    >
      <LazyUniverse3D services={services} className={className} />
    </Suspense>
  );
};
