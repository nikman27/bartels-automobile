import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon =
    ((Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? Icons.Sparkles) as React.ComponentType<{ className?: string }>;
  return (
    <Link
      href={`/${service.slug === "verkauf-ankauf" ? "verkauf-ankauf" : service.slug}`}
      className={cn(
        "group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <Card className="flex h-full flex-col gap-4 border-border/70 p-6 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:border-border">
        <span
          aria-hidden
          className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
        >
          <Icon className="size-6" />
        </span>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-200 group-hover:gap-2">
          Mehr erfahren
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </Card>
    </Link>
  );
}
