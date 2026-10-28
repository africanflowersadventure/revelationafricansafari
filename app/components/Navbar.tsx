"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingCart, Menu, X, MapPin, Compass } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "@/app/context/CartContext";

// ---------- Types ----------
interface DestinationItem {
  name: string;
  href: string;
  image: string;
}

interface MobileLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

// ---------- Data ----------
const destinations: DestinationItem[] = [
  {
    name: "Ngorongoro",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80",
    href: "/destinations/ngorongoro",
  },
  {
    name: "Serengeti",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80",
    href: "/destinations/serengeti",
  },
  {
    name: "Tarangire",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80",
    href: "/destinations/tarangire",
  },
  {
    name: "Lake Manyara",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80",
    href: "/destinations/manyara",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const { items } = useCart();

  const toggleMobileSection = (id: string) => {
    setOpenMobileSection(openMobileSection === id ? null : id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm overflow-visible">
      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between gap-2 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 z-50">
            <Image
              src="/revelationLogo.png"
              alt="Revelation Africa Safari"
              width={160}
              height={60}
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
              priority
            />
            <span className="hidden xl:block font-bold text-base text-black whitespace-nowrap">
              Revelation Africa Safari
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-3 xl:gap-5 text-black font-medium text-sm xl:text-[15px] whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-brand-orange transition py-5">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-brand-orange transition py-5"
              >
                About
              </Link>
            </li>

            {/* SAFARI MEGA MENU */}
            <li className="group">
              <Link
                href="/tours"
                className="flex items-center gap-1 hover:text-brand-orange transition py-5"
              >
                Safari <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Safari Styles
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href="/safaris/style/day-trips"
                          className="hover:text-black block"
                        >
                          Day Trips{" "}
                          <span className="block text-xs text-gray-400 font-normal">
                            One-day escapes
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/safaris/style/private"
                          className="hover:text-black block"
                        >
                          Private Safaris{" "}
                          <span className="block text-xs text-gray-400 font-normal">
                            Your own vehicle & guide
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/safaris/style/migration"
                          className="hover:text-black block"
                        >
                          Great Migration{" "}
                          <span className="block text-xs text-gray-400 font-normal">
                            Follow the herds
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/safaris/style/family"
                          className="hover:text-black block"
                        >
                          Family Safaris{" "}
                          <span className="block text-xs text-gray-400 font-normal">
                            Kid-friendly adventures
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/safaris/style/honeymoon"
                          className="hover:text-black block"
                        >
                          Honeymoon Safaris{" "}
                          <span className="block text-xs text-gray-400 font-normal">
                            Romantic lodges
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Popular Parks
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href="/destinations/serengeti"
                          className="hover:text-black flex items-center gap-2"
                        >
                          <MapPin size={14} /> Serengeti National Park
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/destinations/ngorongoro"
                          className="hover:text-black flex items-center gap-2"
                        >
                          <MapPin size={14} /> Ngorongoro Crater
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/destinations/tarangire"
                          className="hover:text-black flex items-center gap-2"
                        >
                          <MapPin size={14} /> Tarangire National Park
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/destinations/manyara"
                          className="hover:text-black flex items-center gap-2"
                        >
                          <MapPin size={14} /> Lake Manyara National Park
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-44 rounded-xl overflow-hidden group/img cursor-pointer border border-gray-100">
                    <Image
                      src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                      alt="Serengeti"
                      fill
                      sizes="300px"
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <Link
                      href="/tours"
                      className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center hover:bg-black/50 transition"
                    >
                      <Compass className="text-white mb-2" size={28} />
                      <span className="text-white font-bold text-lg">
                        View All Safaris
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* KILIMANJARO MEGA MENU */}
            <li className="group">
              <Link
                href="/kilimanjaro"
                className="flex items-center gap-1 hover:text-brand-orange transition py-5"
              >
                Kilimanjaro <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 gap-12">
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Kilimanjaro Routes
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href="/kilimanjaro/routes/machame-route-7-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Machame Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            7D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/marangu-route-6-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Marangu Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            6D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/machame-route-6-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Machame Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            6D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/lemosho-route-8-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Lemosho Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            8D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/rongai-route-7-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Rongai Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            7D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/umbwe-route-6-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Umbwe Route{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            6D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kilimanjaro/routes/northern-circuit-9-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Northern Circuit{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            9D
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Plan Your Climb
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <Link href="/kilimanjaro" className="hover:text-black">
                          Best Time to Climb
                        </Link>
                      </li>
                      <li>
                        <Link href="/kilimanjaro" className="hover:text-black">
                          Which Route is Best?
                        </Link>
                      </li>
                      <li>
                        <Link href="/kilimanjaro" className="hover:text-black">
                          Packing List
                        </Link>
                      </li>
                      <li>
                        <Link href="/kilimanjaro" className="hover:text-black">
                          Fitness & Altitude
                        </Link>
                      </li>
                      <li>
                        <Link href="/kilimanjaro" className="hover:text-black">
                          Summit Success Rates
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            {/* ZANZIBAR MEGA MENU */}
            <li className="group">
              <Link
                href="/zanzibar"
                className="flex items-center gap-1 hover:text-brand-orange transition py-5"
              >
                Zanzibar <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 gap-12">
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Zanzibar Holidays
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href="/zanzibar/holidays/zanzibar-beach-holiday-4-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Zanzibar Beach Holiday{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            4D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/holidays/stone-town-escape-3-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Stone Town Escape{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            3D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/holidays/zanzibar-culture-beach-5-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Culture & Beach{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            5D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/holidays/zanzibar-honeymoon-6-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Zanzibar Honeymoon{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            6D
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/holidays/zanzibar-island-discovery-7-days"
                          className="hover:text-black flex justify-between items-center"
                        >
                          Island Discovery{" "}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            7D
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-orange mb-3 text-xs uppercase tracking-wider">
                      Zanzibar Excursions
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href="/zanzibar/excursions/stone-town-tour"
                          className="hover:text-black"
                        >
                          Stone Town Tour
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/excursions/spice-farm-tour"
                          className="hover:text-black"
                        >
                          Spice Farm Tour
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/excursions/prison-island"
                          className="hover:text-black"
                        >
                          Prison Island
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/excursions/mnemba-snorkelling"
                          className="hover:text-black"
                        >
                          Mnemba Snorkelling
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/excursions/sunset-dhow-cruise"
                          className="hover:text-black"
                        >
                          Sunset Dhow Cruise
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/zanzibar/excursions/jozani-forest"
                          className="hover:text-black"
                        >
                          Jozani Forest
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            {/* Destinations dropdown (cards) */}
            <li className="relative group">
              <button className="flex items-center gap-1 hover:text-brand-orange transition py-5">
                Destinations <ChevronDown size={14} />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 grid grid-cols-2 gap-3 w-[420px]">
                  {destinations.map((dest) => (
                    <Link
                      key={dest.name}
                      href={dest.href}
                      className="group/card rounded-lg overflow-hidden border border-gray-100 hover:border-brand-orange transition"
                    >
                      <div className="relative h-24 w-full bg-gray-100">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          sizes="200px"
                          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-black px-3 py-2">
                        {dest.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/tours"
                className="hover:text-brand-orange transition py-5"
              >
                All Tours
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-brand-orange transition py-5"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right side: Language (single) | Cart | Menu */}
          <div className="flex items-center gap-2 shrink-0 z-[100]">
            <div className="relative overflow-visible z-[999]">
              <LanguageSwitcher />
            </div>

            {/* Safari Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-3 py-2 rounded-lg transition shadow whitespace-nowrap"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Menu toggle */}
            <button
              className="lg:hidden text-black shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 absolute top-full left-0 w-full bg-white h-[calc(100vh-64px)] overflow-y-auto px-4 shadow-lg">
            <ul className="flex flex-col gap-1 text-black font-medium pb-20">
              <MobileLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
              <MobileLink href="/about" label="About" onClick={() => setMobileOpen(false)} />

              {/* Mobile Safari Accordion */}
              <li>
                <button
                  onClick={() => toggleMobileSection("safari")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-brand-green-light"
                >
                  Safari
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openMobileSection === "safari" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileSection === "safari" && (
                  <div className="pl-6 py-2 space-y-3 text-sm">
                    <Link
                      href="/safaris/style/day-trips"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Day Trips
                    </Link>
                    <Link
                      href="/safaris/style/private"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Private Safaris
                    </Link>
                    <Link
                      href="/safaris/style/migration"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Great Migration Safaris
                    </Link>
                    <Link
                      href="/safaris/style/family"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Family Safaris
                    </Link>
                    <Link
                      href="/safaris/style/honeymoon"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Honeymoon Safaris
                    </Link>
                    <Link
                      href="/destinations/serengeti"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold pt-2 border-t mt-2"
                    >
                      Serengeti National Park
                    </Link>
                    <Link
                      href="/destinations/ngorongoro"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold"
                    >
                      Ngorongoro Crater
                    </Link>
                  </div>
                )}
              </li>

              {/* Mobile Kilimanjaro Accordion */}
              <li>
                <button
                  onClick={() => toggleMobileSection("kili")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-brand-green-light"
                >
                  Kilimanjaro
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openMobileSection === "kili" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileSection === "kili" && (
                  <div className="pl-6 py-2 space-y-3 text-sm">
                    <Link
                      href="/kilimanjaro"
                      onClick={() => setMobileOpen(false)}
                      className="block text-brand-orange font-bold"
                    >
                      View All Routes
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/machame-route-7-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Machame Route (7D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/marangu-route-6-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Marangu Route (6D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/machame-route-6-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Machame Route (6D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/lemosho-route-8-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Lemosho Route (8D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/rongai-route-7-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Rongai Route (7D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/umbwe-route-6-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Umbwe Route (6D)
                    </Link>
                    <Link
                      href="/kilimanjaro/routes/northern-circuit-9-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Northern Circuit (9D)
                    </Link>
                    <Link
                      href="/kilimanjaro"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold pt-2 border-t mt-2"
                    >
                      Best Time to Climb
                    </Link>
                    <Link
                      href="/kilimanjaro"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold"
                    >
                      Packing List
                    </Link>
                  </div>
                )}
              </li>

              {/* Mobile Zanzibar Accordion */}
              <li>
                <button
                  onClick={() => toggleMobileSection("zanz")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-brand-green-light"
                >
                  Zanzibar
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openMobileSection === "zanz" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileSection === "zanz" && (
                  <div className="pl-6 py-2 space-y-3 text-sm">
                    <Link
                      href="/zanzibar"
                      onClick={() => setMobileOpen(false)}
                      className="block text-brand-orange font-bold"
                    >
                      View All Zanzibar
                    </Link>
                    <Link
                      href="/zanzibar/holidays/zanzibar-beach-holiday-4-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Beach Holiday (4D)
                    </Link>
                    <Link
                      href="/zanzibar/holidays/stone-town-escape-3-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Stone Town Escape (3D)
                    </Link>
                    <Link
                      href="/zanzibar/holidays/zanzibar-culture-beach-5-days"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      Culture & Beach (5D)
                    </Link>
                    <Link
                      href="/zanzibar/excursions/stone-town-tour"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold pt-2 border-t mt-2"
                    >
                      Stone Town Tour
                    </Link>
                    <Link
                      href="/zanzibar/excursions/spice-farm-tour"
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-black font-semibold"
                    >
                      Spice Farm Tour
                    </Link>
                  </div>
                )}
              </li>

              {/* Mobile Destinations Accordion */}
              <li>
                <button
                  onClick={() => toggleMobileSection("dest")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-brand-green-light"
                >
                  Destinations
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openMobileSection === "dest" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileSection === "dest" && (
                  <div className="pl-6 py-2 space-y-3 text-sm">
                    {destinations.map((dest) => (
                      <Link
                        key={dest.name}
                        href={dest.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-gray-600 hover:text-black"
                      >
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <MobileLink href="/tours" label="All Tours" onClick={() => setMobileOpen(false)} />
              <MobileLink href="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

// ---------- Sub-components ----------
function MobileLink({ href, label, onClick }: MobileLinkProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block px-3 py-2 rounded hover:bg-brand-green-light"
      >
        {label}
      </Link>
    </li>
  );
}