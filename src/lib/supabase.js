import { createClient } from '@supabase/supabase-js';

// Ces valeurs sont injectées depuis les variables d'environnement Vercel
// (voir DEPLOYMENT.md pour les instructions)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Si Supabase n'est pas configuré, l'app fonctionne en mode local (localStorage)
export const isSupabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
