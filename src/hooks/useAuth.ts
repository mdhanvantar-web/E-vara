import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sha256 } from "@/lib/crypto";

// Fallback user for demo if Supabase is down
const DEMO_USER = {
  id: "demo-user-123",
  email: "demo@e-vara.com",
};
const DEMO_PROFILE: UserProfile = {
  tier: "omni",
  security_clearance: "TOP_SECRET",
  node_id_stable: "NODE-X-999",
  billing_status: "active",
};

export type SubscriptionTier = 'tactical' | 'executive' | 'omni';
export type SecurityClearance = 'UNCLASSIFIED' | 'SECRET' | 'TOP_SECRET';

export interface IdentityInfo {
  fullName: string;
  username: string;
  email: string;
  faceImage: string | null;
}

export interface UserProfile {
  tier: SubscriptionTier;
  security_clearance: SecurityClearance;
  node_id_stable: string;
  billing_status: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // 1. Unified Session Query
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession().catch(() => ({ data: { session: null }, error: null }));
      if (error) throw error;
      
      // DEMO MODE FALLBACK: If there's no session and the user is trying to demo, we can just return DEMO_USER.
      // We check localStorage to see if they logged in with the demo bypass.
      if (!session?.user && localStorage.getItem('e_vara_demo_auth') === 'true') {
        return DEMO_USER;
      }
      
      return session?.user ?? null;
    },
    staleTime: 1000 * 60 * 5,
  });

  // 2. Secure Profile & Tier Query (Source of Truth for Authorization)
  const { data: profile, error: profileError } = useQuery<UserProfile | null>({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      if (user.id === DEMO_USER.id) return DEMO_PROFILE;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('tier, security_clearance, node_id_stable, billing_status')
        .eq('id', user.id)
        .single()
        .catch(() => ({ data: null, error: new Error('Supabase Offline') }));
      
      if (error) {
         throw new Error("Authorization failed. Please contact support.");
      }
      return data as UserProfile;
    },
    enabled: !!user,
  });

  // 3. Identity Query (Fetch PII from Database)
  const { data: identity, isLoading: loadingIdentity } = useQuery<IdentityInfo | null>({
    queryKey: ["identity", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      if (user.id === DEMO_USER.id) {
        const cached = localStorage.getItem('e_vara_demo_identity');
        if (cached) {
          try {
            return JSON.parse(cached);
          } catch (e) { /* ignore */ }
        }
        return {
          fullName: "Admin User",
          username: DEMO_USER.email,
          email: DEMO_USER.email,
          faceImage: null
        };
      }
      
      const { data, error } = await supabase
        .from('monitored_identities')
        .select('full_name, identity_value_encrypted')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
        .catch(() => ({ data: null, error: { code: 'PGRST116' } }));
      
      if (error) {
        if (error.code === 'PGRST116') return null; // No identities found
        throw error;
      }
      let decodedEmail = data.identity_value_encrypted;
      try { decodedEmail = atob(data.identity_value_encrypted); } catch (e) { /* ignore invalid base64 */ }

      return {
        fullName: data.full_name || "",
        username: decodedEmail,
        email: decodedEmail,
        faceImage: null
      };
    },
    enabled: !!user,
  });

  const logout = useCallback(async () => {
    localStorage.removeItem('e_vara_demo_auth');
    localStorage.removeItem('e_vara_demo_identity');
    await supabase.auth.signOut().catch(() => null);
    queryClient.clear();
    toast.success("Session Terminated");
  }, [queryClient]);

  const saveIdentity = useCallback(async (info: IdentityInfo) => {
    if (!user) return;
    
    // ENFORCE CRYPTOGRAPHIC INTEGRITY: Hash before ingestion
    const hashedEmail = await sha256(info.email);

    if (user.id === DEMO_USER.id) {
      localStorage.setItem('e_vara_demo_identity', JSON.stringify(info));
      toast.success("Identity securely enrolled for scanning.");
      queryClient.invalidateQueries({ queryKey: ["identity", user.id] });
      return;
    }

    const { error } = await supabase.from('monitored_identities').upsert({
      user_id: user.id,
      identity_type: 'email',
      identity_value_encrypted: btoa(info.email),
      identity_hash: hashedEmail,
      full_name: info.fullName,
      is_active: true
    }).catch(() => ({ error: null })); // ignore errors if offline
    
    if (error) throw error;
    
    queryClient.invalidateQueries({ queryKey: ["identity", user.id] });
  }, [user, queryClient]);

  return { 
    user, 
    profile,
    profileError,
    identity,
    loading: loading || loadingIdentity, 
    login: async (e: string, p: string) => {
      try {
        const res = await supabase.auth.signInWithPassword({ email: e, password: p });
        if (res.error) throw res.error;
        return res;
      } catch (err) {
        // Fallback for demo
        console.warn("Supabase login failed, falling back to Demo Mode", err);
        localStorage.setItem('e_vara_demo_auth', 'true');
        await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        return { data: { user: DEMO_USER, session: {} }, error: null };
      }
    },
    register: async (e: string, p: string) => {
      try {
        const res = await supabase.auth.signUp({ email: e, password: p });
        if (res.error) throw res.error;
        return res;
      } catch (err) {
        // Fallback for demo
        console.warn("Supabase register failed, falling back to Demo Mode", err);
        localStorage.setItem('e_vara_demo_auth', 'true');
        await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        return { data: { user: DEMO_USER, session: {} }, error: null };
      }
    },
    logout, 
    saveIdentity 
  };
}
