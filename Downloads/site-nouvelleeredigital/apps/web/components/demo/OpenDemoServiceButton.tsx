"use client";

import { Button } from "@/components/ui/Button";
import { useServiceModal } from "@/components/context/ServiceModalProvider";

export function OpenDemoServiceButton() {
  const { open } = useServiceModal();
  return (
    <Button onClick={() => open("demo")} variant="secondaire">
      Ouvrir Service démo
    </Button>
  );
}
