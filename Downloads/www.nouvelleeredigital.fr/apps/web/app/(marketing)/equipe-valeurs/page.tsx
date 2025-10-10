import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { EquipeValeursPage } from "@/components/pages/EquipeValeursPage";

export const metadata: Metadata = generatePageMetadata({
  title: "L'Équipe & Les Valeurs — Nouvelle Ère Digital",
  description:
    "Une équipe humaine, créative et exigeante. Découvrez notre culture, nos 6 pôles d'expertise, notre modèle de travail collaboratif et nos 6 valeurs fondamentales : simplicité, créativité, transparence, souveraineté, excellence et accompagnement humain.",
});

export default function EquipeValeurs() {
  return <EquipeValeursPage />;
}
