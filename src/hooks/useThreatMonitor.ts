import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface ThreatFinding {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  source: string;
  description: string;
  found_at: string;
}

export const useThreatMonitor = () => {
  return useQuery<ThreatFinding[], Error>({
    queryKey: ["threat-findings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('identity_breaches')
        .select('id, severity, source_name, description, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error("Unable to securely fetch threat intelligence data.");
      }
      
      const results = (data || []).map((row) => ({
        id: row.id,
        severity: row.severity as ThreatFinding["severity"],
        title: `Exposure Detected in ${row.source_name}`,
        source: row.source_name,
        description: row.description || "Data point leaked.",
        found_at: row.created_at
      }));

      return results;
    },
    staleTime: 30000, // 30 seconds cache
  });
};
