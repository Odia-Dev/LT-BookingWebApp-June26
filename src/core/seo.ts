import type { Metadata } from "next";

interface MetadataInput {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
}

export const generateMetadata = (input: MetadataInput): Metadata => {
  const rootUrl = process.env.NEXT_PUBLIC_APP_URL || "https://laxmitoyota.com";
  return {
    title: `${input.title} | Laxmi Toyota`,
    description: input.description,
    alternates: {
      canonical: `${rootUrl}${input.canonicalUrl}`,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: `${rootUrl}${input.canonicalUrl}`,
      images: [
        {
          url: input.ogImage || `${rootUrl}/media/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};
