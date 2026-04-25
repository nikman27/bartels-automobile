import { vehiclesMock } from "@/lib/data/vehicles-mock";
import type {
  Vehicle,
  VehicleFilters,
  CategoryCount,
  VehicleCategory,
  SortKey,
} from "@/lib/types";
import { pagesContent } from "@/lib/data/pages-content";

// TODO: Replace with mobile.de API call
export async function getVehicles(filters?: VehicleFilters): Promise<Vehicle[]> {
  return applyFilters(vehiclesMock, filters);
}

// TODO: Replace with mobile.de API call
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return vehiclesMock.find((v) => v.slug === slug) ?? null;
}

// TODO: Replace with mobile.de API call
export async function getNewArrivals(limit = 8): Promise<Vehicle[]> {
  return vehiclesMock.filter((v) => v.isNew).slice(0, limit);
}

// TODO: Replace with mobile.de API call
export async function getVehicleCategories(): Promise<CategoryCount[]> {
  const categories: VehicleCategory[] = [
    "pkw",
    "lkw",
    "transporter",
    "wohnmobile",
    "motorraeder",
  ];
  return categories.map((category) => ({
    category,
    label: pagesContent.vehicleCategories[category],
    count: vehiclesMock.filter((v) => v.category === category).length,
  }));
}

// TODO: Replace with mobile.de API call
export async function getRelatedVehicles(
  vehicle: Vehicle,
  limit = 3,
): Promise<Vehicle[]> {
  return vehiclesMock
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .sort(
      (a, b) => Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price),
    )
    .slice(0, limit);
}

export function getBrands(): string[] {
  return Array.from(new Set(vehiclesMock.map((v) => v.brand))).sort();
}

export function getModelsForBrand(brand: string): string[] {
  return Array.from(
    new Set(vehiclesMock.filter((v) => v.brand === brand).map((v) => v.model)),
  ).sort();
}

export function applyFilters(list: Vehicle[], filters?: VehicleFilters): Vehicle[] {
  if (!filters) return list;
  return list.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.brand && v.brand !== filters.brand) return false;
    if (filters.model && v.model !== filters.model) return false;
    if (filters.fuelType && v.fuelType !== filters.fuelType) return false;
    if (filters.transmission && v.transmission !== filters.transmission) return false;
    if (filters.priceMin != null && v.price < filters.priceMin) return false;
    if (filters.priceMax != null && v.price > filters.priceMax) return false;
    if (filters.mileageMax != null && v.mileage > filters.mileageMax) return false;
    if (filters.seats != null && v.seats < filters.seats) return false;
    if (filters.trailerHitch === true && !v.hasTrailerHitch) return false;
    if (filters.yearFrom != null) {
      const year = parseInt(v.firstRegistration.split("/")[1] ?? "0", 10);
      if (year < filters.yearFrom) return false;
    }
    return true;
  });
}

export function sortVehicles(list: Vehicle[], sort: SortKey): Vehicle[] {
  const copy = [...list];
  switch (sort) {
    case "priceAsc":
      return copy.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return copy.sort((a, b) => b.price - a.price);
    case "alpha":
      return copy.sort((a, b) => a.title.localeCompare(b.title, "de"));
    case "newest":
    default:
      return copy.sort((a, b) => {
        const ay = parseInt(a.firstRegistration.split("/")[1] ?? "0", 10);
        const by = parseInt(b.firstRegistration.split("/")[1] ?? "0", 10);
        return by - ay;
      });
  }
}
