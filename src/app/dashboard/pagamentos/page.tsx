import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatEur } from '@/lib/utils';

export default async function PagamentosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('client_id', client?.id ?? '')
    .order('due_date', { ascending: false });

  const statusLabel: Record<string, string> = {
    paid: 'Pago',
    pending: 'Pendente',
    overdue: 'Em atraso',
    cancelled: 'Cancelado',
  };
  const statusBadge: Record<string, string> = {
    paid: 'badge-green',
    pending: 'badge-yellow',
    overdue: 'badge-red',
    cancelled: 'badge-gray',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-8">Pagamentos</h1>

      {payments && payments.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table-azmar">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Estado</th>
                <th>Comprovativo</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.due_date ? formatDate(p.due_date) : '—'}</td>
                  <td>{p.description ?? 'Mensalidade'}</td>
                  <td className="font-medium text-white">{formatEur(p.amount)}</td>
                  <td>{p.method ?? '—'}</td>
                  <td>
                    <span className={`badge ${statusBadge[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td>
                    {p.proof_url ? (
                      <a
                        href={p.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2dd4bf] text-sm hover:underline"
                      >
                        Ver
                      </a>
                    ) : (
                      <span className="text-[#475569] text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8]">Nenhum pagamento registado.</p>
        </div>
      )}
    </div>
  );
}
