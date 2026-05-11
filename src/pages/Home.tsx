import { Link } from 'react-router-dom';
import {
  Globe,
  Megaphone,
  Palette,
  MapPin,
  Wrench,
  Zap,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
} from 'lucide-react';

/* ─── DATA ───────────────────────────────────────────────────────── */

const services = [
  {
    icon: Globe,
    title: 'Websites Modernos',
    desc: 'Rápidos, responsivos e pensados para converter visitantes em contactos.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    desc: 'Estratégias simples e eficazes para aumentar a visibilidade online.',
  },
  {
    icon: Palette,
    title: 'Branding',
    desc: 'Criação ou modernização da imagem visual do teu negócio.',
  },
  {
    icon: MapPin,
    title: 'Google Business / SEO',
    desc: 'Para que o teu negócio apareça melhor no Google e Maps.',
  },
  {
    icon: Wrench,
    title: 'Manutenção Digital',
    desc: 'Acompanhamento mensal para manter o site atualizado e profissional.',
  },
  {
    icon: Zap,
    title: 'Automações Simples',
    desc: 'Poupa tempo e melhora a comunicação com os teus clientes.',
  },
];

const clients = [
  'Restaurantes',
  'Cafés & Bares',
  'Barbearias',
  'Ginásios',
  'Personal Trainers',
  'Clubes Desportivos',
  'Eventos',
  'Pequenos Negócios',
];

const steps = [
  {
    num: '01',
    title: 'Analisamos',
    desc: 'Avaliamos a tua presença digital atual e identificamos o que pode melhorar.',
  },
  {
    num: '02',
    title: 'Criamos',
    desc: 'Desenvolvemos uma solução simples, moderna e adaptada ao teu negócio.',
  },
  {
    num: '03',
    title: 'Lançamos',
    desc: 'Publicamos o teu site ou campanha, prontos para atrair clientes.',
  },
  {
    num: '04',
    title: 'Acompanhamos',
    desc: 'Mantemos e melhoramos continuamente a tua presença digital.',
  },
];

const packages = [
  {
    name: 'Pack One-Time',
    desc: 'Ficheiros do website prontos a alojar. Sem subscrições.',
    setup: '300€',
    monthly: 'Pagamento Único',
    features: [
      'Website completo',
      'Código-fonte ZIP',
      'Design Responsivo',
      'Instruções incluídas',
      'Propriedade total',
    ],
    cta: '/orcamento?pack=onetime',
    highlight: false,
    badge: 'ZIP',
  },
  {
    name: 'Pack Start',
    desc: 'Para negócios que precisam de presença digital básica e profissional.',
    setup: '180€',
    monthly: '50€/mês',
    features: [
      'Landing page simples',
      'Design responsivo',
      'Botão WhatsApp',
      'Formulário de contacto',
      'SEO básico',
    ],
    cta: '/orcamento?pack=start',
    highlight: false,
  },
  {
    name: 'Pack Business',
    desc: 'Website completo e imagem mais profissional.',
    setup: '380€',
    monthly: '100€/mês',
    features: [
      'Website até 5 páginas',
      'Google Maps integrado',
      'SEO local básico',
      'Manutenção mensal',
      'Alterações incluídas',
    ],
    cta: '/orcamento?pack=business',
    highlight: true,
    badge: 'Mais popular',
  },
  {
    name: 'Pack Growth',
    desc: 'Website, marketing e acompanhamento contínuo.',
    setup: '750€',
    monthly: '250€/mês',
    features: [
      'Website completo',
      'Branding básico',
      'Gestão de redes sociais',
      'Google Business',
      'Relatório mensal',
    ],
    cta: '/orcamento?pack=growth',
    highlight: false,
  },
];

