import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Users, 
  Compass, 
  Mountain,
  Palmtree 
} from "lucide-react";
import { safaris } from "@/data/safaris";
import SafariCard from "./components/SafariCard";

export const metadata: Metadata = {
  title: "Tanzania Safaris, Kilimanjaro & Zanzibar | Revelation Africa Safari",
  description: "Tailor-made Tanzania safaris, Kilimanjaro climbs, and Zanzibar escapes. Locally owned safari company in Arusha offering private & group tours.",
  keywords: [
    "Tanzania safaris",
    "Serengeti safari",
    "Ngorongoro crater tour",
    "Kilimanjaro climb",
    "Zanzibar beach holiday",
    "Tanzania tour operator",
    "Arusha safari",
    "African safari packages",
  ],
  alternates: { canonical: "https://revelationafricansafari.com/" },
  openGraph: {
    title: "Revelation Africa Safari | Tanzania Safaris, Kilimanjaro & Zanzibar",
    description: "Tailor-made safaris, Kilimanjaro climbs, and Zanzibar escapes crafted by local experts.",
    url: "https://revelationafricansafari.com/",
    images: ["/revelationLogo.png"],
  },
};


// --- Static Data for the Home Page ---
const featuredSafaris = safaris.slice(0, 3); // Grabs the first 3 safaris from your data

