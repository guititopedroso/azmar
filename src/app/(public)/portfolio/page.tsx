'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'website', label: 'Website' },
  { id: 'branding', label: 'Branding' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'social', label: 'Redes Sociais' },
  { id: 'event', label: 'Evento' },
  { id: 'sport', label: 'Clube Desportivo' },
];

// Projetos placeholder — serão substituídos por dados da BD
const projects = [
  {
    id: '1',
    name: 'Café do Largo',
    category: 'website',
    categoryLabel: 'Website',
    short_description:
      'Redesign completo do website para um café familiar em Setúbal, com menu digital e botão de reservas.',
    cover_url: null,
    website_url: 'https://exemplo.pt',
    featured: true,
  },
  {
    id: '2',
    name: 'Barbearia Premium',
    category: 'branding',
    categoryLabel: 'Branding',
    short_description:
      'Criação de identidade visual completa para uma barbearia moderna, incluindo logótipo, cartões e templates de redes sociais.',
    cover_url: null,
    website_url: null,
    featured: true,
  },
  {
    id: '3',
    name: 'FitLife Ginásio',
    category: 'website',
    categoryLabel: 'Website',
    short_description:
      'Website completo para ginásio com galeria de equipamentos, horários de aulas e integração WhatsApp.',
    cover_url: null,
    website_url: 'https://exemplo.pt',
    featured: false,
  },
  {
    id: '4',
    name: 'Festa Sado 2024',
    category: 'event',
    categoryLabel: 'Evento',
    short_description:
      'Landing page para evento cultural em Setúbal, com programa, mapa e formulário de inscrição.',
    cover_url: null,
    website_url: null,
    featured: false,
  },
  {
    id: '5',
    name: 'FC Palmela',
    category: 'sport',
    categoryLabel: 'Clube Desportivo',
    short_description:
      'Website para clube de futebol com resultados, plantel e área de sócios.',
    cover_url: null,
    website_url: null,
    featured: false,
  },
  {
    id: '6',
    name: 'Restaurante Margem',
    category: 'marketing',
    categoryLabel: 'Marketing',
    short_description:
      'Gestão de redes sociais e criação de conteúdos para restaurante à beira-rio.',
    cover_url: null,
    website_url: null,
    featured: false,
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="card group flex flex-col h-full">
      {/* Cover */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#0d2244] to-[#071428] mb-5 flex items-center justify-center">
        {project.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-[#1a4a8a] font-outfit font-bold text-4xl tracking-widest select-none">
            AZMAR
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge badge-ocean text-xs">{project.categoryLabel}</span>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-teal text-xs">Destaque</span>
          </div>
        )}
      </div>

      <h3 className="text-white text-lg mb-2">{project.name}</h3>
      <p className="text-[#94a3b8] text-sm flex-1 mb-5">
        {project.short_description}
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <Link
          href={`/portfolio/${project.id}`}
          className="btn btn-secondary btn-sm flex-1 text-center"
        >
          Ver projeto
        </Link>
        {project.website_url && (
          <a
            href={project.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            aria-label="Visitar website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

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
          {filtered.length > 0 ? (
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
          <Link href="/orcamento" className="btn btn-primary btn-lg">
            Pedir Orçamento
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
