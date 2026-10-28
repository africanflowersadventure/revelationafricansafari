"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/app/context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  FileText,
  Download,
  Send,
  MessageCircle,
  Mail,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import { countryCodes } from "@/data/countryCodes";
import { generateItineraryPDF, ItineraryMeta } from "../lib/pdf";


export default function CartPage() {
  const { items, removeFromCart, updateTravelers, updateStartDate, total } =
    useCart();

  const [form, setForm] = useState<
    ItineraryMeta & { countryCode: string; phone: string }
  >({
    name: "",
    email: "",
    countryCode: "+255",
    phone: "",
    startDate: "",
  });
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [sentItems, setSentItems] = useState<Record<string, boolean>>({});

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countryCodes;
    const q = countrySearch.toLowerCase();
    return countryCodes.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.code.includes(q)
    );
  }, [countrySearch]);

  const selectedCountry = countryCodes.find(
    (c) => c.code === form.countryCode
  );

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev: typeof form) => ({ ...prev, [key]: value }));

  /* ---------- VALIDATION ---------- */
  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return false;
    }
    if (!form.phone.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }
    return true;
  };

  /* ============================================================
     PER-ITEM WHATSAPP LINK
     ============================================================ */
  const waItemLink = (item: CartItem): string => {
    const itinerarySummary = item.itinerary
      .map(
        (d: {
          day: number;
          title: string;
          accommodation: string;
          meals: string;
        }) =>
          `• Day ${d.day}: ${d.title} (${d.accommodation}, meals: ${d.meals})`
      )
      .join("\n");

    const msg =
      `*Safari Package Inquiry*\n\n` +
      `*Package:* ${item.title}\n` +
      `*Duration:* ${item.durationDays} Days / ${item.durationNights} Nights\n` +
      `*Destinations:* ${item.destinations.join(" → ")}\n` +
      `*Travelers:* ${item.travelers}\n` +
      `*Start Date:* ${item.startDate || "TBD"}\n` +
      `*Price:* $${item.priceUSD} pp → *$${(
        item.priceUSD * item.travelers
      ).toLocaleString()} total*\n\n` +
      (itinerarySummary
        ? `*Itinerary Summary:*\n${itinerarySummary}\n\n`
        : "") +
      `Please send me a detailed quote for this package.\n` +
      `Thank you!`;

    return `https://wa.me/255757535767?text=${encodeURIComponent(msg)}`;
  };

  /* ============================================================
     PER-ITEM EMAIL LINK
     ============================================================ */
  const mailtoItemLink = (item: CartItem): string => {
    const subject = encodeURIComponent(`Safari Inquiry — ${item.title}`);

    const itinerarySummary = item.itinerary
      .map(
        (d: {
          day: number;
          title: string;
          accommodation: string;
          meals: string;
        }) =>
          `  Day ${d.day}: ${d.title}\n` +
          `    Accommodation: ${d.accommodation}\n` +
          `    Meals: ${d.meals}`
      )
      .join("\n");

    const body =
      `Hello Revelation African Safari,\n\n` +
      `I am interested in the following safari package:\n\n` +
      `Package:      ${item.title}\n` +
      `Duration:     ${item.durationDays} Days / ${item.durationNights} Nights\n` +
      `Destinations: ${item.destinations.join(" → ")}\n` +
      `Travelers:    ${item.travelers}\n` +
      `Start Date:   ${item.startDate || "TBD"}\n` +
      `Price:        $${item.priceUSD} pp  →  $${(
        item.priceUSD * item.travelers
      ).toLocaleString()} total\n\n` +
      (itinerarySummary
        ? `Itinerary Summary:\n${itinerarySummary}\n\n`
        : "") +
      `Included:\n${item.inclusions
        .map((i: string) => `  - ${i}`)
        .join("\n")}\n\n` +
      `Not included:\n${item.exclusions
        .map((e: string) => `  - ${e}`)
        .join("\n")}\n\n` +
      `Please send me a detailed quote for this package.\n\n` +
      `Thank you!\n` +
      `(Sent from the Revelation Safari cart)`;

    return `mailto:info@revelationafricansafari.com?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
  };

  /* ---------- FULL-CART WHATSAPP ---------- */
  const sendViaWhatsApp = (): void => {
    if (!validateForm()) return;

    let message = `*New Safari Cart Inquiry*\n\n`;
    message += `*Name:* ${form.name}\n`;
    message += `*Email:* ${form.email}\n`;
    message += `*Phone:* ${form.countryCode} ${form.phone}\n\n`;
    message += `*Selected Safaris:*\n`;

    items.forEach((item: CartItem) => {
      message += `\n• ${item.title}\n`;
      message += `  ${item.durationDays} Days / ${item.durationNights} Nights\n`;
      message += `  Travelers: ${item.travelers}\n`;
      message += `  Start Date: ${item.startDate || "TBD"}\n`;
      message += `  Price: $${item.priceUSD} pp → $${(
        item.priceUSD * item.travelers
      ).toLocaleString()}\n`;
    });

    message += `\n*Grand Total:* $${total.toLocaleString()}\n`;
    message += `\nPlease send me a quote. Thank you!`;

    const url = `https://wa.me/255757535767?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp...");
  };

  /* ---------- FULL-CART EMAIL ---------- */
  const sendViaEmail = (): void => {
    if (!validateForm()) return;

    const subject = encodeURIComponent(
      `Safari Cart Inquiry from ${form.name}`
    );

    let body = `Hello Revelation African Safari,\n\n`;
    body += `Name: ${form.name}\n`;
    body += `Email: ${form.email}\n`;
    body += `Phone: ${form.countryCode} ${form.phone}\n\n`;
    body += `Selected Safaris:\n`;

    items.forEach((item: CartItem) => {
      body += `\n- ${item.title}\n`;
      body += `  ${item.durationDays} Days / ${item.durationNights} Nights\n`;
      body += `  Travelers: ${item.travelers}\n`;
      body += `  Start Date: ${item.startDate || "TBD"}\n`;
      body += `  Price: $${item.priceUSD} pp → $${(
        item.priceUSD * item.travelers
      ).toLocaleString()}\n`;
    });

    body += `\nGrand Total: $${total.toLocaleString()}\n`;
    body += `\nPlease send me a quote. Thank you.`;

    window.location.href = `mailto:info@revelationafricansafari.com?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
    toast.success("Opening email...");
  };

  /* ============================================================
     GET QUOTE — opens email app + GA4 event
     ============================================================ */
  const getQuote = (): void => {
    if (!validateForm()) return;

    // GA4 event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_quote", {
        event_category: "engagement",
        event_label: "Cart Quote Request",
        value: total,
        currency: "USD",
      });
    }

    const subject = encodeURIComponent(
      `Quote Request — ${form.name} (${items.length} package${
        items.length > 1 ? "s" : ""
      })`
    );

    const lines: string[] = [];
    lines.push(`Hello Revelation African Safari,`);
    lines.push("");
    lines.push(`I would like to request a quote for the following:`);
    lines.push("");
    lines.push(`──── CUSTOMER ────`);
    lines.push(`Name:      ${form.name}`);
    lines.push(`Email:     ${form.email}`);
    lines.push(`Phone:     ${form.countryCode} ${form.phone}`);
    if (form.startDate) lines.push(`Start:     ${form.startDate}`);
    lines.push("");
    lines.push(`──── PACKAGES ────`);

    items.forEach((item: CartItem, idx: number) => {
      lines.push("");
      lines.push(`${idx + 1}. ${item.title}`);
      lines.push(
        `   Duration:     ${item.durationDays} Days / ${item.durationNights} Nights`
      );
      lines.push(`   Destinations: ${item.destinations.join(" → ")}`);
      lines.push(`   Travelers:    ${item.travelers}`);
      lines.push(`   Start Date:   ${item.startDate || "TBD"}`);
      lines.push(
        `   Price:        $${item.priceUSD} pp × ${item.travelers} = $${(
          item.priceUSD * item.travelers
        ).toLocaleString()}`
      );
    });

    lines.push("");
    lines.push(`──── TOTAL ────`);
    lines.push(`Grand Total:  $${total.toLocaleString()}`);
    lines.push("");
    lines.push(`Please send me a detailed quote. Thank you!`);
    lines.push("");
    lines.push(`— Sent from the Revelation Safari cart`);

    const body = encodeURIComponent(lines.join("\n"));

    window.location.href = `mailto:info@revelationafricansafari.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email app — just press Send!");
  };

  /* ---------- PDF DOWNLOAD + GA4 event ---------- */
  const downloadPDF = async (): Promise<void> => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!validateForm()) return;

    setPdfLoading(true);
    try {
      await generateItineraryPDF(items, {
        name: form.name,
        email: form.email,
        phone: `${form.countryCode} ${form.phone}`,
        startDate: form.startDate || undefined,
      });

      // GA4 event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "download_itinerary", {
          event_category: "engagement",
          event_label: "PDF Itinerary",
          value: total,
          currency: "USD",
        });
      }

      toast.success("PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF.");
    } finally {
      setPdfLoading(false);
    }
  };

  /* ---------- MARK AS SENT ---------- */
  const markSent = (key: string): void =>
    setSentItems((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: true,
    }));

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">
          Your Safari Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-gray-200">
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Start exploring our safaris and add to your cart.
            </p>
            <Link
              href="/tours"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-lg transition"
            >
              Browse Safaris
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ============ CART ITEMS ============ */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: CartItem) => {
                const waKey = `wa-${item.slug}`;
                const mailKey = `mail-${item.slug}`;
                const waSent = !!sentItems[waKey];
                const mailSent = !!sentItems[mailKey];

                return (
                  <div
                    key={item.slug}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-64 h-48 md:h-auto bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {item.durationDays} Days / {item.durationNights} Nights
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={item.startDate}
                            onChange={(e) =>
                              updateStartDate(item.slug, e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Travelers
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateTravelers(
                                  item.slug,
                                  Math.max(1, item.travelers - 1)
                                )
                              }
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold">
                              {item.travelers}
                            </span>
                            <button
                              onClick={() =>
                                updateTravelers(
                                  item.slug,
                                  item.travelers + 1
                                )
                              }
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-500">
                          ${item.priceUSD} × {item.travelers}
                        </p>
                        <p className="text-xl font-extrabold text-brand-orange">
                          $
                          {(item.priceUSD * item.travelers).toLocaleString()}
                        </p>
                      </div>

                      {/* ============ PER-ITEM SEND BUTTONS ============ */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                          href={waItemLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => markSent(waKey)}
                          className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-lg transition"
                          aria-label={`Send ${item.title} via WhatsApp`}
                        >
                          <MessageCircle size={16} aria-hidden="true" />
                          {waSent ? "Sent ✓" : "WhatsApp"}
                        </a>
                        <a
                          href={mailtoItemLink(item)}
                          onClick={() => markSent(mailKey)}
                          className="flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold py-2 rounded-lg transition"
                          aria-label={`Send ${item.title} via Email`}
                        >
                          <Mail size={16} aria-hidden="true" />
                          {mailSent ? "Sent ✓" : "Email"}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ============ FORM + SUMMARY ============ */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="flex gap-2">
                        <div className="relative w-32">
                          <button
                            type="button"
                            onClick={() =>
                              setShowCountryDropdown(!showCountryDropdown)
                            }
                            className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm text-left flex items-center justify-between"
                          >
                            <span className="truncate">
                              {selectedCountry?.code || "+255"}{" "}
                              <span className="text-gray-500 text-xs">
                                {selectedCountry?.country || "Tanzania"}
                              </span>
                            </span>
                            <Search
                              size={14}
                              className="text-gray-400 shrink-0"
                            />
                          </button>
                        </div>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="700 000 000"
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      </div>

                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
                          <div className="p-2 border-b border-gray-100">
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) =>
                                setCountrySearch(e.target.value)
                              }
                              placeholder="Search country or code..."
                              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm outline-none"
                              autoFocus
                            />
                          </div>
                          <ul className="overflow-y-auto">
                            {filteredCountries.length === 0 && (
                              <li className="px-4 py-3 text-sm text-gray-500">
                                No results
                              </li>
                            )}
                            {filteredCountries.map(
                              (c: { code: string; country: string }) => (
                                <li key={`${c.code}-${c.country}`}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      update("countryCode", c.code);
                                      setShowCountryDropdown(false);
                                      setCountrySearch("");
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-green-light transition ${
                                      form.countryCode === c.code
                                        ? "bg-brand-green-light font-semibold"
                                        : ""
                                    }`}
                                  >
                                    <span className="font-medium">
                                      {c.code}
                                    </span>{" "}
                                    <span className="text-gray-600">
                                      {c.country}
                                    </span>
                                  </button>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Summary</h3>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <span>Deposit (15%)</span>
                  <span>${(total * 0.15).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-orange">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                <button
                  onClick={downloadPDF}
                  disabled={pdfLoading}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-bold py-3 rounded-lg transition shadow flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {pdfLoading
                    ? "Generating PDF..."
                    : "Download Itinerary (PDF)"}
                </button>
                <button
                  onClick={sendViaWhatsApp}
                  className="w-full bg-brand-green hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Send Whole Cart via WhatsApp
                </button>
                <button
                  onClick={sendViaEmail}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Mail size={18} /> Send Whole Cart via Email
                </button>
                <button
                  onClick={getQuote}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Get Quote
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}