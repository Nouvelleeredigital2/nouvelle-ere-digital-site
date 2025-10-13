"use client";

import { useState, useEffect } from 'react';
import { AccueilPage } from "@/components/pages/AccueilPage";
import { CreativeProfileSelector } from "@/components/ui/CreativeProfileSelector";

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà choisi un persona
    const hasChosenPersona = localStorage.getItem('has-chosen-persona');
    setShowOnboarding(!hasChosenPersona);
  }, []);

  if (showOnboarding) {
    return <CreativeProfileSelector onComplete={() => setShowOnboarding(false)} />;
  }

  return <AccueilPage />;
}
