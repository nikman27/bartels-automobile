import { NextRequest, NextResponse } from "next/server";

const BARTELS_AJAX = "https://bartels-automobile.de/wp-admin/admin-ajax.php";

const CATEGORY_MAP: Record<string, { vehicle_class: string; category: string }> = {
  pkw: { vehicle_class: "Car", category: "" },
  lkw: { vehicle_class: "Truck", category: "" },
  transporter: { vehicle_class: "Van", category: "" },
  wohnmobile: { vehicle_class: "MotorHome", category: "" },
  motorraeder: { vehicle_class: "Motorbike", category: "" },
  alle: { vehicle_class: "Car", category: "" },
};

export interface Vehicle {
  title: string;
  price: number;
  priceFormatted: string;
  url: string;
  image: string;
  date: string;
  mileage: string;
  power: string;
  bodyType: string;
  fuel: string;
  gearbox: string;
  seats: string;
  brand: string;
  isNew: boolean;
}

function parseVehicles(html: string): Vehicle[] {
  const adPattern = /<a class="wpa-ad-link" href="(https:\/\/bartels-automobile\.de\/fahrzeug\/[^"]+)">([\s\S]*?)<\/a>/g;
  const vehicles: Vehicle[] = [];

  let match;
  while ((match = adPattern.exec(html)) !== null) {
    const [, url, content] = match;

    const titleMatch = content.match(/<h3>([\s\S]*?)<\/h3>/);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) continue;

    const priceMatch = content.match(/class="preis">([\d.,]+)€/);
    const priceStr = priceMatch ? priceMatch[1].replace(/\./g, "").replace(",", ".") : "0";
    const price = parseFloat(priceStr) || 0;

    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    const image = imgMatch ? imgMatch[1] : "";

    const attrPattern = /<span class="wpa-ad-attr">[\s\S]*?<\/i>\s*(.*?)<\/span>/g;
    const attrs: string[] = [];
    let attrMatch;
    while ((attrMatch = attrPattern.exec(content)) !== null) {
      attrs.push(attrMatch[1].trim());
    }

    const isNew = content.includes('wpa-new-badge');

    const brandGuess = title.split(" ")[0];

    vehicles.push({
      title,
      price,
      priceFormatted: price > 0 ? `${price.toLocaleString("de-DE")} €` : "Preis auf Anfrage",
      url,
      image,
      date: attrs[0] ?? "",
      mileage: attrs[1] ?? "",
      power: attrs[2] ?? "",
      bodyType: attrs[3] ?? "",
      fuel: attrs[4] ?? "",
      gearbox: attrs[5] ?? "",
      seats: attrs[6] ?? "",
      brand: brandGuess,
      isNew,
    });
  }

  return vehicles;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "pkw";
  const brand = searchParams.get("brand")?.toLowerCase() ?? "";
  const maxPrice = parseInt(searchParams.get("maxPrice") ?? "0");
  const maxMileage = parseInt(searchParams.get("maxMileage") ?? "0");
  const fuel = searchParams.get("fuel")?.toLowerCase() ?? "";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "5"), 10);

  const mapping = CATEGORY_MAP[category] ?? CATEGORY_MAP.pkw;

  const formData = new URLSearchParams({
    action: "reload_sidebar_shortcode",
    vehicle_class: mapping.vehicle_class,
    category: mapping.category,
    page: "1",
    ads_length: "50",
    ...(maxPrice > 0 ? { price_max: String(maxPrice) } : {}),
    ...(maxMileage > 0 ? { mileage_max: String(maxMileage) } : {}),
  });

  try {
    const res = await fetch(BARTELS_AJAX, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`Bartels AJAX ${res.status}`);

    const data = await res.json() as { html: string; maxPages: number };
    let vehicles = parseVehicles(data.html);

    if (brand) {
      vehicles = vehicles.filter((v) => v.title.toLowerCase().includes(brand));
    }
    if (fuel) {
      vehicles = vehicles.filter((v) => v.fuel.toLowerCase().includes(fuel));
    }

    return NextResponse.json({
      total: vehicles.length,
      vehicles: vehicles.slice(0, limit),
      maxPages: data.maxPages,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Fahrzeugdaten konnten nicht geladen werden", detail: String(err) },
      { status: 500 }
    );
  }
}
