/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Shield, Lock, Fingerprint, Globe, Activity, ChevronRight, Check, Menu, X, ArrowRight, Star, ArrowUpRight, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* 01 Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] h-20 transition-all duration-300 ${isScrolled ? 'bg-[#050608]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg security-orange-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase font-mono">E-VARA</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Solutions", "Threat Detection", "Pricing", "Resources", "Docs"].map((item) => (
              <button key={item} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-mono">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="hidden sm:inline-flex uppercase tracking-widest text-[10px] font-bold">Book Demo</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-[14px] px-8 py-6 uppercase tracking-widest text-[10px] font-bold security-orange-glow">Start Free</Button>
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* 02 Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 hud-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <Activity className="h-3 w-3" /> System Status: Operational
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase animate-fade-in">
              Protect Everything. <br />
              <span className="text-primary tracking-tighter">Trust Nothing.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-12 font-body animate-fade-in leading-relaxed">
              Continuous detection, response and prevention. The world’s first autonomous identity defense platform for high-value targets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-[14px] px-10 py-8 text-sm font-bold uppercase tracking-widest security-orange-glow">
                Initialize Secure Environment <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-[14px] px-10 py-8 text-sm font-bold uppercase tracking-widest">
                Review Whitepaper
              </Button>
            </div>
          </div>

          {/* Security Dashboard Preview */}
          <div className="mt-24 relative max-w-6xl mx-auto animate-fade-in">
             <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-[32px] blur-2xl opacity-20" />
             <div className="relative rounded-[24px] border border-white/5 bg-[#11141B] p-2 shadow-2xl overflow-hidden shadow-primary/5">
                <div className="absolute inset-0 hud-grid opacity-[0.05]" />
                <div className="rounded-[20px] border border-white/5 bg-[#050608]/50 p-6 backdrop-blur-xl flex flex-col gap-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Live Threat Feed_</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-1.5 w-12 rounded-full bg-white/5" />
                        <div className="h-1.5 w-12 rounded-full bg-white/5" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">Identity Matches</span>
                        <span className="text-3xl font-bold font-mono">1,402</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">Leak Detection</span>
                        <span className="text-3xl font-bold font-mono text-primary">0</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">Network Latency</span>
                        <span className="text-3xl font-bold font-mono">12ms</span>
                      </div>
                   </div>

                   <div className="h-40 w-full rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[panel-scan_3s_linear_infinite]" />
                      <Activity className="h-12 w-12 text-primary/20" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 03 Trusted By */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-12">Securing global identity infrastructure</p>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 opacity-30 grayscale contrast-125">
            {["FORTUNE", "TECHSEC", "INTELCORE", "CYBERGUARD", "NEXUS"].map(logo => (
              <span key={logo} className="text-2xl font-black font-mono tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Live Threat Detection */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Active OSINT
              </div>
              <h2 className="text-5xl font-black tracking-tighter mb-8 uppercase leading-tight">
                Real-time <br /> <span className="text-secondary">Identity Intelligence.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                E-Vara’s proprietary crawler correlates identity markers across surface, deep, and dark web layers in 12ms.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Deterministic Matching", desc: "Zero false-positive identity correlation." },
                  { title: "Continuous Monitoring", desc: "24/7 scanning of 50,000+ breach sources." },
                  { title: "Automated Containment", desc: "Immediate password rotation & 2FA enforcement." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/10 blur-[100px] rounded-full" />
              <div className="relative rounded-[24px] border border-white/5 bg-[#11141B] p-8 cyber-blue-glow">
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`p-4 rounded-xl border border-white/5 bg-[#050608]/50 flex items-center justify-between ${i === 1 ? 'border-secondary/40 bg-secondary/5' : ''}`}>
                      <div className="flex items-center gap-4">
                        <Globe className={`h-4 w-4 ${i === 1 ? 'text-secondary' : 'text-muted-foreground'}`} />
                        <span className="text-xs font-mono uppercase tracking-widest">Source_Node_{i}42</span>
                      </div>
                      <Badge variant="outline" className={`text-[9px] ${i === 1 ? 'border-secondary text-secondary' : 'text-muted-foreground'}`}>
                        {i === 1 ? 'SYNCED' : 'READY'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Security Features Grid */}
      <section className="py-32 bg-[#08090C]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Omni-Layer Defense</h2>
            <p className="text-muted-foreground">Every entry point protected. Every packet analyzed. Every identity secured.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Lock />, title: "Identity Security", desc: "Protecting your most valuable asset: who you are." },
              { icon: <Globe />, title: "API Protection", desc: "Enterprise-grade security for your internal systems." },
              { icon: <Fingerprint />, title: "Behavior Analytics", desc: "Detecting anomalies before they become breaches." },
              { icon: <Activity />, title: "Audit Logs", desc: "Immutable, timestamped proof of operational integrity." },
              { icon: <ShieldCheck />, title: "Cloud Defense", desc: "Multi-cloud infrastructure hardening and monitoring." },
              { icon: <BarChart3 />, title: "Threat Intel", desc: "Global collective intelligence updated every minute." }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-[24px] border border-white/5 bg-[#11141B] hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] cursor-default">
                <div className="p-3 w-fit rounded-xl bg-white/5 mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                  Initialize Module <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Pricing Preview */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16">Operational Tiers</h2>
          <div className="max-w-xl mx-auto p-12 rounded-[24px] border border-primary/20 bg-primary/5 backdrop-blur-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase py-1 px-4 rounded-full tracking-[0.3em]">Most Adopted</div>
            <h3 className="text-2xl font-black uppercase mb-2">Executive Defense</h3>
            <div className="text-5xl font-black mb-6">$29<span className="text-xl text-muted-foreground font-normal">/mo</span></div>
            <p className="text-muted-foreground mb-8">Full identity intelligence, PDF dossiers, and priority data crawling.</p>
            <Link to="/auth">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-[14px] py-8 font-bold uppercase tracking-widest security-orange-glow">
                Secure My Identity
              </Button>
            </Link>
          </div>
          <Link to="/pricing" className="mt-8 inline-block text-xs font-bold text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors">
            View all capabilities <ArrowUpRight className="inline h-3 w-3 ml-1" />
          </Link>
        </div>
      </section>

      {/* 09 Final CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="rounded-[40px] bg-primary p-12 md:p-24 text-center overflow-hidden relative shadow-[0_0_100px_rgba(255,106,26,0.3)]">
            <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-8 relative z-10">
              The defense is <br /> already active.
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 relative z-10">
              Stop playing catch-up with threats. Join 12,000+ executives securing their legacy with E-Vara.
            </p>
            <Link to="/auth" className="relative z-10">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-[14px] px-12 py-8 text-lg font-bold uppercase tracking-widest shadow-2xl transition-transform hover:scale-105">
                Establish Protocol Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10 Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight uppercase font-mono">E-VARA</span>
              </div>
              <p className="text-muted-foreground max-w-sm font-body leading-relaxed">
                Autonomous identity intelligence and threat containment for the modern executive. Built in the grid, verified by the source.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Core Systems</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-mono uppercase tracking-tighter">
                <li><button className="hover:text-primary transition-colors">Neural Net Scan</button></li>
                <li><button className="hover:text-primary transition-colors">Identity Engine</button></li>
                <li><button className="hover:text-primary transition-colors">Threat Surface</button></li>
                <li><button className="hover:text-primary transition-colors">API Keys</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Legal Protocol</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-mono uppercase tracking-tighter">
                <li><button className="hover:text-primary transition-colors">Data Privacy</button></li>
                <li><button className="hover:text-primary transition-colors">Terms of Use</button></li>
                <li><button className="hover:text-primary transition-colors">Security Ethics</button></li>
                <li><button className="hover:text-primary transition-colors">Compliance</button></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 text-[10px] font-mono uppercase text-muted-foreground tracking-[0.2em]">
            <span>© 2026 E-VARA SECURITY SYSTEMS. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
              <span>LATENCY: 12ms</span>
              <span className="text-success">NODE: SG-0182-ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
