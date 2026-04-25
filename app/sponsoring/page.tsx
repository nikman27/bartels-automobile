import type { Metadata } from "next";
import { Heart } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { pagesContent } from "@/lib/data/pages-content";
import { sponsoringPartners } from "@/lib/data/partners";

export const metadata: Metadata = {
  title: "Sponsoring",
  description:
    "Als regional verwurzeltes Autohaus unterstützen wir lokale Vereine und Projekte rund um Burgwedel und Fuhrberg.",
};

export default function SponsoringPage() {
  const c = pagesContent.sponsoring;
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sponsoring" }]}
      />
      <Container className="py-12 lg:py-16">
        <p className="reveal max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {c.body}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sponsoringPartners.map((p, i) => (
            <article
              key={p.name}
              className="reveal group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-chart-4/20 to-primary/20 blur-2xl transition-opacity group-hover:opacity-80" />
              <div className="relative">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-chart-4/10 text-chart-4">
                  <Heart className="size-5" fill="currentColor" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {p.type}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold">
                  {p.name}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
