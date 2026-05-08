import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Edit2, 
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Upload,
  Loader2
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

interface Project {
  id: string | number;
  name: string;
  category: 'website' | 'branding' | 'marketing' | 'social' | 'event' | 'sport';
  status: 'public' | 'hidden';
  cover_url: string;
  website_url?: string;
  short_description?: string;
}

export default function AdminPortfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (!import.meta.env.VITE_SUPABASE_URL) throw new Error('No Supabase');

      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order', { ascending: true });
      
      if (!error && data) {
        setProjects(data);
      } else {
        throw new Error('Error fetching');
      }
    } catch (err) {
      console.warn('Mock Data for Portfolio');
      setProjects([
        { id: 1, name: 'Restaurante Sabor', category: 'website', status: 'public', cover_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Clínica Sorriso', category: 'branding', status: 'public', cover_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'Eco Store', category: 'marketing', status: 'public', cover_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' },
      ]);
    }
    setIsLoading(false);
  }

  const openModal = (project: Partial<Project> | null = null) => {
    setEditingProject(project || {
      name: '',
      category: 'website',
      status: 'hidden',
      cover_url: '',
      website_url: '',
      short_description: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const supabase = createClient();
      if (editingProject.id && typeof editingProject.id === 'string') {
        await supabase.from('portfolio_projects').update(editingProject).eq('id', editingProject.id);
      } else if (!editingProject.id) {
        await supabase.from('portfolio_projects').insert([{ ...editingProject, slug: editingProject.name?.toLowerCase().replace(/ /g, '-') }]);
      }
    } catch (err) {
      console.error('Error saving:', err);
    }
    
    setIsModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Tens a certeza que queres eliminar este projeto?')) {
      try {
        const supabase = createClient();
        await supabase.from('portfolio_projects').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting:', err);
      }
      fetchProjects();
    }
  };

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Gestão de Portfólio</h1>
            <p className="text-gray-400 text-sm">Gere os projetos exibidos no teu showcase.</p>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex bg-[#071428] p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
            {['all', 'website', 'branding', 'marketing', 'social'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab 
                  ? 'bg-teal-400 text-[#030d1a] shadow-lg' 
                  : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'Todos' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-teal-400" />
              <p className="font-bold uppercase tracking-widest text-[10px]">A carregar portfólio...</p>
            </div>
          ) : (
            <>
              {filteredProjects.map((project) => (
                <div key={project.id} className="group relative bg-[#0a1c38]/50 rounded-2xl overflow-hidden border border-white/5 hover:border-teal-400/30 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.cover_url} 
                      alt={project.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#030d1a] to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        project.status === 'public' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                      }`}>
                        {project.status === 'public' ? 'Público' : 'Oculto'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-1">{project.category}</p>
                    <h3 className="text-lg font-bold text-white mb-4 font-outfit">{project.name}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-1">
                        <button onClick={() => openModal(project)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-teal-400 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {project.website_url && (
                        <a href={project.website_url} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => openModal()} className="aspect-video flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/5 hover:border-teal-400/20 hover:bg-teal-400/5 transition-all text-gray-500 hover:text-teal-400 group">
                <Plus className="w-6 h-6" />
                <span className="font-semibold">Adicionar Projeto</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal Projeto */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-[#030d1a]/90 backdrop-blur-md z-60 flex items-center justify-center p-4">
          <div className="bg-[#071428] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white font-outfit">
                {editingProject.id ? 'Editar Projeto' : 'Novo Projeto'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">Nome do Projeto</label>
                  <input 
                    required 
                    type="text" 
                    className="input" 
                    value={editingProject.name}
                    onChange={e => setEditingProject({...editingProject, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Categoria</label>
                  <select 
                    className="select"
                    value={editingProject.category}
                    onChange={e => setEditingProject({...editingProject, category: e.target.value as any})}
                  >
                    <option value="website">Website</option>
                    <option value="branding">Branding</option>
                    <option value="marketing">Marketing</option>
                    <option value="social">Redes Sociais</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="label">Descrição Curta</label>
                <textarea 
                  className="textarea" 
                  value={editingProject.short_description}
                  onChange={e => setEditingProject({...editingProject, short_description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">URL da Imagem de Capa</label>
                  <input 
                    required 
                    type="text" 
                    className="input" 
                    placeholder="https://..."
                    value={editingProject.cover_url}
                    onChange={e => setEditingProject({...editingProject, cover_url: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="label">URL do Website (opcional)</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="https://..."
                    value={editingProject.website_url}
                    onChange={e => setEditingProject({...editingProject, website_url: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="grow">
                  <p className="text-white font-semibold">Estado de Visibilidade</p>
                  <p className="text-xs text-gray-500">Público para todos ou apenas visível para admin.</p>
                </div>
                <select 
                  className="bg-[#030d1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-teal-400"
                  value={editingProject.status}
                  onChange={e => setEditingProject({...editingProject, status: e.target.value as any})}
                >
                  <option value="public">Público</option>
                  <option value="hidden">Oculto</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">
                  <Save className="w-4 h-4" />
                  Guardar Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
