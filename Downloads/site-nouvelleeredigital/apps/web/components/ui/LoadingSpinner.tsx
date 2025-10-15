// apps/web/components/ui/LoadingSpinner.tsx
"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`${sizeClasses[size]} border-2 border-muted-foreground/20 border-t-primary rounded-full`}
      />
    </div>
  );
}

// Composant de squelette pour les états de chargement
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted/50 rounded ${className}`} />
  );
}

// Grille de squelette pour les services
export function ServiceSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-card rounded-lg border border-border">
          <Skeleton className="w-12 h-12 rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
