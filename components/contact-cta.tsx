import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

interface ContactCtaProps {
  className?: string;
  title?: string;
  subline?: string;
  variant?: "default" | "compact";
}

export function ContactCta({
  className,
  title = "Fragen? Wir sind für Sie da.",
  subline = "Ein fachkundiger Berater steht Ihnen zu unseren Öffnungszeiten persönlich zur Verfügung.",
  variant = "default",
}: ContactCtaProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 border-border/60 p-6 md:p-8",
        variant === "default" && "bg-gradient-to-br from-primary/5 to-chart-4/5",
        className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      {subline && <p className="text-sm text-muted-foreground">{subline}</p>}
      <div className="mt-2 flex flex-col gap-2">
        <Button asChild size="lg">
          <Link href={`tel:${siteConfig.contact.phoneRaw}`}>
            <Phone className="size-4" aria-hidden />
            {siteConfig.contact.phone}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`mailto:${siteConfig.contact.email}`}>
            <Mail className="size-4" aria-hidden />
            E-Mail schreiben
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex items-start gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
        <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <div className="space-y-0.5">
          {siteConfig.openingHours.map((h) => (
            <div key={h.days} className="flex justify-between gap-4">
              <span>{h.days}</span>
              <span className="font-medium">{h.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
