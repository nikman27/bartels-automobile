import { Suspense } from "react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { VehicleGrid } from "@/components/vehicle/vehicle-grid";
import {
  VehicleFilterSheet,
  VehicleFilterSidebar,
} from "@/components/vehicle/vehicle-filter";
import { VehicleSort } from "@/components/vehicle/vehicle-sort";
import { applyFilters, sortVehicles } from "@/lib/vehicles";
import { vehiclesMock } from "@/lib/data/vehicles-mock";
import { parseFilters } from "@/lib/parse-filters";
import type { SortKey } from "@/lib/types";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Alle Fahrzeuge",
  description:
    "Über 300 geprüfte Gebrauchtwagen – PKW, LKW, Transporter, Wohnmobile und mehr. Nutzen Sie die Filter, um das passende Fahrzeug zu finden.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function FahrzeugeUebersichtPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const sort: SortKey = (params.sort as SortKey) ?? "newest";

  const filtered = applyFilters(vehiclesMock, filters);
  const vehicles = sortVehicles(filtered, sort);
  const content = pagesContent.vehicles;

  return (
    <>
      <PageHeader
        title={content.headline}
        subline={content.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fahrzeuge" }]}
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
            <VehicleFilterSheet />
            <VehicleSort current={sort} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="relative">
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <Suspense fallback={<div className="h-96 animate-pulse rounded bg-muted" />}>
                <VehicleFilterSidebar />
              </Suspense>
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

