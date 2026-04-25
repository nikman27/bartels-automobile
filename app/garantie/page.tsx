import type { Metadata } from "next";
import { ShieldCheck, Wrench, Zap, CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/contact-cta";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Garantie",
  description:
    "Gebrauchtwagen-Garantieversicherung mit bis zu 24 Monaten Laufzeit – ohne Werkstattbindung, schnelle Abwicklung.",
};

export default function GarantiePage() {
  const c = pagesContent.garantie;
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Bis zu 24 Monate",
      description: "Laufzeit je nach Fahrzeug – sprechen Sie uns einfach an.",
    },
    {
      icon: Wrench,
      title: "Keine Werkstattbindung",
      description: "Freie Werkstattwahl im Schadenfall.",
    },
    {
      icon: Zap,
      title: "Schnelle Abwicklung",
      description: "Individueller Service – direkt bei Ihrem Verkäufer.",
    },
  ];
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Garantie" }]}
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <article className="reveal space-y-6">
            {c.body.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {p}
              </p>
            ))}

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {highlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-8 rounded-xl border bg-muted/40 p-6">
              <h2 className="font-heading text-lg font-semibold">
                Für jedes Fahrzeug die passende Variante
              </h2>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {[
                  "Kleinwagen & Kompaktklasse",
                  "Mittelklasse & Oberklasse",
                  "Luxuslimousinen",
                  "SUVs & Allradfahrzeuge",
                  "Transporter & Nutzfahrzeuge",
                  "Wohnmobile & Reisemobile",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-chart-4"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <div className="reveal">
            <ContactCta title="Garantie-Beratung anfragen" />
          </div>
        </div>
      </Container>
    </>
  );
}
