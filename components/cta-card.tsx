import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface CtaCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
  tone?: "primary" | "accent" | "muted";
  className?: string;
}

const toneClasses = {
  primary: "bg-primary/5 border-primary/20 [&_.cta-icon]:bg-primary/15 [&_.cta-icon]:text-primary",
  accent: "bg-chart-4/5 border-chart-4/20 [&_.cta-icon]:bg-chart-4/15 [&_.cta-icon]:text-chart-4",
  muted: "bg-muted border-border [&_.cta-icon]:bg-foreground/10 [&_.cta-icon]:text-foreground",
};

export function CtaCard({
  icon: Icon,
  title,
  body,
  buttonLabel,
  href,
  tone = "primary",
  className,
}: CtaCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-5 border p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
        toneClasses[tone],
        className,
      )}
    >
      <span className="cta-icon inline-flex size-14 items-center justify-center rounded-xl transition-transform duration-300">
        <Icon className="size-7" />
      </span>
      <div className="flex-1">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <Button asChild size="lg" className="self-start">
        <Link href={href}>
          {buttonLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Button>
    </Card>
  );
}
