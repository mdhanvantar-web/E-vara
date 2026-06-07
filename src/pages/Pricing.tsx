import { Shield, Zap, Target, Globe, BarChart3, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const tiers = [
    {
      name: "Tactical",
      price: "$0",
      description: "Community-grade OSINT verification",
      features: [
        "Single Identity Monitor",
        "Standard Leak Scanning",
        "Public Metadata Audit",
        "Community Support",
        "7-Day Retention"
      ],
      cta: "Initialize Node",
      highlight: false
    },
    {
      name: "Executive",
      price: "$1,250",
      period: "/month",
      description: "Priority protection for high-value targets",
      features: [
        "Up to 5 Identity Monitors",
        "Dark Web Priority Scanning",
        "MX/DNS Anomaly Detection",
        "Executive PDF Dossiers",
        "Direct Encryption Support",
        "24-Month Retention"
      ],
      cta: "Secure Protocol",
      highlight: true
    },
    {
      name: "Omni-Layer",
      price: "Custom",
      description: "Enterprise-wide sovereign defense",
      features: [
        "Unlimited Identity Monitors",
        "Custom Intelligence API Access",
        "Real-time SIEM Integration",
        "Legal/Compliance Vaults",
        "Dedicated Intelligence Officer",
        "Infinite Data Retention"
      ],
      cta: "Contact Command",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-primary/30 font-mono">
      <nav className="h-20 border-b border-white/5 bg-[#050608]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg shadow-[0_0_15px_rgba(255,106,26,0.3)]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">E-VARA</span>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-widest hover:bg-white/5">Sign In</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Zap className="h-3 w-3" /> Monetization Grid
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 italic">Secure Your Digital Sovereignty</h1>
          <p className="text-muted-foreground font-body text-lg">
            High-integrity identity defense priced for high-fidelity assets. No shadow infrastructure. No data harvesting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative rounded-[32px] border ${tier.highlight ? 'border-primary bg-primary/[0.03] shadow-[0_0_50px_rgba(255,106,26,0.1)]' : 'border-white/5 bg-[#0A0C12]'} p-8 flex flex-col transition-all hover:translate-y-[-8px]`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Recommended Protocol
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">{tier.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground font-bold">{tier.period}</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground font-body">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${tier.highlight ? 'border-primary/30 bg-primary/10' : 'border-white/10 bg-white/5'}`}>
                      <Check className={`h-3 w-3 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to={tier.name === 'Omni-Layer' ? '/book-demo' : '/auth'} className="w-full">
                <Button 
                  className={`w-full py-7 rounded-[16px] font-black uppercase tracking-widest text-xs transition-all ${
                    tier.highlight 
                      ? 'bg-primary hover:bg-primary/90 text-white security-orange-glow' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 p-12 rounded-[40px] border border-white/5 bg-white/[0.01]">
          <div>
            <h4 className="text-2xl font-black uppercase mb-4">The $15,000 Asset Value</h4>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              E-VARA isn't just a web app. It's a pre-built, production-hardened security ecosystem. Buying the license gives you 
              immediate access to the multi-layered OSINT pipeline, client-side encryption modules, and executive report engines.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest">Target ROI</p>
                <p className="text-xs text-muted-foreground mt-1 font-body">12 Active Nodes @ $1.25k/mo = $150k ARR Potential.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
               <div className="flex items-center gap-3 mb-2">
                 <Globe className="h-4 w-4 text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Scale Ready</span>
               </div>
               <p className="text-xs text-muted-foreground font-body">Auto-scaled Edge Functions handle thousands of concurrent scans.</p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
               <div className="flex items-center gap-3 mb-2">
                 <BarChart3 className="h-4 w-4 text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Financial Transparency</span>
               </div>
               <p className="text-xs text-muted-foreground font-body">Direct Stripe integration stubs for immediate monetization activation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
