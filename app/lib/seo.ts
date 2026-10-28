import type { Metadata } from "next";

const BASE_URL = "https://revelationafricansafari.com";
const SITE_NAME = "Revelation Africa Safari";
const DEFAULT_OG_IMAGE = "/revelationLogo.png";

type PageMeta = {
  title: string;
  description: string;
  path: string;              // e.g. "/contact"
  image?: string;            // defaults to logo
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
}: PageMeta): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "African safari",
      "Tanzania tours",
      "Kilimanjaro climb",
      "Zanzibar holiday",
      "Ngorongoro",
      "Serengeti",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}