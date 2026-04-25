import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const deFormatter = new Intl.NumberFormat("de-DE");

export function formatPrice(price: number): string {
  return `${deFormatter.format(price)} €`;
}

export function formatMileage(km: number): string {
  return `${deFormatter.format(km)} km`;
}

export function formatPower(power: { kw: number; ps: number }): string {
  return `${power.kw} kW (${power.ps} PS)`;
}

export function formatNumber(n: number): string {
  return deFormatter.format(n);
}

export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
