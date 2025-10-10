import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { siteDefaults } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceModalProvider } from "@/components/context/ServiceModalProvider";
import { ServiceModal } from "@/components/modals/ServiceModal";

export const metadata: Metadata = siteDefaults.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ServiceModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ServiceModal />
        </ServiceModalProvider>
      </body>
    </html>
  );
}
