import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/contact-cta";
import { pagesContent } from "@/lib/data/pages-content";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Vermittlung",
  description:
    "Wir verkaufen Ihr Fahrzeug – maximal sichtbar, diskret und sicher. Mit Verkaufsprovision, ohne Ihren Erlös zu schmälern.",
};

export default function VermittlungPage() {
  const c = pagesContent.vermittlung;
  const bullets = [
    "Monatlich über 100 Verkäufe, rund 400 Fahrzeuge im Bestand",
    "Präsenz auf unserer Webseite und allen wichtigen Online-Börsen",
    "Verkauf mit Finanzierung oder Inzahlungnahme möglich",
    "Auszahlung des Erlöses unkompliziert in bar",
    "Vermittlungsvertrag als Absicherung – KFZ-Brief bleibt bis zur Bezahlung bei uns",
  ];
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Vermittlung" }]}
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

            <div className="mt-8 grid gap-3 rounded-xl border bg-muted/40 p-6">
              <h3 className="font-heading text-lg font-semibold">
                Was Sie bei uns erwartet
              </h3>
              <ul className="grid gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-chart-4"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              Wir erhalten eine Verkaufsprovision – Ihr vereinbarter Erlös bleibt
              davon unberührt. Sprechen Sie uns an unter{" "}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-medium text-foreground underline"
              >
                {siteConfig.contact.phone}
              </a>
              .
            </p>
          </article>

          <div className="reveal">
            <ContactCta title="Jetzt unverbindlich anfragen" />
          </div>
        </div>
      </Container>
    </>
  );
}
