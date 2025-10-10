import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { CommunicationPage } from "@/components/pages/CommunicationPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Communication & Marketing Digital — Nouvelle Ère Digital",
  description:
    "Faire briller les marques dans l'univers numérique. Découvrez notre approche intégrée : stratégie, campagnes digitales, contenus, optimisation et data marketing.",
});

export default function Communication() {
  return <CommunicationPage />;
}
