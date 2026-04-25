import Link from "next/link";
import Image from "next/image";
import { Calendar, Gauge, Zap } from "lucide-react";

import { cn, formatMileage, formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { NewBadge, WarrantyBadge } from "./vehicle-badge";
import { VehiclePlaceholder } from "./vehicle-placeholder";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
  className?: string;
}

export function VehicleCard({ vehicle, priority, className }: VehicleCardProps) {
  return (
    <Link
      href={`/fahrzeuge/${vehicle.slug}`}
      className={cn(
        "group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
        className,
      )}
    >
      <Card className="flex h-full flex-col overflow-hidden border-border/70 p-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:border-border">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {vehicle.images.length > 0 ? (
            <Image
              src={vehicle.images[0]}
              alt={vehicle.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              priority={priority}
            />
          ) : (
            <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
              <VehiclePlaceholder category={vehicle.category} />
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {vehicle.isNew && <NewBadge />}
            {vehicle.hasWarranty && <WarrantyBadge />}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="line-clamp-2 font-heading text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {vehicle.title}
          </h3>

          <dl className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="size-3.5" aria-hidden />
              <span>{vehicle.firstRegistration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="size-3.5" aria-hidden />
              <span>{formatMileage(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="size-3.5" aria-hidden />
              <span>{vehicle.power.ps} PS</span>
            </div>
          </dl>

          <div className="mt-auto flex items-baseline justify-between border-t pt-3">
            <span className="text-xs text-muted-foreground">
              {vehicle.fuelType} · {vehicle.transmission}
            </span>
            <span className="font-heading text-xl font-bold text-chart-4">
              {formatPrice(vehicle.price)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
