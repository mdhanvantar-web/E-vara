import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  timestamp: string;
  risk: "low" | "medium" | "high";
  details: string;
}

interface IdentityTimelineProps {
  fullName: string;
}

const RISK_STYLE = {
  low: "border-[hsl(var(--severity-low)/0.4)] text-[hsl(var(--severity-low))]",
  medium: "border-[hsl(var(--severity-medium)/0.4)] text-[hsl(var(--severity-medium))]",
  high: "border-[hsl(var(--severity-high)/0.4)] text-[hsl(var(--severity-high))]",
};

const IdentityTimeline = ({ fullName }: IdentityTimelineProps) => {
  const [expanded, setExpanded] = useState<number | null>(1);

  const events: TimelineEvent[] = [
    { id: 1, title: "Zynga breach mention", timestamp: "2019-10-01", risk: "high", details: `${fullName}'s username pattern appears in historical breach dumps tied to gaming credentials.` },
    { id: 2, title: "Open platform footprint increase", timestamp: "2021-06-15", risk: "medium", details: "Identity signals rose across LinkedIn and GitHub profile indexing with overlapping aliases." },
    { id: 3, title: "LinkedIn profile reference", timestamp: "2021-11-03", risk: "medium", details: "New profile references were detected in cached search results and reposted directories." },
    { id: 4, title: "Social repost cluster", timestamp: "2024-02-17", risk: "low", details: "Mentions indicate benign tagging across public channels, but with metadata exposure risk." },
  ];

  return (
    <section className="neon-panel rounded-xl border border-primary/20 p-4 sm:p-5">
      <h3 className="mb-4 text-sm font-mono font-semibold uppercase tracking-wider text-foreground">Identity Timeline</h3>
      <div className="space-y-3">
        {events.map((event) => {
          const isOpen = expanded === event.id;
          return (
            <article key={event.id} className="rounded-lg border border-border/80 bg-secondary/30 p-3">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : event.id)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${event.risk === "high" ? "bg-[hsl(var(--severity-high))]" : event.risk === "medium" ? "bg-[hsl(var(--severity-medium))]" : "bg-[hsl(var(--severity-low))]"}`} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{event.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{event.timestamp}</p>
                  </div>
                </div>
                <span className={`rounded border px-2 py-0.5 text-[10px] font-mono uppercase ${RISK_STYLE[event.risk]}`}>
                  {event.risk}
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              {isOpen && <p className="mt-3 text-xs text-muted-foreground animate-fade-in">{event.details}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default IdentityTimeline;
