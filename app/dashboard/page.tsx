import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Package, CreditCard, FileText, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatDate, formatEur } from '@/lib/utils';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: client } = await supabase
    .from('clients')
    .select('*, subscriptions(*, packages(*))')
    .eq('user_id', user.id)
    .single();

  const { data: recentPayments } = await supabase
    .from('payments')
    .select('*')
    .eq('client_id', client?.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: recentInvoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('client_id', client?.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const activeSubscription = client?.subscriptions?.find(
    (s: { status: string }) => s.status === 'active'
  );

  const firstName = (profile?.full_name ?? user.email ?? '').split(' ')[0];

  const stats = [
    {
      icon: Package,
      label: 'Pacote Ativo',
      value: activeSubscription?.packages?.name ?? 'Nenhum',
      href: '/dashboard/subscricoes',
      color: 'text-[#2dd4bf]',
    },
    {
      icon: CreditCard,
      label: 'Último Pagamento',
      value: recentPayments?.[0]
        ? formatEur(recentPayments[0].amount)
        : '—',
      href: '/dashboard/pagamentos',
      color: 'text-[#3d8bcd]',
    },
    {
      icon: FileText,
      label: 'Faturas',
      value: `${recentInvoices?.length ?? 0} documentos`,
      href: '/dashboard/faturas',
      color: 'text-[#60a8e0]',
    },
    {
      icon: MessageSquare,
      label: 'Pedidos',
      value: 'Ver pedidos',
      href: '/dashboard/pedidos',
      color: 'text-[#5eead4]',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-white text-3xl font-bold mb-1">
          Olá, {firstName} 👋
        </h1>
        <p className="text-[#94a3b8]">
          Bem-vindo à tua área de cliente AZMAR.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card group hover:border-[rgba(45,212,191,0.25)] transition-all">
            <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
            <div className="text-[#94a3b8] text-xs mb-1">{stat.label}</div>
            <div className="text-white font-semibold">{stat.value}</div>
          </Link>
        ))}
      </div>

      {/* Subscription */}
      {activeSubscription && (
        <div className="card mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-white font-semibold text-lg">Subscrição Ativa</h2>
              <p className="text-[#94a3b8] text-sm mt-0.5">
                {activeSubscription.packages?.name}
              </p>
            </div>
            <span className="badge badge-green">Ativo</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-[#94a3b8] text-xs mb-1">Mensalidade</div>
              <div className="text-white font-medium">
                {formatEur(activeSubscription.monthly_price)}/mês
              </div>
            </div>
            <div>
              <div className="text-[#94a3b8] text-xs mb-1">Início</div>
              <div className="text-white font-medium">
                {activeSubscription.start_date
                  ? formatDate(activeSubscription.start_date)
                  : '—'}
              </div>
            </div>
            {activeSubscription.next_billing && (
              <div>
                <div className="text-[#94a3b8] text-xs mb-1">Próxima faturação</div>
                <div className="text-white font-medium">
                  {formatDate(activeSubscription.next_billing)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent payments */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Pagamentos Recentes</h2>
            <Link href="/dashboard/pagamentos" className="text-[#2dd4bf] text-xs hover:underline">
              Ver todos
            </Link>
          </div>
          {recentPayments && recentPayments.length > 0 ? (
            <ul className="space-y-3">
              {recentPayments.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2 border-b border-[rgba(30,80,160,0.15)] last:border-0">
                  <div>
                    <div className="text-white text-sm font-medium">
                      {formatEur(p.amount)}
                    </div>
                    <div className="text-[#94a3b8] text-xs">
                      {p.due_date ? formatDate(p.due_date) : '—'}
                    </div>
                  </div>
                  <span
                    className={`badge text-xs ${
                      p.status === 'paid'
                        ? 'badge-green'
                        : p.status === 'pending'
                        ? 'badge-yellow'
                        : p.status === 'overdue'
                        ? 'badge-red'
                        : 'badge-gray'
                    }`}
                  >
                    {p.status === 'paid' ? 'Pago' : p.status === 'pending' ? 'Pendente' : p.status === 'overdue' ? 'Em atraso' : 'Cancelado'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#94a3b8] text-sm">Nenhum pagamento registado.</p>
          )}
        </div>

        {/* Recent invoices */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Faturas Recentes</h2>
            <Link href="/dashboard/faturas" className="text-[#2dd4bf] text-xs hover:underline">
              Ver todas
            </Link>
          </div>
          {recentInvoices && recentInvoices.length > 0 ? (
            <ul className="space-y-3">
              {recentInvoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between py-2 border-b border-[rgba(30,80,160,0.15)] last:border-0">
                  <div>
                    <div className="text-white text-sm font-medium">
                      {inv.document_number}
                    </div>
                    <div className="text-[#94a3b8] text-xs">
                      {formatDate(inv.issued_at)} · {formatEur(inv.amount)}
                    </div>
                  </div>
                  {inv.file_url && (
                    <a
                      href={inv.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm text-[#2dd4bf]"
                    >
                      PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#94a3b8] text-sm">Nenhuma fatura disponível.</p>
          )}
        </div>
      </div>

      {/* New support request CTA */}
      <div className="card mt-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold mb-1">Precisas de ajuda?</h3>
          <p className="text-[#94a3b8] text-sm">
            Cria um pedido de suporte e a equipa AZMAR responde em breve.
          </p>
        </div>
        <Link href="/dashboard/pedidos/novo" className="btn btn-primary btn-sm shrink-0">
          Novo Pedido
        </Link>
      </div>
    </div>
  );
}
