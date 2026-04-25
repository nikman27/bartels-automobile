export interface Partner {
  name: string;
  shortDescription: string;
}

export const partners: Partner[] = [
  {
    name: "TÜV Nord",
    shortDescription: "Haupt- und Abgasuntersuchung direkt vor Ort.",
  },
  {
    name: "Banco Santander",
    shortDescription: "Finanzierung mit flexiblen Laufzeiten und schneller Zusage.",
  },
  {
    name: "carVertical",
    shortDescription: "Transparente Fahrzeughistorie für jedes Fahrzeug.",
  },
];

export const sponsoringPartners = [
  {
    name: "Hannover Scorpions",
    type: "Businesspartner",
    description:
      "Die Scorpions stehen für Leidenschaft, Teamgeist und Leistungswillen – Werte, die wir teilen.",
  },
  {
    name: "TSV Wettmar 1912 e. V.",
    type: "Sportverein",
    description:
      "Aktives Vereinsleben, starke Jugendarbeit und echter Zusammenhalt in der Region.",
  },
  {
    name: "SV Fuhrberg von 1954 e. V.",
    type: "Sportverein",
    description:
      "Ein fester Bestandteil des sportlichen und gesellschaftlichen Lebens in Fuhrberg – mit Fokus auf Nachwuchsförderung.",
  },
  {
    name: "TSV Kleinburgwedel e. V.",
    type: "Sportverein",
    description:
      "Sport, Gemeinschaft und ehrenamtliches Engagement für alle Altersgruppen.",
  },
];
