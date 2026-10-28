"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [show, setShow] = useState(false);

  // Read GA ID from .env.local (must start with NEXT_PUBLIC_)
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    setIsClient(true);

    // Warn once in dev if the env var is missing or malformed
    if (
      process.env.NODE_ENV !== "production" &&
      (!GA_ID || !/^G-[A-Z0-9]+$/i.test(GA_ID))
    ) {
      console.warn(
        "[CookieBanner] NEXT_PUBLIC_GA_MEASUREMENT_ID is missing or invalid. " +
          "Expected format: G-XXXXXXXXXX. Current value:",
        GA_ID
      );
    }

    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored as "accepted" | "declined");
      setShow(false);
    } else {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, [GA_ID]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setShow(false);
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setShow(false);
  };

  if (!isClient) return null;

  // Load GA only if consent === "accepted" AND a valid GA_ID is present
  if (consent === "accepted" && GA_ID && /^G-[A-Z0-9]+$/i.test(GA_ID)) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </>
    );
  }

  // No popup if a decision has already been made
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={handleDecline}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
          <Cookie className="text-brand-orange" size={24} />
        </div>

        <h3 className="text-lg font-bold text-black mb-2">
          We value your privacy
        </h3>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          We use cookies to analyze traffic and improve your experience. Read
          our{" "}
          <Link
            href="/privacy"
            className="text-brand-orange underline hover:text-brand-orange-dark"
          >
            Privacy Policy
          </Link>{" "}
          to learn more. You can accept or decline analytics cookies.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-brand-orange rounded-lg hover:bg-brand-orange-dark transition shadow"
          >
            Accept
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          You can change your mind anytime by clearing site data.
        </p>
      </div>
    </div>
  );
}