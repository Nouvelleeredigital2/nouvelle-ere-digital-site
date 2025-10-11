import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FormationsPage } from "@/components/pages/FormationsPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Formations & Accompagnement — Nouvelle Ère Digital",
  description:
    "Transmettre les savoirs, développer les talents. Découvrez nos formations en stratégie digitale, audiovisuel, intelligence artificielle et créativité avec approche pédagogique innovante.",
});

export default function Formations() {
  return <FormationsPage />;
}
