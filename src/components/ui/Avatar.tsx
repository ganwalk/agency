import type { TeamMember } from "@/data/team";

const accentVar: Record<TeamMember["accent"], string> = {
  amber: "var(--accent-amber)",
  moss: "var(--accent-moss)",
  terracotta: "var(--accent-terracotta)",
  teal: "var(--accent-teal)",
};

export function Avatar({ member, size = 96 }: { member: TeamMember; size?: number }) {
  return (
    <div
      className="film-grain relative flex items-center justify-center rounded-2xl shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: accentVar[member.accent] }}
      aria-hidden="true"
    >
      <span
        className="type-display"
        style={{ color: "var(--on-dark)", fontSize: size * 0.34 }}
      >
        {member.initials}
      </span>
    </div>
  );
}
