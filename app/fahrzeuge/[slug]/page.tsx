import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageSquare, ShieldCheck, CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { VehicleGrid } from "@/components/vehicle/vehicle-grid";
import {
  VehicleFilterSheet,
  VehicleFilterSidebar,
} from "@/components/vehicle/vehicle-filter";
import { VehicleSort } from "@/components/vehicle/vehicle-sort";
import { VehicleGallery } from "@/components/vehicle/vehicle-gallery";
import { VehicleSpecs } from "@/components/vehicle/vehicle-specs";
import { VehicleCard } from "@/components/vehicle/vehicle-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewBadge, WarrantyBadge } from "@/components/vehicle/vehicle-badge";

import {
  applyFilters,
  getRelatedVehicles,
  getVehicleBySlug,
  sortVehicles,
} from "@/lib/vehicles";
import { vehiclesMock } from "@/lib/data/vehicles-mock";
import { parseFilters } from "@/lib/parse-filters";
import { formatPrice } from "@/lib/utils";
import { pagesContent } from "@/lib/data/pages-content";
import { siteConfig } from "@/lib/data/site-config";
import type { SortKey, VehicleCategory } from "@/lib/types";

const VALID_CATEGORIES: VehicleCategory[] = [
  "pkw",
  "lkw",
  "transporter",
  "wohnmobile",
  "motorraeder",
];

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (VALID_CATEGORIES.includes(slug as VehicleCategory)) {
    const c = pagesContent.categories[slug as VehicleCategory];
    return { title: c.headline, description: c.subline };
  }
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.title,
    description: `${vehicle.title} – ${formatPrice(vehicle.price)}, EZ ${vehicle.firstRegistration}, ${vehicle.mileage.toLocaleString("de-DE")} km.`,
  };
}

export default async function FahrzeugSlugPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;

  if (VALID_CATEGORIES.includes(slug as VehicleCategory)) {
    return (
      <KategorieView
        category={slug as VehicleCategory}
        searchParams={searchParams}
      />
    );
  }

  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = await getRelatedVehicles(vehicle, 3);
  const categoryLabel = pagesContent.vehicleCategories[vehicle.category];

  return (
    <>
      <Container className="pt-8">
        <nav className="mb-5 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/fahrzeuge" className="hover:text-foreground">
                Fahrzeuge
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/fahrzeuge/${vehicle.category}`}
                className="hover:text-foreground"
              >
                {categoryLabel}
              </Link>
            </li>
            <li>/</li>
            <li className="truncate font-medium text-foreground">
              {vehicle.brand} {vehicle.model}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {vehicle.isNew && <NewBadge />}
              {vehicle.hasWarranty && <WarrantyBadge />}
              <Badge variant="outline">{categoryLabel}</Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {vehicle.title}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {vehicle.firstRegistration} · {vehicle.mileage.toLocaleString("de-DE")}{" "}
              km · {vehicle.power.ps} PS · {vehicle.fuelType}
            </p>
          </div>
          <div className="text-right">
            <span className="font-heading text-4xl font-bold text-chart-4 md:text-5xl">
              {formatPrice(vehicle.price)}
            </span>
            <p className="text-xs text-muted-foreground">inkl. 19 % USt.</p>
          </div>
        </div>

        <div className="mt-8">
          <VehicleGallery vehicle={vehicle} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Technische Daten
              </h2>
              <VehicleSpecs vehicle={vehicle} />
            </section>

            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Ausstattung
              </h2>
              <ul className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-sm"
                  >
                    <CircleCheck className="size-3.5 text-chart-4" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {vehicle.description && (
              <section>
                <h2 className="mb-4 font-heading text-2xl font-semibold">
                  Beschreibung
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {vehicle.description}
                </p>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="flex flex-col gap-4 border-border/60 bg-gradient-to-br from-primary/5 to-chart-4/5 p-6">
              <div>
                <h3 className="font-heading text-xl font-semibold">
                  Interesse an diesem Fahrzeug?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Rufen Sie uns an oder schreiben Sie eine Nachricht – wir melden uns
                  umgehend.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href={`tel:${siteConfig.contact.phoneRaw}`}>
                  <Phone className="size-4" aria-hidden />
                  Anrufen
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Anfrage: ${vehicle.title}`)}`}
                >
                  <Mail className="size-4" aria-hidden />
                  E-Mail schreiben
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/verkauf-ankauf#anfrage">
                  <MessageSquare className="size-4" aria-hidden />
                  Anfrage senden
                </Link>
              </Button>
              <div className="mt-2 flex items-start gap-2 rounded-md bg-background/70 p-3 text-xs text-muted-foreground">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-chart-4"
                  aria-hidden
                />
                <span>
                  Alle Fahrzeuge werden in unserer Meisterwerkstatt technisch
                  geprüft und optisch aufbereitet.
                </span>
              </div>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              Ähnliche Fahrzeuge
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* Mobile Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border/60 bg-background/95 p-3 shadow-2xl backdrop-blur-md lg:hidden">
        <Button asChild size="lg" className="flex-1">
          <Link href={`tel:${siteConfig.contact.phoneRaw}`}>
            <Phone className="size-4" aria-hidden />
            Anrufen
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="flex-1">
          <Link
            href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Anfrage: ${vehicle.title}`)}`}
          >
            <MessageSquare className="size-4" aria-hidden />
            Anfragen
          </Link>
        </Button>
      </div>
    </>
  );
}

async function KategorieView({
  category,
  searchParams,
}: {
  category: VehicleCategory;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp, category);
  const sort: SortKey = (sp.sort as SortKey) ?? "newest";
  const filtered = applyFilters(vehiclesMock, filters);
  const vehicles = sortVehicles(filtered, sort);
  const content = pagesContent.categories[category];

  return (
    <>
      <PageHeader
        title={content.headline}
        subline={content.subline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fahrzeuge", href: "/fahrzeuge" },
          { label: content.headline },
        ]}
      />
      <Container className="py-10 lg:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {vehicles.length}
            </span>{" "}
            Fahrzeug{vehicles.length === 1 ? "" : "e"} gefunden
          </p>
          <div className="flex items-center gap-2">
            <VehicleFilterSheet lockedCategory={category} />
            <VehicleSort current={sort} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="relative">
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <VehicleFilterSidebar lockedCategory={category} />
            </div>
          </aside>
          <div>
            <VehicleGrid vehicles={vehicles} />
          </div>
        </div>
      </Container>
    </>
  );
}
