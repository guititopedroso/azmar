import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente Supabase para uso no browser (componentes client-side).
 * Usa as variáveis públicas NEXT_PUBLIC_*.
 */
export function createClient() {
  return createBrowserClient(
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL!,
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
