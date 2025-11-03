import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const MODEL_EMBEDDING = Deno.env.get('MODEL_EMBEDDING') || 'embedding-001';

export function createSupabaseClient(authHeader: string) {
  return createClient(
    Deno.env.get('URL') ?? '',
    Deno.env.get('ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  );
}