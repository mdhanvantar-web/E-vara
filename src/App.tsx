import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CyberDashboardLoader from "@/components/CyberDashboardLoader";
import { useAuth, UserProfile } from "@/hooks/useAuth";

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

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: { id: string } | null | undefined;
  profile: UserProfile | null | undefined;
  profileError: Error | null;
  requireActiveBilling?: boolean;
}

const ProtectedRoute = ({ children, user, profile, profileError, requireActiveBilling = false }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profileError) {
    // If we failed to fetch the profile (e.g., db error or no access), force logout or show error
    return <Navigate to="/auth" replace />;
  }

  if (requireActiveBilling && profile?.billing_status !== 'active') {
    return <Navigate to="/billing" replace />;
  }

  return <>{children}</>;
};

const AppRouter = () => {
  const { user, profile, profileError, loading, logout } = useAuth();

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
          element={
            <ProtectedRoute user={user} profile={profile} profileError={profileError} requireActiveBilling={true}>
              <ClientPortal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/identity-records" 
          element={
            <ProtectedRoute user={user} profile={profile} profileError={profileError} requireActiveBilling={true}>
              <IdentityRecords />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/billing" 
          element={
            <ProtectedRoute user={user} profile={profile} profileError={profileError}>
              <BillingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/support" 
          element={
            <ProtectedRoute user={user} profile={profile} profileError={profileError}>
              <SupportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user} profile={profile} profileError={profileError} requireActiveBilling={true}>
              <Dashboard onLogout={logout} />
            </ProtectedRoute>
          } 
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
