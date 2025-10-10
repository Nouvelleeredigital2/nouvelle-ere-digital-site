import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AudiovisuelPage } from "@/components/pages/AudiovisuelPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Audiovisuel & Création Multimédia — Nouvelle Ère Digital",
  description:
    "Donner vie à l'image, amplifier les émotions. Découvrez notre expertise en captation, production, création de films, studio photo et audiovisuel augmenté avec IA.",
});

export default function Audiovisuel() {
  return <AudiovisuelPage />;
}
