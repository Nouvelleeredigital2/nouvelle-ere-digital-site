import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { EvenementielPage } from "@/components/pages/EvenementielPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Événementiel & Technologie Scénique — Nouvelle Ère Digital",
  description:
    "Transformer la technique en émotion, la scène en expérience. Découvrez notre expertise sous la marque Nouvelle Ère Event : sonorisation, éclairage, structures, murs LED, captation et animations IA.",
});

export default function Evenementiel() {
  return <EvenementielPage />;
}
