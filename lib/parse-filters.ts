import type {
  VehicleCategory,
  VehicleFilters,
  FuelType,
  Transmission,
} from "@/lib/types";

export function parseFilters(
  params: Record<string, string | string[] | undefined>,
  locked?: VehicleCategory,
): VehicleFilters {
  const getStr = (k: string) => {
    const v = params[k];
    if (Array.isArray(v)) return v[0];
    return typeof v === "string" ? v : undefined;
  };
  const getNum = (k: string) => {
    const v = getStr(k);
    if (!v) return undefined;
    const n = Number(v.replace(/[^\d]/g, ""));
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };
  const category =
    locked ?? (getStr("category") as VehicleCategory | undefined);
  return {
    category,
    brand: getStr("brand"),
    fuelType: getStr("fuel") as FuelType | undefined,
    transmission: getStr("transmission") as Transmission | undefined,
    priceMin: getNum("priceMin"),
    priceMax: getNum("priceMax"),
    yearFrom: getNum("yearFrom"),
    mileageMax: getNum("mileageMax"),
    seats: getNum("seats"),
    trailerHitch:
      getStr("trailerHitch") === "true"
        ? true
        : getStr("trailerHitch") === "false"
          ? false
          : undefined,
  };
}
