import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, ExternalLink, Eye, EyeOff } from 'lucide-react';

const categoryLabel: Record<string, string> = {
  website: 'Website',
  branding: 'Branding',
  marketing: 'Marketing',
  social: 'Redes Sociais',
  event: 'Evento',
  sport: 'Clube Desportivo',
};

export default async function PortfolioAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('order', { ascending: true });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-white text-2xl font-bold">Portefólio</h1>
        <Link href="/admin/portfolio/novo" className="btn btn-primary btn-sm">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div key={project.id} className="card flex flex-col">
              {/* Cover placeholder */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#0d2244] to-[#071428] mb-4 flex items-center justify-center">
                {project.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.cover_url}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#1a4a8a] font-outfit font-bold text-2xl">AZMAR</span>
                )}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="badge badge-ocean text-xs">
                    {categoryLabel[project.category] ?? project.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  {project.status === 'public' ? (
                    <span className="badge badge-green text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Público
                    </span>
                  ) : (
                    <span className="badge badge-gray text-xs flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Oculto
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-white font-semibold mb-1">{project.name}</h3>
              <p className="text-[#94a3b8] text-xs flex-1 mb-4 line-clamp-2">
                {project.short_description}
              </p>

              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/admin/portfolio/${project.id}`}
                  className="btn btn-secondary btn-sm flex-1 text-center"
                >
                  Editar
                </Link>
                {project.website_url && (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8] mb-4">Nenhum projeto no portefólio.</p>
          <Link href="/admin/portfolio/novo" className="btn btn-primary btn-sm inline-flex">
            Adicionar primeiro projeto
          </Link>
        </div>
      )}
    </div>
  );
}
