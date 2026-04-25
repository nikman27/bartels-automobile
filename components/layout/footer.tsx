import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { Container } from "./container";
import { siteConfig } from "@/lib/data/site-config";
import { footerLinks } from "@/lib/data/navigation";
import { partners } from "@/lib/data/partners";
import { Logo } from "@/components/logo";
import { TikTokIcon, InstagramIcon } from "@/components/icons/social";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="inverted" />
            <p className="mt-5 text-sm leading-relaxed text-background/70">
              Seit 1991 Ihr Partner für geprüfte Gebrauchtwagen rund um Burgwedel –
              ehrlich bewertet, fair gehandelt.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2.5 text-background/80">
                <MapPin className="mt-0.5 size-4 shrink-0 opacity-70" aria-hidden />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city}{" "}
                  {siteConfig.address.district}
                </span>
              </li>
              <li>
                <Link
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-2.5 text-background/80 transition-colors hover:text-background"
                >
                  <Phone className="size-4 opacity-70" aria-hidden />
                  {siteConfig.contact.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 text-background/80 transition-colors hover:text-background"
                >
                  <Mail className="size-4 opacity-70" aria-hidden />
                  {siteConfig.contact.email}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-background">
              Öffnungszeiten
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {siteConfig.openingHours.map((slot) => (
                <li
                  key={slot.days}
                  className="flex items-center justify-between gap-4 border-b border-background/10 pb-2 text-background/80"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="size-4 opacity-60" aria-hidden />
                    {slot.days}
                  </span>
                  <span className="font-medium tabular-nums">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-background">
              Unsere Partner
            </h3>
            <ul className="mt-5 space-y-3">
              {partners.map((p) => (
                <li
                  key={p.name}
                  className="rounded-md border border-background/10 bg-background/5 p-3 backdrop-blur-sm"
                >
                  <div className="text-sm font-semibold">{p.name}</div>
                  <p className="mt-0.5 text-xs text-background/60">
                    {p.shortDescription}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-background">
              Bleiben Sie verbunden
            </h3>
            <p className="mt-5 text-sm text-background/70">
              Neuzugänge, Einblicke & Kundenstories auf TikTok und Instagram.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex size-10 items-center justify-center rounded-md border border-background/20 text-background/90 transition-colors hover:bg-background/10"
              >
                <TikTokIcon className="size-5" />
              </Link>
              <Link
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-md border border-background/20 text-background/90 transition-colors hover:bg-background/10"
              >
                <InstagramIcon className="size-5" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-background/60">
              Über {siteConfig.stats.vehiclesInStock}+ Fahrzeuge am Standort –
              Meisterwerkstatt im Haus.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} · Alle Rechte
            vorbehalten.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-background"
            >
              Instagram
            </Link>
            <Link
              href={siteConfig.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-background"
            >
              TikTok
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
