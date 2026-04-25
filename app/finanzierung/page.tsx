import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/contact-cta";
import { PartnerLogos } from "@/components/partner-logos";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Finanzierung",
  description:
    "Flexible Fahrzeugfinanzierung mit Laufzeiten von 18 bis 96 Monaten, mit oder ohne Anzahlung – Kreditzusage oft direkt vor Ort.",
};

export default function FinanzierungPage() {
  const c = pagesContent.finanzierung;
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Finanzierung" }]}
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <article className="reveal space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {c.body}
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <HighlightCard
                title="Laufzeiten"
                value="18 – 96 Monate"
                description="Raten an Ihr Budget angepasst – mit oder ohne Anzahlung."
              />
              <HighlightCard
                title="Schnelle Zusage"
                value="Direkt vor Ort"
                description="Online-Anbindung an unsere Partnerbanken – Kreditzusage meist sofort."
              />
              <HighlightCard
                title="Übernahme"
                value="Alte Finanzierung"
                description="Wir übernehmen bestehende Finanzierungen problemlos."
              />
              <HighlightCard
                title="Kundenanteil"
                value="50 % +"
                description="Mehr als die Hälfte unserer Kunden finanziert bei uns."
              />
            </div>

            <section className="mt-10 rounded-xl border bg-muted/40 p-6">
              <h2 className="font-heading text-lg font-semibold">
                Das brauchen Sie mit
              </h2>
              <ul className="mt-3 grid gap-2.5">
                {c.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm">
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-chart-4"
                      aria-hidden
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <PartnerLogos className="mt-6" />
          </article>

          <div className="reveal">
            <ContactCta title="Beratungstermin vereinbaren" />
          </div>
        </div>
      </Container>
    </>
  );
}

function HighlightCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <p className="mt-2 font-heading text-2xl font-bold text-chart-4">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
