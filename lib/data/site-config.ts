export const siteConfig = {
  name: "Bartels-Automobile.de",
  legalName: "Bartels-Automobile.de GmbH & Co. KG",
  foundedYear: 1991,
  claim: "Ihr Partner für Gebrauchtwagen in Burgwedel",
  tagline: "Seit über 30 Jahren – ehrlich, fair, werkstattgeprüft",
  address: {
    street: "Mellendorfer Straße 33",
    zip: "30938",
    city: "Burgwedel",
    district: "OT Fuhrberg",
    country: "Deutschland",
  },
  contact: {
    phone: "+49 (0) 5135 92532-0",
    phoneRaw: "+4951359253200",
    fax: "+49 (0) 5135 92532-18",
    email: "info@bartels-automobile.de",
  },
  openingHours: [
    { days: "Mo. – Fr.", hours: "09:00 – 18:00 Uhr" },
    { days: "Samstag", hours: "09:00 – 14:00 Uhr" },
    { days: "Sonntag", hours: "Geschlossen" },
  ],
  openingHoursShort: "Mo–Fr 9–18 Uhr · Sa 9–14 Uhr",
  social: {
    tiktok: {
      url: "https://www.tiktok.com/@bartelsautomobile",
      handle: "@bartelsautomobile",
    },
    instagram: {
      url: "https://www.instagram.com/bartelsautomobile.de",
      handle: "@bartelsautomobile.de",
    },
  },
  stats: {
    vehiclesInStock: 300,
    salesPerMonth: 100,
    yearsExperience: new Date().getFullYear() - 1991,
  },
  register: {
    hra: "HRA 120258",
    ustId: "DE 813650656",
    taxNumber: "16/201/65101",
  },
  managingDirectors: ["Sascha Bartels", "Christopher Bartels"],
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.123!2d9.8!3d52.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTWVsbGVuZG9yZmVyIFN0cmHDn2UgMzMsIDMwOTM4IEJ1cmd3ZWRlbA!5e0!3m2!1sde!2sde!4v1700000000000",
};

export type SiteConfig = typeof siteConfig;
