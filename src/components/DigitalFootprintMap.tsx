import { useMemo, useState } from "react";

interface DigitalFootprintMapProps {
  username: string;
}

const platformNodes = [
  { id: "github", label: "GitHub", x: 50, y: 12, risk: 45 },
  { id: "instagram", label: "Instagram", x: 84, y: 35, risk: 71 },
  { id: "twitter", label: "Twitter/X", x: 80, y: 72, risk: 58 },
  { id: "linkedin", label: "LinkedIn", x: 20, y: 70, risk: 36 },
  { id: "reddit", label: "Reddit", x: 16, y: 30, risk: 62 },
];

const DigitalFootprintMap = ({ username }: DigitalFootprintMapProps) => {
  const [selectedNode, setSelectedNode] = useState(platformNodes[0]);

  const links = useMemo(
    () => platformNodes.map((node) => ({ ...node, intensity: Math.max(1, Math.round(node.risk / 25)) })),
    [],
  );

  return (
    <section className="neon-panel rounded-xl border border-primary/20 p-4 sm:p-5">
      <h3 className="mb-4 text-sm font-mono font-semibold uppercase tracking-wider text-foreground">Digital Footprint Map</h3>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative h-72 rounded-lg border border-border/70 bg-background/35 p-3">
          <div className="absolute inset-0 hud-grid opacity-40" />

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button className="node-core h-16 w-16 rounded-full border border-primary/70 bg-primary/15 text-[11px] font-mono text-primary">
              @{username || "identity"}
            </button>
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map((node) => (
              <line
                key={node.id}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={node.risk > 65 ? "hsl(var(--severity-high))" : node.risk > 45 ? "hsl(var(--severity-medium))" : "hsl(var(--primary))"}
                strokeOpacity="0.65"
                strokeWidth={node.intensity * 0.35}
              />
            ))}
          </svg>

          {platformNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node)}
              className="node-platform absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-secondary/80 px-3 py-1 text-[10px] font-mono text-foreground"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {node.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-border/70 bg-secondary/30 p-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Selected Platform</p>
          <h4 className="mt-1 text-sm font-semibold text-foreground">{selectedNode.label}</h4>
          <p className="mt-2 text-xs text-muted-foreground">Risk intensity: {selectedNode.risk}/100</p>
          <div className="mt-3 h-2 rounded-full bg-border/40">
            <div
              className="h-full rounded-full"
              style={{
                width: `${selectedNode.risk}%`,
                background: selectedNode.risk > 65 ? "hsl(var(--severity-high))" : selectedNode.risk > 45 ? "hsl(var(--severity-medium))" : "hsl(var(--severity-low))",
              }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Click nodes to inspect likely exposure vectors and indexed profile links.</p>
        </div>
      </div>
    </section>
  );
};

export default DigitalFootprintMap;
