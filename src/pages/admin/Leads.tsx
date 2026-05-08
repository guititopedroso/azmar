import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Eye
} from 'lucide-react';

export default function AdminLeads() {
  const leads = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@restaurante.pt',
      phone: '912 345 678',
      business: 'Restaurante Sabor',
      service: 'Website Business',
      status: 'new',
      date: 'Há 2 horas',
      message: 'Gostaria de saber mais sobre o Pack Business para o meu novo restaurante.'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@loja.pt',
      phone: '923 456 789',
      business: 'Moda & Estilo',
      service: 'Branding',
      status: 'contacted',
      date: 'Ontem',
      message: 'Preciso de um logotipo novo e renovação da imagem nas redes sociais.'
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      email: 'carlos@fitness.pt',
      phone: '934 567 890',
      business: 'Ginásio Fit',
      service: 'Marketing Digital',
      status: 'closed',
      date: 'Há 3 dias',
      message: 'Interessado em gestão de redes sociais e anúncios Meta.'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit mb-2">Pedidos de Orçamento (Leads)</h1>
          <p className="text-gray-400 text-sm">Gere as novas oportunidades de negócio vindas do site.</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-teal-400/5 border-teal-400/20 p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Novas Leads</p>
              <h3 className="text-3xl font-bold text-teal-400">08</h3>
            </div>
            <Clock className="w-10 h-10 text-teal-400/30" />
          </div>
          <div className="card bg-blue-400/5 border-blue-400/20 p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Em Negociação</p>
              <h3 className="text-3xl font-bold text-blue-400">15</h3>
            </div>
            <MessageSquare className="w-10 h-10 text-blue-400/30" />
          </div>
          <div className="card bg-green-400/5 border-green-400/20 p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Convertidas (Mês)</p>
              <h3 className="text-3xl font-bold text-green-400">12</h3>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-400/30" />
          </div>
        </div>

        {/* Leads List */}
        <div className="grid grid-cols-1 gap-6">
          {leads.map((lead) => (
            <div key={lead.id} className="card bg-[#0a1c38]/50 p-6 group hover:border-teal-400/30 transition-all">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-4 grow">
                  <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                    <h3 className="text-lg font-bold text-white font-outfit">{lead.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === 'new' ? 'bg-teal-400/10 text-teal-400' : 
                      lead.status === 'contacted' ? 'bg-blue-400/10 text-blue-400' : 
                      'bg-green-400/10 text-green-400'
                    }`}>
                      {lead.status === 'new' ? 'Novo' : lead.status === 'contacted' ? 'Contactado' : 'Fechado'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Building2 className="w-4 h-4 text-teal-400/50" />
                      <span className="text-white">{lead.business}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4 text-teal-400/50" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4 text-teal-400/50" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-teal-400/50" />
                      <span>{lead.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-teal-400/50" />
                      <span className="text-teal-400 font-medium">{lead.service}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 italic text-gray-400 text-sm">
                    "{lead.message}"
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 shrink-0">
                  <button className="grow lg:grow-0 btn btn-primary btn-sm">
                    <MessageSquare className="w-4 h-4" />
                    Contactar
                  </button>
                  <button className="grow lg:grow-0 btn btn-secondary btn-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Ganho
                  </button>
                  <button className="w-10 h-10 lg:w-full rounded-xl border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
