import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatEur } from '@/lib/utils';
import { Download } from 'lucide-react';

export default async function FaturasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('client_id', client?.id ?? '')
    .order('issued_at', { ascending: false });

  const statusLabel: Record<string, string> = {
    issued: 'Emitida',
    pending: 'Pendente',
    overdue: 'Em atraso',
  };
  const statusBadge: Record<string, string> = {
    issued: 'badge-green',
    pending: 'badge-yellow',
    overdue: 'badge-red',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-2">Faturas & Documentos</h1>
      <p className="text-[#94a3b8] text-sm mb-8">
        Os documentos são emitidos pela AZMAR através de software de faturação
        certificado e disponibilizados aqui em PDF.
      </p>

      {invoices && invoices.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table-azmar">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Estado</th>
                <th className="text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-medium text-white">{inv.document_number}</td>
                  <td>{formatDate(inv.issued_at)}</td>
                  <td className="font-medium text-white">{formatEur(inv.amount)}</td>
                  <td>
                    <span className={`badge ${statusBadge[inv.status]}`}>
                      {statusLabel[inv.status]}
                    </span>
                  </td>
                  <td className="text-center">
                    {inv.file_url ? (
                      <a
                        href={inv.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#2dd4bf] text-sm hover:underline"
                      >
                        <Download className="w-4 h-4" />
                        PDF
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
          <p className="text-[#94a3b8]">Nenhuma fatura disponível de momento.</p>
        </div>
      )}
    </div>
  );
}
