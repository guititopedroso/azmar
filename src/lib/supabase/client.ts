import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente Supabase para uso no browser (componentes client-side).
 * No Vite usamos o prefixo VITE_ em vez de NEXT_PUBLIC_.
 */
export function createClient() {
  const url = import.meta.env.VITE_SUPABASE_URL || '';
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  if (!url || !key) {
    console.warn('Supabase configuration missing. Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  return createBrowserClient(url, key);
}
