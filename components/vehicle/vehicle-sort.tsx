"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortKey } from "@/lib/types";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Neueste zuerst" },
  { value: "priceAsc", label: "Preis aufsteigend" },
  { value: "priceDesc", label: "Preis absteigend" },
  { value: "alpha", label: "Alphabetisch" },
];

export function VehicleSort({ current }: { current: SortKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onChange = (v: string) => {
    const sp = new URLSearchParams(params.toString());
    if (v === "newest") sp.delete("sort");
    else sp.set("sort", v);
    const qs = sp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sortieren</span>
      <Select value={current} onValueChange={onChange}>
        <SelectTrigger className="w-[12rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
