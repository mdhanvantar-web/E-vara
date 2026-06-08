import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const SolutionsPage = () => {
  useSEO({
    title: "Solutions",
    description: "Explore E-VARA's enterprise identity defense solutions.",
    canonicalUrl: "https://e-vara.vercel.app/solutions"
  });

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

      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 italic">Solutions</h1>
        <p className="text-muted-foreground font-body text-lg">
          Enterprise solutions are currently being updated. Check back soon.
        </p>
      </div>
    </div>
  );
};

export default SolutionsPage;
