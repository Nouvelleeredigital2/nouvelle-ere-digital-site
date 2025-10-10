import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ExpertisesPage } from "@/components/pages/ExpertisesPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Nos Expertises Intégrées — Nouvelle Ère Digital",
  description:
    "Une approche globale, créative et technologique au service de votre performance. Découvrez nos six pôles d'expertise interconnectés : communication, audiovisuel, événementiel, design, web et IA.",
});

export default function Expertises() {
  return <ExpertisesPage />;
}
