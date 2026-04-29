import { useEffect, useState } from "react";

const CyberDashboardLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Initializing System...",
    "Loading Security Modules...",
    "Establishing Secure Environment...",
    "System Ready",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => Math.min(prev + 1, messages.length - 1));
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
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        background: "linear-gradient(135deg, #0a0e27 0%, #1a0f2e 50%, #0d1a3a 100%)",
      }}
    >
      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 40 + 20 + "px",
              height: Math.random() * 40 + 20 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
              opacity: 0.3,
              filter: "blur(1px)",
              animation: `float linear infinite`,
              animationDuration: Math.random() * 8 + 4 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Floating nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "8px",
              height: "8px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: "#00d9ff",
              boxShadow: "0 0 20px #00d9ff",
              animation: `nodeFloat 6s ease-in-out infinite`,
              animationDuration: Math.random() * 4 + 4 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Data points */}
      <div className="absolute top-[10%] right-[5%] hidden sm:block text-xs text-gray-400 border border-cyan-500/30 bg-slate-900/60 rounded-lg p-3 backdrop-blur">
        ▓▒░ THREAT LEVEL: NOMINAL
      </div>
      <div className="absolute bottom-[15%] left-[5%] hidden sm:block text-xs text-gray-400 border border-cyan-500/30 bg-slate-900/60 rounded-lg p-3 backdrop-blur">
        ▒░ ENCRYPTION: AES-256
      </div>
      <div className="absolute top-[50%] right-[2%] hidden sm:block text-xs text-gray-400 border border-cyan-500/30 bg-slate-900/60 rounded-lg p-3 backdrop-blur">
        ░ NETWORK: SECURE
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-12 px-4">
        {/* Logo section */}
        <div className="text-center animate-fade-in">
          <h1
            className="text-5xl sm:text-6xl font-bold tracking-widest mb-2"
            style={{
              background: "linear-gradient(135deg, #00d9ff, #a78bfa, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(0, 217, 255, 0.3)",
            }}
          >
            E-VARA
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 tracking-[2px] uppercase">Cyber Intelligence Platform</p>
        </div>

        {/* Scanner container */}
        <div className="relative w-44 h-44">
          {[0, 0.4, 0.8].map((delay, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-cyan-500/30"
              style={{
                width: i === 0 ? "100%" : i === 1 ? "70%" : "40%",
                height: i === 0 ? "100%" : i === 1 ? "70%" : "40%",
                top: i === 0 ? 0 : i === 1 ? "15%" : "30%",
                left: i === 0 ? 0 : i === 1 ? "15%" : "30%",
                animation: `border-glow 2s ease-in-out infinite`,
                animationDelay: delay + "s",
              }}
            />
          ))}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(0, 217, 255, 0.4), transparent)",
              animation: `radar-sweep 2s linear infinite`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400 to-transparent"
            style={{
              boxShadow: "0 0 20px #00d9ff",
              animation: `pulse-glow 1.5s ease-in-out infinite`,
            }}
          />
        </div>

        {/* Glass panel */}
        <div
          className="w-full max-w-md p-6 rounded-xl border backdrop-blur-md"
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            borderColor: "rgba(0, 217, 255, 0.15)",
            animation: `border-glow 3s ease-in-out infinite`,
          }}
        >
          {/* Loading text */}
          <div className="text-center h-16 flex flex-col items-center justify-center mb-4">
            <p className="text-lg text-blue-50 tracking-wider">{messages[currentMessage]}</p>
            <p className="text-xs text-gray-400 tracking-wider mt-2">Please wait...</p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>SYSTEM INITIALIZATION</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="h-1 bg-cyan-500/10 rounded-full overflow-hidden border border-cyan-500/20">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: progress + "%",
                  background: "linear-gradient(90deg, #00d9ff, #a78bfa, #3b82f6, #00d9ff)",
                  boxShadow: "0 0 15px #00d9ff",
                  backgroundSize: "200% 100%",
                  animation: `progress-fill 2s linear infinite`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Ready overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-slate-950/95 opacity-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: progress >= 100 ? 1 : 0,
          pointerEvents: progress >= 100 ? "auto" : "none",
        }}
      >
        <div className="text-center scale-50 animate-scale-in">
          <p className="text-5xl mb-4" style={{ background: "linear-gradient(135deg, #00d9ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            ✓ SYSTEM READY
          </p>
          <p className="text-xl text-gray-400 tracking-widest">All systems operational. Welcome to E-VARA.</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; filter: blur(1px); }
          50% { opacity: 0.6; filter: blur(2px); }
        }

        @keyframes radar-sweep {
          0% { transform: rotate(0deg); opacity: 0.5; }
          100% { transform: rotate(360deg); opacity: 0; }
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 217, 255, 0.2); border-color: rgba(0, 217, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 217, 255, 0.4); border-color: rgba(0, 217, 255, 0.6); }
        }

        @keyframes progress-fill {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes nodeFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(0, -20px); }
          75% { transform: translate(-10px, -10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
};

export default CyberDashboardLoader;
