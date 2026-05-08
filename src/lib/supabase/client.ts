import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente Supabase para uso no browser (componentes client-side).
 * Usa as variáveis públicas NEXT_PUBLIC_*.
 */
export function createClient() {
  const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log('Supabase URL:', url);
  console.log('Supabase Key:', key ? 'FOUND' : 'MISSING');
  return createBrowserClient(url!, key!);
}
