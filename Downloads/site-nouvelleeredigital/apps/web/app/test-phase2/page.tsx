import React from 'react';
import { LazyUniverse3DWrapper } from '@/components/ui/LazyUniverse3D';

const universeServices = [
  {
    name: "Communication",
    color: 0xf87171,
    colorHex: "#f87171",
    desc: "Stratégies créatives & storytelling digital",
    position: [0, 10, 0] as [number, number, number],
    features: ["SEO/SEA", "Réseaux sociaux", "Content marketing", "Analytics"]
  },
  {
    name: "Audiovisuel",
    color: 0x60a5fa,
    colorHex: "#60a5fa",
    desc: "Production vidéo & contenus immersifs",
    position: [8.7, 5, -5] as [number, number, number],
    features: ["Vidéo corporate", "Motion design", "Photographie", "Post-production"]
  },
];

export default function TestPage() {
  return (
    <div className="space-y-16 p-8">
      <h1 className="text-3xl font-bold">Test des Composants Phase 2</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Universe3D avec Lazy-Loading</h2>
        <div style={{ height: '600px' }}>
          <LazyUniverse3DWrapper services={universeServices} />
        </div>
      </section>
    </div>
  );
}
