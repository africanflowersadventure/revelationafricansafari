import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tanzania Safari Tours & Packages",
  description: "Browse our Tanzania safari tours including Serengeti, Ngorongoro, Tarangire & more. Tailor-made itineraries from Arusha.",
  keywords: [
    "Tanzania safari packages",
    "Serengeti tours",
    "Ngorongoro safari",
    "Tarangire national park",
    "private safari Tanzania",
    "group safari Tanzania",
  ],
  alternates: { canonical: "https://revelationafricansafari.com/tours/" },
  openGraph: {
    title: "Tanzania Safari Tours & Packages | Revelation Africa Safari",
    description: "Browse tailor-made Tanzania safari tours from Arusha.",
    url: "https://revelationafricansafari.com/tours/",
    images: ["/revelationLogo.png"],
  },
};

export default function ToursLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
