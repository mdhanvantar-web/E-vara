import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sha256 } from "@/lib/crypto";

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
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session?.user ?? null;
    },
    staleTime: 1000 * 60 * 5,
  });

  // 2. Secure Profile & Tier Query (Source of Truth for Authorization)
  const { data: profile, error: profileError } = useQuery<UserProfile | null>({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('tier, security_clearance, node_id_stable, billing_status')
        .eq('id', user.id)
        .single();
      
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
      
      const { data, error } = await supabase
        .from('monitored_identities')
        .select('full_name, identity_value_encrypted')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // No identities found
        throw error;
      }
      return {
        fullName: data.full_name || "",
        username: data.identity_value_encrypted,
        email: data.identity_value_encrypted,
        faceImage: null
      };
    },
    enabled: !!user,
  });

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    toast.success("Session Terminated");
  }, [queryClient]);

  const saveIdentity = useCallback(async (info: IdentityInfo) => {
    if (!user) return;
    
    // ENFORCE CRYPTOGRAPHIC INTEGRITY: Hash before ingestion
    const hashedEmail = await sha256(info.email);

    const { error } = await supabase.from('monitored_identities').upsert({
      user_id: user.id,
      identity_type: 'email',
      identity_value_encrypted: info.email,
      identity_hash: hashedEmail,
      full_name: info.fullName,
      is_active: true
    });
    
    if (error) throw error;
    
    queryClient.invalidateQueries({ queryKey: ["identity", user.id] });
  }, [user, queryClient]);

  return { 
    user, 
    profile,
    profileError,
    identity,
    loading: loading || loadingIdentity, 
    login: (e: string, p: string) => supabase.auth.signInWithPassword({ email: e, password: p }),
    register: (e: string, p: string) => supabase.auth.signUp({ email: e, password: p }),
    logout, 
    saveIdentity 
  };
}
