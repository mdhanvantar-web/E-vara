import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import CyberGlobe from "./CyberGlobe";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_40%,#007AFF15,transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">AI_MONITORING_ACTIVE</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-8"
            >
              Protecting Digital <br />
              <span className="text-electric-blue italic">Identity</span> in the <br />
              Age of AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg lg:text-xl text-white/40 font-light max-w-lg mb-12 leading-relaxed"
            >
              Real-time detection of morphed, manipulated, and AI-generated content. 
              The ultimate defense layer for personal and organizational reputation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/book-demo">
                <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-electric-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  Request Demo <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/threat-detection">
                <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-3 h-3 fill-white" /> Explore Technology
                </button>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8"
            >
              {[
                { label: "Active Monitors", val: "2.4M+" },
                { label: "AI Classification", val: "99.9%" },
                { label: "Latency", val: "<12ms" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-white mb-1 tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <CyberGlobe />
            {/* HUD Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-electric-blue/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-electric-blue/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-electric-blue to-transparent" />
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Scroll_To_Explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
