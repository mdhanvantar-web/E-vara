/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shield, CreditCard, Check, ArrowUpRight, Download, Clock, Zap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BillingPage = () => {
  const invoices = [
    { id: "INV-001", date: "Oct 01, 2026", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Sep 01, 2026", amount: "$29.00", status: "Paid" },
  ];

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
              <CreditCard className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Financial_Audit_OS</span>
            </div>
          </div>
          <Link to="/client-portal">
            <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-widest hover:bg-white/5">Back to Portal</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <Zap className="h-3 w-3" /> Active Subscription
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Subscription & Billing</h1>
            <p className="text-muted-foreground font-body">Manage your operational tiers and review encrypted transaction history.</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 p-8 rounded-[24px] border border-primary/20 bg-primary/5 relative overflow-hidden">
               <div className="absolute inset-0 hud-grid opacity-[0.05] pointer-events-none" />
               <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 mb-2">Current Protocol</p>
                    <h2 className="text-3xl font-black uppercase mb-4">Executive Defense</h2>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8 max-w-sm">
                      Continuous OSINT scanning, priority data crawling, and automated PDF dossiers active.
                    </p>
                    <div className="flex gap-4">
                       <Button className="bg-primary hover:bg-primary/90 text-white rounded-[12px] px-6 text-[10px] font-bold uppercase tracking-widest">
                         Change Tier
                       </Button>
                       <Button variant="outline" className="border-white/10 rounded-[12px] px-6 text-[10px] font-bold uppercase tracking-widest">
                         Cancel Plan
                       </Button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                     <div>
                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-1">Next Payment</p>
                       <p className="text-2xl font-black">$29.00</p>
                       <p className="text-[10px] text-muted-foreground mt-1 uppercase">Due Nov 01, 2026</p>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-success uppercase mt-8 md:mt-0">
                        <Check className="h-3 w-3" /> System Synchronized
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-[24px] border border-white/5 bg-[#11141B]">
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">Payment Method</p>
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-14 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase">Visa •••• 4242</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Exp 12/28</p>
                  </div>
               </div>
               <Button variant="outline" className="w-full border-white/10 rounded-[12px] text-[10px] font-bold uppercase tracking-widest">
                 Update Method
               </Button>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/5 bg-[#11141B] overflow-hidden">
             <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-widest text-sm">Transaction History</h3>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase">
                   <Clock className="h-3 w-3" /> 24 Month Retention
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                    <tr className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-bold">{inv.id}</td>
                        <td className="px-6 py-4 text-muted-foreground">{inv.date}</td>
                        <td className="px-6 py-4 font-bold">{inv.amount}</td>
                        <td className="px-6 py-4">
                           <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-success/30 bg-success/10 text-success">
                             {inv.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-primary transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-[24px] border border-white/5 bg-white/[0.01]">
             <div className="flex items-center gap-4">
                <Building className="h-6 w-6 text-muted-foreground" />
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest">Enterprise Billing</p>
                   <p className="text-xs text-muted-foreground mt-1">Need customized invoicing for corporate accounting?</p>
                </div>
             </div>
             <Link to="/book-demo">
               <Button variant="outline" className="border-white/10 rounded-[12px] text-[10px] uppercase font-bold tracking-widest">
                 Contact Sales <ArrowUpRight className="ml-2 h-3 w-3" />
               </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
