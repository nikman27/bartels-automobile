import type { MetadataRoute } from "next";
import { vehiclesMock } from "@/lib/data/vehicles-mock";

const BASE = "https://bartels-automobile.de";

const STATIC_ROUTES = [
  "",
  "/fahrzeuge",
  "/fahrzeuge/pkw",
  "/fahrzeuge/lkw",
  "/fahrzeuge/transporter",
  "/fahrzeuge/wohnmobile",
  "/fahrzeuge/motorraeder",
  "/verkauf-ankauf",
  "/vermittlung",
  "/finanzierung",
  "/garantie",
  "/export",
  "/sponsoring",
  "/ueber-uns",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...vehiclesMock.map((v) => ({
      url: `${BASE}/fahrzeuge/${v.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
