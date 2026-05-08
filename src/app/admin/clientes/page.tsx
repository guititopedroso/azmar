import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function ClientesAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: clients } = await supabase
    .from('clients')
    .select('*, subscriptions(status, packages(name))')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-white text-2xl font-bold">Clientes</h1>
        <Link href="/admin/clientes/novo" className="btn btn-primary btn-sm">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      {clients && clients.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table-azmar">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Negócio</th>
                <th>Email</th>
                <th>Pacote</th>
                <th>Subscrição</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const activeSub = client.subscriptions?.find(
                  (s: { status: string }) => s.status === 'active'
                );
                return (
                  <tr key={client.id}>
                    <td className="text-white font-medium">{client.name}</td>
                    <td>{client.business_name}</td>
                    <td>
                      <a href={`mailto:${client.email}`} className="text-[#2dd4bf] hover:underline">
                        {client.email}
                      </a>
                    </td>
                    <td>{activeSub?.packages?.name ?? '—'}</td>
                    <td>
                      {activeSub ? (
                        <span className="badge badge-green">Ativo</span>
                      ) : (
                        <span className="badge badge-gray">Sem subscrição</span>
                      )}
                    </td>
                    <td>{formatDate(client.created_at)}</td>
                    <td>
                      <Link
                        href={`/admin/clientes/${client.id}`}
                        className="text-[#2dd4bf] text-sm hover:underline"
                      >
                        Gerir
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8] mb-4">Nenhum cliente registado.</p>
          <Link href="/admin/clientes/novo" className="btn btn-primary btn-sm inline-flex">
            Criar primeiro cliente
          </Link>
        </div>
      )}
    </div>
  );
}
