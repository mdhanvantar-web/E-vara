import { useMemo, useState } from "react";

interface AttackSimulationPanelProps {
  email?: string;
}

const steps = [
  "Email enumeration from public footprint",
  "Pivot to GitHub account through commit metadata",
  "Correlate alias with Instagram bio link",
  "Match handle in known leaked dataset",
];

const AttackSimulationPanel = ({ email }: AttackSimulationPanelProps) => {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const riskSummary = useMemo(() => {
    if (!active) return "Simulation idle. Run to inspect trace path.";
    return stepIndex >= steps.length - 1
      ? "Risk Summary: Identity can be traced across 4 linked surfaces; weak point is reusable email alias."
      : "Simulation running... analyzing traversal path.";
  }, [active, stepIndex]);

  const runSimulation = () => {
    setActive(true);
    setStepIndex(0);
    let idx = 0;
    const id = window.setInterval(() => {
      idx += 1;
      setStepIndex(Math.min(idx, steps.length - 1));
      if (idx >= steps.length - 1) {
        window.clearInterval(id);
      }
    }, 900);
  };

  return (
    <section className="neon-panel rounded-xl border border-primary/20 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground">Attack Simulation Mode</h3>
        <button onClick={runSimulation} className="neon-button rounded-md border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-mono text-primary">
          Simulate Attack
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, idx) => {
          const reached = active && idx <= stepIndex;
          const weakPoint = idx === steps.length - 1;
          return (
            <div key={step} className={`rounded-md border px-3 py-2 text-xs transition-all ${reached ? "translate-x-0 opacity-100" : "translate-x-1 opacity-55"} ${weakPoint && reached ? "border-[hsl(var(--severity-high)/0.6)] bg-[hsl(var(--severity-high)/0.12)]" : "border-border/70 bg-secondary/30"}`}>
              <span className="font-mono text-[10px] text-muted-foreground">STEP {idx + 1}</span>
              <p className="text-foreground">{idx === 0 && email ? `${step}: ${email}` : step}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-3 rounded-md border border-border/60 bg-background/40 p-2 text-xs text-muted-foreground">{riskSummary}</p>
    </section>
  );
};

export default AttackSimulationPanel;
