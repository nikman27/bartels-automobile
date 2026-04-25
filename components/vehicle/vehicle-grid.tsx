import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./vehicle-card";

interface VehicleGridProps {
  vehicles: Vehicle[];
  emptyMessage?: string;
}

export function VehicleGrid({
  vehicles,
  emptyMessage = "Keine Fahrzeuge gefunden. Bitte passen Sie Ihre Filter an.",
}: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((v, i) => (
        <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
      ))}
    </div>
  );
}
