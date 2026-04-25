import type { TeamMember, Department } from "@/lib/types";

const BASE = "https://bartels-automobile.de/wp-content/uploads";

export const team: TeamMember[] = [
  { name: "Sascha Bartels",     role: "Geschäftsführer", department: "geschaeftsfuehrung", image: `${BASE}/2026/02/CHEF-1.jpg` },
  { name: "Christopher Bartels",role: "Geschäftsführer", department: "geschaeftsfuehrung", image: `${BASE}/2026/02/CHEF2-e1770819252517.jpg` },

  { name: "Ralph Sander",       role: "Verkaufsleiter",         department: "verkauf" },
  { name: "Alexander Girnth",   role: "Automobilverkäufer",     department: "verkauf", image: `${BASE}/2025/11/B2-scaled.jpg` },
  { name: "Maximilian Bartels", role: "Automobilverkäufer",     department: "verkauf", image: `${BASE}/2025/11/A1-scaled.jpg` },
  { name: "Mo Jrab",            role: "Auszubildender",         department: "verkauf", image: `${BASE}/2026/02/F2-1.jpg` },
  { name: "Servan Duran",       role: "Auszubildender",         department: "verkauf", image: `${BASE}/2025/11/804342723-d2-scaled.jpg` },
  { name: "Inan Demiray",       role: "Auszubildender",         department: "verkauf", image: `${BASE}/2025/11/804342793-c2-scaled.jpg` },

  { name: "Victoria Landmann",  role: "Buchhaltung / Administration", department: "administration", image: `${BASE}/2025/11/804342648-e2-scaled.jpg` },
  { name: "Kai Frixe",          role: "Administrator",          department: "administration" },

  { name: "Stephan Rieckenberg",role: "Fahrzeugaufbereitung",   department: "fahrzeugpflege", image: `${BASE}/2026/02/DSC05004-scaled.jpg` },
  { name: "Sergey Sabrücken",   role: "Fahrzeugaufbereitung",   department: "fahrzeugpflege", image: `${BASE}/2025/11/804342073-l2-scaled.jpg` },
  { name: "Rolf Könnecke",      role: "Fahrzeugaufbereitung",   department: "fahrzeugpflege" },
  { name: "Dominic Schellmann", role: "Fahrzeugaufbereitung",   department: "fahrzeugpflege" },

  { name: "Sebastian Thanheiser",role: "Werkstattmeister",      department: "werkstatt", image: `${BASE}/2025/12/804342204-k1-scaled.jpg` },
  { name: "Marian Krüger",      role: "KFZ-Mechatroniker",      department: "werkstatt", image: `${BASE}/2025/11/804342416-h1-scaled.jpg` },
  { name: "Michael Köper",      role: "KFZ-Mechatroniker",      department: "werkstatt" },
  { name: "Smailj Pervetica",   role: "KFZ-Technik",            department: "werkstatt", image: `${BASE}/2025/11/804341990-m2-scaled.jpg` },
  { name: "Ion Pancu",          role: "KFZ-Mechaniker",         department: "werkstatt" },
  { name: "Jascha Munack",      role: "KFZ-Mechaniker",         department: "werkstatt", image: `${BASE}/2025/12/804342318-i2-scaled.jpg` },
  { name: "Valerij Beimler",    role: "KFZ-Mechaniker",         department: "werkstatt", image: `${BASE}/2025/12/804342493-g2-scaled.jpg` },

  { name: "Yahya Mil",          role: "Einkauf",                department: "einkauf" },
];

export const departmentLabels: Record<Department, string> = {
  geschaeftsfuehrung: "Geschäftsführung",
  verkauf: "Team Verkauf",
  administration: "Administration",
  fahrzeugpflege: "Fahrzeugpflege",
  werkstatt: "Werkstatt",
  einkauf: "Einkauf",
};

export const departmentOrder: Department[] = [
  "geschaeftsfuehrung",
  "verkauf",
  "administration",
  "fahrzeugpflege",
  "werkstatt",
  "einkauf",
];

export function getTeamByDepartment(): Record<Department, TeamMember[]> {
  const grouped = {} as Record<Department, TeamMember[]>;
  for (const dep of departmentOrder) grouped[dep] = [];
  for (const member of team) grouped[member.department].push(member);
  return grouped;
}
