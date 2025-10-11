import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { SolutionsIAPage } from "@/components/pages/SolutionsIAPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Solutions IA & Showroom — Nouvelle Ère Digital",
  description:
    "Découvrez notre showroom IA interactif avec Journey Composer, Analytics prédictifs et Content Creator. Réservez votre démonstration personnalisée de nos solutions d'intelligence artificielle.",
});

export default function SolutionsIA() {
  return <SolutionsIAPage />;
}
