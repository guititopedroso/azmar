import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export default async function HistoricoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  // Combina atividades de várias tabelas
  const [{ data: payments }, { data: invoices }, { data: requests }] = await Promise.all([
    supabase.from('payments').select('id, amount, status, created_at, description').eq('client_id', client?.id ?? '').order('created_at', { ascending: false }).limit(20),
    supabase.from('invoices').select('id, document_number, amount, created_at').eq('client_id', client?.id ?? '').order('created_at', { ascending: false }).limit(20),
    supabase.from('support_requests').select('id, subject, status, created_at').eq('client_id', client?.id ?? '').order('created_at', { ascending: false }).limit(20),
  ]);

  type HistoryItem = {
    date: string;
    type: 'payment' | 'invoice' | 'request';
    label: string;
    detail: string;
    badge: string;
    badgeClass: string;
  };

  const history: HistoryItem[] = [
    ...(payments ?? []).map((p) => ({
      date: p.created_at,
      type: 'payment' as const,
      label: p.description ?? 'Pagamento',
      detail: `${p.amount}€`,
      badge: p.status === 'paid' ? 'Pago' : p.status === 'pending' ? 'Pendente' : 'Em atraso',
      badgeClass: p.status === 'paid' ? 'badge-green' : p.status === 'pending' ? 'badge-yellow' : 'badge-red',
    })),
    ...(invoices ?? []).map((inv) => ({
      date: inv.created_at,
      type: 'invoice' as const,
      label: `Fatura ${inv.document_number}`,
      detail: `${inv.amount}€`,
      badge: 'Documento',
      badgeClass: 'badge-ocean',
    })),
    ...(requests ?? []).map((req) => ({
      date: req.created_at,
      type: 'request' as const,
      label: req.subject,
      detail: req.status,
      badge: 'Pedido',
      badgeClass: 'badge-teal',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-8">Histórico</h1>

      {history.length > 0 ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[rgba(30,80,160,0.3)]" />

          <div className="space-y-4 pl-12">
            {history.map((item, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className="absolute -left-8 top-2 w-3 h-3 rounded-full bg-[#2dd4bf] border-2 border-[#030d1a]" />
                <div className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`badge text-xs mb-2 ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                      <div className="text-white text-sm font-medium">{item.label}</div>
                      <div className="text-[#94a3b8] text-xs mt-0.5">{item.detail}</div>
                    </div>
                    <div className="text-[#64748b] text-xs shrink-0">
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8]">Ainda não há atividade registada.</p>
        </div>
      )}
    </div>
  );
}
