import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { MissionPage } from "@/components/pages/MissionPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Mission & Promesse — Nouvelle Ère Digital",
  description:
    "Un partenaire unique, une vision globale, un impact mesurable. Découvrez notre mission, nos promesses et notre approche intégrée pour transformer votre communication.",
});

export default function Mission() {
  return <MissionPage />;
}
