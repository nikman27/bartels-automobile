export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Name eines lucide-react Icons (z.B. "Car", "Truck") */
  icon?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const mainNavigation: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Fahrzeuge",
    href: "/fahrzeuge",
    children: [
      {
        label: "Alle Fahrzeuge",
        href: "/fahrzeuge",
        description: "Kompletter Fahrzeugbestand im Überblick",
        icon: "LayoutGrid",
      },
      {
        label: "PKW",
        href: "/fahrzeuge/pkw",
        description: "Limousinen, Kombis, SUVs und mehr",
        icon: "Car",
      },
      {
        label: "LKW & Nutzfahrzeuge",
        href: "/fahrzeuge/lkw",
        description: "Gewerbefahrzeuge für Ihren Betrieb",
        icon: "Truck",
      },
      {
        label: "Transporter",
        href: "/fahrzeuge/transporter",
        description: "Tier- und Pferdetransporter",
        icon: "Package",
      },
      {
        label: "Wohnwagen & Wohnmobile",
        href: "/fahrzeuge/wohnmobile",
        description: "Reisemobile für jeden Anspruch",
        icon: "Home",
      },
      {
        label: "Motorräder",
        href: "/fahrzeuge/motorraeder",
        description: "Zweiräder von Einsteiger bis Tourer",
        icon: "Bike",
      },
    ],
  },
  {
    label: "Service",
    children: [
      {
        label: "Verkauf & Ankauf",
        href: "/verkauf-ankauf",
        description: "Sofortige Übernahme, faire Angebote",
        icon: "Handshake",
      },
      {
        label: "Vermittlung",
        href: "/vermittlung",
        description: "Wir verkaufen Ihr Fahrzeug diskret",
        icon: "ArrowLeftRight",
      },
      {
        label: "Finanzierung",
        href: "/finanzierung",
        description: "Flexible Raten, schnelle Zusage",
        icon: "Calculator",
      },
      {
        label: "Garantie",
        href: "/garantie",
        description: "Bis zu 24 Monate Absicherung",
        icon: "ShieldCheck",
      },
      {
        label: "Export",
        href: "/export",
        description: "Fahrzeugexport weltweit",
        icon: "Globe",
      },
      {
        label: "Barti – KI-Assistent",
        href: "#barti-fullscreen",
        description: "Fragen, Probefahrt buchen & mehr – sofort per Chat",
        icon: "Bot",
      },
    ],
  },
  { label: "Sponsoring", href: "/sponsoring" },
  { label: "Über uns", href: "/ueber-uns" },
];

export const footerLinks: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
