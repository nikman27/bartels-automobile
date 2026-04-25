import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { LegalContent } from "@/components/legal-content";
import { datenschutzContent } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        title="Datenschutzerklärung"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Datenschutz" }]}
      />
      <Container className="py-12 lg:py-16">
        <LegalContent markdown={datenschutzContent} />
      </Container>
    </>
  );
}
