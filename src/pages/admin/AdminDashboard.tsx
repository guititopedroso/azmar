import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Clientes', value: '42', change: '+12%', trend: 'up', icon: Users },
    { label: 'Faturação Mensal', value: '€4.250', change: '+18%', trend: 'up', icon: TrendingUp },
    { label: 'Faturas Pendentes', value: '5', change: '-2', trend: 'down', icon: FileText },
    { label: 'Leads Ativos', value: '12', change: '+3', trend: 'up', icon: Clock },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit mb-2">Painel de Gestão</h1>
          <p className="text-gray-400 text-sm">Bem-vindo ao centro de controlo da AZMAR.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card bg-[#0a1c38]/50 p-6">
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
          {/* Recent Invoices */}
          <div className="lg:col-span-2 card bg-[#0a1c38]/50 p-6">
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
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-teal-400">
                            C{i}
                          </div>
                          <span className="text-sm font-medium text-white">Cliente Exemplo #{i}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-400">08 Mai, 2026</td>
                      <td className="py-4 text-sm font-semibold text-white">€{i * 150},00</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          i % 2 === 0 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {i % 2 === 0 ? 'Pago' : 'Pendente'}
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

          {/* Activity Log */}
          <div className="card bg-[#0a1c38]/50 p-6">
            <h2 className="text-xl font-bold text-white font-outfit mb-6">Atividade Recente</h2>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 shrink-0">
                      {i % 2 === 0 ? <Users className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    {i !== 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-white/10"></div>}
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">
                      {i % 2 === 0 ? 'Novo cliente registado' : 'Fatura gerada com sucesso'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Há {i * 15} minutos</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-gray-400 text-sm font-medium hover:bg-white/5 transition-all">
              Ver todo o histórico
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
