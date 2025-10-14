import type { Metadata } from "next";

export const siteDefaults = {
  metadata: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nouvelle-ere-digital.fr"),
    title: {
      default: "Nouvelle Ère Digital - Agence Digitale & Communication",
      template: "%s | Nouvelle Ère Digital",
    },
    description: "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
    keywords: [
      "agence digitale",
      "communication digitale",
      "audiovisuel",
      "développement web",
      "marketing digital",
      "Nouvelle Ère Digital",
      "innovation numérique"
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
      apple: [
        { url: "/apple-touch-icon.png" },
      ],
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://nouvelle-ere-digital.fr",
      title: "Nouvelle Ère Digital - Agence Digitale & Communication",
      description: "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
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
      description: "Agence digitale spécialisée en communication, audiovisuel et développement web. Nous créons des expériences digitales innovantes qui valorisent l'humain.",
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

export function generatePageMetadata({
  title,
  description,
  keywords,
  image
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
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description: description || baseMetadata.description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}
