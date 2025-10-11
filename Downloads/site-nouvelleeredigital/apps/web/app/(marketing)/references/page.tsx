import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ReferencesPage } from "@/components/pages/ReferencesPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Références & Réalisations — Nouvelle Ère Digital",
  description:
    "Des expériences concrètes, des résultats mesurables. Découvrez nos réalisations marquantes : événements hybrides, stratégies digitales, formations IA, identités visuelles et plateformes sur mesure.",
});

export default function References() {
  return <ReferencesPage />;
}
