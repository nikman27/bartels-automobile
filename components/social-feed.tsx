import Link from "next/link";
import { Play } from "lucide-react";

import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

const thumbGradients = [
  "from-chart-1/40 via-chart-2/30 to-chart-4/50",
  "from-primary/40 via-chart-4/30 to-chart-5/40",
  "from-chart-3/40 via-chart-4/40 to-primary/40",
  "from-chart-2/50 via-chart-5/30 to-chart-1/40",
  "from-chart-4/50 via-primary/30 to-chart-3/40",
  "from-chart-5/40 via-chart-3/30 to-chart-2/40",
  "from-primary/40 via-chart-2/30 to-chart-5/50",
  "from-chart-4/40 via-chart-1/30 to-primary/40",
];

const captions = [
  "Neuzugang: Mercedes-Benz E 350 T",
  "Hinter den Kulissen: Fahrzeugaufbereitung",
  "So läuft ein Kauftag bei Bartels",
  "Unser Werkstatt-Team stellt sich vor",
  "Finanzierung? So einfach geht's",
  "Export nach Skandinavien – wir liefern!",
  "Kundenstory: VW Golf GTI",
  "Sponsoring: TSV Kleinburgwedel",
];

export function SocialFeed() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
      {thumbGradients.map((gradient, i) => (
        <Link
          key={i}
          href={siteConfig.social.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative aspect-[9/14] overflow-hidden rounded-xl bg-gradient-to-br",
            gradient,
          )}
          aria-label={captions[i]}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="size-6 translate-x-0.5" fill="currentColor" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent p-3">
            <p className="line-clamp-2 text-xs font-medium text-background">
              {captions[i]}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
