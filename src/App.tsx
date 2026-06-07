import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CyberDashboardLoader from "@/components/CyberDashboardLoader";
import { useAuth } from "@/hooks/useAuth";

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
import LegalProtocol from "./pages/LegalProtocol.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRouter = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <CyberDashboardLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/legal" element={<LegalProtocol />} />
        
        {/* Protected Routes */}
        <Route 
          path="/client-portal" 
          element={user ? <ClientPortal /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/identity-records" 
          element={user ? <IdentityRecords /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/billing" 
          element={user ? <BillingPage /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/support" 
          element={user ? <SupportPage /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard onLogout={logout} /> : <Navigate to="/auth" />} 
        />

        {/* Auth Route */}
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" /> : <AuthPage onAuth={() => {}} />} 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRouter />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
