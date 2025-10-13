import "@/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { siteDefaults } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceModalProvider } from "@/components/context/ServiceModalProvider";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { CreativePersonaProvider } from "@/components/context/ThemeProvider";

export const metadata: Metadata = siteDefaults.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <CreativePersonaProvider>
          <ServiceModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ServiceModal />
          </ServiceModalProvider>
        </CreativePersonaProvider>
      </body>
    </html>
  );
}
