import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ConclusionPage } from "@/components/pages/ConclusionPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Conclusion & Remerciements — Nouvelle Ère Digital",
  description:
    "Nouvelle Ère Digital, c'est la rencontre de la créativité, de la technologie et de l'humain. Découvrez notre conviction, le message du fondateur, nos engagements pour demain et nos remerciements.",
});

export default function Conclusion() {
  return <ConclusionPage />;
}
