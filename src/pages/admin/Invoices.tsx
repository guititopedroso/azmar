import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  FileText, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  Trash2,
  X,
  Save,
  Euro,
  User
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, doc, getDoc } from 'firebase/firestore';

// Usar imports padrão que costumam ser mais estáveis em Vite/React
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newInvoice, setNewInvoice] = useState({
    client_id: '',
    amount: '',
    status: 'pending',
    description: 'Serviços Mensais de Marketing Digital'
  });

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    console.log('jsPDF type:', typeof jsPDF);
  }, []);

  async function fetchClients() {
    try {
      const snapshot = await getDocs(collection(db, 'clients'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setClients([
        { id: '1', business_name: 'Restaurante Sabor', name: 'João Silva', nif: '123456789', email: 'joao@sabor.pt' }, 
        { id: '2', business_name: 'Eco Store', name: 'Maria Santos', nif: '987654321', email: 'maria@ecostore.pt' }
      ]);
    }
  }

  async function fetchInvoices() {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'invoices'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      
      const invoicesData = await Promise.all(snapshot.docs.map(async (invoiceDoc) => {
        const invoiceData = invoiceDoc.data();
        let clientData = null;
        
        if (invoiceData.client_id) {
          try {
            const clientDoc = await getDoc(doc(db, 'clients', invoiceData.client_id));
            if (clientDoc.exists()) {
              clientData = clientDoc.data();
            }
          } catch (e) {
            console.warn('Could not fetch client for invoice', invoiceDoc.id);
          }
        }
        
        return {
          id: invoiceDoc.id,
          ...invoiceData,
          client: clientData
        };
      }));
      
      setInvoices(invoicesData);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setInvoices([
        { id: 'INV-2024-001', amount: 350, status: 'paid', created_at: new Date().toISOString(), client: { business_name: 'Restaurante Sabor', nif: '123456789', email: 'joao@sabor.pt' } },
        { id: 'INV-2024-002', amount: 120, status: 'pending', created_at: new Date().toISOString(), client: { business_name: 'Eco Store', nif: '987654321', email: 'maria@ecostore.pt' } },
      ]);
    }
    setIsLoading(false);
  }

  const generatePDF = (invoice: any) => {
    try {
      // 1. Criar o documento
      const doc = new jsPDF();
      console.log('Document created');

      const client = invoice.client || { business_name: 'Consumidor Final', nif: '999999999' };
      const date = new Date(invoice.created_at).toLocaleDateString('pt-PT');
      const invoiceNumber = invoice.id ? invoice.id.toString().substring(0, 12).toUpperCase() : 'NO-ID';

      // 2. Header
      doc.setFillColor(7, 20, 40);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(45, 212, 191);
      doc.setFontSize(24);
      doc.text('AZMAR', 20, 25);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('AGÊNCIA DE MARKETING DIGITAL', 20, 32);

      // 3. Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('DE: AZMAR Digital Agency', 20, 55);
      doc.text('PARA: ' + (client.business_name || client.name), 120, 55);
      doc.text('NIF: ' + (client.nif || 'N/A'), 120, 62);
      
      doc.text('FATURA #' + invoiceNumber, 20, 80);
      doc.text('DATA: ' + date, 20, 85);

      // 4. Tabela (Usando a função importada diretamente)
      autoTable(doc, {
        startY: 100,
        head: [['DESCRIÇÃO', 'TOTAL']],
        body: [[invoice.description || 'Serviços Digitais', `${invoice.amount}€`]],
        headStyles: { fillColor: [7, 20, 40] }
      });

      // 5. Salvar
      doc.save(`Fatura_${invoiceNumber}.pdf`);
      console.log('PDF Saved');
    } catch (err) {
      console.error('CRITICAL PDF ERROR:', err);
      alert('Erro Crítico ao gerar PDF: ' + (err instanceof Error ? err.message : 'Ver consola'));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('Submit Triggered');
    
    if (!newInvoice.client_id || !newInvoice.amount) {
      alert('Selecione um cliente e um valor.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'invoices'), {
        client_id: newInvoice.client_id,
        amount: parseFloat(newInvoice.amount),
        status: newInvoice.status,
        description: newInvoice.description,
        created_at: new Date().toISOString()
      });

      const client = clients.find(c => c.id === newInvoice.client_id);
      const createdInvoice = {
        id: docRef.id,
        amount: parseFloat(newInvoice.amount),
        status: newInvoice.status,
        description: newInvoice.description,
        created_at: new Date().toISOString(),
        client: { 
          business_name: client?.business_name || 'Desconhecido',
          nif: client?.nif || 'N/A',
          email: client?.email || '',
          name: client?.name || ''
        }
      };

      setInvoices([createdInvoice, ...invoices]);
      setIsCreateOpen(false);
      // Pequeno delay para garantir que a modal fechou antes do download começar
      setTimeout(() => generatePDF(createdInvoice), 300);
      
    } catch (err) {
      console.error('Firestore Error:', err);
      alert('Erro ao guardar fatura. Verifique a consola.');
    }
  };

  const totals = {
    received: invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0)
  };

  const filteredInvoices = invoices.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (i.client?.business_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Faturação e Pagamentos</h1>
            <p className="text-gray-400 text-sm">Gere faturas, descarrega PDFs e gere estados de pagamento.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4" />
            Nova Fatura PDF
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-glass p-6 border-l-4 border-l-green-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Recebido</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€{totals.received.toLocaleString()},00</h3>
          </div>
          <div className="card-glass p-6 border-l-4 border-l-yellow-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Pendente</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€{totals.pending.toLocaleString()},00</h3>
          </div>
          <div className="card-glass p-6 border-l-4 border-l-red-400">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Em Atraso</p>
            <h3 className="text-3xl font-bold text-white font-outfit">€{totals.overdue.toLocaleString()},00</h3>
          </div>
        </div>

        {/* Table */}
        <div className="card-glass p-0 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4">ID Fatura</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr><td colSpan={6} className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-400" /></td></tr>
              ) : filteredInvoices.map((inv) => (
                <tr key={inv.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-white uppercase">{inv.id.substring(0, 10)}</td>
                  <td className="px-6 py-5 text-sm text-gray-300">{inv.client?.business_name || 'N/A'}</td>
                  <td className="px-6 py-5 text-sm text-gray-500">{new Date(inv.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-5 text-sm font-bold text-white">€{inv.amount},00</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      inv.status === 'paid' ? 'bg-green-500/10 text-green-400' : 
                      inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                    }`}>{inv.status === 'paid' ? 'PAGO' : 'PENDENTE'}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => generatePDF(inv)} className="p-2 text-teal-400 hover:bg-teal-400/10 rounded-lg transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-[#030d1a]/95 backdrop-blur-xl z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white font-outfit">Nova Fatura PDF</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="form-group">
                <label className="label">Cliente</label>
                <select className="select" value={newInvoice.client_id} onChange={e => setNewInvoice({...newInvoice, client_id: e.target.value})}>
                  <option value="">Escolha um cliente</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.business_name || c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Descrição</label>
                <input className="input" value={newInvoice.description} onChange={e => setNewInvoice({...newInvoice, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="label">Valor (€)</label>
                <input type="number" className="input" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} />
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => handleSubmit()} 
                  className="btn btn-primary py-4 text-lg"
                >
                  Confirmar e Gerar PDF
                </button>
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-secondary">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
