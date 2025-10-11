import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { BlogPage } from "@/components/pages/BlogPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog & Actualités — Nouvelle Ère Digital",
  description:
    "Découvrez nos insights et tendances sur la communication digitale, l'intelligence artificielle et les stratégies marketing. Articles experts, études de cas et analyses du secteur.",
});

export default function Blog() {
  return <BlogPage />;
}
