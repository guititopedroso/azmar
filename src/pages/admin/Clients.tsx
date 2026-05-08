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
  History,
  Loader2,
  Trash2,
  Save
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create Client Form State
  const [newClient, setNewClient] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    nif: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (!import.meta.env.VITE_SUPABASE_URL) throw new Error('No Supabase');

      const { data, error } = await supabase
        .from('clients')
        .select('*, subscriptions(*, packages(*))')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setClients(data);
      }
    } catch (err) {
      console.warn('Mock Data for Clients');
      setClients([
        { id: '1', business_name: 'Restaurante Sabor', name: 'João Silva', email: 'joao@sabor.pt', phone: '912345678', nif: '123456789', created_at: new Date().toISOString(), subscriptions: [{ status: 'active', monthly_price: 350, packages: { name: 'Pack Business' } }] },
        { id: '2', business_name: 'Eco Store', name: 'Maria Santos', email: 'maria@ecostore.pt', phone: '923456789', nif: '987654321', created_at: new Date().toISOString(), subscriptions: [{ status: 'active', monthly_price: 120, packages: { name: 'Pack Start' } }] },
      ]);
    }
    setIsLoading(false);
  }

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();
    try {
      const supabase = createClient();
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { error } = await supabase.from('clients').insert([newClient]);
        if (error) throw error;
      } else {
        // Mock add
        setClients([{ ...newClient, id: Date.now().toString(), created_at: new Date().toISOString(), subscriptions: [] }, ...clients]);
      }
      setIsCreateOpen(false);
      setNewClient({ name: '', business_name: '', email: '', phone: '', nif: '' });
      if (import.meta.env.VITE_SUPABASE_URL) fetchClients();
    } catch (err) {
      console.error('Error creating client:', err);
    }
  }

  async function deleteClient(id: string) {
    if (!confirm('Eliminar cliente também apagará as suas subscrições. Continuar?')) return;
    const supabase = createClient();
    await supabase.from('clients').delete().eq('id', id);
    setClients(clients.filter(c => c.id !== id));
    setIsDetailsOpen(false);
  }

  const openDetails = (client: any) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const filteredClients = clients.filter(c => 
    (c.business_name || c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Gestão de Clientes</h1>
            <p className="text-gray-400 text-sm">Visualiza e gere todos os teus clientes e subscrições.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all"
            />
          </div>
        </div>

        {/* Clients Table */}
        <div className="card-glass p-0 overflow-hidden border-white/5">
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-400" />
                    </td>
                  </tr>
                ) : filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-500 italic">Nenhum cliente encontrado.</td>
                  </tr>
                ) : filteredClients.map((client) => (
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
                          <p className="text-sm font-bold text-white">{client.business_name || client.name}</p>
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

      {/* Modal Criar Cliente */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-[#030d1a]/95 backdrop-blur-xl z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white font-outfit">Registar Novo Cliente</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleCreateClient} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">Nome do Gestor</label>
                  <input required className="input" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} placeholder="Ex: João Silva" />
                </div>
                <div className="form-group">
                  <label className="label">Nome do Negócio</label>
                  <input required className="input" value={newClient.business_name} onChange={e => setNewClient({...newClient, business_name: e.target.value})} placeholder="Ex: Restaurante Sabor" />
                </div>
                <div className="form-group">
                  <label className="label">Email Profissional</label>
                  <input required type="email" className="input" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="exemplo@empresa.pt" />
                </div>
                <div className="form-group">
                  <label className="label">Telemóvel</label>
                  <input className="input" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} placeholder="912 345 678" />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="label">NIF / Número de Contribuinte</label>
                  <input className="input" value={newClient.nif} onChange={e => setNewClient({...newClient, nif: e.target.value})} placeholder="123 456 789" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary px-8">
                  <Save className="w-4 h-4" />
                  Criar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalhes do Cliente */}
      {isDetailsOpen && selectedClient && (
        <div className="fixed inset-0 bg-[#030d1a]/90 backdrop-blur-md z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <div className="flex justify-end p-6 absolute top-0 right-0 z-10">
              <button onClick={() => setIsDetailsOpen(false)} className="text-gray-500 hover:text-white bg-white/5 p-2 rounded-xl">
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
                  <h2 className="text-xl font-bold text-white font-outfit">{selectedClient.business_name || selectedClient.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedClient.name}</p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-teal-400" />
                    <span className="truncate">{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-teal-400" />
                    <span>{selectedClient.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Briefcase className="w-4 h-4 text-teal-400" />
                    <span>NIF: {selectedClient.nif || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>Início: {new Date(selectedClient.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-3">
                  <button className="w-full btn btn-secondary text-xs">Editar Perfil</button>
                  <button 
                    onClick={() => deleteClient(selectedClient.id)}
                    className="w-full flex items-center justify-center gap-2 text-xs text-red-500 hover:bg-red-500/10 py-3 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar Cliente
                  </button>
                </div>
              </div>

              {/* Main Content Info */}
              <div className="lg:col-span-2 p-8 overflow-y-auto space-y-8">
                {/* Subscription Status */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-teal-400" />
                      <h3 className="font-bold text-white font-outfit">Subscrição</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedClient.subscriptions?.[0]?.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedClient.subscriptions?.[0]?.status || 'Sem Plano'}
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
                    <h3 className="font-bold text-white font-outfit">Histórico de Faturas</h3>
                  </div>
                  <div className="space-y-3 text-center py-10 border border-dashed border-white/10 rounded-2xl text-gray-500 text-sm italic">
                    Histórico será preenchido automaticamente ao gerar faturas.
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
