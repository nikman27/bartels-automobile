export type VehicleCategory =
  | "pkw"
  | "lkw"
  | "transporter"
  | "wohnmobile"
  | "motorraeder";

export type FuelType = "Benzin" | "Diesel" | "Elektro" | "Hybrid" | "Gas";

export type Transmission = "Automatik" | "Schaltgetriebe";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  title: string;
  category: VehicleCategory;
  price: number;
  firstRegistration: string;
  mileage: number;
  power: { kw: number; ps: number };
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: string;
  seats: number;
  consumption?: string;
  co2?: string;
  color?: string;
  features: string[];
  images: string[];
  description?: string;
  isNew?: boolean;
  hasWarranty?: boolean;
  hasTrailerHitch?: boolean;
}

export type Department =
  | "geschaeftsfuehrung"
  | "verkauf"
  | "administration"
  | "fahrzeugpflege"
  | "werkstatt"
  | "einkauf";

export interface TeamMember {
  name: string;
  role: string;
  department: Department;
  image?: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
}

export interface CategoryCount {
  category: VehicleCategory;
  label: string;
  count: number;
}

export interface VehicleFilters {
  category?: VehicleCategory;
  brand?: string;
  model?: string;
  fuelType?: FuelType;
  transmission?: Transmission;
  priceMin?: number;
  priceMax?: number;
  yearFrom?: number;
  mileageMax?: number;
  seats?: number;
  trailerHitch?: boolean;
}

export type SortKey =
  | "newest"
  | "priceAsc"
  | "priceDesc"
  | "alpha";
