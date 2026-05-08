import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Users, TrendingUp, MessageSquare, CreditCard, Briefcase, Star } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Métricas
  const [
    { count: clientsCount },
    { count: leadsCount },
    { count: pendingRequests },
    { count: pendingPayments },
    { count: activeSubscriptions },
    { count: portfolioCount },
  ] = await Promise.all([
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('quote_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('support_requests').select('*', { count: 'exact', head: true }).in('status', ['received', 'analysing']),
    supabase.from('payments').select('*', { count: 'exact', head: true }).in('status', ['pending', 'overdue']),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }).eq('status', 'public'),
  ]);

  const stats = [
    {
      icon: Users,
      label: 'Clientes',
      value: clientsCount ?? 0,
      href: '/admin/clientes',
      color: 'text-[#3d8bcd]',
      bg: 'from-[rgba(61,139,205,0.1)] to-[rgba(37,99,176,0.05)]',
    },
    {
      icon: TrendingUp,
      label: 'Leads Novas',
      value: leadsCount ?? 0,
      href: '/admin/leads',
      color: 'text-[#2dd4bf]',
      bg: 'from-[rgba(45,212,191,0.1)] to-[rgba(45,212,191,0.03)]',
    },
    {
      icon: MessageSquare,
      label: 'Pedidos Pendentes',
      value: pendingRequests ?? 0,
      href: '/admin/pedidos',
      color: 'text-[#fbbf24]',
      bg: 'from-[rgba(251,191,36,0.1)] to-[rgba(251,191,36,0.03)]',
    },
    {
      icon: CreditCard,
      label: 'Pagamentos Pendentes',
      value: pendingPayments ?? 0,
      href: '/admin/pagamentos',
      color: 'text-[#f87171]',
      bg: 'from-[rgba(248,113,113,0.1)] to-[rgba(248,113,113,0.03)]',
    },
    {
      icon: Star,
      label: 'Subscrições Ativas',
      value: activeSubscriptions ?? 0,
      href: '/admin/subscricoes',
      color: 'text-[#4ade80]',
      bg: 'from-[rgba(74,222,128,0.1)] to-[rgba(74,222,128,0.03)]',
    },
    {
      icon: Briefcase,
      label: 'Projetos Públicos',
      value: portfolioCount ?? 0,
      href: '/admin/portfolio',
      color: 'text-[#60a8e0]',
      bg: 'from-[rgba(96,168,224,0.1)] to-[rgba(96,168,224,0.03)]',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-white text-3xl font-bold mb-1">Dashboard Admin</h1>
        <p className="text-[#94a3b8]">Visão geral do estado da AZMAR.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card group hover:border-[rgba(45,212,191,0.25)] transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bg} border border-[rgba(255,255,255,0.05)] flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className={`text-4xl font-outfit font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-[#94a3b8] text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-white font-semibold text-lg mb-4">Ações rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/clientes/novo', label: 'Criar novo cliente' },
          { href: '/admin/portfolio/novo', label: 'Adicionar projeto' },
          { href: '/admin/leads', label: 'Ver leads novas' },
          { href: '/admin/pagamentos/novo', label: 'Registar pagamento' },
          { href: '/admin/faturas/upload', label: 'Upload de fatura PDF' },
          { href: '/admin/pedidos', label: 'Ver pedidos pendentes' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 p-4 rounded-xl border border-[rgba(30,80,160,0.25)] bg-[rgba(7,20,40,0.5)] hover:border-[rgba(45,212,191,0.25)] hover:bg-[rgba(7,20,40,0.8)] transition-all text-[#e2e8f0] text-sm font-medium"
          >
            → {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
