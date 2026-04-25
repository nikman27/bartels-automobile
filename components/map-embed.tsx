import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site-config";

interface MapEmbedProps {
  className?: string;
}

export function MapEmbed({ className }: MapEmbedProps) {
  const query = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`,
  );
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=9.79%2C52.53%2C9.82%2C52.56&layer=mapnik&marker=52.552%2C9.807`;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-muted shadow-sm",
        className,
      )}
    >
      <iframe
        src={src}
        title={`Standort ${siteConfig.name}`}
        className="aspect-[4/3] w-full md:aspect-video"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
      >
        <MapPin className="size-3.5" aria-hidden />
        In Google Maps öffnen
      </a>
    </div>
  );
}
