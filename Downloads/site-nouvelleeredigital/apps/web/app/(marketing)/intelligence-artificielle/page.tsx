import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { IntelligenceArtificiellePage } from "@/components/pages/IntelligenceArtificiellePage";

export const metadata: Metadata = generatePageMetadata({
  title: "Intelligence Artificielle & Innovation — Nouvelle Ère Digital",
  description:
    "L'intelligence artificielle au service de la créativité, de la performance et de l'humain. Découvrez nos solutions IA éthiques et souveraines : copilotes métiers, Journey Composer, formations et R&D responsable.",
});

export default function IntelligenceArtificielle() {
  return <IntelligenceArtificiellePage />;
}
