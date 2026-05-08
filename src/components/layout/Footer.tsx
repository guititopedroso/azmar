import { Link } from 'react-router-dom';
import { Waves, Mail, Phone } from 'lucide-react';

const services = [
  { href: '/servicos#websites', label: 'Criação de Websites' },
  { href: '/servicos#marketing', label: 'Marketing Digital' },
  { href: '/servicos#branding', label: 'Branding' },
  { href: '/servicos#google', label: 'Google Business / SEO' },
  { href: '/servicos#manutencao', label: 'Manutenção Digital' },
  { href: '/servicos#automacoes', label: 'Automações' },
];

const legalLinks = [
  { href: '/termos', label: 'Termos e Condições' },
  { href: '/privacidade', label: 'Política de Privacidade' },
  { href: '/cookies', label: 'Política de Cookies' },
  { href: '/reclamacoes', label: 'Livro de Reclamações' },
];

const quickLinks = [
  { href: '/sobre', label: 'Sobre a AZMAR' },
  { href: '/pacotes', label: 'Pacotes' },
  { href: '/portfolio', label: 'Portefólio' },
  { href: '/faq', label: 'FAQ' },
  { href: '/orcamento', label: 'Pedir Orçamento' },
  { href: '/contactos', label: 'Contactos' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071428] border-t border-[rgba(30,80,160,0.2)]">
      {/* CTA Banner */}
      <div className="border-b border-[rgba(30,80,160,0.2)]">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Pronto para modernizar o teu negócio?
              </h3>
              <p className="text-[#94a3b8]">
                Fala connosco e recebe uma proposta sem compromisso.
              </p>
            </div>
            <Link to="/orcamento" className="btn btn-primary btn-lg shrink-0">
              Pedir Orçamento
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center">
                <Waves className="w-5 h-5 text-[#030d1a]" />
              </div>
              <span className="font-outfit font-bold text-xl tracking-wider text-white">
                AZMAR
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
              Ajudamos negócios locais a modernizar a sua presença digital e
              captar mais clientes.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/azmar.pt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram AZMAR"
                className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(30,80,160,0.3)] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[rgba(45,212,191,0.3)] hover:bg-white/8 transition-all"
              >
                {/* Instagram SVG */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/azmar-pt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn AZMAR"
                className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(30,80,160,0.3)] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[rgba(45,212,191,0.3)] hover:bg-white/8 transition-all"
              >
                {/* LinkedIn SVG */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp AZMAR"
                className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(30,80,160,0.3)] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[rgba(45,212,191,0.3)] hover:bg-white/8 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Serviços
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-[#94a3b8] text-sm hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-[#94a3b8] text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:geral@azmar.pt"
                  className="flex items-center gap-2 text-[#94a3b8] text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#2dd4bf]" />
                  geral@azmar.pt
                </a>
              </li>
              <li>
                <a
                  href="tel:+351912345678"
                  className="flex items-center gap-2 text-[#94a3b8] text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#2dd4bf]" />
                  +351 912 345 678
                </a>
              </li>
            </ul>
            <p className="text-[#94a3b8] text-xs mt-4 leading-relaxed">
              Setúbal · Margem Sul · Lisboa
              <br />
              e todo o Portugal (remoto)
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(30,80,160,0.15)]">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-xs">
            © {year} AZMAR. Todos os direitos reservados.
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-[#94a3b8] text-xs hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
