"use client";

import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BRANDS = [
  "Mercedes-Benz",
  "Volkswagen",
  "BMW",
  "Audi",
  "Opel",
  "Fiat",
  "Ford",
  "Toyota",
  "Skoda",
  "Renault",
  "Andere",
];

export function BewertungForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-chart-4/30 bg-chart-4/5 p-10 text-center">
        <CircleCheck className="size-12 text-chart-4" aria-hidden />
        <h3 className="font-heading text-2xl font-semibold">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="max-w-md text-muted-foreground">
          Wir melden uns innerhalb eines Werktages mit einer Einschätzung bei
          Ihnen. Bei dringenden Fragen erreichen Sie uns telefonisch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-5 rounded-xl border bg-card p-6 md:p-8"
      id="anfrage"
    >
      <div>
        <h2 className="font-heading text-2xl font-semibold">
          Fahrzeug bewerten lassen
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Wir melden uns in der Regel innerhalb eines Werktages zurück.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Marke" required>
          <Select name="brand" required>
            <SelectTrigger>
              <SelectValue placeholder="Marke wählen" />
            </SelectTrigger>
            <SelectContent>
              {BRANDS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Modell" required>
          <Input name="model" placeholder="z.B. E 350 T" required />
        </Field>
        <Field label="Baujahr" required>
          <Input
            name="year"
            inputMode="numeric"
            placeholder="2018"
            required
          />
        </Field>
        <Field label="Laufleistung (km)" required>
          <Input
            name="mileage"
            inputMode="numeric"
            placeholder="120.000"
            required
          />
        </Field>
        <Field label="Zustand" required className="md:col-span-2">
          <Select name="condition" required>
            <SelectTrigger>
              <SelectValue placeholder="Zustand wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sehr-gut">Sehr gut</SelectItem>
              <SelectItem value="gut">Gut</SelectItem>
              <SelectItem value="akzeptabel">Akzeptabel</SelectItem>
              <SelectItem value="unfall">Unfallfahrzeug</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Ihr Name" required>
          <Input name="name" placeholder="Max Mustermann" required />
        </Field>
        <Field label="Telefon" required>
          <Input name="phone" type="tel" placeholder="01234 56789" required />
        </Field>
        <Field label="E-Mail" required className="md:col-span-2">
          <Input
            name="email"
            type="email"
            placeholder="mail@beispiel.de"
            required
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="md:w-fit md:self-end">
        <Send className="size-4" aria-hidden />
        Bewertung anfordern
      </Button>

      <p className="text-xs text-muted-foreground">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{" "}
        <a href="/datenschutz" className="underline hover:text-foreground">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-chart-4"> *</span>}
      </span>
      {children}
    </label>
  );
}
