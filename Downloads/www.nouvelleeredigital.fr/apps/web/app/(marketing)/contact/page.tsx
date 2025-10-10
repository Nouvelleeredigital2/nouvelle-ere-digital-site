import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact & QR Code — Nouvelle Ère Digital",
  description:
    "Rencontrons-nous, construisons ensemble la prochaine expérience. Découvrez nos coordonnées, formulaire intelligent avec IA, QR code interactif et réseaux sociaux pour nous contacter.",
});

export default function Contact() {
  return <ContactPage />;
}
