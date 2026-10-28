import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Calendar,
  CreditCard,
  AlertTriangle,
  Shield,
  Plane,
  ArrowLeft,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for booking safaris and tours with Revelation Africa Safari.",
  alternates: { canonical: "https://revelationafricansafari.com/terms/" },
};

const sections = [
  {
    icon: FileText,
    title: "1. Booking & Confirmation",
    content: [
      "All bookings are subject to availability and written confirmation from Revelation Africa Safari.",
      "A 15% deposit is required to secure your booking. The remaining 85% must be paid before or upon arrival.",
      "Quotes are valid for 30 days from the date of issue, subject to change without notice.",
      "Prices are quoted in USD per person and include park fees, accommodation, and meals as specified.",
    ],
  },
  {
    icon: Calendar,
    title: "2. Cancellation & Refund Policy",
    content: [
      "Cancellation more than 60 days before the safari start date: full refund of deposit.",
      "Cancellation 30–60 days before the start date: 50% of deposit is non-refundable.",
      "Cancellation less than 30 days before the start date: full deposit is non-refundable.",
      "No-shows or early departures are non-refundable.",
      "All cancellations must be made in writing via email.",
    ],
  },
  {
    icon: CreditCard,
    title: "3. Payment Terms",
    content: [
      "Accepted payment methods: bank transfer, credit card, and cash (USD) on arrival.",
      "All bank transfer fees are the responsibility of the client.",
      "If the balance is not received by the due date, we reserve the right to cancel the booking.",
      "Prices are subject to change due to government-imposed park fee increases.",
    ],
  },
  {
    icon: Plane,
    title: "4. Travel Documents & Health",
    content: [
      "It is the traveler's responsibility to ensure a valid passport, visa, and Yellow Fever certificate where required.",
      "We recommend comprehensive travel insurance covering medical evacuation and trip cancellation.",
      "Tanzania requires proof of Yellow Fever vaccination if arriving from a country with risk of transmission.",
      "Please consult your doctor about malaria prophylaxis and other health precautions.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "5. Liability & Safety",
    content: [
      "Revelation Africa Safari acts as an agent for hotels, lodges, and transport providers.",
      "We are not liable for delays, losses, or injuries caused by circumstances beyond our control.",
      "Wildlife encounters are unpredictable. Always follow your guide's instructions.",
      "Our drivers are licensed and vehicles are maintained to the highest safety standards.",
      "The company is not liable for any personal items lost or damaged during the tour.",
    ],
  },
  {
    icon: Shield,
    title: "6. Changes to Itinerary",
    content: [
      "We reserve the right to alter itineraries due to weather, road conditions, wildlife movement, or park regulations.",
      "If a lodge is fully booked, we will offer a comparable alternative of the same standard.",
      "Any additional costs incurred due to such changes will be communicated in advance.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="w-16 h-16 mx-auto bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mb-6">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before booking a safari or tour with
            Revelation Africa Safari.
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
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
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

          {/* Acceptance */}
          <div className="bg-brand-green-light/40 border border-brand-green-light rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-3">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By booking a safari with Revelation Africa Safari, you acknowledge that you
              have read, understood, and agree to be bound by these Terms & Conditions.
              If you do not agree, please do not proceed with the booking.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-3">Need Clarification?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our terms, please reach out to us before
              booking.
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