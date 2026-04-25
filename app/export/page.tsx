import type { Metadata } from "next";
import { FileText, Ship, Truck, Globe } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/contact-cta";
import { pagesContent } from "@/lib/data/pages-content";

export const metadata: Metadata = {
  title: "Export",
  description:
    "Fahrzeuge exportieren – wir übernehmen die Formalitäten: Ausfuhrkennzeichen, Zoll und Transport.",
};

export default function ExportPage() {
  const c = pagesContent.export;
  const steps = [
    {
      icon: FileText,
      title: "Papiere & Dokumente",
      description:
        "Wir bereiten alle erforderlichen Export-Unterlagen für Sie vor.",
    },
    {
      icon: Truck,
      title: "Ausfuhrkennzeichen",
      description: "Kurzzeit- und Ausfuhrkennzeichen direkt bei uns im Haus.",
    },
    {
      icon: Ship,
      title: "Transport & Versand",
      description: "Auf Wunsch organisieren wir den Transport in Ihr Zielland.",
    },
    {
      icon: Globe,
      title: "Beratung Zielland",
      description:
        "Individuelle Beratung zu Formalitäten, je nach Land unterschiedlich.",
    },
  ];
  return (
    <>
      <PageHeader
        title={c.headline}
        subline={c.subline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Export" }]}
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <article className="reveal space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {c.body}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {steps.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
          </article>

          <div className="reveal">
            <ContactCta
              title="Export anfragen"
              subline="Nennen Sie uns Ihr Wunschfahrzeug und Ihr Zielland – wir melden uns mit einem Angebot."
            />
          </div>
        </div>
      </Container>
    </>
  );
}
