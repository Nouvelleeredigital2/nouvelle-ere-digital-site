import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { DesignPage } from "@/components/pages/DesignPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Création Graphique & Design — Nouvelle Ère Digital",
  description:
    "L'identité visuelle comme langage stratégique. Découvrez notre expertise en identité visuelle, branding, design graphique, webdesign UX/UI et direction artistique globale.",
});

export default function Design() {
  return <DesignPage />;
}
