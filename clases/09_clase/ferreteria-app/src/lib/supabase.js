import { createClient } from "@supabase/supabase-js";
import createMockClient from "./localSupabase";

// esto con un fallback de si no hay conexion

const isLocalDev = import.meta.env.VITE_DEV_LOCAL === 'true';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? '';
const supabase = isLocalDev ? createMockClient() : createClient(supabaseUrl, supabaseKey)


export { supabase };