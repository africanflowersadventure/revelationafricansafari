import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Revelation Africa Safari — call, email, WhatsApp, or send us a message to plan your Tanzania safari, Kilimanjaro climb, or Zanzibar holiday.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact safari Tanzania",
    "Revelation Africa Safari contact",
    "Tanzania safari booking",
    "Arusha safari company",
  ],
  openGraph: {
    title: "Contact Revelation Africa Safari",
    description:
      "Call, email, or message us to plan your dream Tanzania safari, Kilimanjaro climb, or Zanzibar escape.",
    url: "https://revelationafricansafari.com/contact",
    images: ["/revelationLogo.png"],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}