"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { VehicleCategory } from "@/lib/types";
import { vehiclesMock } from "@/lib/data/vehicles-mock";

const ANY = "any";

const CATEGORY_OPTIONS: { value: VehicleCategory | typeof ANY; label: string }[] = [
  { value: ANY, label: "Alle" },
  { value: "pkw", label: "PKW" },
  { value: "lkw", label: "LKW & Nutzfahrzeuge" },
  { value: "transporter", label: "Transporter" },
  { value: "wohnmobile", label: "Wohnwagen & Wohnmobile" },
  { value: "motorraeder", label: "Motorräder" },
];

const FUEL_OPTIONS = ["Benzin", "Diesel", "Elektro", "Hybrid", "Gas"] as const;
const TRANSMISSION_OPTIONS = ["Schaltgetriebe", "Automatik"] as const;
const SEATS_OPTIONS = [2, 3, 4, 5, 6, 7, 9];

interface VehicleFilterProps {
  lockedCategory?: VehicleCategory;
}

export function VehicleFilterSidebar({ lockedCategory }: VehicleFilterProps) {
  return (
    <div className="hidden lg:block">
      <FilterFormInternal lockedCategory={lockedCategory} />
    </div>
  );
}

export function VehicleFilterSheet({ lockedCategory }: VehicleFilterProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="size-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(22rem,90vw)] overflow-y-auto p-6">
        <SheetHeader className="p-0 pb-6">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <FilterFormInternal
          lockedCategory={lockedCategory}
          onApply={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

function FilterFormInternal({
  lockedCategory,
  onApply,
}: {
  lockedCategory?: VehicleCategory;
  onApply?: () => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const brands = useMemo(
    () => Array.from(new Set(vehiclesMock.map((v) => v.brand))).sort(),
    [],
  );

  const [state, setState] = useState(() => ({
    category: lockedCategory ?? (params.get("category") as VehicleCategory | null) ?? ANY,
    brand: params.get("brand") ?? ANY,
    fuel: params.get("fuel") ?? ANY,
    transmission: params.get("transmission") ?? ANY,
    priceMin: params.get("priceMin") ?? "",
    priceMax: params.get("priceMax") ?? "",
    yearFrom: params.get("yearFrom") ?? "",
    mileageMax: params.get("mileageMax") ?? "",
    seats: params.get("seats") ?? ANY,
    trailerHitch: params.get("trailerHitch") ?? ANY,
  }));

  const update = <K extends keyof typeof state>(key: K, value: (typeof state)[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const apply = () => {
    const sp = new URLSearchParams();
    if (!lockedCategory && state.category !== ANY) sp.set("category", state.category);
    if (state.brand !== ANY) sp.set("brand", state.brand);
    if (state.fuel !== ANY) sp.set("fuel", state.fuel);
    if (state.transmission !== ANY) sp.set("transmission", state.transmission);
    if (state.priceMin) sp.set("priceMin", state.priceMin);
    if (state.priceMax) sp.set("priceMax", state.priceMax);
    if (state.yearFrom) sp.set("yearFrom", state.yearFrom);
    if (state.mileageMax) sp.set("mileageMax", state.mileageMax);
    if (state.seats !== ANY) sp.set("seats", state.seats);
    if (state.trailerHitch !== ANY) sp.set("trailerHitch", state.trailerHitch);

    const basePath = lockedCategory
      ? `/fahrzeuge/${lockedCategory}`
      : "/fahrzeuge";
    const qs = sp.toString();
    startTransition(() => {
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
      onApply?.();
    });
  };

  const reset = () => {
    setState({
      category: lockedCategory ?? ANY,
      brand: ANY,
      fuel: ANY,
      transmission: ANY,
      priceMin: "",
      priceMax: "",
      yearFrom: "",
      mileageMax: "",
      seats: ANY,
      trailerHitch: ANY,
    });
    const basePath = lockedCategory ? `/fahrzeuge/${lockedCategory}` : "/fahrzeuge";
    startTransition(() => {
      router.push(basePath, { scroll: false });
      onApply?.();
    });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      {!lockedCategory && (
        <FilterField label="Fahrzeugart">
          <Select
            value={state.category}
            onValueChange={(v) => update("category", v as VehicleCategory | typeof ANY)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>
      )}

      <FilterField label="Marke">
        <Select value={state.brand} onValueChange={(v) => update("brand", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Alle Marken</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Kraftstoff">
        <Select value={state.fuel} onValueChange={(v) => update("fuel", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Beliebig</SelectItem>
            {FUEL_OPTIONS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Getriebe">
        <Select
          value={state.transmission}
          onValueChange={(v) => update("transmission", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Beliebig</SelectItem>
            {TRANSMISSION_OPTIONS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <div className="grid grid-cols-2 gap-3">
        <FilterField label="Preis von (€)">
          <Input
            inputMode="numeric"
            placeholder="0"
            value={state.priceMin}
            onChange={(e) => update("priceMin", e.target.value)}
          />
        </FilterField>
        <FilterField label="Preis bis (€)">
          <Input
            inputMode="numeric"
            placeholder="60.000"
            value={state.priceMax}
            onChange={(e) => update("priceMax", e.target.value)}
          />
        </FilterField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FilterField label="EZ ab (Jahr)">
          <Input
            inputMode="numeric"
            placeholder="2015"
            value={state.yearFrom}
            onChange={(e) => update("yearFrom", e.target.value)}
          />
        </FilterField>
        <FilterField label="KM bis">
          <Input
            inputMode="numeric"
            placeholder="150.000"
            value={state.mileageMax}
            onChange={(e) => update("mileageMax", e.target.value)}
          />
        </FilterField>
      </div>

      <FilterField label="Sitzplätze (mind.)">
        <Select value={state.seats} onValueChange={(v) => update("seats", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Beliebig</SelectItem>
            {SEATS_OPTIONS.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Anhängerkupplung">
        <Select
          value={state.trailerHitch}
          onValueChange={(v) => update("trailerHitch", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Beliebig</SelectItem>
            <SelectItem value="true">Ja</SelectItem>
            <SelectItem value="false">Nein</SelectItem>
          </SelectContent>
        </Select>
      </FilterField>

      <div className="flex flex-col gap-2 pt-2">
        <Button type="submit" disabled={isPending}>
          Filter anwenden
        </Button>
        <Button type="button" variant="ghost" onClick={reset}>
          <X className="size-4" />
          Zurücksetzen
        </Button>
      </div>
    </form>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
