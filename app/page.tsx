import Link from "next/link";
import { ArrowRight, Car, Clock, Handshake } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { VehicleCarousel } from "@/components/vehicle/vehicle-carousel";
import { ServiceCard } from "@/components/service-card";
import { CtaCard } from "@/components/cta-card";
import { QuickSearch } from "@/components/quick-search";
import { SocialFeed } from "@/components/social-feed";
import { VehiclePlaceholder } from "@/components/vehicle/vehicle-placeholder";
import { HeroVideoControls } from "@/components/hero-video-controls";
import { AnimatedCounter } from "@/components/animated-counter";

import { getNewArrivals } from "@/lib/vehicles";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site-config";
import { pagesContent } from "@/lib/data/pages-content";

export default async function HomePage() {
  const newArrivals = await getNewArrivals(10);
  const content = pagesContent.home;

  return (
    <>
      <HeroSection />

      {/* Scroll-Indikator – sitzt auf der Grenze Hero → nächste Section */}
      <div className="relative z-20 -mt-5 flex flex-col items-center gap-1 animate-scroll-bounce pointer-events-none select-none text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scrollen</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Sektion 2: Neuzugänge */}
      <Section tone="default" spacing="lg" className="relative z-10 -mt-10">
        <Container>
          <div className="reveal mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Frisch bei uns
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                {content.newArrivalsHeading}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {content.newArrivalsSubline}
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <Link href="/fahrzeuge">
                Alle Fahrzeuge
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
        <div className="reveal">
          <VehicleCarousel vehicles={newArrivals} />
        </div>
      </Section>

      {/* Sektion 3: Schnellsuche */}
      <Section tone="muted" spacing="lg">
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Gezielt suchen
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {content.quickSearchHeading}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {content.quickSearchSubline}
            </p>
          </div>
          <div className="reveal mx-auto mt-8 max-w-5xl">
            <QuickSearch />
          </div>
        </Container>
      </Section>

      {/* Sektion 4: Über uns Teaser */}
      <Section spacing="xl">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[45%_minmax(0,1fr)] md:gap-16 lg:gap-24">
            <div className="reveal-left relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/20 via-chart-4/20 to-chart-1/30 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
                <VehiclePlaceholder category="pkw" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between rounded-xl bg-background/90 p-5 shadow-xl backdrop-blur-sm">
                  <div>
                    <div className="font-heading text-3xl font-bold">
                      {siteConfig.stats.yearsExperience}+
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Jahre Erfahrung
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-3xl font-bold text-chart-4">
                      {siteConfig.stats.vehiclesInStock}+
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Fahrzeuge
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Über uns
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {content.aboutTeaserHeading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {content.aboutTeaserText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/ueber-uns">
                    {content.aboutTeaserCta}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/fahrzeuge">Fahrzeugbestand</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sektion 5: CTA-Dreierkarte */}
      <Section tone="muted" spacing="lg">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="reveal">
              <CtaCard
                icon={Car}
                title="Wunschfahrzeug?"
                body="Über 300 geprüfte Gebrauchtwagen stehen für Sie bereit – wir finden das passende."
                buttonLabel="Fahrzeuge entdecken"
                href="/fahrzeuge"
                tone="primary"
              />
            </div>
            <div className="reveal" style={{ transitionDelay: "80ms" }}>
              <CtaCard
                icon={Clock}
                title="Öffnungszeiten"
                body="Mo–Fr 9–18 Uhr, Sa 9–14 Uhr. Probefahrten jederzeit möglich – kommen Sie vorbei."
                buttonLabel="Standort anzeigen"
                href="/ueber-uns"
                tone="muted"
              />
            </div>
            <div className="reveal" style={{ transitionDelay: "160ms" }}>
              <CtaCard
                icon={Handshake}
                title="Verkauf & Ankauf"
                body="Kostenlose Bewertung Ihres Fahrzeugs – faires Angebot in Kooperation mit AutoUncle."
                buttonLabel="Fahrzeug bewerten"
                href="/verkauf-ankauf"
                tone="accent"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Sektion 6: Services */}
      <Section spacing="xl">
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Service
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {content.servicesHeading}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {content.servicesSubline}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className="reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sektion 7: Social Feed */}
      <Section tone="muted" spacing="lg">
        <Container>
          <div className="reveal mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Social
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                {content.socialHeading}
              </h2>
              <p className="mt-2 text-muted-foreground">{content.socialSubline}</p>
            </div>
            <Button asChild size="lg">
              <Link
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.socialCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="reveal">
            <SocialFeed />
          </div>
        </Container>
      </Section>
    </>
  );
}

function HeroSection() {
  const content = pagesContent.home;
  return (
    <section className="relative -mt-16 flex min-h-[92vh] items-center overflow-hidden pt-16 text-white">
      {/* Video-Hintergrund */}
      <video
        data-hero-video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://bartels-automobile.de/wp-content/uploads/2025/10/Bartels_Imagefilm_2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Fallback-Gradient falls Video nicht lädt */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#11100d] via-[#1e1a14] to-[#0f0d0a]" />
      {/* Dunkles Overlay für Lesbarkeit */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.15)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,169,0,0.15),transparent_55%)]" />

      <Container className="relative">
        <div className="max-w-3xl">
          <p
            className="animate-fade-in text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
            style={{ animationDelay: "100ms" }}
          >
            Seit {siteConfig.foundedYear} in Burgwedel
          </p>
          <h1
            className="animate-fade-in-up mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "200ms" }}
          >
            {content.heroHeadline}
          </h1>
          <p
            className="animate-fade-in-up mt-6 max-w-xl text-lg text-white/90 drop-shadow md:text-xl"
            style={{ animationDelay: "400ms" }}
          >
            {content.heroSubline}
          </p>
          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "600ms" }}
          >
            <Button asChild size="lg" className="btn-shimmer h-12 text-base shadow-xl">
              <Link href="/fahrzeuge">
                {content.heroCta}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-white/5 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/verkauf-ankauf">Fahrzeug verkaufen</Link>
            </Button>
          </div>
          <dl
            className="animate-fade-in-up mt-14 grid max-w-xl grid-cols-3 gap-6"
            style={{ animationDelay: "800ms" }}
          >
            {[
              { n: siteConfig.stats.vehiclesInStock, l: "Fahrzeuge" },
              { n: siteConfig.stats.salesPerMonth, l: "Verkäufe / Monat" },
              { n: siteConfig.stats.yearsExperience, l: "Jahre Erfahrung" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-heading text-3xl font-bold text-white drop-shadow">
                  <AnimatedCounter end={s.n} suffix="+" />
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <HeroVideoControls />
    </section>
  );
}
