import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kilimanjaro Climbing Tours",
  description: "Climb Mount Kilimanjaro with expert guides. Choose from Machame, Marangu, Lemosho, Rongai & Northern Circuit routes.",
  keywords: [
    "Kilimanjaro climb",
    "Mount Kilimanjaro trek",
    "Machame route",
    "Marangu route",
    "Lemosho route",
    "Kilimanjaro tour operator",
  ],
  alternates: { canonical: "https://revelationafricansafari.com/kilimanjaro/" },
  openGraph: {
    title: "Kilimanjaro Climbing Tours | Revelation Africa Safari",
    description: "Climb Mount Kilimanjaro with experienced local guides.",
    url: "https://revelationafricansafari.com/kilimanjaro/",
    images: ["/revelationLogo.png"],
  },
};

export default function KilimanjaroLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
