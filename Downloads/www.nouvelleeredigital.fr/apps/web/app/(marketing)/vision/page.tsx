import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { VisionPage } from "@/components/pages/VisionPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Vision & Philosophie — Nouvelle Ère Digital",
  description:
    "Replacer le sens et l'humain au cœur de la transformation numérique. Découvrez notre vision, notre philosophie et notre approche de l'innovation responsable.",
});

export default function Vision() {
  return <VisionPage />;
}
