import { cn } from "@/lib/utils";
import { partners } from "@/lib/data/partners";

interface PartnerLogosProps {
  className?: string;
  title?: string;
}

export function PartnerLogos({
  className,
  title = "Unsere Partner",
}: PartnerLogosProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 md:p-8", className)}>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {partners.map((p) => (
          <div
            key={p.name}
            className="flex flex-col items-start gap-1.5 rounded-lg border border-dashed p-4 transition-colors hover:border-border"
          >
            <span className="font-heading text-base font-bold tracking-tight">
              {p.name}
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {p.shortDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
