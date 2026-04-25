import { cn } from "@/lib/utils";
import type { VehicleCategory } from "@/lib/types";
import { Car, Truck, Bike, Home, Package } from "lucide-react";

const iconMap = {
  pkw: Car,
  lkw: Truck,
  transporter: Package,
  wohnmobile: Home,
  motorraeder: Bike,
};

const gradientMap: Record<VehicleCategory, string> = {
  pkw: "from-chart-2/30 via-chart-3/20 to-chart-4/30",
  lkw: "from-chart-3/30 via-chart-4/20 to-chart-5/40",
  transporter: "from-chart-1/30 via-chart-2/20 to-chart-3/40",
  wohnmobile: "from-chart-2/25 via-chart-3/30 to-chart-1/30",
  motorraeder: "from-chart-4/30 via-chart-5/30 to-chart-3/30",
};

interface VehiclePlaceholderProps {
  category: VehicleCategory;
  className?: string;
  label?: string;
}

export function VehiclePlaceholder({
  category,
  className,
  label,
}: VehiclePlaceholderProps) {
  const Icon = iconMap[category] ?? Car;
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        gradientMap[category],
        className,
      )}
      aria-hidden={!label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgba(0,0,0,0.06)_60%,transparent_100%)]" />
      <Icon
        className="size-16 text-foreground/30 drop-shadow-sm"
        strokeWidth={1.2}
      />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-md bg-background/70 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-foreground/70 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
