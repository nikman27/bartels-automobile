import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { LegalContent } from "@/components/legal-content";
import { impressumContent } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader
        title="Impressum"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Impressum" }]}
      />
      <Container className="py-12 lg:py-16">
        <LegalContent markdown={impressumContent} />
      </Container>
    </>
  );
}
