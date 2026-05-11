import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Loader2,
  Eye,
  Euro,
  X,
  User,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const q = query(collection(db, 'quote_requests'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(data);
    } catch (err) {
      console.error('Erro ao carregar leads:', err);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const leadRef = doc(db, 'quote_requests', id);
      await updateDoc(leadRef, { status: newStatus });
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
    setUpdatingId(null);
  }

  async function deleteLead(id: string) {
    if (!confirm('Eliminar esta lead permanentemente?')) return;
    try {
      await deleteDoc(doc(db, 'quote_requests', id));
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      console.error('Erro ao eliminar lead:', err);
    }
  }

  const handleContact = (lead: any) => {
    const subject = `AZMAR - Contacto sobre ${lead.service || 'Orçamento'}`;
    window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}`;
    updateStatus(lead.id, 'contacted');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Pedidos de Orçamento</h1>
            <p className="text-gray-400 text-sm">Gere as oportunidades vindas do formulário do site.</p>
          </div>
          <div className="flex bg-[#071428] p-1 rounded-xl border border-white/5">
             <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-400/10 rounded-lg border border-teal-400/20">
               {leads.length} Leads Ativas
             </div>
          </div>
        </div>

        {/* Leads Table - Design que o user gosta (Clean & Dark) */}
        <div className="card bg-[#0a1c38]/50 p-0 overflow-hidden border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5 bg-white/2">
                  <th className="px-6 py-5 font-black">Data</th>
                  <th className="px-6 py-5 font-black">Cliente / Empresa</th>
                  <th className="px-6 py-5 font-black">Serviço</th>
                  <th className="px-6 py-5 font-black">Orçamento</th>
                  <th className="px-6 py-5 font-black">Estado</th>
                  <th className="px-6 py-5 text-right font-black">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-400" />
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-gray-500 italic">Nenhuma lead encontrada.</td>
                  </tr>
                ) : leads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => { setSelectedLead(lead); setIsModalOpen(true); }}
                  >
                    <td className="px-6 py-5 text-xs text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{lead.name}</span>
                        <span className="text-[10px] text-teal-400/60 font-medium uppercase tracking-wider">{lead.business_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-300">
                      {lead.service || 'N/A'}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-black text-white bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                        {lead.budget || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        lead.status === 'new' ? 'bg-teal-400/10 text-teal-400 border-teal-400/20' : 
                        lead.status === 'closed' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                        'bg-blue-400/10 text-blue-400 border-blue-400/20'
                      }`}>
                        {lead.status === 'new' ? 'Novo' : lead.status === 'closed' ? 'Ganho' : 'Contactado'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleContact(lead)}
                          className="w-8 h-8 rounded-lg bg-teal-400/10 text-teal-400 flex items-center justify-center hover:bg-teal-400/20 transition-all"
                          title="Contactar"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(lead.id, 'closed')}
                          className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500/20 transition-all"
                          title="Marcar como Ganho"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-[#030d1a]/95 backdrop-blur-xl z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-400/10 flex items-center justify-center text-teal-400 border border-teal-400/20">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-outfit">{selectedLead.name}</h2>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedLead.business_name}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <DetailItem label="Email" value={selectedLead.email} icon={<Mail className="w-3 h-3"/>}/>
                  <DetailItem label="Telefone" value={selectedLead.phone || 'N/A'} icon={<Phone className="w-3 h-3"/>}/>
                </div>
                <div className="space-y-4">
                  <DetailItem label="Serviço" value={selectedLead.service || 'N/A'} icon={<Building2 className="w-3 h-3"/>}/>
                  <DetailItem label="Orçamento" value={selectedLead.budget || 'N/A'} icon={<Euro className="w-3 h-3"/>}/>
                </div>
              </div>

              <div className="space-y-2 pt-6 border-t border-white/5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Mensagem</label>
                <div className="p-6 bg-white/2 rounded-2xl border border-white/5 text-gray-300 text-sm leading-relaxed italic">
                  "{selectedLead.message}"
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/2 border-t border-white/5 flex gap-4">
              <button onClick={() => handleContact(selectedLead)} className="grow btn btn-primary py-4">Contactar Cliente</button>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary py-4 px-8">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function DetailItem({ label, value, icon }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">{label}</label>
      <div className="flex items-center gap-2 text-white font-bold">
        <span className="text-teal-400">{icon}</span>
        {value}
      </div>
    </div>
  );
}
