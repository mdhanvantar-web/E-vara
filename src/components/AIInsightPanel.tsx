interface AIInsightPanelProps {
  score: number;
  alertCount: number;
}

const AIInsightPanel = ({ score, alertCount }: AIInsightPanelProps) => {
  const breachWeight = Math.min(100, 30 + alertCount * 8);
  const platformExposure = Math.min(100, score + 12);
  const anomalies = Math.min(100, score - 6);

  return (
    <section className="neon-panel rounded-xl border border-primary/20 p-4 sm:p-5">
      <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground">AI Insight Panel</h3>
      <p className="mt-2 text-xs text-muted-foreground">High exposure across 4 platforms. Primary vulnerability: reused email and public cross-platform alias correlation.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          { label: "Breach Data", value: breachWeight },
          { label: "Platform Exposure", value: platformExposure },
          { label: "Activity Anomalies", value: anomalies },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border/70 bg-secondary/35 p-3">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{item.value}/100</p>
            <div className="mt-2 h-1.5 rounded-full bg-border/40">
              <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIInsightPanel;
