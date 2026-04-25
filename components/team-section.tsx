import {
  departmentLabels,
  departmentOrder,
  getTeamByDepartment,
} from "@/lib/data/team";
import { TeamMemberCard } from "./team-member-card";

export function TeamSection() {
  const grouped = getTeamByDepartment();
  return (
    <div className="space-y-16">
      {departmentOrder.map((dep) => {
        const members = grouped[dep];
        if (!members || members.length === 0) return null;
        return (
          <section key={dep} className="reveal">
            <header className="mb-6 flex items-baseline justify-between gap-4 border-b pb-3">
              <h2 className="font-heading text-2xl font-semibold">
                {departmentLabels[dep]}
              </h2>
              <span className="text-sm text-muted-foreground">
                {members.length} {members.length === 1 ? "Person" : "Personen"}
              </span>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map((m) => (
                <TeamMemberCard key={m.name} member={m} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
