import React from "react";
import { JourneyComposer } from "@/components/ui/JourneyComposer";
import { OrbitBreadcrumbs } from "@/components/ui/OrbitBreadcrumbs";

const modules = [
  {
    id: "strategy-digitale",
    name: "Stratégie Digitale",
    description: "Définition de la stratégie digitale globale",
    categoryId: "communication",
    price: 1500,
    duration: "2 semaines",
  },
  {
    id: "production-video",
    name: "Production Vidéo",
    description: "Création de contenu vidéo professionnel",
    categoryId: "audiovisuel",
    price: 2500,
    duration: "1 mois",
  },
  {
    id: "organisation-evenement",
    name: "Organisation Événement",
    description: "Gestion complète d'événements",
    categoryId: "evenementiel",
    price: 5000,
    duration: "3 mois",
  },
  {
    id: "identite-visuelle",
    name: "Identité Visuelle",
    description: "Création d'identité de marque",
    categoryId: "design",
    price: 3000,
    duration: "1 mois",
  },
  {
    id: "developpement-web",
    name: "Développement Web",
    description: "Création de sites web modernes",
    categoryId: "web",
    price: 4000,
    duration: "2 mois",
  },
  {
    id: "integration-ia",
    name: "Intégration IA",
    description: "Solutions d'intelligence artificielle",
    categoryId: "ia",
    price: 6000,
    duration: "3 mois",
  },
];

export default function ConfigurateurPage() {
  return (
    <>
      <OrbitBreadcrumbs
        items={[
          { id: "home", label: "Accueil", href: "/", level: 1 },
          { id: "configurateur", label: "Configurateur", level: 2 },
        ]}
        currentId="configurateur"
      />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Journey Composer - Configurateur IA</h1>
        <JourneyComposer
          modules={modules}
          onCompose={(selected) => {
            console.log("Modules sélectionnés:", selected);
            alert(`Parcours composé avec ${selected.length} modules !`);
          }}
        />
      </div>
    </>
  );
}
