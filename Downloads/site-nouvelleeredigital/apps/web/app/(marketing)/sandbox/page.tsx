import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = generatePageMetadata({
  title: "Sandbox - Nouvelle Ère Digital",
  description: "Espace de test et de démonstration des composants UI",
});

export default function SandboxPage() {
  return (
    <Container>
      <SectionHeading
        title="Sandbox"
        subtitle="Espace de test et de démonstration"
      />
      <div className="py-8">
        <p className="text-center text-gray-600">
          Cette page est en cours de développement...
        </p>
      </div>
    </Container>
  );
}