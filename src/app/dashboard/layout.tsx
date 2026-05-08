import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ClientSidebar from '@/components/dashboard/ClientSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Busca perfil do utilizador
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Admin é redirecionado para /admin
  if (profile?.role === 'admin') redirect('/admin');

  return (
    <div className="min-h-screen bg-[#030d1a] flex">
      <ClientSidebar user={user} profile={profile} />
      <main className="flex-1 min-w-0 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
