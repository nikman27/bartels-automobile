import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div
        aria-hidden
        className="font-heading text-[10rem] font-black leading-none tracking-tighter text-primary/15 md:text-[14rem]"
      >
        404
      </div>
      <h1 className="-mt-6 font-heading text-3xl font-bold tracking-tight md:text-4xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Die gesuchte Seite existiert leider nicht oder wurde verschoben. Kehren
        Sie zur Startseite zurück oder stöbern Sie in unserem Fahrzeugbestand.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="size-4" aria-hidden />
            Zur Startseite
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/fahrzeuge">
            <Search className="size-4" aria-hidden />
            Fahrzeuge entdecken
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
