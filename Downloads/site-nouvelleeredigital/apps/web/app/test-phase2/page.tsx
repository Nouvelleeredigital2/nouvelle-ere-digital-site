import React from 'react';
import { Canvas3D_NED } from '@/components/ui/Canvas3D_NED';
import { JourneyComposer } from '@/components/ui/JourneyComposer';
import { Carousel3DBundles } from '@/components/ui/Carousel3DBundles';

const modules = [
  {
    id: 'strategy-digitale',
    name: 'Stratégie Digitale',
    description: 'Définition de la stratégie digitale globale',
    categoryId: 'communication',
    price: 1500,
    duration: '2 semaines',
  },
  {
    id: 'production-video',
    name: 'Production Vidéo',
    description: 'Création de contenu vidéo professionnel',
    categoryId: 'audiovisuel',
    price: 2500,
    duration: '1 mois',
  },
];

const bundles = [
  {
    id: 'conference-pro',
    name: 'Conference Pro',
    description: 'Pack complet pour conférences professionnelles',
    modules: ['strategy-digitale', 'production-video'],
    price: 8000,
    discount: 10,
    color: '#ff6b6b',
  },
  {
    id: 'impact-stage',
    name: 'Impact Stage',
    description: 'Solution événementielle avec identité visuelle',
    modules: ['organisation-evenement', 'identite-visuelle'],
    price: 12000,
    discount: 15,
    color: '#4ecdc4',
  },
];

export default function TestPage() {
  return (
    <div className="space-y-16 p-8">
      <h1 className="text-3xl font-bold">Test des Composants Phase 2</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Canvas3D_NED</h2>
        <Canvas3D_NED width="800px" height="400px" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">JourneyComposer</h2>
        <JourneyComposer modules={modules} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Carousel3DBundles</h2>
        <Carousel3DBundles bundles={bundles} />
      </section>
    </div>
  );
}
