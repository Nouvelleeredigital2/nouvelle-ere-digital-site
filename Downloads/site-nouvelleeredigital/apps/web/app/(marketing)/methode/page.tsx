import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { MethodePage } from "@/components/pages/MethodePage";

export const metadata: Metadata = generatePageMetadata({
  title: "Méthode & Expérience Client — Nouvelle Ère Digital",
  description:
    "Une approche fondée sur l'écoute, la clarté et la mesure. Découvrez notre méthodologie en 5 étapes : diagnostic, stratégie, production, diffusion et transmission pour une expérience client optimale.",
});

export default function Methode() {
  return <MethodePage />;
}
