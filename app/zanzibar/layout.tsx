import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zanzibar Beach Holidays & Tours",
  description: "Relax in Zanzibar with beach holidays, Stone Town tours, spice tours & water activities. Tailor-made Zanzibar escapes.",
  keywords: [
    "Zanzibar holiday",
    "Zanzibar beach",
    "Stone Town tour",
    "Zanzibar spice tour",
    "Zanzibar packages",
    "Tanzania beach holiday",
  ],
  alternates: { canonical: "https://revelationafricansafari.com/zanzibar/" },
  openGraph: {
    title: "Zanzibar Beach Holidays | Revelation Africa Safari",
    description: "Pristine beaches, culture & adventure in Zanzibar.",
    url: "https://revelationafricansafari.com/zanzibar/",
    images: ["/revelationLogo.png"],
  },
};

export default function ZanzibarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
