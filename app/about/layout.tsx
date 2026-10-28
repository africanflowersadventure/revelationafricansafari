import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Revelation Africa Safari — a locally-owned Tanzanian safari company crafting tailor-made safaris, Kilimanjaro climbs, and Zanzibar escapes since 2021.",
  alternates: { canonical: "/about" },
  keywords: [
    "about Revelation Africa Safari",
    "Tanzanian safari company",
    "Arusha tour operator",
    "local safari experts Tanzania",
  ],
  openGraph: {
    title: "About Revelation Africa Safari",
    description:
      "A locally-owned Tanzanian safari company with a passion for sharing East Africa's beauty.",
    url: "https://revelationafricansafari.com/about",
    images: ["/revelationLogo.png"],
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}