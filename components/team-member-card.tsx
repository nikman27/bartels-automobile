import Image from "next/image";
import { User } from "lucide-react";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md",
        className,
      )}
    >
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/15 to-chart-4/15">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <>
            <User className="size-9 text-foreground/40" strokeWidth={1.3} aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-foreground/70">
              {getInitials(member.name)}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-sm font-semibold">{member.name}</span>
        <span className="text-xs text-muted-foreground">{member.role}</span>
      </div>
    </div>
  );
}
