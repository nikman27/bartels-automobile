import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "verkauf-ankauf",
    title: "Verkauf & Ankauf",
    icon: "Handshake",
    shortDescription:
      "Wir kaufen Ihr Fahrzeug fair an und finden Ihr Wunschauto – sofort verfügbar.",
    fullDescription:
      "Jedes Auto bei uns kann sofort mitgenommen werden – die KFZ-Briefe sind im Haus und Kurzzeit-Kennzeichen bekommen Sie direkt vor Ort. Beim Ankauf unterbreiten wir Ihnen ein faires Angebot, auch in Zahlung für Ihren neuen Wagen – mit Wertausgleich, wenn Sie sich verkleinern möchten.",
  },
  {
    slug: "finanzierung",
    title: "Finanzierung",
    icon: "Calculator",
    shortDescription:
      "Mit flexiblen Finanzierungs- und Leasingmodellen bringen wir Sie bequem ans Ziel.",
    fullDescription:
      "Über 50 % unserer Kundinnen und Kunden finanzieren ihren neuen Wagen bei uns. Laufzeiten von 18 bis 96 Monaten, mit oder ohne Anzahlung, bestehende Finanzierungen übernehmen wir gerne. Durch die Online-Anbindung an unsere Partnerbanken erhalten wir Kreditzusagen meistens direkt im Haus.",
  },
  {
    slug: "garantie",
    title: "Garantie",
    icon: "ShieldCheck",
    shortDescription:
      "Profitieren Sie von bis zu 24 Monaten Sicherheit auf Ihr Fahrzeug.",
    fullDescription:
      "Unsere Gebrauchtwagen-Garantieversicherung mit einer Laufzeit von bis zu 24 Monaten sichert Sie im Schadenfall zuverlässig ab – ohne Werkstattbindung, mit schneller Abwicklung und individuellem Service. Die passende Variante stimmen wir auf Ihr Modell ab.",
  },
  {
    slug: "export",
    title: "Export",
    icon: "Globe",
    shortDescription:
      "Wir kümmern uns um alle Formalitäten rund um den Fahrzeugexport.",
    fullDescription:
      "Vom Ausfuhrkennzeichen über die Zollformalitäten bis zum Transport: wir übernehmen die Abwicklung, damit Ihr Fahrzeug sicher beim Empfänger ankommt. Sprechen Sie uns an – wir beraten Sie zu Zielland, Dokumenten und Versandoptionen.",
  },
  {
    slug: "vermittlung",
    title: "Vermittlung",
    icon: "ArrowLeftRight",
    shortDescription:
      "Privat, gewerblich oder im Handel – wir übernehmen den kompletten Verkaufsprozess.",
    fullDescription:
      "Mit monatlich über 100 Verkäufen und rund 400 Fahrzeugen im Bestand bieten wir Ihrem Auto die maximale Sichtbarkeit – auf unserer Webseite und allen wichtigen Online-Börsen gleichzeitig. Sie erhalten den vereinbarten Erlös unkompliziert in bar, der KFZ-Brief bleibt bis zur Bezahlung als Sicherheit.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
