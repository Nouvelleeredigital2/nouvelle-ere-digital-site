import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { EngagementsRSEPage } from "@/components/pages/EngagementsRSEPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Engagements & RSE — Nouvelle Ère Digital",
  description:
    "Innover, oui — mais toujours de manière responsable. Découvrez nos engagements RSE : environnemental, social, éthique numérique et gouvernance transparente pour une innovation durable et humaine.",
});

export default function EngagementsRSE() {
  return <EngagementsRSEPage />;
}
