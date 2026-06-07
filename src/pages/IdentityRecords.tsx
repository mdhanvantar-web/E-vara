/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Shield, Database, Plus, Trash2, CheckCircle2, AlertTriangle, Search, Globe, Mail, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const IdentityRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([
    { id: 1, type: "Primary Email", value: user?.email || "target@e-vara.io", status: "Active", risk: "Low" },
    { id: 2, type: "Public Alias", value: "@exec_alpha_01", status: "Monitoring", risk: "Medium" },
    { id: 3, type: "Domain", value: "vault.executive-assets.com", status: "Active", risk: "Low" },
  ]);

  const handleDelete = (id: number) => {
    setRecords(records.filter(r => r.id !== id));
    toast.error("Record De-linked", {
      description: "Identifier removed from continuous monitoring."
    });
  };

  return (
    <div className="min-h-screen bg-[#050608] text-foreground font-mono selection:bg-primary/30">
      <nav className="h-20 border-b border-white/5 bg-[#050608]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/client-portal" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight uppercase">E-VARA</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
              <Database className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Identity_Records_OS</span>
            </div>
          </div>
          <Link to="/client-portal">
            <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-widest hover:bg-white/5">Back to Portal</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Fingerprint className="h-3 w-3" /> Encrypted Vault
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Monitored Assets</h1>
              <p className="text-muted-foreground font-body max-w-xl">
                Manage the digital identifiers E-VARA tracks across global leak databases and OSINT vectors.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-[12px] px-8 py-6 font-bold uppercase tracking-widest text-[10px] security-orange-glow">
              <Plus className="mr-2 h-4 w-4" /> Add Identifier
            </Button>
          </div>

          <div className="grid gap-4">
            {records.map((record) => (
              <div key={record.id} className="group p-6 rounded-[20px] border border-white/5 bg-[#11141B] hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 hud-grid opacity-[0.02] pointer-events-none" />
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${record.risk === 'High' ? 'border-alert/30 bg-alert/5' : 'border-white/10 bg-white/5'}`}>
                    {record.type.includes("Email") ? <Mail className="h-5 w-5 text-primary" /> : <Globe className="h-5 w-5 text-secondary" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="font-bold uppercase tracking-tight">{record.type}</h3>
                       <span className={`text-[9px] px-2 py-0.5 rounded-full border ${record.status === 'Active' ? 'border-success/30 bg-success/10 text-success' : 'border-secondary/30 bg-secondary/10 text-secondary'}`}>
                          {record.status}
                       </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.value}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 relative z-10">
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Risk Level</p>
                    <p className={`text-xs font-bold ${record.risk === 'High' ? 'text-alert' : record.risk === 'Medium' ? 'text-secondary' : 'text-success'}`}>
                      {record.risk}_EXPOSURE
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-[9px] uppercase font-bold px-4">
                      Re-Scan
                    </Button>
                    <button onClick={() => handleDelete(record.id)} className="p-2 text-muted-foreground hover:text-alert transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[24px] border border-white/5 bg-white/[0.01] text-center">
             <Search className="h-8 w-8 text-primary/20 mx-auto mb-4" />
             <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
               All data in this vault is AES-256 encrypted and never stored in plain text.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityRecords;
