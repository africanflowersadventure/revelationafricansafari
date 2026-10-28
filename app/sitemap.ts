
import type { MetadataRoute } from "next";

const BASE_URL = "https://revelationafricansafari.com";

const routes = [
  // Main pages
  "/",
  "/about",
  "/tours",
  "/contact",

  // Safari styles
  "/safaris/style/day-trips",
  "/safaris/style/private",
  "/safaris/style/migration",
  "/safaris/style/family",
  "/safaris/style/honeymoon",

  // Safari destinations
  "/destinations/serengeti",
  "/destinations/ngorongoro",
  "/destinations/tarangire",
  "/destinations/manyara",

  // Safari packages
  "/safaris/8-day-private-fly-in-safari",
  "/safaris/1-day-tarangire-shared",
  "/safaris/3-day-serengeti-migration-safari",
  "/safaris/6-day-honeymoon-safari-zanzibar",
  "/safaris/2-day-family-safari-tarangire",

  // Kilimanjaro
  "/kilimanjaro",
  "/kilimanjaro/routes",
  "/kilimanjaro/routes/machame-route-7-days",
  "/kilimanjaro/routes/marangu-route-6-days",
  "/kilimanjaro/routes/machame-route-6-days",
  "/kilimanjaro/routes/lemosho-route-8-days",
  "/kilimanjaro/routes/rongai-route-7-days",
  "/kilimanjaro/routes/umbwe-route-6-days",
  "/kilimanjaro/routes/northern-circuit-9-days",
  "/kilimanjaro/best-time",
  "/kilimanjaro/packing-list",
  "/kilimanjaro/route-comparison",
  "/kilimanjaro/fitness",
  "/kilimanjaro/success-rates",

  // Zanzibar
  "/zanzibar",
  "/zanzibar/tours",
  "/zanzibar/holidays/zanzibar-beach-holiday-4-days",
  "/zanzibar/holidays/stone-town-escape-3-days",
  "/zanzibar/holidays/zanzibar-culture-beach-5-days",
  "/zanzibar/holidays/zanzibar-honeymoon-6-days",
  "/zanzibar/holidays/zanzibar-island-discovery-7-days",

  // Zanzibar excursions
  "/zanzibar/excursions/stone-town-tour",
  "/zanzibar/excursions/spice-farm-tour",
  "/zanzibar/excursions/prison-island",
  "/zanzibar/excursions/mnemba-snorkelling",
  "/zanzibar/excursions/sunset-dhow-cruise",
  "/zanzibar/excursions/jozani-forest",

  // Safari categories
  "/safaris/popular",
  "/safaris/private",
  "/safaris/shared",

  // Accommodation pages
  "/accommodations/mvuli-hotel",
  "/accommodations/ngare-lodge",
  "/accommodations/friends-serengeti-camp",
  "/accommodations/serengeti-tented-camp",

  // Legal pages
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
  }));
}
