import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProcessStepper } from "@/components/process-stepper";
import { ContactCta } from "@/components/contact-cta";
import { BewertungForm } from "@/components/bewertung-form";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Verkauf & Ankauf",
  description:
    "Fahrzeug verkaufen, in Zahlung geben oder bewerten lassen – fair, schnell und direkt vor Ort in Burgwedel.",
};

export default function VerkaufAnkaufPage() {
  const c = pagesContent.verkaufAnkauf;
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Verkauf & Ankauf" },
        ]}
      />

      <Container className="py-12 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-2xl border border-chart-4/30 bg-chart-4/5 p-8">
            <h2 className="font-heading text-2xl font-semibold">
              {c.verkauf.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {c.verkauf.text}
            </p>
          </div>
          <div className="reveal rounded-2xl border border-primary/30 bg-primary/5 p-8">
            <h2 className="font-heading text-2xl font-semibold">
              {c.ankauf.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {c.ankauf.text}
            </p>
          </div>
        </div>

        <section className="mt-16 reveal">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Unser Ablauf
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">
              So einfach läuft die Bewertung
            </h2>
          </div>
          <ProcessStepper steps={[...c.steps]} />
        </section>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="reveal">
            <BewertungForm />
          </div>
          <div className="reveal">
            <ContactCta
              title="Lieber direkt anrufen?"
              subline="Rufen Sie uns an – wir machen Ihnen gerne direkt ein erstes Angebot."
            />
          </div>
        </div>
      </Container>
    </>
  );
}
