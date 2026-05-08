import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

const typeLabel: Record<string, string> = {
  site_change: 'Alteração no site',
  new_post: 'Nova publicação',
  technical: 'Problema técnico',
  meeting: 'Reunião',
  other: 'Outro',
};
const statusLabel: Record<string, string> = {
  received: 'Recebido',
  analysing: 'Em análise',
  in_progress: 'Em execução',
  done: 'Concluído',
  closed: 'Fechado',
};
const statusBadge: Record<string, string> = {
  received: 'badge-ocean',
  analysing: 'badge-yellow',
  in_progress: 'badge-teal',
  done: 'badge-green',
  closed: 'badge-gray',
};
const priorityBadge: Record<string, string> = {
  low: 'badge-gray',
  medium: 'badge-yellow',
  high: 'badge-red',
};
const priorityLabel: Record<string, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export default async function PedidosAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: requests } = await supabase
    .from('support_requests')
    .select('*, clients(name, business_name)')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-8">Pedidos de Suporte</h1>

      {requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="badge badge-ocean text-xs">
                      {typeLabel[req.type] ?? req.type}
                    </span>
                    <span className={`badge text-xs ${priorityBadge[req.priority]}`}>
                      {priorityLabel[req.priority]}
                    </span>
                    <span className="text-[#64748b] text-xs">
                      {req.clients?.name} — {req.clients?.business_name}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">{req.subject}</h3>
                </div>
                <span className={`badge shrink-0 ${statusBadge[req.status]}`}>
                  {statusLabel[req.status]}
                </span>
              </div>
              <p className="text-[#94a3b8] text-sm mb-3">{req.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b] text-xs">{formatDate(req.created_at)}</span>
                <a
                  href={`/admin/pedidos/${req.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  Gerir pedido
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8]">Nenhum pedido de suporte.</p>
        </div>
      )}
    </div>
  );
}
