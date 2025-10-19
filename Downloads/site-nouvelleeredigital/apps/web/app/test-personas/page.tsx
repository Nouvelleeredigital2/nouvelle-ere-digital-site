// apps/web/app/test-personas/page.tsx
"use client";

import { PersonaDemo } from "@/components/demo/PersonaDemo";
import { PersonaProvider } from "@/contexts/PersonaContext";

export default function TestPersonasPage() {
  return (
    <PersonaProvider>
      <PersonaDemo />
    </PersonaProvider>
  );
}