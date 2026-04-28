import { useState, useEffect } from "react";
import { Bell, ScanFace, Clock, Radar } from "lucide-react";

interface StatsCardsProps {
  alertCount: number;
  scanCount: number;
  monitoringActive: boolean;
  monitoringStartTime: Date | null;
}

const AnimatedValue = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((prev) => {
        if (prev === value) {
          clearInterval(id);
          return prev;
        }
        const delta = value > prev ? 1 : -1;
        return prev + delta;
      });
    }, 35);

    return () => clearInterval(id);
  }, [value]);

  return <span className="tabular-nums">{display}</span>;
};

const StatsCards = ({ alertCount, scanCount, monitoringActive, monitoringStartTime }: StatsCardsProps) => {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    if (!monitoringActive || !monitoringStartTime) {
      setUptime("00:00:00");
      return;
    }
    const tick = () => {
      const diff = Math.floor((Date.now() - monitoringStartTime.getTime()) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [monitoringActive, monitoringStartTime]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
      <div className="glass-panel interactive-panel cyber-ripple p-3 sm:p-4">
        <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2">
          <Bell className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Total Alerts</span>
        </div>
        <p className="text-lg font-bold sm:text-xl"><AnimatedValue value={alertCount} /></p>
      </div>

      <div className="glass-panel interactive-panel cyber-ripple p-3 sm:p-4">
        <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2">
          <ScanFace className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Scans Complete</span>
        </div>
        <p className="text-lg font-bold sm:text-xl"><AnimatedValue value={scanCount} /></p>
      </div>

      <div className="glass-panel interactive-panel p-3 sm:p-4">
        <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Uptime</span>
        </div>
        <p className="text-lg font-bold tabular-nums sm:text-xl">{uptime}</p>
      </div>

      <div className="glass-panel interactive-panel p-3 sm:p-4">
        <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2">
          <Radar className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Live Monitoring</span>
        </div>
        <p className={`text-sm font-semibold ${monitoringActive ? "text-primary monitor-pulse" : "text-muted-foreground"}`}>
          {monitoringActive ? "ACTIVE" : "STANDBY"}
        </p>
      </div>
    </div>
  );
};

export default StatsCards;
