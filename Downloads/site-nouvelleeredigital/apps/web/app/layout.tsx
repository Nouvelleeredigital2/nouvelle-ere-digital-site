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
import { applyPersonaStylesServer } from "@/lib/persona-styles";
import { headers } from "next/headers";

// Fonction pour lire les cookies côté serveur
function getServerCookies() {
  const headersList = headers();
  return headersList.get('cookie') || '';
}

export const metadata: Metadata = siteDefaults.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Lire les cookies côté serveur
  const cookieString = getServerCookies();
  const personaId = getPersonaFromCookies(cookieString);

  // Obtenir le persona depuis l'ID
  let persona = null;
  if (personaId) {
    try {
      const { personas } = require('@/personas');
      persona = personas.find((p: any) => p.id === personaId) || null;
    } catch {
      persona = null;
    }
  }

  // Appliquer les classes CSS du persona sur l'élément html
  const personaClasses = applyPersonaClassesToHtml(personaId);

  // Appliquer les variables CSS du persona côté serveur
  const personaStyles = persona ? applyPersonaStylesServer(persona) : {};

  // Construire le style CSS à injecter
  const cssVariables = Object.entries(personaStyles)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return (
    <html lang="fr" className={personaClasses}>
      <head>
        {/* Injecter les variables CSS du persona côté serveur */}
        {cssVariables && (
          <style dangerouslySetInnerHTML={{
            __html: `:root {\n${cssVariables}\n}`
          }} />
        )}
      </head>
      <body suppressHydrationWarning={true}>
        <PersonaProvider>
          <ServiceModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ServiceModal />
          </ServiceModalProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