const reviews = [
  {
    name: 'Ana Rodrigues',
    business: 'Café do Largo',
    text: 'A AZMAR transformou completamente a presença do nosso café online. Em menos de um mês já tínhamos muito mais contactos novos.',
    rating: 5,
  },
  {
    name: 'Tiago Ferreira',
    business: 'Barbearia Premium',
    text: 'Profissionalismo de alto nível. O site ficou exatamente como eu queria: moderno, rápido e com o botão de WhatsApp que os clientes adoram.',
    rating: 5,
  },
  {
    name: 'Mariana Costa',
    business: 'FitLife Setúbal',
    text: 'Finalmente temos um website que representa bem o nosso ginásio. A equipa AZMAR foi sempre muito atenta e rápida a responder.',
    rating: 5,
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-[#334155]'}`}
        />
      ))}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#030d1a]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,176,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 80% 60%, rgba(45,212,191,0.2) 0%, transparent 60%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container relative z-10 pt-28 pb-20">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="section-tag animate-fade-in-up mb-6">
              ✦ Agência Digital · Setúbal, Portugal
            </div>

            {/* Headline */}
            <h1 className="text-white animate-fade-in-up delay-100 mb-6">
              Presença digital que{' '}
              <span className="gradient-text">atrai clientes</span>{' '}
              reais
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl animate-fade-in-up delay-200 mb-10">
              Criamos websites, sistemas digitais e estratégias de marketing
              para ajudar pequenos negócios locais a parecerem mais
              profissionais, serem encontrados online e conquistarem mais
              clientes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link to="/orcamento" className="btn btn-primary btn-lg">
                Pedir Orçamento
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/pacotes" className="btn btn-secondary btn-lg">
                Ver Pacotes
              </Link>
              <Link to="/portfolio" className="btn btn-ghost btn-lg">
                Ver Portefólio
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 mt-14 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['A', 'T', 'M'].map((l) => (
                    <div
                      key={l}
                      className="w-8 h-8 rounded-full bg-linear-to-br from-[#2563b0] to-[#2dd4bf] border-2 border-[#030d1a] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[#94a3b8]">
                  Clientes satisfeitos
                </span>
              </div>
              <div className="h-4 w-px bg-[rgba(30,80,160,0.4)]" />
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  ))}
                </div>
                <span className="text-sm text-[#94a3b8]">5.0 média</span>
              </div>
              <div className="h-4 w-px bg-[rgba(30,80,160,0.4)]" />
              <span className="text-sm text-[#94a3b8]">
                Setúbal · Lisboa · Portugal
              </span>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C360,96 720,32 1080,64 C1260,80 1350,72 1440,64 L1440,96 L0,96 Z"
              fill="rgba(7,20,40,0.5)"
            />
          </svg>
        </div>
      </section>

      {/* ── O QUE FAZEMOS ─────────────────────────────────────────── */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto">O que fazemos</div>
            <h2 className="text-white mb-4">
              Soluções digitais para{' '}
              <span className="gradient-text">negócios locais</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Do website à manutenção, acompanhamos o teu negócio de forma
              próxima e prática.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[rgba(45,212,191,0.15)] to-[rgba(37,99,176,0.1)] border border-[rgba(45,212,191,0.15)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <h3 className="text-lg text-white mb-2">{s.title}</h3>
                <p className="text-[#94a3b8] text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/servicos" className="btn btn-secondary">
              Ver todos os serviços
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM TRABALHAMOS ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-tag">Para quem trabalhamos</div>
              <h2 className="text-white mb-6">
                Negócios locais que merecem{' '}
                <span className="gradient-text">crescer online</span>
              </h2>
              <p className="text-[#94a3b8] mb-8">
                Trabalhamos com todo o tipo de negócios locais que precisam de
                uma presença digital mais forte. Se o teu negócio não aparece
                no Google ou o teu site parece desatualizado, é hora de mudar.
              </p>
              <Link to="/orcamento" className="btn btn-primary">
                Quero modernizar o meu negócio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {clients.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[rgba(30,80,160,0.25)] bg-[rgba(7,20,40,0.5)] hover:border-[rgba(45,212,191,0.2)] transition-all group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2dd4bf] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-[#e2e8f0] text-sm font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO AJUDAMOS ─────────────────────────────────────────── */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto">Como funciona</div>
            <h2 className="text-white mb-4">
              Um processo simples,{' '}
              <span className="gradient-text">resultados reais</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-linear-to-r from-[rgba(45,212,191,0.3)] to-transparent" />
                )}
                <div className="card text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#2dd4bf]/20 to-[#2563b0]/20 border border-[rgba(45,212,191,0.2)] flex items-center justify-center mx-auto mb-5">
                    <span className="font-bold text-lg text-[#2dd4bf]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-[#94a3b8] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACOTES ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto">Pacotes</div>
            <h2 className="text-white mb-4">
              Escolhe o plano{' '}
              <span className="gradient-text">certo para ti</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
              Sem surpresas. Valores transparentes, adaptados ao teu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`card relative flex flex-col ${
                  pkg.highlight
                    ? 'border-[rgba(45,212,191,0.4)] shadow-[0_0_40px_rgba(45,212,191,0.08)]'
                    : ''
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-teal">{pkg.badge}</span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-white text-xl mb-1">{pkg.name}</h3>
                  <p className="text-[#94a3b8] text-sm">{pkg.desc}</p>
                </div>
                <div className="mb-6 text-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-4xl font-bold text-white font-outfit">
                    {pkg.setup}
                  </div>
                  <div className="text-[#94a3b8] text-sm mt-1">
                    {pkg.monthly.includes('mês') ? 'por mês' : 'pagamento único'}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#e2e8f0]">
                      <Check className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={pkg.cta}
                  className={`btn text-center ${pkg.highlight ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Pedir Orçamento
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[#94a3b8] text-sm mt-8">
            Os valores podem variar de acordo com a dimensão do projeto e
            necessidades específicas.{' '}
            <Link to="/pacotes" className="text-[#2dd4bf] hover:underline">
              Ver comparação completa
            </Link>
          </p>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto">Testemunhos</div>
            <h2 className="text-white mb-4">
              O que dizem os{' '}
              <span className="gradient-text">nossos clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card">
                <StarRating rating={r.rating} />
                <p className="text-[#e2e8f0] my-5 text-sm leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {r.name}
                  </div>
                  <div className="text-[#94a3b8] text-xs mt-0.5">
                    {r.business}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(37,99,176,0.15) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-tag mx-auto mb-6">Vamos começar?</div>
          <h2 className="text-white mb-5">
            Queres modernizar{' '}
            <span className="gradient-text">o teu negócio?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-10">
            Fala connosco hoje. Analisamos a tua situação e apresentamos uma
            proposta sem compromisso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/orcamento" className="btn btn-primary btn-lg">
              Pedir Orçamento
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contactos" className="btn btn-secondary btn-lg">
              Falar connosco
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
