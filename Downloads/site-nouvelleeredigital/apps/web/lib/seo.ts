import type { Metadata } from "next";

export const siteDefaults = {
  metadata: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nouvelle-ere-digital.fr"),
    title: {
      default: "Nouvelle Ère Digital - Agence Digitale & Communication",
      template: "%s | Nouvelle Ère Digital",
    },
    description:
      "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
    keywords: [
      "agence digitale",
      "communication digitale",
      "audiovisuel",
      "développement web",
      "marketing digital",
      "Nouvelle Ère Digital",
      "innovation numérique",
    ],
    authors: [{ name: "Nouvelle Ère Digital" }],
    creator: "Nouvelle Ère Digital",
    publisher: "Nouvelle Ère Digital",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://nouvelle-ere-digital.fr",
      title: "Nouvelle Ère Digital - Agence Digitale & Communication",
      description:
        "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
      siteName: "Nouvelle Ère Digital",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Nouvelle Ère Digital - Agence digitale et communication",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nouvelle Ère Digital - Agence Digitale & Communication",
      description:
        "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
      images: ["/og-image.jpg"],
      creator: "@nouvelleeredigital",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  } satisfies Metadata,
};

/**
 * Génère les métadonnées personnalisées selon le persona
 */
export function generatePersonaMetadata(personaName?: string): Metadata {
  const baseMetadata = siteDefaults.metadata;
  const defaultTitle = "Nouvelle Ère Digital - Agence Digitale & Communication";

  // Si pas de persona spécifié, retourner les métadonnées par défaut
  if (!personaName) {
    return baseMetadata;
  }

  // Personnaliser le titre selon le persona
  const personaTitles: Record<string, string> = {
    artiste: "Nouvelle Ère Digital - Créativité & Innovation | L'Artiste",
    architecte: "Nouvelle Ère Digital - Structure & Excellence | L'Architecte",
    stratege: "Nouvelle Ère Digital - Stratégie & Performance | Le Stratège",
    innovateur: "Nouvelle Ère Digital - Technologie & Avenir | L'Innovateur",
    connecteur: "Nouvelle Ère Digital - Relations & Impact | Le Connecteur",
    minimaliste: "Nouvelle Ère Digital - Clarté & Efficacité | Le Minimaliste",
    colore: "Nouvelle Ère Digital - Énergie & Expression | Le Coloré",
    professionnel: "Nouvelle Ère Digital - Expertise & Confiance | Le Professionnel",
    gamer: "Nouvelle Ère Digital - Interaction & Engagement | Le Gamer",
    artisan: "Nouvelle Ère Digital - Authenticité & Qualité | L'Artisan",
  };

  const customTitle = personaTitles[personaName.toLowerCase()] || defaultTitle;

  return {
    ...baseMetadata,
    title: customTitle,
    openGraph: {
      ...baseMetadata.openGraph,
      title: customTitle,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: customTitle,
    },
  };
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const baseMetadata = siteDefaults.metadata;

  return {
    title,
    description: description || baseMetadata.description,
    keywords: keywords || baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description: description || baseMetadata.description,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description: description || baseMetadata.description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}