const destinations = [
  { name: "Serengeti", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80", href: "/destinations/serengeti", tag: "Great Migration" },
  { name: "Ngorongoro", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80", href: "/destinations/ngorongoro", tag: "Big Five" },
  { name: "Tarangire", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80", href: "/destinations/tarangire", tag: "Elephant Herds" },
  { name: "Lake Manyara", image: "https://images.unsplash.com/photo-1534177616072-ef7dc1204494?auto=format&fit=crop&w=600&q=80", href: "/destinations/manyara", tag: "Tree-Climbing Lions" },
];

const guides = [
  { title: "Best Time to Climb Kilimanjaro", href: "/kilimanjaro/best-time", image: "https://images.unsplash.com/photo-1522198428577-adf2e9efc653?auto=format&fit=crop&w=400&q=80" },
  { title: "Understanding the Great Migration", href: "/tours?style=migration", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80" },
  { title: "What to Pack for a Safari", href: "/kilimanjaro/packing-list", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80" },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
          alt="Safari in Tanzania"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-orange text-white font-bold text-sm px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Revelation Africa Safari
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Discover the Heart <br className="hidden md:block" /> of Africa
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
            Tailor-made safaris, Kilimanjaro climbs, and Zanzibar escapes crafted by local experts.
          </p>

          {/* Floating Search Card */}
          <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <select aria-label="Destination" className="flex-1 p-3 border-none bg-gray-50 rounded-xl outline-none text-black font-medium cursor-pointer">
              <option>All Destinations</option>
              <option>Serengeti</option>
              <option>Ngorongoro</option>
              <option>Zanzibar</option>
              <option>Kilimanjaro</option>
            </select>
            <select aria-label="Trip type" className="flex-1 p-3 border-none bg-gray-50 rounded-xl outline-none text-black font-medium cursor-pointer">
              <option>Any Trip Type</option>
              <option>Private Safari</option>
              <option>Shared Safari</option>
              <option>Beach Holiday</option>
            </select>
            <Link 
              href="/tours"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3 rounded-xl transition shadow flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Find My Safari <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Star className="text-brand-orange" size={24} />
            <span className="text-sm font-semibold">5-Star Rated Tours</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-brand-green" size={24} />
            <span className="text-sm font-semibold">Licensed Local Experts</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="text-brand-orange" size={24} />
            <span className="text-sm font-semibold">100% Tailor-Made</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users className="text-brand-green" size={24} />
            <span className="text-sm font-semibold">Eco-Friendly Travel</span>
          </div>
        </div>
      </section>

      {/* 3. FIND YOUR ADVENTURE (Categories) */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Find Your Adventure</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Whether you seek the thrill of the wild, the challenge of the summit, or the serenity of the ocean — your journey starts here.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Safari */}
          <Link href="/tours" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" alt="Safari" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Compass size={32} className="mb-3 text-brand-orange" />
              <h3 className="text-2xl font-bold mb-1">The Great Safari</h3>
              <p className="text-white/80 text-sm">Experience the wild heart of Tanzania.</p>
            </div>
          </Link>
          {/* Kilimanjaro */}
          <Link href="/kilimanjaro" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image src="https://images.unsplash.com/photo-1522198428577-adf2e9efc653?auto=format&fit=crop&w=800&q=80" alt="Kilimanjaro" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Mountain size={32} className="mb-3 text-brand-green" />
              <h3 className="text-2xl font-bold mb-1">Conquer Kilimanjaro</h3>
              <p className="text-white/80 text-sm">Stand on the roof of Africa.</p>
            </div>
          </Link>
          {/* Zanzibar */}
          <Link href="/zanzibar" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80" alt="Zanzibar" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Palmtree size={32} className="mb-3 text-brand-orange" />
              <h3 className="text-2xl font-bold mb-1">Zanzibar Escapes</h3>
              <p className="text-white/80 text-sm">Relax on the pristine spice island.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. FEATURED SAFARIS */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Our Most Popular Journeys</h2>
              <p className="text-gray-600">Hand-picked itineraries for the ultimate African experience.</p>
            </div>
            <Link href="/tours" className="mt-4 md:mt-0 flex items-center gap-2 text-brand-orange font-bold hover:underline">
              View All Safaris <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSafaris.map((safari) => (
              <SafariCard key={safari.slug} safari={safari} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80" alt="Our Team" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <span className="bg-brand-green/10 text-brand-green font-bold px-3 py-1 rounded-full text-sm inline-block mb-4">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">We Are Tanzanian-Owned & Operated</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We don't just sell safaris; we live here. Our guides grew up in the bush, and our planners know every hidden gem. When you travel with us, you support local families and conservation directly.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <div className="bg-brand-green-light text-brand-green p-2 rounded-lg h-fit"><MapPin size={20} /></div>
                <div>
                  <h3 className="font-bold">Local Expertise</h3>
                  <p className="text-sm text-gray-600">Guides who know exactly where to find the wildlife.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-brand-green-light text-brand-green p-2 rounded-lg h-fit"><Compass size={20} /></div>
                <div>
                  <h3 className="font-bold">Custom Itineraries</h3>
                  <p className="text-sm text-gray-600">Every trip is built around your pace and preferences.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-brand-green-light text-brand-green p-2 rounded-lg h-fit"><ShieldCheck size={20} /></div>
                <div>
                  <h3 className="font-bold">Responsible Travel</h3>
                  <p className="text-sm text-gray-600">We give back to the communities and parks we visit.</p>
                </div>
              </li>
            </ul>
            <Link href="/about" className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-lg transition">
              Read Our Story <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. DESTINATIONS SPOTLIGHT */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Top Destinations</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Explore the iconic parks and reserves of Northern Tanzania.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <Link key={dest.name} href={dest.href} className="group relative h-80 rounded-2xl overflow-hidden">
                <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">{dest.tag}</span>
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRAVEL GUIDES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Travel Guides & Tips</h2>
            <p className="text-gray-600">Expert advice to help you prepare for your journey.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.title} href={guide.href} className="group block">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <Image src={guide.image} alt={guide.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-black group-hover:text-brand-orange transition">{guide.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Read Article</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-brand-orange fill-brand-orange" size={24} />)}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-black leading-snug mb-8">
            "Revelation Africa Safari gave us the trip of a lifetime. Our guide knew exactly where to find the leopards, and the lodges were absolutely perfect. We can't wait to come back."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">S</div>
            <p className="font-bold">Sarah & John</p>
            <p className="text-sm text-gray-500">United Kingdom</p>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-brand-orange rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Start Planning?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let our local experts design your dream African holiday. No obligation, just inspiration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-white text-brand-orange font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg text-lg">
                Start Planning
              </Link>
              <a href="https://wa.me/255757535767" target="_blank" rel="noopener noreferrer" className="bg-black/20 hover:bg-black/30 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition text-lg backdrop-blur-sm">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}