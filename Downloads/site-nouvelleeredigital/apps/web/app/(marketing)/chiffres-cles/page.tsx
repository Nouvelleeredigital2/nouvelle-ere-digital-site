import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ChiffresClesPage } from "@/components/pages/ChiffresClesPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Chiffres Clés — Nouvelle Ère Digital",
  description:
    "Notre performance en quelques repères. Découvrez nos indicateurs principaux : 15 ans d'expérience, 300+ projets, 96% de satisfaction, 100% souveraineté des données et croissance responsable.",
});

export default function ChiffresCles() {
  return <ChiffresClesPage />;
}
