import type { Vehicle } from "@/lib/types";
import { formatMileage, formatPower, formatPrice } from "@/lib/utils";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const rows: Array<[string, string | undefined]> = [
    ["Preis", formatPrice(vehicle.price)],
    ["Erstzulassung", vehicle.firstRegistration],
    ["Kilometerstand", formatMileage(vehicle.mileage)],
    ["Leistung", formatPower(vehicle.power)],
    ["Kraftstoff", vehicle.fuelType],
    ["Getriebe", vehicle.transmission],
    ["Karosserie", vehicle.bodyType],
    ["Sitzplätze", String(vehicle.seats)],
    ["Verbrauch", vehicle.consumption],
    ["CO₂", vehicle.co2],
    ["Farbe", vehicle.color],
    ["Anhängerkupplung", vehicle.hasTrailerHitch ? "Ja" : undefined],
  ];

  return (
    <dl className="divide-y divide-border rounded-xl border">
      {rows
        .filter(([, v]) => v)
        .map(([k, v], idx) => (
          <div
            key={k}
            className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${
              idx % 2 === 0 ? "bg-muted/30" : ""
            }`}
          >
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-medium text-foreground">{v}</dd>
          </div>
        ))}
    </dl>
  );
}
