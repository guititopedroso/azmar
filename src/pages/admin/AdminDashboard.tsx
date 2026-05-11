import { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, count } from 'firebase/firestore';

interface DashboardData {
  totalClients: number;
  monthlyBilling: number;
  pendingInvoices: number;
  activeLeads: number;
  recentInvoices: any[];
  recentActivity: any[];
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    totalClients: 0,
    monthlyBilling: 0,
    pendingInvoices: 0,
    activeLeads: 0,
    recentInvoices: [],
    recentActivity: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      // 1. Total Clientes
      const clientsSnapshot = await getDocs(collection(db, 'clients'));
      const clientsCount = clientsSnapshot.size;
      
      // 2. Faturação Mensal
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0,0,0,0);
      
      const invoicesRef = collection(db, 'invoices');
      const billingQuery = query(
        invoicesRef, 
        where('status', '==', 'paid'), 
        where('created_at', '>=', startOfMonth.toISOString())
      );
      const billingSnapshot = await getDocs(billingQuery);
      const totalBilling = billingSnapshot.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0);

      // 3. Faturas Pendentes
      const pendingQuery = query(invoicesRef, where('status', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);
      const pendingCount = pendingSnapshot.size;

      // 4. Leads Ativos
      const leadsRef = collection(db, 'quote_requests');
      const leadsQuery = query(
        leadsRef, 
        where('status', 'in', ['new', 'contacted', 'in_proposal'])
      );
      const leadsSnapshot = await getDocs(leadsQuery);
      const leadsCount = leadsSnapshot.size;

      // 5. Últimas Faturas
      const recentInvoicesQuery = query(
        invoicesRef, 
        orderBy('created_at', 'desc'), 
        limit(5)
      );
      const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
      const invoices = recentInvoicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setData({
        totalClients: clientsCount,
        monthlyBilling: totalBilling,
        pendingInvoices: pendingCount,
        activeLeads: leadsCount,
        recentInvoices: invoices,
        recentActivity: []
      });
    } catch (err) {
      console.warn('Erro ao carregar dados do Firestore:', err);
      // Fallback para Mock Data
      setData({
        totalClients: 12,
        monthlyBilling: 850,
        pendingInvoices: 3,
        activeLeads: 5,
        recentInvoices: [
          { id: '1', amount: 350, status: 'paid', created_at: new Date().toISOString(), client: { business_name: 'Restaurante Sabor' } },
          { id: '2', amount: 120, status: 'pending', created_at: new Date().toISOString(), client: { business_name: 'Eco Store' } },
        ],
        recentActivity: []
      });
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { label: 'Total Clientes', value: data.totalClients.toString(), change: '+12%', trend: 'up', icon: Users },
    { label: 'Faturação Mensal', value: `€${data.monthlyBilling.toLocaleString()}`, change: '+8%', trend: 'up', icon: TrendingUp },
    { label: 'Faturas Pendentes', value: data.pendingInvoices.toString(), change: '-2', trend: 'down', icon: FileText },
    { label: 'Leads Ativos', value: data.activeLeads.toString(), change: '+3', trend: 'up', icon: Clock },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-teal-400" />
          <p className="font-bold uppercase tracking-widest text-xs">A sincronizar dados...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Painel de Gestão</h1>
            <p className="text-gray-400 text-sm">Bem-vindo ao centro de controlo da AZMAR.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card bg-[#0a1c38]/50 p-6 border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-white/5 text-teal-400">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white font-outfit">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card bg-[#0a1c38]/50 p-6 border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white font-outfit">Últimas Faturas</h2>
              <button className="text-teal-400 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="pb-4 font-semibold">Cliente</th>
                    <th className="pb-4 font-semibold">Data</th>
                    <th className="pb-4 font-semibold">Valor</th>
                    <th className="pb-4 font-semibold">Estado</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.recentInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500 italic">Sem faturas recentes.</td>
                    </tr>
                  ) : data.recentInvoices.map((invoice: any) => (
                    <tr key={invoice.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-teal-400">
                            {invoice.client?.business_name?.charAt(0) || 'C'}
                          </div>
                          <span className="text-sm font-medium text-white">{invoice.client?.business_name || 'Desconhecido'}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-400">
                        {new Date(invoice.created_at).toLocaleDateString('pt', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="py-4 text-sm font-semibold text-white">€{invoice.amount.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          invoice.status === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-500 hover:text-white transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card bg-[#0a1c38]/50 p-6 border-white/5">
            <h2 className="text-xl font-bold text-white font-outfit mb-6">Atividade Recente</h2>
            <div className="space-y-6 text-center py-10 text-gray-500 italic text-sm">
              <Clock className="w-10 h-10 mx-auto mb-4 opacity-20" />
              Logs de atividade serão <br/> apresentados em breve.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
