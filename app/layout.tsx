import type { Metadata } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { RevealOnScrollProvider } from "@/components/reveal-on-scroll-provider";
import { siteConfig } from "@/lib/data/site-config";

const fontDisplay = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bartels-automobile.de"),
  title: {
    default: `${siteConfig.name} | Gebrauchtwagen in Burgwedel seit 1991`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Über 300 geprüfte Gebrauchtfahrzeuge – PKW, LKW, Transporter, Wohnmobile. Faire Preise, Meisterwerkstatt, Finanzierung, Garantie und Export.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: siteConfig.name,
    description:
      "Ihr Partner für Gebrauchtwagen in Burgwedel. Seit 1991 – ehrlich, fair, werkstattgeprüft.",
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={cn("antialiased", fontDisplay.variable, fontBody.variable)}
    >
      <body className="font-sans min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <RevealOnScrollProvider />
          <SiteHeader />
          <main className="pt-16">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
