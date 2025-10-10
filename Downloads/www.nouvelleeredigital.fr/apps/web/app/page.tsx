import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AccueilPage } from "@/components/pages/AccueilPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Accueil — Nouvelle Ère Digital",
  description:
    "De l’idée à l’impact : expériences de marque engageantes, mesurables et humaines. Agence créative & technologique.",
});

export default function HomePage() {
  return <AccueilPage />;
}
