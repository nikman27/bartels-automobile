const BARTELS_AJAX = "https://bartels-automobile.de/wp-admin/admin-ajax.php";

export const BARTELS_CATEGORY_MAP: Record<string, { vehicle_class: string }> = {
  pkw: { vehicle_class: "Car" },
  lkw: { vehicle_class: "Truck" },
  transporter: { vehicle_class: "Van" },
  wohnmobile: { vehicle_class: "MotorHome" },
  motorraeder: { vehicle_class: "Motorbike" },
  alle: { vehicle_class: "Car" },
};

export interface BartiVehicle {
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
  isNew: boolean;
}

function parseVehicles(html: string): BartiVehicle[] {
  const adPattern = /<a class="wpa-ad-link" href="(https:\/\/bartels-automobile\.de\/fahrzeug\/[^"]+)">([\s\S]*?)<\/a>/g;
  const vehicles: BartiVehicle[] = [];
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
    const attrPattern = /<span class="wpa-ad-attr">[\s\S]*?<\/i>\s*(.*?)<\/span>/g;
    const attrs: string[] = [];
    let a;
    while ((a = attrPattern.exec(content)) !== null) attrs.push(a[1].trim());

    vehicles.push({
      title,
      price,
      priceFormatted: price > 0 ? `${price.toLocaleString("de-DE")} €` : "Preis auf Anfrage",
      url,
      image: imgMatch ? imgMatch[1] : "",
      date: attrs[0] ?? "",
      mileage: attrs[1] ?? "",
      power: attrs[2] ?? "",
      bodyType: attrs[3] ?? "",
      fuel: attrs[4] ?? "",
      gearbox: attrs[5] ?? "",
      isNew: content.includes("wpa-new-badge"),
    });
  }
  return vehicles;
}

export async function bartiSearchVehicles(params: {
  category: string;
  brand?: string;
  max_price?: number;
  max_mileage?: number;
  fuel?: string;
}): Promise<{ total: number; vehicles: BartiVehicle[] }> {
  const mapping = BARTELS_CATEGORY_MAP[params.category] ?? BARTELS_CATEGORY_MAP.pkw;

  const formData = new URLSearchParams({
    action: "reload_sidebar_shortcode",
    vehicle_class: mapping.vehicle_class,
    category: "",
    page: "1",
    ads_length: "50",
    ...(params.max_price ? { price_max: String(params.max_price) } : {}),
    ...(params.max_mileage ? { mileage_max: String(params.max_mileage) } : {}),
  });

  const res = await fetch(BARTELS_AJAX, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Bartels AJAX ${res.status}`);
  const data = await res.json() as { html: string };
  let vehicles = parseVehicles(data.html);

  if (params.brand) {
    vehicles = vehicles.filter((v) => v.title.toLowerCase().includes(params.brand!.toLowerCase()));
  }
  if (params.fuel) {
    vehicles = vehicles.filter((v) => v.fuel.toLowerCase().includes(params.fuel!.toLowerCase()));
  }

  return { total: vehicles.length, vehicles: vehicles.slice(0, 5) };
}
