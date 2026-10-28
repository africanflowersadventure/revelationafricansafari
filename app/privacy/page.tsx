import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Database, UserCheck, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Revelation Africa Safari collects, uses, and protects your personal data when you book a safari with us.",
  alternates: { canonical: "https://revelationafricansafari.com/privacy/" },
};

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: [
      "Personal identification details (name, email, phone number, passport number for bookings).",
      "Payment information (processed securely via third-party providers — we never store card details).",
      "Travel preferences and dietary requirements to tailor your safari experience.",
      "Technical data such as IP address, browser type, and pages visited on our website.",
    ],
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    content: [
      "To process bookings, issue confirmations, and provide customer support.",
      "To personalize your safari itinerary and communicate important travel updates.",
      "To send promotional offers and newsletters (only with your explicit consent).",
      "To comply with legal obligations and prevent fraudulent activity.",
    ],
  },
  {
    icon: Lock,
    title: "3. Data Security",
    content: [
      "We use industry-standard encryption (SSL/TLS) to protect data in transit.",
      "Access to personal data is restricted to authorized staff only.",
      "We conduct regular security audits and maintain strict internal data-handling policies.",
      "In the unlikely event of a data breach, we will notify affected users within 72 hours.",
    ],
  },
  {
    icon: UserCheck,
    title: "4. Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal data at any time.",
      "You may opt out of marketing communications by clicking 'unsubscribe' in any email.",
      "You may request a copy of the data we hold about you.",
      "To exercise any of these rights, contact us at revelationafricansafaris@gmail.com.",
    ],
  },
  {
    icon: Mail,
    title: "5. Third-Party Sharing",
    content: [
      "We share necessary data with hotels, lodges, and transport providers to fulfill your booking.",
      "We use trusted payment processors (e.g., Stripe, PayPal) — they handle card data securely.",
      "We do not sell your personal information to any third party.",
      "Analytics providers (Google Analytics) may collect anonymized usage data.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="w-16 h-16 mx-auto bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Revelation Africa Safari
            collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-2 ml-16">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-brand-orange mt-1.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact */}
          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-3">Questions About Privacy?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or how we handle your
              data, please contact our team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:revelationafricansafaris@gmail.com"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-lg transition"
              >
                <Mail size={18} /> Email Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-brand-orange text-black font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Contact Page
              </Link>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-orange transition"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}