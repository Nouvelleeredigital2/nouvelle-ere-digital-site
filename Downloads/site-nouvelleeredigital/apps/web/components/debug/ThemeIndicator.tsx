// apps/web/components/debug/ThemeIndicator.tsx
"use client";

import { usePersona } from '@/components/context/PersonaProvider';

export function ThemeIndicator() {
  const { persona } = usePersona();

  if (!persona) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          🎨 Thème Actif
        </div>
        <div className="text-sm font-bold text-foreground mb-1">
          {persona.name}
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-secondary"></div>
          <div className="w-3 h-3 rounded-full bg-accent"></div>
        </div>
      </div>
    </div>
  );
}
