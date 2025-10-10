import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { DeveloppementPage } from "@/components/pages/DeveloppementPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Développement Web & Expériences Numériques — Nouvelle Ère Digital",
  description:
    "Des plateformes performantes, évolutives et souveraines. Découvrez notre expertise en sites web, applications sur mesure, automatisation IA, hébergement sécurisé et expériences numériques innovantes.",
});

export default function Developpement() {
  return <DeveloppementPage />;
}
