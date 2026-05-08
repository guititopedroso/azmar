import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatEur } from '@/lib/utils';
import Link from 'next/link';
import { Plus, Upload } from 'lucide-react';

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

export default async function PagamentosAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: payments } = await supabase
    .from('payments')
    .select('*, clients(name, business_name)')
    .order('due_date', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-white text-2xl font-bold">Pagamentos</h1>
        <div className="flex gap-3">
          <Link href="/admin/faturas/upload" className="btn btn-secondary btn-sm">
            <Upload className="w-4 h-4" />
            Upload Fatura
          </Link>
          <Link href="/admin/pagamentos/novo" className="btn btn-primary btn-sm">
            <Plus className="w-4 h-4" />
            Registar Pagamento
          </Link>
        </div>
      </div>

      {payments && payments.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table-azmar">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Método</th>
                <th>Estado</th>
                <th>Comprovativo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="text-white font-medium text-sm">
                      {p.clients?.name ?? '—'}
                    </div>
                    <div className="text-[#64748b] text-xs">
                      {p.clients?.business_name}
                    </div>
                  </td>
                  <td>{p.description ?? 'Mensalidade'}</td>
                  <td className="font-medium text-white">{formatEur(p.amount)}</td>
                  <td>{p.due_date ? formatDate(p.due_date) : '—'}</td>
                  <td>{p.method ?? '—'}</td>
                  <td>
                    <span className={`badge text-xs ${statusBadge[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td>
                    {p.proof_url ? (
                      <a href={p.proof_url} target="_blank" rel="noopener noreferrer" className="text-[#2dd4bf] text-sm hover:underline">
                        Ver
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    <Link href={`/admin/pagamentos/${p.id}`} className="text-[#2dd4bf] text-sm hover:underline">
                      Editar
                    </Link>
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
