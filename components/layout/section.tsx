import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
  tone?: "default" | "muted" | "card" | "dark";
}

const spacingMap = {
  sm: "py-10 md:py-14",
  md: "py-14 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-36",
};

const toneMap = {
  default: "bg-background",
  muted: "bg-muted/40",
  card: "bg-card",
  dark: "bg-foreground text-background",
};

export function Section({
  spacing = "lg",
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingMap[spacing], toneMap[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}
