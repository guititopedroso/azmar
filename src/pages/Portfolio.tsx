import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'website', label: 'Website' },
  { id: 'branding', label: 'Branding' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'social', label: 'Redes Sociais' },
  { id: 'event', label: 'Evento' },
  { id: 'sport', label: 'Clube Desportivo' },
];

interface Project {
  id: string;
  name: string;
  category: string;
  short_description: string;
  cover_url: string;
  website_url?: string;
  featured?: boolean;
  status: string;
  order?: number;
}

function ProjectCard({ project }: { project: Project }) {
  const categoryLabel = categories.find(c => c.id === project.category)?.label || project.category;

  const websiteUrl = project.website_url && !project.website_url.startsWith('http') 
    ? `https://${project.website_url}` 
    : project.website_url;

  return (
    <div className="card group flex flex-col h-full">
      {/* Live Preview Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#071428] mb-5 border border-white/5">
        {websiteUrl ? (
          <div className="w-full h-full pointer-events-none select-none overflow-hidden relative">
            <iframe
              src={websiteUrl}
              title={project.name}
              className="absolute top-0 left-0 border-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                width: '400%',
                height: '400%',
                transform: 'scale(0.25)',
                transformOrigin: '0 0',
              }}
              loading="lazy"
            />
            {/* Overlay to catch clicks and prevent interaction inside iframe */}
            <div className="absolute inset-0 z-10"></div>
          </div>
        ) : project.cover_url ? (
          <img
            src={project.cover_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="text-[#1a4a8a] font-outfit font-bold text-4xl tracking-widest select-none">
            AZMAR
          </div>
        )}
        
        <div className="absolute top-3 left-3 z-20">
          <span className="badge bg-[rgba(7,20,40,0.8)] backdrop-blur-md text-white text-xs border border-white/10">
            {categoryLabel}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="badge badge-teal text-xs shadow-lg">Destaque</span>
          </div>
        )}
      </div>

      <h3 className="text-white text-lg mb-2 font-outfit">{project.name}</h3>
      <p className="text-[#94a3b8] text-sm flex-1 mb-5">
        {project.short_description}
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {project.website_url ? (
          <a
            href={project.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm flex-1 text-center"
          >
            Visitar Website
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <Link
            to={`/portfolio/${project.id}`}
            className="btn btn-secondary btn-sm flex-1 text-center"
          >
            Ver detalhes
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'portfolio_projects'));
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      
      // Filtrar e Ordenar em memória para evitar erros de índice composto do Firestore
      const publicProjects = data
        .filter(p => p.status === 'public')
        .sort((a, b) => (a.order || 0) - (b.order || 0));
        
      setProjects(publicProjects);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
    setLoading(false);
  }

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#030d1a]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,176,0.5) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-tag mx-auto">O nosso trabalho</div>
          <h1 className="text-white mt-4 mb-5">
            Projetos que{' '}
            <span className="gradient-text">falam por si</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Cada projeto é único. Aqui mostramos alguns dos trabalhos que
            realizámos para negócios locais.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-[#2dd4bf] text-[#030d1a]'
                    : 'bg-[rgba(7,20,40,0.6)] text-[#94a3b8] border border-[rgba(30,80,160,0.25)] hover:text-white hover:border-[rgba(45,212,191,0.3)]'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-teal-400" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">A carregar projetos...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#94a3b8]">
                Nenhum projeto nesta categoria ainda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-subtle">
        <div className="container text-center">
          <h2 className="text-white mb-4">
            Queres que o teu negócio{' '}
            <span className="gradient-text">apareça aqui?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-8">
            Fala connosco e vamos criar algo que te representa.
          </p>
          <Link to="/orcamento" className="btn btn-primary btn-lg">
            Pedir Orçamento
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
