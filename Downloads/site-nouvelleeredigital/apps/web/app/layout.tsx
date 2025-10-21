import "@/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { siteDefaults } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceModalProvider } from "@/components/context/ServiceModalProvider";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { PersonaProvider } from "@/components/context/PersonaProvider";
import { getPersonaFromCookies, applyPersonaClassesToHtml } from "@/lib/server-utils";
import { headers } from "next/headers";
import { HydrationFix } from "@/components/hydration/HydrationFix";

// Fonction pour lire les cookies côté serveur
function getServerCookies() {
  const headersList = headers();
  return headersList.get("cookie") || "";
}

// Métadonnées de base (sans personnalisation par persona)
export const metadata: Metadata = siteDefaults.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Lire les cookies côté serveur
  const cookieString = getServerCookies();
  const personaId = getPersonaFromCookies(cookieString);

  // Appliquer les classes CSS du persona sur l'élément html
  const personaClasses = applyPersonaClassesToHtml(personaId);

  return (
    <html lang="fr" className={personaClasses}>
      <body>
        <HydrationFix>
          <PersonaProvider>
            <ServiceModalProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <ServiceModal />
            </ServiceModalProvider>
          </PersonaProvider>
        </HydrationFix>
      </body>
    </html>
  );
}
