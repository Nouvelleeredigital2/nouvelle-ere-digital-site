"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import Image from "next/image";
import { useServiceModal } from "@/components/context/ServiceModalProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Données démo temporaires – à remplacer par votre sélecteur/stockage réel
interface Service {
  id: string;
  title: string;
  objective: string;
  audience: string[];
  duration: string;
  description: string;
  bullets: string[];
  compatibilities: Array<{ id: string; label: string }>; // other services
  faq: Array<{ q: string; a: string }>;
  links?: { href?: string; brochureUrl?: string };
  hero?: string; // image path
}

const DEMO_SERVICES: Record<string, Service> = {
  demo: {
    id: "demo",
    title: "Service démo",
    objective: "Générer des leads qualifiés via une landing dédiée.",
    audience: ["PME", "Scale-ups"],
    duration: "2-4 semaines",
    description:
      "Mise en place d'une campagne 360 : conception, production, intégration et mesure.",
    bullets: [
      "Brief et plan d'action",
      "Production des assets",
      "Mise en ligne et tracking",
    ],
    compatibilities: [
      { id: "ads", label: "Campagne Ads" },
      { id: "video", label: "Capsule vidéo" },
      { id: "crm", label: "CRM" },
    ],
    faq: [
      { q: "Quels livrables ?", a: "Landing, assets, rapport de performance." },
      { q: "Quelles dépendances ?", a: "Accès DNS, comptes analytics, branding." },
    ],
    links: { href: "https://example.com", brochureUrl: "/og-image.svg" },
    hero: "/og-image.svg",
  },
};

function getServiceById(id: string | null): Service | null {
  if (!id) return null;
  return DEMO_SERVICES[id] ?? DEMO_SERVICES["demo"];
}

export function ServiceModal() {
  const { openedServiceId, close } = useServiceModal();
  const service = getServiceById(openedServiceId);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fermeture via Échap
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (openedServiceId) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [openedServiceId, close]);

  // Fermeture par clic extérieur
  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) close();
  }

  if (!service) return null;

  function addToJourney() {
    // Émettre un évènement; le canvas peut écouter et ajouter la carte
    window.dispatchEvent(new CustomEvent("service:addToJourney", { detail: { id: service!.id } }));
    // On garde le modal ouvert par défaut; ajuster si besoin
  }

  function openLink() {
    const href = service!.links?.href;
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  function downloadBrochure() {
    const url = service!.links?.brochureUrl;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "brochure";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function showQR() {
    // Remplacement futur: afficher un QR dans le modal ou un panneau dédié
    alert(`QR pour ${service!.title}`);
  }

  function onClickCompatibility(id: string) {
    // Émettre une requête de surlignage; le canvas peut surligner/ajouter/connecter
    window.dispatchEvent(new CustomEvent("service:highlight", { detail: { id } }));
  }

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      className={cn(
        "fixed inset-0 z-[100]",
        "bg-black/40 backdrop-blur-sm",
        "flex items-center justify-center p-4"
      )}
      aria-modal
      role="dialog"
    >
      <div className="w-full max-w-4xl rounded-[var(--border-radius-large)] bg-[var(--couleur-light)] shadow-[var(--box-shadow-subtil)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--couleur-gris-clair)]">
          <h2 className="text-xl font-semibold">{service.title}</h2>
          <button onClick={close} aria-label="Fermer" className="text-[var(--couleur-texte-base)]">✕</button>
        </div>

        {/* Hero */}
        {service.hero && (
          <div className="relative w-full aspect-video">
            <Image src={service.hero} alt="" fill className="object-cover" />
          </div>
        )}

        {/* Body */}
        <div className="p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <p className="text-[var(--couleur-texte-secondaire)]">{service.objective}</p>
            <p>{service.description}</p>
            <ul className="list-disc pl-5">
              {service.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <div>
              <div className="font-semibold mb-2">Compatibilités</div>
              <div className="flex flex-wrap gap-2">
                {service.compatibilities.map((c) => (
                  <Button key={c.id} variant="ghost" onClick={() => onClickCompatibility(c.id)}>
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">FAQ</div>
              <div className="space-y-3">
                {service.faq.map((f, i) => (
                  <div key={i}>
                    <div className="font-medium">{f.q}</div>
                    <div className="text-[var(--couleur-texte-secondaire)]">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:col-span-1 space-y-4">
            <div>
              <div className="text-sm text-[var(--couleur-texte-secondaire)]">Audience</div>
              <div className="font-medium">{service.audience.join(", ")}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--couleur-texte-secondaire)]">Durée</div>
              <div className="font-medium">{service.duration}</div>
            </div>

            <div className="h-px bg-[var(--couleur-gris-clair)]" />

            <div className="grid gap-2">
              <Button onClick={addToJourney}>Ajouter au parcours</Button>
              <Button variant="ghost" onClick={openLink}>Ouvrir le lien</Button>
              <Button variant="secondaire" onClick={downloadBrochure}>Brochure</Button>
              <Button variant="ghost" onClick={showQR}>Afficher QR</Button>
            </div>

            <div className="text-xs text-[var(--couleur-texte-secondaire)]">
              Double‑clic sur une carte ouvre cette fiche. Esc ou clic extérieur: fermeture.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
