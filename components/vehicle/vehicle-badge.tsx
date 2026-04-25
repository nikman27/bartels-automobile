import { Badge } from "@/components/ui/badge";
import { Sparkles, ShieldCheck } from "lucide-react";

export function NewBadge() {
  return (
    <Badge className="gap-1 bg-chart-4 text-background shadow-md">
      <Sparkles className="size-3" aria-hidden />
      Neuzugang
    </Badge>
  );
}

export function WarrantyBadge() {
  return (
    <Badge variant="secondary" className="gap-1 bg-background/90 text-foreground backdrop-blur-sm">
      <ShieldCheck className="size-3" aria-hidden />
      Garantie
    </Badge>
  );
}
