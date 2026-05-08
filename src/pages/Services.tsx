import { Link } from 'react-router-dom';
import {
  Globe,
  Megaphone,
  Palette,
  MapPin,
  Wrench,
  Zap,
  Check,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Criação de Websites',
    desc: 'Websites modernos, rápidos, responsivos e preparados para converter visitantes em contactos.',
    features: [
      'Landing pages',
      'Websites institucionais',
      'Websites para eventos',
      'Websites para negócios locais',
      'Integração WhatsApp',
      'Formulários de contacto',
      'Google Maps integrado',
      'SEO básico',
    ],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing Digital',
    desc: 'Estratégias simples e eficazes para aumentar a visibilidade online de negócios locais.',
    features: [
      'Gestão de redes sociais',
      'Planeamento de conteúdos',
      'Meta Ads (Facebook/Instagram)',
      'Campanhas locais',
      'Otimização de presença digital',
    ],
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding',
    desc: 'Criação ou modernização da imagem visual de pequenos negócios.',
    features: [
      'Logótipo profissional',
      'Paleta de cores',
      'Tipografia',
      'Identidade visual completa',
      'Templates para redes sociais',
    ],
  },
  {
    id: 'google',
    icon: MapPin,
    title: 'Google Business & SEO Local',
    desc: 'Otimização para que o teu negócio apareça melhor no Google e no Google Maps.',
    features: [
      'Criação/otimização Google Business Profile',
      'Fotos e descrições otimizadas',
      'Configuração de serviços',
      'Localização e área de atuação',
      'Estratégia de reviews',
    ],
  },
  {
    id: 'manutencao',
    icon: Wrench,
    title: 'Manutenção Digital',
    desc: 'Acompanhamento mensal para manter o site atualizado, seguro e profissional.',
    features: [
      'Alterações simples de conteúdo',
      'Atualizações de sistema',
      'Backups regulares',
      'Verificação de links',
      'Apoio técnico',
      'Pequenos ajustes visuais',
    ],
  },
  {
    id: 'automacoes',
    icon: Zap,
    title: 'Automações Simples',
    desc: 'Soluções para poupar tempo e melhorar a comunicação com os teus clientes.',
    features: [
      'Formulários inteligentes',
      'Respostas automáticas por email',
      'Notificações configuradas',
      'Organização de leads',
      'Integrações simples',
    ],
  },
];

export default function Services() {
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
          <div className="section-tag mx-auto">O que oferecemos</div>
          <h1 className="text-white mt-4 mb-5">
            Serviços digitais para{' '}
            <span className="gradient-text">negócios locais</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Transformamos a presença online do teu negócio numa ferramenta real
            de captação de clientes.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card flex flex-col gap-6 group scroll-mt-24"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[rgba(45,212,191,0.12)] to-[rgba(37,99,176,0.08)] border border-[rgba(45,212,191,0.15)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-[#2dd4bf]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-white mb-2">{s.title}</h2>
                    <p className="text-[#94a3b8] text-sm">{s.desc}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-[#e2e8f0]"
                    >
                      <Check className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/orcamento?servico=${s.id}`}
                  className="btn btn-secondary btn-sm w-fit mt-auto"
                >
                  Pedir orçamento para este serviço
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-subtle">
        <div className="container text-center">
          <h2 className="text-white mb-4">
            Não tens a certeza de que{' '}
            <span className="gradient-text">serviço precisas?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-8">
            Fala connosco. Analisamos a tua situação e sugerimos a solução mais
            adequada ao teu negócio e orçamento.
          </p>
          <Link to="/orcamento" className="btn btn-primary btn-lg">
            Pedir Orçamento Gratuito
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
