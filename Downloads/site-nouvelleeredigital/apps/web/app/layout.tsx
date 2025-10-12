import "@/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { siteDefaults } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceModalProvider } from "@/components/context/ServiceModalProvider";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { StyleProvider } from "@/contexts/StyleContext";
import { StyleCustomizer } from "@/components/ui/StyleCustomizer";
import { ThemeProvider } from "@/components/context/ThemeProvider";
import { ThemeCustomizer } from "@/components/ui/ThemeCustomizer";

export const metadata: Metadata = siteDefaults.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <StyleProvider>
            <ServiceModalProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <ServiceModal />
            </ServiceModalProvider>
            <StyleCustomizer /> {/* Menu flottant */}
            <ThemeCustomizer isOpen={false} onClose={() => {}} /> {/* Personnaliseur avancé */}
          </StyleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
