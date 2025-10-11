"use client";

import { Card } from "@/components/ui/Card";
import { useServiceModal } from "@/components/context/ServiceModalProvider";

export function DemoServiceCard() {
  const { open } = useServiceModal();
  return (
    <Card
      className="cursor-pointer select-none"
      onDoubleClick={() => open("demo")}
      role="button"
      aria-label="Double-cliquer pour ouvrir la fiche service"
      title="Double-cliquez pour ouvrir la fiche"
    >
      <h3 className="text-xl font-semibold mb-2">Service démo</h3>
      <p className="text-[var(--couleur-texte-secondaire)]">
        Double-cliquez sur cette carte pour ouvrir la fiche service.
      </p>
    </Card>
  );
}
