import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';

const packages = [
  {
    id: 'start',
    name: 'Pack Start',
    desc: 'Para negócios que precisam de presença digital básica e profissional.',
    setup: 150,
    monthly: 25,
    badge: null,
    highlight: false,
    features: [
      'Landing page simples',
      'Design responsivo (mobile first)',
      'Botão WhatsApp',
      'Google Maps integrado',
      'Formulário de contacto',
      'Ligação às redes sociais',
      'SEO básico',
      'Apoio inicial',
      { label: 'Páginas ilimitadas', value: false },
      { label: 'Gestão de redes sociais', value: false },
      { label: 'Branding', value: false },
      { label: 'Meta Ads', value: false },
    ],
  },
  {
    id: 'business',
    name: 'Pack Business',
    desc: 'Website completo e imagem mais profissional para o teu negócio.',
    setup: 400,
    monthly: 60,
    badge: 'Mais popular',
    highlight: true,
    features: [
      'Website até 5 páginas',
      'Home, Serviços, Sobre, Contactos',
      'Portefólio ou galeria',
      'Formulário de contacto',
      'Integração WhatsApp',
      'Google Maps integrado',
      'SEO local básico',
      'Manutenção mensal incluída',
      'Pequenas alterações incluídas',
      { label: 'Gestão de redes sociais', value: false },
      { label: 'Branding', value: false },
      { label: 'Meta Ads', value: false },
    ],
  },
  {
    id: 'growth',
    name: 'Pack Growth',
    desc: 'Website, marketing e acompanhamento contínuo para crescer online.',
    setup: 750,
    monthly: 150,
    badge: 'Completo',
    highlight: false,
    features: [
      'Website completo (páginas ilimitadas)',
      'Branding básico',
      'Gestão de redes sociais',
      'Criação de conteúdos mensais',
      'Estratégia digital',
      'Google Business otimizado',
      'Meta Ads setup',
      'Relatório mensal simples',
      'Manutenção digital completa',
      'Automações simples',
    ],
  },
];

type Feature = string | { label: string; value: boolean };

function FeatureItem({ feature }: { feature: Feature }) {
  if (typeof feature === 'string') {
    return (
      <li className="flex items-center gap-2.5 text-sm text-[#e2e8f0]">
        <Check className="w-4 h-4 text-[#2dd4bf] shrink-0" />
        {feature}
      </li>
    );
  }
  return (
    <li
      className={`flex items-center gap-2.5 text-sm ${feature.value ? 'text-[#e2e8f0]' : 'text-[#475569]'}`}
    >
      {feature.value ? (
        <Check className="w-4 h-4 text-[#2dd4bf] shrink-0" />
      ) : (
        <X className="w-4 h-4 text-[#475569] shrink-0" />
      )}
      {feature.label}
    </li>
  );
}

const compareRows = [
  { label: 'Landing page / Website', start: '1 pág.', business: 'Até 5 pág.', growth: 'Ilimitado' },
  { label: 'Design responsivo', start: true, business: true, growth: true },
  { label: 'SEO básico', start: true, business: true, growth: true },
  { label: 'Formulário de contacto', start: true, business: true, growth: true },
  { label: 'Botão WhatsApp', start: true, business: true, growth: true },
  { label: 'Google Maps', start: true, business: true, growth: true },
  { label: 'Manutenção mensal', start: false, business: true, growth: true },
  { label: 'Branding básico', start: false, business: false, growth: true },
  { label: 'Gestão redes sociais', start: false, business: false, growth: true },
  { label: 'Meta Ads setup', start: false, business: false, growth: true },
  { label: 'Google Business', start: false, business: 'SEO básico', growth: 'Completo' },
  { label: 'Relatório mensal', start: false, business: false, growth: true },
  { label: 'Setup', start: 'A partir de 150€', business: 'A partir de 400€', growth: 'A partir de 750€' },
  { label: 'Mensalidade', start: '25€/mês', business: '60€/mês', growth: '150€/mês' },
];

function CellValue({ val }: { val: boolean | string }) {
  if (typeof val === 'boolean') {
    return val ? (
      <Check className="w-5 h-5 text-[#2dd4bf] mx-auto" />
    ) : (
      <X className="w-4 h-4 text-[#334155] mx-auto" />
    );
  }
  return <span className="text-sm text-[#94a3b8]">{val}</span>;
}

export default function Packages() {
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
          <div className="section-tag mx-auto">Planos & Preços</div>
          <h1 className="text-white mt-4 mb-5">
            Escolhe o plano{' '}
            <span className="gradient-text">certo para ti</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Sem surpresas. Valores transparentes e adaptados ao teu negócio.
            Podes sempre começar pequeno e crescer.
          </p>
        </div>
      </section>

      {/* Packages Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`card relative flex flex-col ${
                  pkg.highlight
                    ? 'border-[rgba(45,212,191,0.4)] shadow-[0_0_60px_rgba(45,212,191,0.06)]'
                    : ''
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge badge-teal">{pkg.badge}</span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl text-white font-bold mb-1">
                    {pkg.name}
                  </h2>
                  <p className="text-[#94a3b8] text-sm">{pkg.desc}</p>
                </div>

                <div className="p-4 rounded-xl bg-[rgba(7,20,40,0.5)] border border-[rgba(30,80,160,0.2)] mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-outfit font-bold text-white">
                      {pkg.setup}€
                    </span>
                    <span className="text-[#94a3b8] text-sm">setup</span>
                  </div>
                  <div className="text-[#94a3b8] text-sm mt-1">
                    + {pkg.monthly}€/mês
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f, i) => (
                    <FeatureItem key={i} feature={f} />
                  ))}
                </ul>

                <Link
                  to={`/orcamento?pack=${pkg.id}`}
                  className={`btn text-center ${pkg.highlight ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Pedir Orçamento
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[#94a3b8] text-sm">
            * Os valores podem variar de acordo com a dimensão do projeto,
            funcionalidades pretendidas e necessidades específicas do negócio.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-white">
              Comparação{' '}
              <span className="gradient-text">detalhada</span>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[rgba(30,80,160,0.25)]">
            <table className="table-azmar">
              <thead>
                <tr className="bg-[rgba(7,20,40,0.8)]">
                  <th className="text-left w-[40%]">Funcionalidade</th>
                  <th className="text-center w-[20%]">Start</th>
                  <th className="text-center w-[20%] bg-[rgba(45,212,191,0.04)]">
                    Business
                  </th>
                  <th className="text-center w-[20%]">Growth</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <td className="text-[#e2e8f0] font-medium">{row.label}</td>
                    <td className="text-center">
                      <CellValue val={row.start} />
                    </td>
                    <td className="text-center bg-[rgba(45,212,191,0.02)]">
                      <CellValue val={row.business} />
                    </td>
                    <td className="text-center">
                      <CellValue val={row.growth} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ snippet + CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-white mb-4">
            Ainda tens{' '}
            <span className="gradient-text">dúvidas?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-8">
            Consulta as nossas perguntas frequentes ou fala diretamente connosco.
            Respondemos em menos de 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/orcamento" className="btn btn-primary btn-lg">
              Pedir Orçamento
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/faq" className="btn btn-secondary btn-lg">
              Ver FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
