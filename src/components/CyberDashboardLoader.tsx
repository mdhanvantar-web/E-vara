import { useEffect, useMemo, useState } from "react";
import { Shield } from "lucide-react";

const stages = [
  "Initializing System...",
  "Loading Security Modules...",
  "Establishing Secure Environment...",
  "System Ready",
];

const CyberDashboardLoader = () => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setStage((prev) => {
        const next = Math.min(prev + 1, stages.length - 1);
        if (next === stages.length - 1) setReady(true);
        return next;
      });
    }, 1400);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 12 + 8;
      });
    }, 800);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-[#050608]">
      <div className="absolute inset-0 hud-grid opacity-[0.05]" />
      <div className="absolute inset-0 animate-[panel-scan_4s_linear_infinite] bg-[linear-gradient(to_bottom,transparent,rgba(255,106,26,0.1),transparent)]" />

      <div className="relative flex h-full flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="animate-pulse text-5xl font-black tracking-[0.4em] text-primary [text-shadow:0_0_30px_rgba(255,106,26,0.4)] uppercase font-mono">E-VARA</h1>
          <p className="mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em]">Establishing Secure Protocol</p>
        </div>

        <div className="relative h-48 w-44 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-4 rounded-full border border-secondary/30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin shadow-[0_0_15px_rgba(255,106,26,0.5)]" />
          <Shield className="h-12 w-12 text-primary/80 animate-pulse" />
        </div>

        <div className="w-[90%] max-w-xl rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary/80">{stages[stage]}</p>
            <span className="text-[10px] font-mono text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-700 shadow-[0_0_10px_#FF6A1A]" style={{ width: `${progress}%` }} />
          </div>
          {ready && <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-success animate-pulse">Connection Established</p>}
        </div>
      </div>
    </div>
  );
};

export default CyberDashboardLoader;
