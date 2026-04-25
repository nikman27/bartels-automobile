"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vehiclesMock } from "@/lib/data/vehicles-mock";

const ANY = "any";

export function QuickSearch() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState({
    category: ANY,
    fuel: ANY,
    brand: ANY,
    transmission: ANY,
    priceMin: "",
    priceMax: "",
    mileageMax: "",
  });

  const brands = Array.from(new Set(vehiclesMock.map((v) => v.brand))).sort();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    const path =
      state.category !== ANY
        ? `/fahrzeuge/${state.category}`
        : "/fahrzeuge";
    if (state.fuel !== ANY) sp.set("fuel", state.fuel);
    if (state.brand !== ANY) sp.set("brand", state.brand);
    if (state.transmission !== ANY) sp.set("transmission", state.transmission);
    if (state.priceMin) sp.set("priceMin", state.priceMin);
    if (state.priceMax) sp.set("priceMax", state.priceMax);
    if (state.mileageMax) sp.set("mileageMax", state.mileageMax);
    const qs = sp.toString();
    startTransition(() => {
      router.push(qs ? `${path}?${qs}` : path);
    });
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-xl md:p-6 lg:p-8"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Select
          value={state.category}
          onValueChange={(v) => setState((s) => ({ ...s, category: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Fahrzeugart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Alle Fahrzeugarten</SelectItem>
            <SelectItem value="pkw">PKW</SelectItem>
            <SelectItem value="lkw">LKW & Nutzfahrzeuge</SelectItem>
            <SelectItem value="transporter">Transporter</SelectItem>
            <SelectItem value="wohnmobile">Wohnwagen & Wohnmobile</SelectItem>
            <SelectItem value="motorraeder">Motorräder</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state.fuel}
          onValueChange={(v) => setState((s) => ({ ...s, fuel: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Kraftstoff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Alle Kraftstoffe</SelectItem>
            <SelectItem value="Benzin">Benzin</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Elektro">Elektro</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Gas">Gas</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state.brand}
          onValueChange={(v) => setState((s) => ({ ...s, brand: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Marke" />
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

        <Select
          value={state.transmission}
          onValueChange={(v) => setState((s) => ({ ...s, transmission: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Getriebe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Alle Getriebe</SelectItem>
            <SelectItem value="Schaltgetriebe">Schaltgetriebe</SelectItem>
            <SelectItem value="Automatik">Automatik</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Preis von (€)"
          value={state.priceMin}
          onChange={(e) => setState((s) => ({ ...s, priceMin: e.target.value }))}
        />
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Preis bis (€)"
          value={state.priceMax}
          onChange={(e) => setState((s) => ({ ...s, priceMax: e.target.value }))}
        />
        <Input
          type="number"
          inputMode="numeric"
          placeholder="KM bis"
          value={state.mileageMax}
          onChange={(e) => setState((s) => ({ ...s, mileageMax: e.target.value }))}
        />
        <Button type="submit" size="lg" disabled={pending}>
          <Search className="size-4" aria-hidden />
          Suchen
        </Button>
      </div>
    </form>
  );
}
