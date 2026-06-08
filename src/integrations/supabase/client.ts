import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("E-VARA: Missing Critical Environment Variables. Supabase URL and Publishable Key are required.");
}

/**
 * The 'Sovereign' client.
 * Strictly avoids hardcoded external fallbacks to prevent supply-chain attacks.
 */
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY
);

/**
 * Health check to verify if the infrastructure is reachable.
 */
export const checkInfrastructure = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('monitored_identities').select('count', { count: 'exact', head: true }).limit(1);
    return !error;
  } catch {
    return false;
  }
};
