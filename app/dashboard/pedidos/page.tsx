import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';

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

const priorityLabel: Record<string, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export default async function PedidosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: requests } = await supabase
    .from('support_requests')
    .select('*')
    .eq('client_id', client?.id ?? '')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-white text-2xl font-bold">Pedidos de Suporte</h1>
        <Link href="/dashboard/pedidos/novo" className="btn btn-primary btn-sm">
          <Plus className="w-4 h-4" />
          Novo Pedido
        </Link>
      </div>

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
                    <span className={`badge text-xs ${
                      req.priority === 'high' ? 'badge-red' : req.priority === 'medium' ? 'badge-yellow' : 'badge-gray'
                    }`}>
                      {priorityLabel[req.priority] ?? req.priority}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">{req.subject}</h3>
                </div>
                <span className={`badge shrink-0 ${statusBadge[req.status]}`}>
                  {statusLabel[req.status]}
                </span>
              </div>
              <p className="text-[#94a3b8] text-sm mb-3 line-clamp-2">
                {req.description}
              </p>
              <div className="text-[#64748b] text-xs">
                {formatDate(req.created_at)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8] mb-4">Ainda não fizeste nenhum pedido.</p>
          <Link href="/dashboard/pedidos/novo" className="btn btn-primary btn-sm inline-flex">
            Criar primeiro pedido
          </Link>
        </div>
      )}
    </div>
  );
}
