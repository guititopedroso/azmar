import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  User, 
  X, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar,
  CreditCard,
  ExternalLink,
  History
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .select('*, subscriptions(*, packages(*))');
    
    if (!error && data) {
      setClients(data);
    } else {
      // Mock data
      setClients([
        { 
          id: 1, 
          name: 'João Silva', 
          business_name: 'Restaurante Sabor', 
          email: 'contacto@sabor.pt', 
          phone: '912345678', 
          nif: '123456789',
          created_at: '2026-01-15',
          subscriptions: [{ packages: { name: 'Pack Business' }, status: 'active', monthly_price: 60 }]
        },
        { 
          id: 2, 
          name: 'Maria Santos', 
          business_name: 'Moda & Estilo', 
          email: 'maria@loja.pt', 
          phone: '923456789', 
          nif: '987654321',
          created_at: '2026-02-10',
          subscriptions: [{ packages: { name: 'Pack Start' }, status: 'active', monthly_price: 25 }]
        },
      ]);
    }
    setIsLoading(false);
  }

  const openDetails = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Gestão de Clientes</h1>
            <p className="text-gray-400 text-sm">Visualiza e gere todos os teus clientes e subscrições.</p>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-[#071428] p-4 rounded-2xl border border-white/5">
          <div className="relative grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou email..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-all">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Clients Table */}
        <div className="card bg-[#0a1c38]/50 p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Plano</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold">Faturação</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => openDetails(client)}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{client.business_name}</p>
                          <p className="text-xs text-gray-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-white">
                        {client.subscriptions?.[0]?.packages?.name || 'Sem Plano'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        client.subscriptions?.[0]?.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {client.subscriptions?.[0]?.status || 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-white font-semibold">
                      €{client.subscriptions?.[0]?.monthly_price || 0},00/mês
                    </td>
                    <td className="px-6 py-5 text-right">
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
      </div>

      {/* Modal Detalhes do Cliente */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-[#030d1a]/90 backdrop-blur-md z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <div className="flex justify-end p-6 absolute top-0 right-0 z-10">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white bg-white/5 p-2 rounded-xl">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 h-[80vh]">
              {/* Sidebar Info */}
              <div className="bg-[#0a1c38]/50 p-8 border-r border-white/5 space-y-8 overflow-y-auto">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-teal-400/10 flex items-center justify-center mx-auto mb-4 border border-teal-400/20">
                    <User className="w-10 h-10 text-teal-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white font-outfit">{selectedClient.business_name}</h2>
                  <p className="text-gray-400 text-sm">{selectedClient.name}</p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-teal-400" />
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-teal-400" />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Briefcase className="w-4 h-4 text-teal-400" />
                    <span>NIF: {selectedClient.nif}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>Cliente desde: {new Date(selectedClient.created_at).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <button className="w-full btn btn-secondary text-xs">Editar Perfil</button>
                </div>
              </div>

              {/* Main Content Info */}
              <div className="lg:col-span-2 p-8 overflow-y-auto space-y-8">
                {/* Subscription Status */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-teal-400" />
                      <h3 className="font-bold text-white font-outfit">Subscrição Ativa</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                      Ativo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Plano Atual</p>
                      <p className="text-lg font-bold text-white">
                        {selectedClient.subscriptions?.[0]?.packages?.name || 'Nenhum'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Mensalidade</p>
                      <p className="text-lg font-bold text-teal-400">
                        €{selectedClient.subscriptions?.[0]?.monthly_price || 0},00
                      </p>
                    </div>
                  </div>
                </div>

                {/* History/Activity */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <History className="w-5 h-5 text-teal-400" />
                    <h3 className="font-bold text-white font-outfit">Histórico de Pagamentos</h3>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Mensalidade Mai/2026</p>
                            <p className="text-xs text-gray-500">Pago via Transferência</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">€60,00</p>
                          <button className="text-[10px] text-teal-400 hover:underline flex items-center gap-1 ml-auto">
                            Recibo <ExternalLink className="w-2 h-2" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
