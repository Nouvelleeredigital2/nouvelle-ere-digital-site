import type { Metadata } from "next";

export const siteDefaults = {
  metadata: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
    title: {
      default: "Vitrine Next.js",
      template: "%s | Vitrine",
    },
    description: "Ossature front prête à étendre.",
    icons: [{ rel: "icon", url: "/favicon.svg" }],
    openGraph: {
      type: "website",
      title: "Vitrine Next.js",
      description: "Ossature front prête à étendre.",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "OpenGraph image",
        },
      ],
    },
  } satisfies Metadata,
};

export function generatePageMetadata({ title, description }: { title: string; description?: string }): Metadata {
  return {
    title,
    description,
  };
}
