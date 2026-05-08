import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatEur } from '@/lib/utils';

export default async function SubscricoesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*, packages(*)')
    .eq('client_id', client?.id ?? '')
    .order('created_at', { ascending: false });

  const statusLabel: Record<string, string> = {
    active: 'Ativo',
    suspended: 'Suspenso',
    cancelled: 'Cancelado',
  };
  const statusBadge: Record<string, string> = {
    active: 'badge-green',
    suspended: 'badge-yellow',
    cancelled: 'badge-gray',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-8">Subscrições</h1>
      {subscriptions && subscriptions.length > 0 ? (
        <div className="space-y-5">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    {sub.packages?.name ?? 'Pacote'}
                  </h2>
                  <p className="text-[#94a3b8] text-sm mt-1">
                    {sub.packages?.description}
                  </p>
                </div>
                <span className={`badge ${statusBadge[sub.status]}`}>
                  {statusLabel[sub.status]}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm border-t border-[rgba(30,80,160,0.15)] pt-4">
                <div>
                  <div className="text-[#94a3b8] text-xs mb-1">Mensalidade</div>
                  <div className="text-white font-medium">
                    {formatEur(sub.monthly_price)}/mês
                  </div>
                </div>
                <div>
                  <div className="text-[#94a3b8] text-xs mb-1">Início</div>
                  <div className="text-white font-medium">
                    {sub.start_date ? formatDate(sub.start_date) : '—'}
                  </div>
                </div>
                {sub.next_billing && (
                  <div>
                    <div className="text-[#94a3b8] text-xs mb-1">Próxima faturação</div>
                    <div className="text-white font-medium">
                      {formatDate(sub.next_billing)}
                    </div>
                  </div>
                )}
              </div>
              {sub.packages?.features && (
                <div className="mt-4 border-t border-[rgba(30,80,160,0.15)] pt-4">
                  <div className="text-[#94a3b8] text-xs mb-2">Serviços incluídos</div>
                  <div className="flex flex-wrap gap-2">
                    {(sub.packages.features as string[]).map((f: string) => (
                      <span key={f} className="badge badge-ocean text-xs">{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8]">Nenhuma subscrição ativa de momento.</p>
          <a href="/orcamento" className="btn btn-primary mt-6 inline-flex">
            Pedir Orçamento
          </a>
        </div>
      )}
    </div>
  );
}
