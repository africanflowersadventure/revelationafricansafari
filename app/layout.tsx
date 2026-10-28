import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingCTA from "@/app/components/FloatingCTA";
import CookieBanner from "@/app/components/CookieBanner";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/app/context/CartContext";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const urbanist = localFont({
  src: [
    { path: "../public/fonts/Urbanist-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Urbanist-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Urbanist-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Urbanist-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/Urbanist-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://revelationafricansafari.com"),
  title: {
    default: "Tanzania Safaris & Kilimanjaro Climbs | Revelation Africa",
    template: "%s | Revelation Africa Safari",
  },
  description:
    "Tanzania safari tour operator based in Arusha. Kilimanjaro climbs, Zanzibar holidays, and tailor-made safaris with local experts.",
  keywords: [
    "Tanzania safari",
    "Kilimanjaro climb",
    "Zanzibar holiday",
    "Arusha safari company",
    "Serengeti safari",
    "Ngorongoro Crater safari",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://revelationafricansafari.com",
    siteName: "Revelation Africa Safari",
    title: "Tanzania Safaris & Kilimanjaro Climbs | Revelation Africa",
    description:
      "Tanzania safari tour operator based in Arusha. Kilimanjaro climbs, Zanzibar holidays, and tailor-made safaris with local experts.",
    images: [
      {
        url: "/revelationLogo.png",
        width: 1200,
        height: 630,
        alt: "Revelation Africa Safari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzania Safaris & Kilimanjaro Climbs | Revelation Africa",
    description:
      "Tanzania safari tour operator based in Arusha. Kilimanjaro climbs, Zanzibar holidays, and tailor-made safaris with local experts.",
    images: ["/revelationLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-screen flex flex-col bg-white text-black">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCTA />
        </CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #e5e7eb",
              borderRadius: "0.75rem",
              fontSize: "0.9rem",
            },
            success: { iconTheme: { primary: "#16A34A", secondary: "#ffffff" } },
            error: { iconTheme: { primary: "#F97316", secondary: "#ffffff" } },
          }}
        />
        <CookieBanner />
      </body>
    </html>
  );
}