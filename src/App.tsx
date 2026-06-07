import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CyberDashboardLoader from "@/components/CyberDashboardLoader";
import NotFound from "./pages/NotFound.tsx";
import PricingPage from "./pages/Pricing.tsx";

import LandingPage from "./pages/Landing.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import BookDemo from "./pages/BookDemo.tsx";
import ClientPortal from "./pages/ClientPortal.tsx";
import IdentityRecords from "./pages/IdentityRecords.tsx";
import BillingPage from "./pages/Billing.tsx";
import SupportPage from "./pages/Support.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(() => !!localStorage.getItem("evara-session"));

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuth = () => setIsAuthed(true);
  const handleLogout = () => setIsAuthed(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <CyberDashboardLoader />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/identity-records" element={<IdentityRecords />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route 
              path="/auth" 
              element={isAuthed ? <Dashboard onLogout={handleLogout} /> : <AuthPage onAuth={handleAuth} />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthed ? <Dashboard onLogout={handleLogout} /> : <AuthPage onAuth={handleAuth} />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
