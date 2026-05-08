import AdminLayout from '../../components/admin/AdminLayout';
import { 
  FileText, 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';

export default function AdminInvoices() {
  const invoices = [
    { id: 'FT-2026-001', client: 'Restaurante Sabor', amount: 299, status: 'paid', date: '01 Mai, 2026' },
    { id: 'FT-2026-002', client: 'Moda & Estilo', amount: 150, status: 'pending', date: '05 Mai, 2026' },
    { id: 'FT-2026-003', client: 'Ginásio Fit', amount: 600, status: 'overdue', date: '25 Abr, 2026' },
    { id: 'FT-2026-004', client: 'Clínica Sorriso', amount: 250, status: 'paid', date: '01 Mai, 2026' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Faturação e Pagamentos</h1>
            <p className="text-gray-400 text-sm">Gere faturas, uploads de comprovativos e estados de pagamento.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary">
              <Upload className="w-4 h-4" />
              Importar
            </button>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Nova Fatura
            </button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-[#0a1c38]/50 p-6 border-l-4 border-l-green-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Recebido (Este Mês)</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€3.450,00</h3>
          </div>
          <div className="card bg-[#0a1c38]/50 p-6 border-l-4 border-l-yellow-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Pendente</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€850,00</h3>
          </div>
          <div className="card bg-[#0a1c38]/50 p-6 border-l-4 border-l-red-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Em Atraso</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€600,00</h3>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-[#071428] p-4 rounded-2xl border border-white/5">
          <div className="relative grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Pesquisar por número ou cliente..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-all">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="card bg-[#0a1c38]/50 p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 font-semibold">Fatura #</th>
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Data Emissão</th>
                  <th className="px-6 py-4 font-semibold">Valor</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-teal-400/50" />
                        <span className="text-sm font-bold text-white">{inv.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-300 font-medium">
                      {inv.client}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {inv.date}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-white">
                      €{inv.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'paid' ? 'bg-green-500/10 text-green-400' : 
                        inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {inv.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                        {inv.status === 'pending' && <Clock className="w-3 h-3" />}
                        {inv.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                        {inv.status === 'paid' ? 'Pago' : inv.status === 'pending' ? 'Pendente' : 'Em Atraso'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all">
                          <MoreHorizontal className="w-4 h-4" />
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
    </AdminLayout>
  );
}
