import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { TeamSection } from "@/components/team-section";
import { MapEmbed } from "@/components/map-embed";
import { PartnerLogos } from "@/components/partner-logos";
import { siteConfig } from "@/lib/data/site-config";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Seit 1991 in Fuhrberg zu Hause – über 300 geprüfte Gebrauchtfahrzeuge, eigener Meisterbetrieb, Finanzierung und Garantie aus einer Hand.",
};

export default function UeberUnsPage() {
  const c = pagesContent.ueberUns;
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Über uns" }]}
      />

      <Container className="py-12 lg:py-16">
        <p className="reveal max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {c.body}
        </p>

        <div className="mt-16">
          <div className="mb-10 reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Unser Team
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Die Gesichter hinter Bartels-Automobile
            </h2>
          </div>
          <TeamSection />
        </div>

        <section className="mt-20 reveal">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Standort
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Besuchen Sie uns in Fuhrberg
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <MapEmbed />
            <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  {siteConfig.legalName}
                </h3>
                <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.zip} {siteConfig.address.city}{" "}
                    {siteConfig.address.district}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.contact.phone}
                </Link>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Mail className="size-4" aria-hidden />
                  {siteConfig.contact.email}
                </Link>
              </div>
              <ul className="mt-2 space-y-1.5 border-t pt-4 text-sm">
                {siteConfig.openingHours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-center justify-between gap-4 text-muted-foreground"
                  >
                    <span>{h.days}</span>
                    <span className="font-medium text-foreground tabular-nums">
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-16 reveal">
          <PartnerLogos />
        </div>
      </Container>
    </>
  );
}
